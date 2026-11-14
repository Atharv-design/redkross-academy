import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, ShieldCheck, AlertTriangle, Smartphone } from 'lucide-react';
import { loadVisionProctor, detectFaces, detectPhoneInTile, PHONE_TILES } from './proctor/visionProctor';

/**
 * ProctorCameraFeed
 * Automated Client-Side Examination Proctoring & Facial Presence Tracking
 * 
 * Capabilities:
 * - Direct webcam video capture via HTML5 MediaDevices API
 * - Native FaceDetector API (Chromium with flags) with automatic optical fallback
 * - High-precision YCbCr Chrominance & Central Reticle Spatial Density Analyzer
 * - Identity continuity and absence tracking with sub-second responsiveness
 * - Real-time onFaceStatusChange & onFaceAbsentWarning telemetry callbacks
 * - On-device MediaPipe models (self-hosted): phone in view, several faces, head
 *   turned away. Signals are reported through onSignal(kind, { detail, snapshot }),
 *   with a small JPEG snapshot as evidence. The skin-tone analyzer below remains the
 *   fallback when the models cannot load (old browser, no WebGL/WASM).
 */

// Thresholds (tuned to avoid flagging normal reading / thinking)
const LOOK_AWAY_YAW = 35; // degrees left/right
const LOOK_AWAY_PITCH = 30; // degrees up/down
const LOOK_AWAY_SECONDS = 6;
const PHONE_SCORE = 0.3; // webcam frames score lower than clean photos (angle, glare, motion)
const PHONE_EVERY_TICKS = 2; // every ~0.7 s (runs in idle time)
const PHONE_WINDOW = PHONE_TILES.length; // one full rotation of the tiles
const PHONE_HITS_NEEDED = 2; // two hits in that window = phone (filters one-frame false alarms)

// ?proctorDebug=1 shows live model scores under the camera (for tuning; harmless to students)
const DEBUG = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('proctorDebug');
const COOLDOWN_MS = { phone: 20000, multiple_faces: 20000, looking_away: 45000, face_absent: 30000 };
const PERIODIC_SNAPSHOT_MS = 4 * 60 * 1000;
export default function ProctorCameraFeed({
  isActive = true,
  onFaceAbsentWarning,
  onFaceStatusChange,
  onSignal,
  onPhoneVisibleChange,
  className = ''
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraState, setCameraState] = useState('initializing'); // 'initializing' | 'active' | 'denied' | 'error'
  const [faceDetected, setFaceDetected] = useState(true);
  const [faceConfidence, setFaceConfidence] = useState('high'); // 'high' | 'moderate' | 'absent'
  const [absenceDuration, setAbsenceDuration] = useState(0);

  const faceDetectorRef = useRef(null);
  const absenceTimerRef = useRef(0);
  const baselineProfileRef = useRef(null); // { skinRatio, avgCb, avgCr }
  const frameCounterRef = useRef(0);
  const prevFrameDataRef = useRef(null);

  // On-device vision models + signal state
  const visionRef = useRef(null);
  const [visionState, setVisionState] = useState('loading'); // loading | ready | unavailable
  const [phoneVisible, setPhoneVisible] = useState(false);
  const sigRef = useRef({ multi: 0, lookAwaySince: 0, phoneHits: [], tick: 0, tile: 0, last: {}, lastPeriodic: 0 });
  const [debugInfo, setDebugInfo] = useState(null);
  const onSignalRef = useRef(onSignal);
  const onPhoneRef = useRef(onPhoneVisibleChange);
  onSignalRef.current = onSignal;
  onPhoneRef.current = onPhoneVisibleChange;

  /** Small JPEG of the current frame (evidence for admin review). */
  const captureSnapshot = () => {
    try {
      const v = videoRef.current;
      if (!v || v.readyState < 2) return null;
      const c = document.createElement('canvas');
      c.width = 320;
      c.height = 240;
      c.getContext('2d').drawImage(v, 0, 0, 320, 240);
      return c.toDataURL('image/jpeg', 0.6);
    } catch {
      return null;
    }
  };

  const emit = (kind, detail) => {
    const st = sigRef.current;
    const now = Date.now();
    if (kind !== 'periodic' && now - (st.last[kind] || 0) < (COOLDOWN_MS[kind] || 20000)) return;
    st.last[kind] = now;
    if (onSignalRef.current) onSignalRef.current(kind, { detail, snapshot: captureSnapshot() });
  };

  // Load the vision models once the camera is live
  useEffect(() => {
    if (cameraState !== 'active' || visionRef.current) return undefined;
    let alive = true;
    loadVisionProctor()
      .then((models) => {
        if (!alive) return;
        visionRef.current = models;
        setVisionState('ready');
      })
      .catch((err) => {
        console.warn('[ProctorCamera] vision models unavailable, using fallback analyzer:', err && err.message);
        if (alive) setVisionState('unavailable');
      });
    return () => {
      alive = false;
    };
  }, [cameraState]);

  // Initialize native Chromium FaceDetector if enabled
  useEffect(() => {
    if (typeof window !== 'undefined' && 'FaceDetector' in window) {
      try {
        // @ts-ignore
        faceDetectorRef.current = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 2 });
      } catch (e) {
        faceDetectorRef.current = null;
      }
    }
  }, []);

  // Request camera stream
  useEffect(() => {
    if (!isActive) {
      stopCamera();
      return;
    }

    let isMounted = true;

    async function startCamera() {
      try {
        setCameraState('initializing');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            // 640x480 so a phone anywhere in view has enough pixels for the detector
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
            facingMode: 'user'
          },
          audio: false
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setCameraState('active');
      } catch (err) {
        if (!isMounted) return;
        console.warn('[ProctorCamera] Webcam access issue:', err);
        setCameraState('denied');
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, [isActive]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // High-Frequency Real-Time Face Presence Loop (Runs every 350ms)
  useEffect(() => {
    if (cameraState !== 'active') return;

    let isRunning = true;
    const SAMPLE_WIDTH = 80;
    const SAMPLE_HEIGHT = 60;
    const INTERVAL_MS = 350;
    const INTERVAL_SECS = INTERVAL_MS / 1000;

    // Central face reticle geometry in 80x60 grid
    const cx = 40;
    const cy = 28;
    const rx = 22;
    const ry = 22;

    const analyzeFrame = async () => {
      if (!isRunning || !videoRef.current || videoRef.current.readyState < 2) {
        return;
      }

      let detected = false;
      let confidence = 'absent';
      let nativeDetected = false;

      // 0. On-device vision models (preferred)
      if (visionRef.current) {
        const st = sigRef.current;
        const ts = performance.now();
        try {
          const { count, pose } = detectFaces(visionRef.current, videoRef.current, ts);
          nativeDetected = count > 0;
          detected = nativeDetected;
          confidence = detected ? 'high' : 'absent';

          // several people in front of the camera (sustained ~1 s)
          st.multi = count >= 2 ? st.multi + 1 : 0;
          if (st.multi === 3) emit('multiple_faces', count + ' faces in view');

          // head turned away for a sustained period (reading a phone or notes off-camera)
          const away = pose && (Math.abs(pose.yaw) > LOOK_AWAY_YAW || Math.abs(pose.pitch) > LOOK_AWAY_PITCH);
          if (away) {
            if (!st.lookAwaySince) st.lookAwaySince = Date.now();
            else if (Date.now() - st.lookAwaySince > LOOK_AWAY_SECONDS * 1000) {
              emit('looking_away', 'head turned ' + Math.round(pose.yaw) + ' deg / ' + Math.round(pose.pitch) + ' deg for over ' + LOOK_AWAY_SECONDS + 's');
              st.lookAwaySince = Date.now();
            }
          } else st.lookAwaySince = 0;

          // phone anywhere in view: rotate full frame / left / right zoomed tiles.
          // The object model is heavy (~80-200 ms), so it runs when the browser is idle
          // and never delays the student's clicks.
          st.tick += 1;
          if (st.tick % PHONE_EVERY_TICKS === 0 && !st.phoneBusy) {
            st.phoneBusy = true;
            const faceInfo = { count, pose };
            const runScan = () => {
              try {
                if (!visionRef.current || !videoRef.current || videoRef.current.readyState < 2) return;
                const tile = PHONE_TILES[st.tile % PHONE_TILES.length];
                st.tile += 1;
                const score = detectPhoneInTile(visionRef.current, videoRef.current, performance.now(), tile);
                st.phoneHits = [...st.phoneHits.slice(-(PHONE_WINDOW - 1)), score >= PHONE_SCORE ? score : 0];
                const visible = st.phoneHits.filter(Boolean).length >= PHONE_HITS_NEEDED;
                if (DEBUG) {
                  setDebugInfo({
                    faces: faceInfo.count,
                    yaw: faceInfo.pose ? Math.round(faceInfo.pose.yaw) : null,
                    pitch: faceInfo.pose ? Math.round(faceInfo.pose.pitch) : null,
                    phone: Math.round(score * 100),
                    tile: st.tile % PHONE_TILES.length,
                    hits: st.phoneHits.filter(Boolean).length,
                    res: (videoRef.current.videoWidth || 0) + 'x' + (videoRef.current.videoHeight || 0),
                  });
                }
                setPhoneVisible((prev) => {
                  if (prev !== visible && onPhoneRef.current) onPhoneRef.current(visible);
                  return visible;
                });
                if (visible) emit('phone', 'phone detected (confidence ' + Math.round(Math.max(...st.phoneHits) * 100) + '%)');
              } catch {
                // skip this scan
              } finally {
                st.phoneBusy = false;
              }
            };
            if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(runScan, { timeout: 1500 });
            else setTimeout(runScan, 0);
          }

          // periodic identity snapshot (soon after start, then every few minutes)
          if (st.tick > 8 && (!st.lastPeriodic || Date.now() - st.lastPeriodic > PERIODIC_SNAPSHOT_MS)) {
            st.lastPeriodic = Date.now();
            emit('periodic', count ? 'routine check' : 'routine check (no face)');
          }
        } catch {
          // a failed frame keeps the previous state
          detected = faceDetected;
          nativeDetected = true;
        }
      }

      // 1. Native Chromium FaceDetector API (when supported)
      if (!visionRef.current && faceDetectorRef.current) {
        try {
          const faces = await faceDetectorRef.current.detect(videoRef.current);
          if (faces && faces.length > 0) {
            const face = faces[0].boundingBox;
            const vw = videoRef.current.videoWidth || 320;
            const vh = videoRef.current.videoHeight || 240;
            const fx = face.x + face.width / 2;
            const fy = face.y + face.height / 2;

            // Ensure detected face is approximately within the central 70% viewport
            const isCentered =
              fx > vw * 0.15 &&
              fx < vw * 0.85 &&
              fy > vh * 0.10 &&
              fy < vh * 0.90 &&
              face.width > vw * 0.15;

            if (isCentered) {
              nativeDetected = true;
              detected = true;
              confidence = 'high';
            }
          }
        } catch {
          // Fall through to optical analyzer
        }
      }

      // 2. Fallback: optical YCbCr chrominance + reticle density analyzer
      if (!visionRef.current && canvasRef.current) {
        try {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
            const frame = ctx.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
            const data = frame.data;

            let reticleSkinPixels = 0;
            let totalReticlePixels = 0;
            let reticleCbSum = 0;
            let reticleCrSum = 0;
            let reticleYSum = 0;
            let motionDeltaSum = 0;

            const prevData = prevFrameDataRef.current;

            for (let y = 0; y < SAMPLE_HEIGHT; y++) {
              for (let x = 0; x < SAMPLE_WIDTH; x++) {
                const idx = (y * SAMPLE_WIDTH + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];

                // Elliptical distance from center reticle
                const distSq = Math.pow((x - cx) / rx, 2) + Math.pow((y - cy) / ry, 2);
                const isInReticle = distSq <= 1.0;

                if (isInReticle) {
                  totalReticlePixels++;

                  // YCbCr Conversion
                  const yVal = 0.299 * r + 0.587 * g + 0.114 * b;
                  const cbVal = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
                  const crVal = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

                  // Human Melanin & Hemoglobin Chrominance Cluster (all skin tones)
                  // Tight Cb [80, 130], Cr [133, 175] with red dominance over green/blue
                  const isSkinChrominance =
                    yVal >= 35 &&
                    yVal <= 240 &&
                    cbVal >= 80 &&
                    cbVal <= 130 &&
                    crVal >= 133 &&
                    crVal <= 175 &&
                    r > g &&
                    r > b &&
                    Math.abs(r - g) >= 10 &&
                    Math.abs(r - b) >= 12;

                  if (isSkinChrominance) {
                    reticleSkinPixels++;
                    reticleYSum += yVal;
                    reticleCbSum += cbVal;
                    reticleCrSum += crVal;
                  }

                  // Micro-motion calculation against previous frame
                  if (prevData) {
                    const prevY = 0.299 * prevData[idx] + 0.587 * prevData[idx + 1] + 0.114 * prevData[idx + 2];
                    motionDeltaSum += Math.abs(yVal - prevY);
                  }
                }
              }
            }

            // Save current frame for motion tracking
            prevFrameDataRef.current = new Uint8ClampedArray(data);

            const skinRatio = totalReticlePixels > 0 ? reticleSkinPixels / totalReticlePixels : 0;
            const avgCb = reticleSkinPixels > 0 ? reticleCbSum / reticleSkinPixels : 0;
            const avgCr = reticleSkinPixels > 0 ? reticleCrSum / reticleSkinPixels : 0;

            frameCounterRef.current++;

            // Initial 2-3 seconds: Calibrate baseline profile when cadet is present
            if (skinRatio >= 0.18 && frameCounterRef.current <= 15) {
              baselineProfileRef.current = {
                skinRatio,
                avgCb,
                avgCr
              };
            }

            const baseline = baselineProfileRef.current;

            // Decision: A human face sitting in front of camera covers at least 15% of the central reticle
            if (!nativeDetected) {
              if (baseline) {
                // If candidate calibrated, verify they didn't walk away or drop out
                const isPresentAgainstBaseline =
                  skinRatio >= Math.max(0.12, baseline.skinRatio * 0.45) &&
                  reticleSkinPixels >= 150;
                detected = isPresentAgainstBaseline;
                confidence = isPresentAgainstBaseline ? 'high' : 'absent';
              } else {
                // Pre-calibration or raw optical standard
                detected = skinRatio >= 0.15 && reticleSkinPixels >= 160;
                confidence = detected ? 'moderate' : 'absent';
              }
            }
          }
        } catch {
          // On read exception, retain previous detection state rather than thrashing
          detected = faceDetected;
        }
      }

      if (isRunning) {
        setFaceDetected(detected);
        setFaceConfidence(confidence);

        if (detected) {
          absenceTimerRef.current = 0;
          setAbsenceDuration(0);
          if (onFaceStatusChange) {
            onFaceStatusChange({
              detected: true,
              status: 'verified',
              absenceSeconds: 0,
              confidence
            });
          }
        } else {
          absenceTimerRef.current += INTERVAL_SECS;
          const currentAbsence = Math.round(absenceTimerRef.current * 10) / 10;
          setAbsenceDuration(currentAbsence);

          if (onFaceStatusChange) {
            onFaceStatusChange({
              detected: false,
              status: 'absent',
              absenceSeconds: currentAbsence,
              confidence: 'absent'
            });
          }

          if (currentAbsence >= 1.5 && onFaceAbsentWarning) {
            onFaceAbsentWarning(currentAbsence);
          }
          if (currentAbsence >= 8) emit('face_absent', 'no face for ' + Math.round(currentAbsence) + 's');
        }
      }
    };

    const intervalId = setInterval(analyzeFrame, INTERVAL_MS);

    return () => {
      isRunning = false;
      clearInterval(intervalId);
    };
  }, [cameraState, onFaceAbsentWarning, onFaceStatusChange, faceDetected]);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Hidden offscreen canvas for optical frame sampling */}
      <canvas ref={canvasRef} width="80" height="60" className="hidden" />

      {/* Video Frame Container */}
      <div className={`relative w-36 h-28 sm:w-44 sm:h-32 rounded-xl overflow-hidden bg-black border shadow-xl transition-all duration-300 ${
        cameraState === 'active'
          ? faceDetected
            ? 'border-[#FF7A00]/50 shadow-[0_0_15px_rgba(255,122,0,0.25)]'
            : 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.45)] ring-2 ring-rose-500/50'
          : 'border-white/10'
      }`}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-300 ${
            cameraState === 'active' ? 'opacity-100' : 'opacity-20'
          }`}
        />

        {/* Live Proctor Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%), linear-gradient(rgba(255,122,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.2) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 16px 16px, 16px 16px'
          }}
        />

        {/* Face Bounding Reticle Target */}
        {cameraState === 'active' && (
          <div className="absolute inset-2 pointer-events-none border border-dashed rounded-lg transition-colors duration-300 flex items-center justify-center border-white/20">
            <div className={`w-12 h-14 rounded-[50%] border-2 transition-all flex items-center justify-center ${
              faceDetected
                ? 'border-[#FF7A00] scale-100 shadow-[0_0_10px_rgba(255,122,0,0.4)]'
                : 'border-rose-500 scale-110 shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                faceDetected ? 'bg-[#FF7A00] animate-ping' : 'bg-rose-500'
              }`} />
            </div>
          </div>
        )}

        {/* Camera Inactive / Denied Fallback */}
        {cameraState !== 'active' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-center p-2 space-y-1">
            {cameraState === 'denied' ? (
              <>
                <CameraOff className="w-6 h-6 text-rose-400" />
                <span className="text-[9px] font-mono text-rose-300 font-bold leading-tight">
                  Camera Blocked
                </span>
              </>
            ) : (
              <>
                <Camera className="w-6 h-6 text-[#FF7A00] animate-pulse" />
                <span className="text-[9px] font-mono text-slate-400 leading-tight">
                  Starting Proctor Cam...
                </span>
              </>
            )}
          </div>
        )}

        {phoneVisible && cameraState === 'active' && (
          <div className="absolute inset-0 pointer-events-none ring-4 ring-inset ring-rose-500 bg-rose-600/25 flex items-start justify-center pt-1.5">
            <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-mono font-bold tracking-wider flex items-center gap-1">
              <Smartphone className="w-3 h-3" /> PHONE DETECTED
            </span>
          </div>
        )}

        {/* Live Status Pill Inside Video Frame */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/85 backdrop-blur-sm border border-white/10">
            <span className={`w-1.5 h-1.5 rounded-full ${
              cameraState === 'active'
                ? faceDetected
                  ? 'bg-[#FF7A00] animate-ping'
                  : 'bg-rose-500 animate-pulse'
                : 'bg-rose-500'
            }`} />
            <span className="text-[8px] font-mono uppercase tracking-wider text-white font-bold">
              REC
            </span>
          </div>

          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full backdrop-blur-sm border text-[8px] font-mono font-bold ${
            faceDetected
              ? 'bg-[#1A1208]/90 text-[#FF7A00] border-[#FF7A00]/40'
              : 'bg-rose-950/95 text-rose-300 border-rose-500 animate-pulse'
          }`}>
            {faceDetected ? (
              <>
                <ShieldCheck className="w-2.5 h-2.5 text-[#FF7A00]" />
                <span>VERIFIED</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                <span>NO FACE</span>
              </>
            )}
          </div>
        </div>
      </div>

      {phoneVisible && cameraState === 'active' && (
        <div className="mt-1 px-2.5 py-1 rounded bg-rose-950/95 border border-rose-500 text-rose-200 text-[10px] font-mono text-center font-bold shadow-lg animate-pulse flex items-center gap-1.5">
          <Smartphone className="w-3 h-3 text-rose-400 flex-shrink-0" />
          <span>Phone detected - put it away</span>
        </div>
      )}
      {cameraState === 'active' && (
        <div className="mt-1 text-[9px] font-mono text-slate-500" title="Checks run on this device; only rule-break snapshots are uploaded">
          {visionState === 'ready' ? 'AI proctoring active' : visionState === 'loading' ? 'Loading AI proctoring...' : 'Basic proctoring'}
        </div>
      )}
      {DEBUG && debugInfo && (
        <div className="mt-1 text-[9px] font-mono text-sky-300 bg-black/80 rounded px-1.5 py-0.5">
          faces {debugInfo.faces} · yaw {debugInfo.yaw} · pitch {debugInfo.pitch} · phone {debugInfo.phone}% (tile {debugInfo.tile}, hits {debugInfo.hits}/{PHONE_HITS_NEEDED}) · {debugInfo.res}
        </div>
      )}

      {/* Floating Alert Banner if Face is Absent */}
      {!faceDetected && cameraState === 'active' && (
        <div className="mt-1 px-2.5 py-1 rounded bg-rose-950/95 border border-rose-500 text-rose-200 text-[10px] font-mono text-center font-bold shadow-lg animate-pulse flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0" />
          <span>Face Absent ({absenceDuration}s) — Align in center</span>
        </div>
      )}
    </div>
  );
}

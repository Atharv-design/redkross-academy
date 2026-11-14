import React, { useEffect, useRef, useState } from 'react';
import { loadVisionProctor } from '../../../../components/student/proctor/visionProctor';
import {
  ShieldAlert,
  Shield,
  ShieldCheck,
  Clock,
  Lock,
  Maximize2,
  Camera,
  CameraOff,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Eye
} from 'lucide-react';

export default function PreFlightExamModal({
  isOpen,
  activeUnit,
  onCancel,
  onAcknowledge
}) {
  const [cameraStatus, setCameraStatus] = useState('idle'); // 'idle' | 'requesting' | 'active' | 'denied'
  const previewVideoRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera tracks cleanly
  const stopCameraPreview = () => {
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => track.stop());
      } catch {}
      streamRef.current = null;
    }
    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = null;
    }
  };

  // Request camera stream and attach to self-view preview
  const requestCameraAccess = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraStatus('denied');
      return;
    }
    try {
      setCameraStatus('requesting');
      stopCameraPreview();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640, max: 1280 },
          height: { ideal: 480, max: 720 },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = stream;
      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = stream;
        previewVideoRef.current.play().catch(() => {});
      }
      setCameraStatus('active');
    } catch (err) {
      console.warn('[PreFlight] Camera permission was not granted:', err);
      setCameraStatus('denied');
    }
  };

  // Attempt initial camera permission on modal open
  // Warm up the on-device proctoring models while the student does the camera check
  useEffect(() => {
    loadVisionProctor().catch(() => {});
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestCameraAccess();
    } else {
      stopCameraPreview();
    }
    return () => {
      stopCameraPreview();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isFinalExam = activeUnit?.type === 'final_exam';
  const totalMinutes = isFinalExam ? 60 : 30;
  const totalQuestions = isFinalExam ? 50 : 20;

  const handleLaunchWithFullscreen = () => {
    if (cameraStatus !== 'active') return;

    // Preserve the direct synchronous user gesture by requesting fullscreen immediately
    try {
      const docEl = document.documentElement;
      const onEnteredFs = () => {
        if (navigator.keyboard && typeof navigator.keyboard.lock === 'function') {
          navigator.keyboard.lock(['Escape', 'F11', 'F5']).catch(() => {});
        }
      };

      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().then(onEnteredFs).catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        // @ts-ignore
        docEl.webkitRequestFullscreen().then(onEnteredFs).catch(() => {});
      } else if (docEl.msRequestFullscreen) {
        // @ts-ignore
        docEl.msRequestFullscreen().then(onEnteredFs).catch(() => {});
      }
    } catch (e) {
      console.warn('[PreFlight] Fullscreen request error:', e);
    }

    // Release pre-flight camera preview so the CBT Exam Proctor component can claim device cleanly
    stopCameraPreview();

    // Proceed to acknowledge and launch exam
    onAcknowledge();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn select-none">
      <div className="max-w-2xl w-full rounded-2xl p-6 sm:p-7 border border-[#FF7A00]/40 space-y-5 bg-[#0A0D12] shadow-[0_0_60px_rgba(255,122,0,0.18)] max-h-[96vh] overflow-y-auto custom-scrollbar relative">
        
        {/* Top Tactical Telemetry Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#FF7A00]/25">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00] flex-shrink-0 shadow-[0_0_15px_rgba(255,122,0,0.3)]">
              <ShieldAlert className="w-5 h-5 text-[#FF7A00]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FF7A00]/20 text-[#FFA439] border border-[#FF7A00]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  SECURITY PROTOCOL // WOPR-CBT
                </span>
                <span className="text-[10px] font-mono text-[#8BA2B5] hidden sm:inline">
                  INTEGRITY VERIFIED
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                Examination Protocols & Biometric Gate
              </h2>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono text-[#8BA2B5] uppercase block">ASSESSMENT TYPE</span>
            <span className="text-xs font-mono font-bold text-[#FFA439]">
              {isFinalExam ? 'FINAL CERTIFICATION' : 'MODULE EVALUATION'}
            </span>
          </div>
        </div>

        {/* Assessment Parameters Banner */}
        <div className="p-3 rounded-xl bg-[#0F141C] border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-white font-medium truncate">
            <span className="text-[#8BA2B5]">Target:</span>
            <span className="text-[#FFA439] font-bold truncate">
              {isFinalExam
                ? 'Final Comprehensive Cybersecurity Certification'
                : `${activeUnit?.moduleTitle || 'Curriculum Module'} Assessment`}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#A3907C]">
            <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-white font-bold">
              {totalQuestions} MCQs
            </span>
            <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[#FFA439] font-bold">
              {totalMinutes} Minutes
            </span>
          </div>
        </div>

        {/* What is monitored (informed consent) */}
        <div className="p-3 rounded-xl bg-[#0F141C] border border-white/10 text-xs text-slate-300 space-y-1.5">
          <div className="font-semibold text-white">How this exam is proctored</div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Camera checks run on your device: a phone in view or another person counts as a strike; looking away for long is flagged for review.</li>
            <li>Questions are watermarked with your name and a session code, so photos of the screen can be traced.</li>
            <li>Only short snapshots of rule breaks (and a few routine ones) are uploaded for review by academy staff, and deleted after 90 days. Video is never recorded.</li>
            <li>Leaving fullscreen or switching tabs counts as a strike. Three strikes end the attempt with a 24-hour lock.</li>
          </ul>
        </div>

        {/* Mandatory Camera Self-Verification Viewport Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#07090E] border border-[#FF7A00]/35 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                MANDATORY CAMERA VERIFICATION
              </span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                cameraStatus === 'active'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                  : cameraStatus === 'denied'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {cameraStatus === 'active' ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CAMERA VERIFIED</span>
                </>
              ) : cameraStatus === 'denied' ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>ACCESS DENIED</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>INITIALIZING SENSOR...</span>
                </>
              )}
            </span>
          </div>

          {/* Camera Viewport & Tactical HUD Overlay */}
          <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-black border border-white/15 flex items-center justify-center">
            <video
              ref={previewVideoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-300 ${
                cameraStatus === 'active' ? 'opacity-100' : 'opacity-10 pointer-events-none'
              }`}
            />

            {/* Tactical Grid Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%), linear-gradient(rgba(255,122,0,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.25) 1px, transparent 1px)`,
                backgroundSize: '100% 100%, 20px 20px, 20px 20px'
              }}
            />

            {/* Corner Reticle Brackets */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#FF7A00] pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#FF7A00] pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#FF7A00] pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#FF7A00] pointer-events-none" />

            {/* Top Telemetry HUD Overlay */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[9px] font-mono pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-black/80 border border-emerald-500/40 text-emerald-400 font-bold flex items-center gap-1.5 shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPTICAL FEED LIVE</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-slate-300 font-medium shadow">
                FPS: 30 · RESOLUTION: 720P
              </span>
            </div>

            {/* Bottom Telemetry HUD Overlay */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[9px] font-mono pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-slate-300 font-medium shadow">
                CIPHER: TLS 1.3 / AES-256-GCM
              </span>
              <span className="px-2 py-0.5 rounded bg-black/80 border border-[#FF7A00]/40 text-[#FFA439] font-bold shadow">
                PROCTOR TRACKING: ARMED
              </span>
            </div>

            {/* Center Biometric Face Reticle */}
            {cameraStatus === 'active' && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-[48%] border-2 border-[#FF7A00]/80 shadow-[0_0_25px_rgba(255,122,0,0.4)] flex items-center justify-center">
                  <div className="w-18 h-26 sm:w-20 sm:h-30 rounded-[48%] border border-dashed border-[#FFA439]/50" />
                  <div className="absolute -top-1.5 w-3.5 h-0.5 bg-[#FF7A00]" />
                  <div className="absolute -bottom-1.5 w-3.5 h-0.5 bg-[#FF7A00]" />
                  <div className="absolute -left-1.5 h-3.5 w-0.5 bg-[#FF7A00]" />
                  <div className="absolute -right-1.5 h-3.5 w-0.5 bg-[#FF7A00]" />
                  <div className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
                </div>
                <span className="mt-2 text-[10px] font-mono text-[#FFA439] bg-black/90 px-2.5 py-0.5 rounded border border-[#FF7A00]/40 font-bold uppercase tracking-wider shadow">
                  Center Face in Reticle
                </span>
              </div>
            )}

            {/* Fallback Viewport if Permission Denied or Idle */}
            {cameraStatus !== 'active' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-4 text-center space-y-2.5 z-10">
                <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <CameraOff className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-white font-bold block uppercase tracking-wider">
                    Camera Permission Required
                  </span>
                  <p className="text-[11px] font-mono text-rose-200/90 max-w-sm mt-1 leading-relaxed">
                    Anti-cheat proctoring requires active webcam presence to verify candidate identity. The examination cannot be started without camera authorization.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={requestCameraAccess}
                  className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/50 text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-lg"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Grant / Retry Camera Permission</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#8BA2B5] pt-0.5">
            <span>
              {cameraStatus === 'active'
                ? 'Camera feed connected. Your video stream will remain continuously verified throughout.'
                : 'Webcam feed required. Check browser site permissions if prompt does not appear.'}
            </span>
            {cameraStatus === 'active' && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> READY
              </span>
            )}
          </div>
        </div>

        {/* 3 Integrity Protocols Cards */}
        <div className="space-y-2.5 font-mono text-xs">
          {/* Protocol 01: Fullscreen Lockdown */}
          <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#FF7A00]/25 flex items-start space-x-3">
            <Maximize2 className="w-4 h-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[#FF7A00] text-[10px] font-bold uppercase tracking-wider">
                  PROTOCOL 01
                </span>
                <span className="text-white font-bold">Automatic Fullscreen & Screen Lockdown</span>
              </div>
              <p className="text-[#8BA2B5] text-[11px] leading-relaxed">
                Course outline drawer and browser controls will automatically vanish. You are strictly confined to single-window assessment mode until final submission.
              </p>
            </div>
          </div>

          {/* Protocol 02: Authoritative Clock */}
          <div className="p-3.5 rounded-xl bg-[#090C12] border border-amber-500/25 flex items-start space-x-3">
            <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  PROTOCOL 02
                </span>
                <span className="text-amber-300 font-bold">
                  Exam Duration: {totalMinutes} Minutes ({totalQuestions} MCQs)
                </span>
              </div>
              <p className="text-[#8BA2B5] text-[11px] leading-relaxed">
                The timer runs continuously on a server-synchronized deadline. Refreshing or switching views does not reset your remaining time.
              </p>
            </div>
          </div>

          {/* Protocol 03: Biometric Proctoring */}
          <div className="p-3.5 rounded-xl bg-[#090C12] border border-rose-500/25 flex items-start space-x-3">
            <Lock className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                  PROTOCOL 03
                </span>
                <span className="text-rose-300 font-bold">Continuous Proctoring & On-Screen Warnings</span>
              </div>
              <p className="text-[#8BA2B5] text-[11px] leading-relaxed">
                Moving away from the camera or switching tabs displays an immediate on-screen warning modal. 3 cumulative violations trigger an automatic 24-hour examination lockout.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-[#FF7A00]/25">
          <button
            type="button"
            onClick={() => {
              stopCameraPreview();
              onCancel();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-[#8BA2B5] hover:text-white font-mono text-xs transition-colors cursor-pointer"
          >
            Return to Study / Cancel
          </button>

          <button
            type="button"
            onClick={handleLaunchWithFullscreen}
            disabled={cameraStatus !== 'active'}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-mono text-xs flex items-center justify-center space-x-2 transition-all ${
              cameraStatus === 'active'
                ? 'bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] shadow-[0_0_25px_rgba(255,122,0,0.45)] cursor-pointer'
                : 'bg-[#151B24] text-[#8BA2B5] border border-white/10 opacity-50 cursor-not-allowed'
            }`}
          >
            {cameraStatus === 'active' ? (
              <>
                <Maximize2 className="w-4 h-4" />
                <span>Accept Protocols & Launch Fullscreen Exam</span>
              </>
            ) : (
              <>
                <CameraOff className="w-4 h-4" />
                <span>Camera Verification Required</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

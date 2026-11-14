/**
 * On-device exam proctoring with Google MediaPipe (runs in the browser; video never
 * leaves the device). Loaded lazily, only on the exam screen.
 *
 *  - FaceLandmarker: number of faces, head direction (yaw / pitch)
 *  - ObjectDetector (EfficientDet-Lite0, COCO): "cell phone" in view
 *
 * Runtime and models are self-hosted under /vendor/mediapipe (see
 * scripts/prepare_proctor_assets.mjs).
 */
const BASE = '/vendor/mediapipe';

let loading = null;

export function loadVisionProctor() {
  if (!loading) {
    loading = (async () => {
      const vision = await import('@mediapipe/tasks-vision');
      const { FilesetResolver, FaceLandmarker, ObjectDetector } = vision;
      const fileset = await FilesetResolver.forVisionTasks(`${BASE}/wasm`);
      const make = async (factory, options) => {
        // GPU when available (fast, low CPU); fall back to CPU.
        try {
          return await factory.createFromOptions(fileset, { ...options, baseOptions: { ...options.baseOptions, delegate: 'GPU' } });
        } catch {
          return factory.createFromOptions(fileset, { ...options, baseOptions: { ...options.baseOptions, delegate: 'CPU' } });
        }
      };
      const face = await make(FaceLandmarker, {
        baseOptions: { modelAssetPath: `${BASE}/face_landmarker.task` },
        runningMode: 'VIDEO',
        numFaces: 3,
        outputFacialTransformationMatrixes: true,
        minFaceDetectionConfidence: 0.5,
        minFacePresenceConfidence: 0.5,
      });
      // The int8 object detector returns no detections on the GPU delegate (verified
      // in Chrome), so it always runs on the CPU.
      const objects = await ObjectDetector.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: `${BASE}/efficientdet_lite0.tflite`, delegate: 'CPU' },
        runningMode: 'VIDEO',
        scoreThreshold: 0.2, // the component applies its own threshold + persistence
        maxResults: 5,
        categoryAllowlist: ['cell phone'],
      });
      return { face, objects };
    })().catch((err) => {
      loading = null; // allow a retry later
      throw err;
    });
  }
  return loading;
}

const DEG = 180 / Math.PI;

/** Head direction from the face transformation matrix (column-major 4x4). 0/0 = facing the camera. */
export function headPose(matrix) {
  const m = matrix?.data;
  if (!m || m.length < 11) return null;
  const fx = m[8];
  const fy = m[9];
  const fz = m[10];
  return {
    yaw: Math.atan2(fx, fz) * DEG,
    pitch: Math.atan2(-fy, Math.hypot(fx, fz)) * DEG,
  };
}

/** Runs the face model on the current frame. */
export function detectFaces(models, video, ts) {
  const r = models.face.detectForVideo(video, ts);
  const count = r?.faceLandmarks?.length || 0;
  const pose = count ? headPose(r.facialTransformationMatrixes?.[0]) : null;
  return { count, pose };
}

/** Runs the object model; returns the best "cell phone" score (0 when none). */
export function detectPhone(models, video, ts) {
  const r = models.objects.detectForVideo(video, ts);
  let best = 0;
  for (const d of r?.detections || []) {
    for (const c of d.categories || []) {
      if (c.categoryName === 'cell phone' && c.score > best) best = c.score;
    }
  }
  return best;
}

/**
 * Regions scanned for phones, in rotation: the whole frame, then the left and right
 * 60% zoomed in. A phone near the edge of the frame is small at 320 px model input;
 * the zoomed tiles make it ~1.7x larger, so phones anywhere in view are found, not
 * just ones in front of the face.
 */
export const PHONE_TILES = [
  { x: 0, y: 0, w: 1, h: 1 },
  { x: 0, y: 0, w: 0.6, h: 1 },
  { x: 0.4, y: 0, w: 0.6, h: 1 },
];

let tileCanvas = null;
const MODEL_INPUT = 320; // EfficientDet-Lite0 works on 320x320; larger input only adds conversion cost

/** Best "cell phone" score inside one tile of the current frame (pre-scaled to the model size). */
export function detectPhoneInTile(models, video, ts, tile) {
  const vw = video.videoWidth || video.width;
  const vh = video.videoHeight || video.height;
  if (!vw || !vh) return 0;
  const sx = Math.round(vw * tile.x);
  const sy = Math.round(vh * tile.y);
  const sw = Math.round(vw * tile.w);
  const sh = Math.round(vh * tile.h);
  const scale = Math.min(1, MODEL_INPUT / Math.max(sw, sh));
  if (!tileCanvas) tileCanvas = document.createElement('canvas');
  tileCanvas.width = Math.round(sw * scale);
  tileCanvas.height = Math.round(sh * scale);
  tileCanvas.getContext('2d').drawImage(video, sx, sy, sw, sh, 0, 0, tileCanvas.width, tileCanvas.height);
  return detectPhone(models, tileCanvas, ts);
}

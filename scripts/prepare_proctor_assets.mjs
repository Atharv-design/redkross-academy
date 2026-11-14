/**
 * Puts the on-device proctoring runtime next to the site so exams never load code
 * or models from third-party hosts at exam time.
 *
 *  - copies the MediaPipe WASM runtime (SIMD build) from node_modules
 *  - downloads the two official Google models once (kept in the repo afterwards)
 *
 *   node scripts/prepare_proctor_assets.mjs          (also runs before every build)
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'vendor', 'mediapipe');
const wasmSrc = path.join(root, 'node_modules', '@mediapipe', 'tasks-vision', 'wasm');
const wasmOut = path.join(outDir, 'wasm');

const MODELS = [
  {
    file: 'face_landmarker.task',
    url: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
  },
  {
    file: 'efficientdet_lite0.tflite',
    url: 'https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/int8/1/efficientdet_lite0.tflite',
  },
];

fs.mkdirSync(wasmOut, { recursive: true });
for (const f of ['vision_wasm_internal.js', 'vision_wasm_internal.wasm']) {
  const src = path.join(wasmSrc, f);
  if (!fs.existsSync(src)) {
    console.error(`missing ${src} - run npm ci first`);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(wasmOut, f));
}
console.log('copied MediaPipe wasm runtime');

for (const m of MODELS) {
  const dest = path.join(outDir, m.file);
  if (!fs.existsSync(dest)) {
    const res = await fetch(m.url);
    if (!res.ok) {
      console.error(`download failed ${m.url}: ${res.status}`);
      process.exit(1);
    }
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`downloaded ${m.file}`);
  }
  const sha = crypto.createHash('sha256').update(fs.readFileSync(dest)).digest('hex');
  console.log(`${m.file} ${(fs.statSync(dest).size / 1e6).toFixed(1)} MB sha256=${sha}`);
}

import fs from 'fs';
import path from 'path';

const baseFiguresDir = 'RK course notes/RedKross Academy Complete Cybersecurity Course Library/FIGURES/C02';
const destDir = 'public/assets/courses/cyber-02';

// 1. Process Module 8 specifically
const mod8Dir = path.join(baseFiguresDir, 'Module 8');
const mod8Files = ['C02-M08-F1', 'C02-M08-F2', 'C02-M08-F3'];

console.log('=== Processing Module 8 ===');
for (const base of mod8Files) {
  const pngSrc = path.join(mod8Dir, base + '.png');
  const pngDest = path.join(destDir, base + '.png');
  const svgDest = path.join(destDir, base + '.svg');

  if (fs.existsSync(pngSrc)) {
    fs.copyFileSync(pngSrc, pngDest);
    console.log(`Copied PNG: ${pngSrc} -> ${pngDest}`);

    const pngBuffer = fs.readFileSync(pngSrc);
    const b64 = pngBuffer.toString('base64');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1755 896" width="100%" height="100%">
  <image width="1755" height="896" xlink:href="data:image/png;base64,${b64}"/>
</svg>`;
    fs.writeFileSync(svgDest, svgContent, 'utf-8');
    console.log(`Generated high-res SVG replacement: ${svgDest} (${svgContent.length} bytes)`);
  } else {
    console.error(`Missing source: ${pngSrc}`);
  }
}

// 2. Also process all other modules in FIGURES/C02 to upgrade any remaining placeholder SVGs
console.log('\n=== Checking all modules in FIGURES/C02 ===');
for (let m = 1; m <= 8; m++) {
  const modDir = path.join(baseFiguresDir, `Module ${m}`);
  if (!fs.existsSync(modDir)) continue;

  for (let f = 1; f <= 3; f++) {
    const padM = String(m).padStart(2, '0');
    const base = `C02-M${padM}-F${f}`;
    const pngSrc = path.join(modDir, base + '.png');
    const pngDest = path.join(destDir, base + '.png');
    const svgDest = path.join(destDir, base + '.svg');

    if (fs.existsSync(pngSrc)) {
      fs.copyFileSync(pngSrc, pngDest);
      const pngBuffer = fs.readFileSync(pngSrc);
      const b64 = pngBuffer.toString('base64');
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1755 896" width="100%" height="100%">
  <image width="1755" height="896" xlink:href="data:image/png;base64,${b64}"/>
</svg>`;
      fs.writeFileSync(svgDest, svgContent, 'utf-8');
      console.log(`Updated ${base}.png and ${base}.svg`);
    }
  }
}

console.log('\nAll C02 module figures upgraded successfully!');

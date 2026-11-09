import fs from 'fs';
import readline from 'readline';

async function getStep(stepNum) {
  const fileStream = fs.createReadStream('C:/Users/athar/.gemini/antigravity/brain/98418f1c-549f-4008-8d03-5bc6d6ed02ef/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.includes(`"step_index": ${stepNum}`) || line.includes(`"step_index":${stepNum}`)) {
      const obj = JSON.parse(line);
      console.log('STEP', stepNum, ':\n', obj.content);
      break;
    }
  }
}
getStep(1929);

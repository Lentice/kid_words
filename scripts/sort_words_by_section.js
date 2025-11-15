const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/words.js');
let text = fs.readFileSync(filePath, 'utf8');

const startMarker = 'export const words = ';
const start = text.indexOf(startMarker);
if (start === -1) {
  console.error('Could not find start marker in words.js');
  process.exit(1);
}
const arrayStart = text.indexOf('[', start);
console.log('start at', start, 'arrayStart at', arrayStart);
if (arrayStart === -1) {
  console.error('Could not find opening [ for the array in words.js');
  process.exit(1);
}

// find matching closing bracket using a depth counter to be robust
let depth = 0;
let closingIndex = -1;
for (let i = arrayStart; i < text.length; i++) {
  const ch = text[i];
  if (ch === '[') depth++;
  else if (ch === ']') {
    depth--;
    if (depth === 0) {
      closingIndex = i;
      break;
    }
  }
}
console.log('computed closingIndex at', closingIndex);
if (closingIndex === -1) {
  console.error('Could not find matching closing ] for words array');
  process.exit(1);
}

const arrayText = text.slice(arrayStart, closingIndex + 1);
let arr;
try {
  arr = JSON.parse(arrayText);
} catch (err) {
  console.error('JSON.parse failed. Attempting to clean up trailing commas...');
  // Try to remove trailing commas between objects/arrays (best-effort)
  const cleaned = arrayText
    .replace(/,\s*\]/g, ']')
    .replace(/,\s*}/g, '}');
  try {
    arr = JSON.parse(cleaned);
  } catch (err2) {
    console.error('Second JSON.parse failed:', err2);
    process.exit(1);
  }
}

// keep original order index to ensure stable sort within section_id
arr = arr.map((o, i) => ({...o, _orig: i}));
arr.sort((a, b) => {
  if (a.section_id === b.section_id) return a._orig - b._orig;
  return a.section_id - b.section_id;
});

// renumber ids sequentially starting from 1
arr.forEach((o, i) => {
  o.id = i + 1;
  delete o._orig;
});

const newArrayText = JSON.stringify(arr, null, 2);
const before = text.slice(0, start);
const after = text.slice(closingIndex + 2);
const newFileText = before + startMarker + newArrayText + ';' + after;

fs.writeFileSync(filePath, newFileText, 'utf8');
console.log('Sorted and renumbered', arr.length, 'items in', filePath);

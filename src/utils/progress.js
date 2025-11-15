const KEY = 'kids-english-progress-v1'

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch { return {} }
}

function write(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch (error) {
    console.warn('Failed to save progress to localStorage:', error)
  }
}

export function getProgress() {
  const d = read()
  return {
    learnedIds: new Set(d.learnedIds || []),
    lastIndex: Number.isInteger(d.lastIndex) ? d.lastIndex : 0,
    selectedSectionIds: Array.isArray(d.selectedSectionIds) ? d.selectedSectionIds : [],
    range: d.range || { start: 0, end: null },
    wordSpeed: typeof d.wordSpeed === 'number' ? d.wordSpeed : 0.95,
    exampleSpeed: typeof d.exampleSpeed === 'number' ? d.exampleSpeed : 0.95
  }
}

export function saveProgress({ learnedIds, lastIndex, selectedSectionIds, range, wordSpeed, exampleSpeed }) {
  const data = read()
  if (learnedIds) data.learnedIds = Array.from(learnedIds)
  if (Number.isInteger(lastIndex)) data.lastIndex = lastIndex
  if (Array.isArray(selectedSectionIds)) data.selectedSectionIds = selectedSectionIds
  if (range) data.range = range
  if (typeof wordSpeed === 'number') data.wordSpeed = wordSpeed
  if (typeof exampleSpeed === 'number') data.exampleSpeed = exampleSpeed
  write(data)
}

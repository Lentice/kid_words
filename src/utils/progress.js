const KEY = 'kids-english-progress-v1'

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch { return {} }
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function getProgress() {
  const d = read()
  return {
    learnedIds: new Set(d.learnedIds || []),
    lastIndex: Number.isInteger(d.lastIndex) ? d.lastIndex : 0,
    selectedSectionIds: Array.isArray(d.selectedSectionIds) ? d.selectedSectionIds : [],
    range: d.range || { start: 0, end: null }
  }
}

export function saveProgress({ learnedIds, lastIndex, selectedSectionIds, range }) {
  const data = read()
  if (learnedIds) data.learnedIds = Array.from(learnedIds)
  if (Number.isInteger(lastIndex)) data.lastIndex = lastIndex
  if (Array.isArray(selectedSectionIds)) data.selectedSectionIds = selectedSectionIds
  if (range) data.range = range
  write(data)
}

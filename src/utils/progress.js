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
  }
}

export function saveProgress({ learnedIds, lastIndex }) {
  const data = read()
  if (learnedIds) data.learnedIds = Array.from(learnedIds)
  if (Number.isInteger(lastIndex)) data.lastIndex = lastIndex
  write(data)
}

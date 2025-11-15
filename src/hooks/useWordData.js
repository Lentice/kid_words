import { useMemo } from 'react'
import { words } from '../data/words.js'
import { sections } from '../data/sections.js'
import { partsOfSpeech as parts } from '../data/partsOfSpeech.js'

export function useWordData() {
  // Data is now imported directly, so no loading state needed
  const loading = false
  const error = null

  const sectionMap = useMemo(() => Object.fromEntries(sections.map(s => [s.id, s])), [sections])
  const posMap = useMemo(() => Object.fromEntries(parts.map(p => [p.id, p])), [parts])

  const bySections = (sectionIds) => {
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) return words
    const set = new Set(sectionIds)
    return words.filter(w => set.has(w.section_id))
  }

  return { words, sections, parts, sectionMap, posMap, bySections, loading, error }
}

export default useWordData

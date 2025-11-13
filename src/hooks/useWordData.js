import { useEffect, useMemo, useState } from 'react'

export function useWordData() {
  const [words, setWords] = useState([])
  const [sections, setSections] = useState([])
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const base = import.meta.env.BASE_URL
        const [w, s, p] = await Promise.all([
          fetch(`${base}data/words.json`).then(r => r.json()),
          fetch(`${base}data/sections.json`).then(r => r.json()),
          fetch(`${base}data/parts_of_speech.json`).then(r => r.json()),
        ])
        if (cancelled) return
        // basic normalization
        w.sort((a,b)=>a.id-b.id)
        s.sort((a,b)=>a.id-b.id)
        p.sort((a,b)=>a.id-b.id)
        setWords(w)
        setSections(s)
        setParts(p)
      } catch (e) {
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

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

import { create } from 'zustand'
import { getProgress, saveProgress } from '../utils/progress'

export const useLearnStore = create((set, get) => ({
  // State
  learnedIds: new Set(),
  sectionProgress: {}, // { sectionId: { learned: number, total: number, percentage: number } }
  exampleClickedId: null,
  isEditingProgress: false,
  progressInput: '',
  showSectionMenu: false,
  index: 0,

  // Actions
  setLearnedIds: (learnedIds) => set({ learnedIds }),
  setSectionProgress: (sectionProgress) => set({ sectionProgress }),
  setExampleClickedId: (exampleClickedId) => set({ exampleClickedId }),
  setProgressInput: (progressInput) => set({ progressInput }),
  setShowSectionMenu: (showSectionMenu) => set({ showSectionMenu }),
  setIndex: (index) => set({ index }),

  // Calculate section progress
  calculateSectionProgress: (sections, bySections, learnedIds) => {
    const sectionProgress = {}
    sections.forEach(section => {
      const sectionWords = bySections([section.id])
      const learnedCount = sectionWords.filter(w => learnedIds.has(w.id)).length
      const total = sectionWords.length
      const percentage = total > 0 ? Math.round((learnedCount / total) * 100) : 0
      sectionProgress[section.id] = { learned: learnedCount, total, percentage }
    })
    set({ sectionProgress })
  },

  // Calculate progress for a single section and update only that entry
  calculateSingleSectionProgress: (sectionId, bySections, learnedIds) => {
    if (!sectionId || !bySections) return
    const sectionWords = bySections([sectionId])
    const learnedCount = sectionWords.filter(w => learnedIds.has(w.id)).length
    const total = sectionWords.length
    const percentage = total > 0 ? Math.round((learnedCount / total) * 100) : 0
    set((state) => {
      const sp = { ...(state.sectionProgress || {}) }
      sp[sectionId] = { learned: learnedCount, total, percentage }
      return { sectionProgress: sp }
    })
  },

  initializeFromProgress: (words, sections, bySections) => {
    const saved = getProgress()
    const learnedIds = saved.learnedIds || new Set()

    // Find initial index from saved progress (lastWordId)
    let initialIndex = 0
    if (saved.lastWordId && words.length > 0) {
      const idx = words.findIndex(w => w.id === saved.lastWordId)
      initialIndex = idx >= 0 ? idx : 0
    }

    // Calculate initial section progress
    const sectionProgress = {}
    if (bySections) {
      sections.forEach(section => {
        const sectionWords = bySections([section.id])
        const learnedCount = sectionWords.filter(w => learnedIds.has(w.id)).length
        const total = sectionWords.length
        const percentage = total > 0 ? Math.round((learnedCount / total) * 100) : 0
        sectionProgress[section.id] = { learned: learnedCount, total, percentage }
      })
    }

    set({ learnedIds, sectionProgress, index: initialIndex })
  },

  handleSectionChange: (sectionId, words, getProgress) => {
    // When changing section, jump to the first word of that section
    // within the global `words` array (used by Learn.jsx).
    let newIndex = 0
    if (Array.isArray(words) && words.length > 0) {
      const idx = words.findIndex(w => w.section_id === sectionId)
      newIndex = idx >= 0 ? idx : 0
    }
    const firstWordId = words && words[newIndex]?.id ? words[newIndex].id : null
    if (firstWordId) saveProgress({ lastWordId: firstWordId })
    set({ index: newIndex })
  },

  onPrev: (words, current, bySections) => {
    if (!Array.isArray(words) || words.length === 0) return
    const ni = (get().index - 1 + words.length) % words.length
    const newWord = words[ni]
    set({ index: ni })
    if (newWord?.id) saveProgress({ lastWordId: newWord.id })
    const affectedSection = current?.section_id
    if (affectedSection && bySections) {
      const { learnedIds } = get()
      get().calculateSingleSectionProgress(affectedSection, bySections, learnedIds)
    }
  },

  onNext: (words, current, bySections) => {
    if (!Array.isArray(words) || words.length === 0) return
    const ni = (get().index + 1) % words.length
    const newWord = words[ni]
    set({ index: ni })
    if (newWord?.id) saveProgress({ lastWordId: newWord.id })
    const affectedSection = current?.section_id
    if (affectedSection && bySections) {
      const { learnedIds } = get()
      get().calculateSingleSectionProgress(affectedSection, bySections, learnedIds)
    }
  },

  toggleLearned: (current, sections, bySections) => {
    if (!current) return
    const id = current.id
    set((state) => {
      const next = new Set(state.learnedIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      saveProgress({ learnedIds: next })
      return { learnedIds: next }
    })
    // Update section progress (use current.section_id directly to avoid scanning)
    if (sections && bySections) {
      const { learnedIds } = get()
      if (current && current.section_id) {
        get().calculateSingleSectionProgress(current.section_id, bySections, learnedIds)
      }
    }
  },

  handleProgressClick: () => {
    set({ isEditingProgress: true, progressInput: '' })
  },

  handleProgressSubmit: (words) => {
    const { progressInput } = get()
    const num = parseInt(progressInput, 10)
    if (!isNaN(num) && num >= 1 && num <= words.length) {
      const newIndex = num - 1
      set({ index: newIndex, isEditingProgress: false })
      const wordId = words[newIndex]?.id
      if (wordId) saveProgress({ lastWordId: wordId })
    } else {
      set({ isEditingProgress: false })
    }
  },

  handleProgressKeyDown: (e, words) => {
    if (e.key === 'Enter') {
      get().handleProgressSubmit(words)
    } else if (e.key === 'Escape') {
      set({ isEditingProgress: false })
    }
  },

  onExampleClick: (current, sections, bySections) => {
    if (!current) return
    const id = current.id
    set({ exampleClickedId: id })
    // Auto mark as learned
    const wasAdded = !get().learnedIds.has(id)
    set((state) => {
      if (!state.learnedIds.has(id)) {
        const nextSet = new Set(state.learnedIds)
        nextSet.add(id)
        saveProgress({ learnedIds: nextSet })
        return { learnedIds: nextSet }
      }
      return state
    })
    // Update section progress if a new word was learned (use current.section_id when possible)
    if (wasAdded && sections && bySections) {
      const { learnedIds } = get()
      if (current && current.section_id) {
        get().calculateSingleSectionProgress(current.section_id, bySections, learnedIds)
      }
    }
  }
}))
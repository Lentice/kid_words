import { create } from 'zustand'
import { getProgress, saveProgress } from '../utils/progress'

export const useLearnStore = create((set, get) => ({
  // State
  selectedSection: null,
  learnedIds: new Set(),
  sectionProgress: {}, // { sectionId: { learned: number, total: number, percentage: number } }
  exampleClickedId: null,
  isEditingProgress: false,
  progressInput: '',
  showSectionMenu: false,
  index: 0,

  // Actions
  setSelectedSection: (selectedSection) => set({ selectedSection }),
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

  initializeFromProgress: (words, sections, bySections) => {
    const saved = getProgress()
    const learnedIds = saved.learnedIds || new Set()

    // Find initial section
    let initialSection = null
    if (saved.lastWordId && words.length > 0) {
      const lastWord = words.find(w => w.id === saved.lastWordId)
      initialSection = lastWord ? lastWord.section_id : (sections.length > 0 ? sections[0].id : null)
    } else {
      initialSection = sections.length > 0 ? sections[0].id : null
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

    set({ selectedSection: initialSection, learnedIds, sectionProgress })
  },

  handleSectionChange: (sectionId, filtered, getProgress) => {
    const saved = getProgress()
    let newIndex = 0
    if (saved.lastWordId && filtered.length > 0) {
      const idx = filtered.findIndex(w => w.id === saved.lastWordId)
      newIndex = idx >= 0 ? idx : 0
    }
    set({ selectedSection: sectionId, index: newIndex })
  },

  onPrev: (filtered) => {
    set((state) => {
      const ni = (state.index - 1 + filtered.length) % filtered.length
      const wordId = filtered[ni]?.id
      if (wordId) saveProgress({ lastWordId: wordId })
      return { index: ni }
    })
  },

  onNext: (words) => {
    set((state) => {
      const ni = (state.index + 1) % words.length
      const wordId = words[ni]?.id
      if (wordId) saveProgress({ lastWordId: wordId })
      return { index: ni }
    })
  },

  toggleLearned: (id, sections, bySections) => {
    set((state) => {
      const next = new Set(state.learnedIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      saveProgress({ learnedIds: next })
      return { learnedIds: next }
    })
    // Update section progress
    if (sections && bySections) {
      const { learnedIds } = get()
      get().calculateSectionProgress(sections, bySections, learnedIds)
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

  onExampleClick: (id, sections, bySections) => {
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
    // Update section progress if a new word was learned
    if (wasAdded && sections && bySections) {
      const { learnedIds } = get()
      get().calculateSectionProgress(sections, bySections, learnedIds)
    }
  }
}))
import { create } from 'zustand'
import { getProgress, saveProgress } from '../utils/progress'

export const useLearnStore = create((set, get) => ({
  // State
  selectedSection: null,
  learnedIds: new Set(),
  exampleClickedId: null,
  isEditingProgress: false,
  progressInput: '',
  showSectionMenu: false,
  index: 0,

  // Actions
  setSelectedSection: (selectedSection) => set({ selectedSection }),
  setLearnedIds: (learnedIds) => set({ learnedIds }),
  setExampleClickedId: (exampleClickedId) => set({ exampleClickedId }),
  setIsEditingProgress: (isEditingProgress) => set({ isEditingProgress }),
  setProgressInput: (progressInput) => set({ progressInput }),
  setShowSectionMenu: (showSectionMenu) => set({ showSectionMenu }),
  setIndex: (index) => set({ index }),

  initializeFromProgress: (words, sections) => {
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

    set({ selectedSection: initialSection, learnedIds })
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

  onNext: (filtered) => {
    set((state) => {
      const ni = (state.index + 1) % filtered.length
      const wordId = filtered[ni]?.id
      if (wordId) saveProgress({ lastWordId: wordId })
      return { index: ni }
    })
  },

  toggleLearned: (id) => {
    set((state) => {
      const next = new Set(state.learnedIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      saveProgress({ learnedIds: next })
      return { learnedIds: next }
    })
  },

  handleProgressClick: () => {
    set({ isEditingProgress: true, progressInput: '' })
  },

  handleProgressSubmit: (filtered) => {
    const { progressInput } = get()
    const num = parseInt(progressInput, 10)
    if (!isNaN(num) && num >= 1 && num <= filtered.length) {
      const newIndex = num - 1
      set({ index: newIndex, isEditingProgress: false })
      const wordId = filtered[newIndex]?.id
      if (wordId) saveProgress({ lastWordId: wordId })
    } else {
      set({ isEditingProgress: false })
    }
  },

  handleProgressKeyDown: (e, filtered) => {
    if (e.key === 'Enter') {
      get().handleProgressSubmit(filtered)
    } else if (e.key === 'Escape') {
      set({ isEditingProgress: false })
    }
  },

  onExampleClick: (id) => {
    set({ exampleClickedId: id })
    // Auto mark as learned
    set((state) => {
      if (!state.learnedIds.has(id)) {
        const nextSet = new Set(state.learnedIds)
        nextSet.add(id)
        saveProgress({ learnedIds: nextSet })
        return { learnedIds: nextSet }
      }
      return state
    })
  }
}))
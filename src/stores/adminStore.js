import { create } from 'zustand'
import { getProgress, saveProgress } from '../utils/progress'

export const useAdminStore = create((set, get) => ({
  // State
  selected: [],

  // Actions
  setSelected: (selected) => set({ selected }),

  initializeFromProgress: () => {
    // No initialization needed
  },

  clearAll: () => {
    saveProgress({ learnedIds: new Set(), lastIndex: 0 })
    alert('已清除所有學習記錄')
    location.reload()
  },

  clearSelectedSections: (filtered) => {
    const { selected } = get()
    if (selected.length === 0) return
    const prog = getProgress()
    const set = new Set(prog.learnedIds)
    for (const w of filtered) { set.delete(w.id) }
    saveProgress({ learnedIds: set })
    alert('已清除所選 Section 的學習記錄')
    location.reload()
  }
}))
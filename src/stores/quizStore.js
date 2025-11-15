import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const QUIZ_KEY = 'kids-english-quiz-v1'

const readQuizState = () => {
  try { return JSON.parse(localStorage.getItem(QUIZ_KEY)) || { wrongCounts: {} } } catch { return { wrongCounts: {} } }
}

const writeQuizState = (s) => localStorage.setItem(QUIZ_KEY, JSON.stringify(s))

function weightedPick(items, weights) {
  const total = weights.reduce((a, b) => a + b, 0)
  const r = Math.random() * (total || 1)
  let acc = 0
  for (let i = 0; i < items.length; i++) {
    acc += weights[i]
    if (r <= acc) return items[i]
  }
  return items[items.length - 1]
}

function sample(arr, k, avoidId) {
  const res = []
  const used = new Set([avoidId])
  while (res.length < k && used.size < arr.length) {
    const x = arr[Math.floor(Math.random() * arr.length)]
    if (used.has(x.id)) continue
    used.add(x.id)
    res.push(x)
  }
  return res
}

export const useQuizStore = create((set, get) => ({
  // Options state
  selected: [],
  filterMode: 'learned', // learned | sections
  mode: 'mixed', // en2zh | zh2en | audio | mixed
  answerType: 'mcq', // mcq | input

  // Quiz state
  started: false,
  q: null,
  dir: 'en2zh',
  options: [],
  answer: '',
  selectedOption: null,
  correct: null,
  count: 0,
  score: 0,
  answered: false,

  // Persistent quiz state
  quizState: readQuizState(),

  // Computed
  accuracy: () => {
    const { count, score } = get()
    return count ? Math.round(score * 100 / count) : 0
  },

  // Actions
  setSelected: (selected) => set({ selected }),
  setFilterMode: (filterMode) => set({ filterMode }),
  setMode: (mode) => set({ mode }),
  setAnswerType: (answerType) => set({ answerType }),

  setStarted: (started) => set({ started }),
  setQ: (q) => set({ q }),
  setDir: (dir) => set({ dir }),
  setOptions: (options) => set({ options }),
  setAnswer: (answer) => set({ answer }),
  setSelectedOption: (selectedOption) => set({ selectedOption }),
  setCorrect: (correct) => set({ correct }),
  setCount: (valueOrUpdater) => set(state => ({ count: typeof valueOrUpdater === 'function' ? valueOrUpdater(state.count) : valueOrUpdater })),
  setScore: (valueOrUpdater) => set(state => ({ score: typeof valueOrUpdater === 'function' ? valueOrUpdater(state.score) : valueOrUpdater })),
  setAnswered: (answered) => set({ answered }),

  updateQuizState: (updater) => {
    const newState = updater(get().quizState)
    set({ quizState: newState })
    writeQuizState(newState)
  },

  makeQuestion: (pool, speakWithConfig) => {
    const { mode, answerType, quizState, setQ, setDir, setAnswer, setSelectedOption, setCorrect, setOptions, setAnswered } = get()
    if (pool.length === 0) { setQ(null); return }

    const weights = pool.map(w => (quizState.wrongCounts[w.id] || 0) + 1)
    const item = weightedPick(pool, weights)
    let direction = mode
    if (mode === 'mixed') {
      const dirs = ['en2zh', 'zh2en', 'audio']
      direction = dirs[Math.floor(Math.random() * dirs.length)]
    }
    setQ(item)
    setDir(direction)
    setAnswer('')
    setSelectedOption(null)
    setCorrect(null)
    setAnswered(false)

    if (answerType === 'mcq') {
      const distractors = sample(pool, 3, item.id)
      let opts
      if (direction === 'zh2en') {
        opts = [item.word, ...distractors.map(d => d.word)]
      } else {
        opts = [item.meaning_cht, ...distractors.map(d => d.meaning_cht)]
      }
      // shuffle
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]
      }
      setOptions(opts)
    } else {
      setOptions([])
    }

    if (direction === 'audio') {
      setTimeout(() => speakWithConfig(item.word), 50)
    }
  },

  startQuiz: () => {
    const { setStarted, makeQuestion } = get()
    setStarted(true)
    // makeQuestion will be called after setting pool
  },

  endQuiz: () => {
    const { setStarted, setQ, setCount, setScore, setCorrect, setAnswer, setSelectedOption, setAnswered } = get()
    setStarted(false)
    setQ(null)
    setCount(0)
    setScore(0)
    setCorrect(null)
    setAnswer('')
    setSelectedOption(null)
    setAnswered(false)
  },

  checkAnswer: () => {
    const { q, dir, answer, setCorrect, setCount, setScore, updateQuizState, answered, setAnswered } = get()
    if (!q || answered) return
    const normalize = (s) => s.trim().toLowerCase()
    const user = normalize(answer)
    const target = normalize(dir === 'zh2en' ? q.word : q.meaning_cht)
    const ok = user === target
    setCorrect(ok)
    setCount(prev => prev + 1)
    setAnswered(true)
    if (ok) {
      setScore(prev => prev + 1)
    }
    updateQuizState(cur => {
      if (!ok) {
        cur.wrongCounts[q.id] = (cur.wrongCounts[q.id] || 0) + 1
      } else if (cur.wrongCounts[q.id] > 0) {
        cur.wrongCounts[q.id] -= 1
      }
      return cur
    })
  },

  replayAudio: (speakWithConfig) => {
    const { dir, q } = get()
    if (dir === 'audio' && q) speakWithConfig(q.word)
  },

  selectOption: (opt, target) => {
    const { setSelectedOption, setCorrect, setCount, setScore, updateQuizState, q, answered, setAnswered } = get()
    setSelectedOption(opt)
    const ok = opt === target
    if (!answered) {
      // first attempt: count increases and answered is locked
      setCount(prev => prev + 1)
      setAnswered(true)
      if (ok) {
        setCorrect(true)
        setScore(prev => prev + 1)
        updateQuizState(cur => {
          if (cur.wrongCounts[q.id] > 0) cur.wrongCounts[q.id] -= 1
          return cur
        })
      } else {
        setCorrect(false)
        updateQuizState(cur => {
          cur.wrongCounts[q.id] = (cur.wrongCounts[q.id] || 0) + 1
          return cur
        })
      }
    } else {
      // already answered: only update visual correctness, do not change score/count
      setCorrect(ok)
    }
    return ok
  }
}))
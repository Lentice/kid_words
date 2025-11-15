import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useWordData from '../hooks/useWordData'
import QuizOptions from '../components/QuizOptions'
import QuizContent from '../components/QuizContent'
import { getProgress } from '../utils/progress'
import { speak } from '../utils/speech'

function speakWithConfig(text) {
  const { wordSpeed } = getProgress()
  speak(text, { rate: wordSpeed })
}

const QUIZ_KEY = 'kids-english-quiz-v1'
const readQuizState = () => {
  try { return JSON.parse(localStorage.getItem(QUIZ_KEY)) || { wrongCounts:{} } } catch { return { wrongCounts:{} } }
}
const writeQuizState = (s) => localStorage.setItem(QUIZ_KEY, JSON.stringify(s))

function weightedPick(items, weights){
  const total = weights.reduce((a,b)=>a+b,0)
  const r = Math.random()* (total || 1)
  let acc = 0
  for (let i=0;i<items.length;i++){
    acc += weights[i]
    if (r <= acc) return items[i]
  }
  return items[items.length-1]
}

function sample(arr, k, avoidId){
  const res = []
  const used = new Set([avoidId])
  while (res.length < k && used.size < arr.length){
    const x = arr[Math.floor(Math.random()*arr.length)]
    if (used.has(x.id)) continue
    used.add(x.id)
    res.push(x)
  }
  return res
}

export default function Quiz(){
  const { words, sections, bySections, loading, error } = useWordData()
  const learned = getProgress().learnedIds
  const [selected, setSelected] = useState([])
  const [filterMode, setFilterMode] = useState('learned') // learned | sections
  const [mode, setMode] = useState('mixed') // en2zh | zh2en | audio | mixed
  const [answerType, setAnswerType] = useState('mcq') // mcq | input

  // 根據單字長度動態調整字體大小
  const getWordFontSize = (word) => {
    const len = word.length
    if (len <= 8) return '44px'
    if (len <= 12) return '36px'
    if (len <= 16) return '30px'
    return '24px'
  }
  const pool = useMemo(()=>{
    if (filterMode === 'learned') {
      return words.filter(w=>learned.has(w.id))
    }
    // filterMode === 'sections'
    return selected.length === 0 ? words : bySections(selected)
  },[filterMode, selected, bySections, words, learned])

  const qs = useRef(readQuizState())
  const [started, setStarted] = useState(false)
  const [q, setQ] = useState(null)
  const [dir, setDir] = useState('en2zh')
  const [options, setOptions] = useState([]) // for mcq
  const [answer, setAnswer] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [correct, setCorrect] = useState(null)
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)

  const accuracy = count ? Math.round(score*100/count) : 0

  const makeQuestion = useCallback(() => {
    if (pool.length === 0){ setQ(null); return }
    // weighted random by wrongCounts + 1
    const weights = pool.map(w => (qs.current.wrongCounts[w.id] || 0) + 1)
    const item = weightedPick(pool, weights)
    let direction = mode
    if (mode === 'mixed'){
      const dirs = ['en2zh','zh2en','audio']
      direction = dirs[Math.floor(Math.random()*dirs.length)]
    }
    setQ(item)
    setDir(direction)
    setAnswer('')
    setSelectedOption(null)
    setCorrect(null)

    if (answerType === 'mcq'){
      // generate 4 options
      const distractors = sample(pool, 3, item.id)
      let opts
      if (direction === 'zh2en'){
        opts = [item.word, ...distractors.map(d=>d.word)]
      } else { // en2zh or audio
        opts = [item.meaning_cht, ...distractors.map(d=>d.meaning_cht)]
      }
      // shuffle
      for (let i=opts.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1)); [opts[i], opts[j]] = [opts[j], opts[i]]
      }
      setOptions(opts)
    } else {
      setOptions([])
    }

    if (direction === 'audio'){
      setTimeout(()=>speakWithConfig(item.word), 50)
    }
  }, [pool, mode, answerType])

  const start = () => { setStarted(true); makeQuestion() }

  const endQuiz = () => {
    setStarted(false)
    setQ(null)
    setCount(0)
    setScore(0)
    setCorrect(null)
    setAnswer('')
    setSelectedOption(null)
  }

  const normalize = (s) => s.trim().toLowerCase()
  const check = (e) => {
    if (e) e.preventDefault()
    if (!q) return
    const user = normalize(answer)
    const target = normalize(dir==='zh2en' ? q.word : q.meaning_cht)
    const ok = user === target
    setCorrect(ok)
    setCount(c=>c+1)
    if (ok) {
      setScore(s=>s+1)
    }
    // update weights
    const cur = qs.current
    if (!ok){ cur.wrongCounts[q.id] = (cur.wrongCounts[q.id]||0) + 1 }
    else if (cur.wrongCounts[q.id] > 0){ cur.wrongCounts[q.id] -= 1 }
    writeQuizState(cur)
  }

  const next = () => makeQuestion()
  const replayAudio = () => { if (dir==='audio' && q) speakWithConfig(q.word) }

  useEffect(()=>{ if (started) makeQuestion() }, [filterMode, selected, mode, answerType])

  if (loading) return <div>載入中…</div>
  if (error) return <div>載入資料時發生錯誤</div>

  return (
    <div className="stack" style={{gap:16,maxWidth:900,width:'100%'}}>
      {!started && (
        <QuizOptions
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          selected={selected}
          setSelected={setSelected}
          sections={sections}
          mode={mode}
          setMode={setMode}
          answerType={answerType}
          setAnswerType={setAnswerType}
          pool={pool}
          start={start}
        />
      )}

      <QuizContent
        started={started}
        accuracy={accuracy}
        score={score}
        count={count}
        endQuiz={endQuiz}
        dir={dir}
        q={q}
        getWordFontSize={getWordFontSize}
        replayAudio={replayAudio}
        options={options}
        selectedOption={selectedOption}
        correct={correct}
        setSelectedOption={setSelectedOption}
        setCorrect={setCorrect}
        setCount={setCount}
        setScore={setScore}
        makeQuestion={makeQuestion}
        writeQuizState={writeQuizState}
        qs={qs}
        answerType={answerType}
        answer={answer}
        setAnswer={setAnswer}
        check={check}
        next={next}
      />
    </div>
  )
}

import React, { useEffect, useMemo, useRef, useState } from 'react'
import useWordData from '../hooks/useWordData'
import SectionPicker from '../components/SectionPicker'
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
  const rawPool = useMemo(()=>{
    if (filterMode === 'learned') {
      return words.filter(w=>learned.has(w.id))
    }
    // filterMode === 'sections'
    return selected.length === 0 ? words : bySections(selected)
  },[filterMode, selected, bySections, words, learned])
  const pool = rawPool

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

  const makeQuestion = () => {
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
  }

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
    let ok = false
    if (answerType === 'mcq'){
      const target = (dir==='zh2en') ? q.word : q.meaning_cht
      ok = selectedOption === target
    } else {
      const user = normalize(answer)
      const target = normalize(dir==='zh2en' ? q.word : q.meaning_cht)
      ok = user === target
    }
    setCorrect(ok)
    setCount(c=>c+1)
    if (ok) setScore(s=>s+1)
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
        <div className="panel stack" style={{gap:20}}>
          <div className="stack" style={{gap:12}}>
            <div style={{fontSize:'15px', fontWeight:'500', color:'#555'}}>📚 選擇題庫</div>
            <div className="row" style={{flexWrap:'wrap', gap:16, alignItems:'center'}}>
              <label className="row" style={{gap:8, cursor:'pointer', padding:'6px 12px', background: filterMode==='learned' ? '#E3F2FD' : 'transparent', borderRadius:'8px', transition:'background 0.2s'}}>
                <input type="radio" name="filter" checked={filterMode==='learned'} onChange={()=>setFilterMode('learned')} /> 
                只出已學過
              </label>
              <label className="row" style={{gap:8, cursor:'pointer', padding:'6px 12px', background: filterMode==='sections' ? '#E3F2FD' : 'transparent', borderRadius:'8px', transition:'background 0.2s'}}>
                <input type="radio" name="filter" checked={filterMode==='sections'} onChange={()=>setFilterMode('sections')} /> 
                指定主題
              </label>
              {filterMode === 'sections' && (
                <select value={selected[0]||''} onChange={e=>setSelected(e.target.value ? [e.target.value] : [])} style={{flex:'1', minWidth:'180px', maxWidth:'300px'}}>
                  <option value="">全部主題</option>
                  {sections.map(s => (
                    <option key={s.id} value={s.id}>{s.number}. {s.name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div style={{height:'1px', background:'#f0f0f0'}}></div>

          <div className="stack" style={{gap:16, alignItems:'center'}}>
            <div className="row" style={{gap:16, flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
              <label className="row" style={{gap:8, alignItems:'center'}}>
                <span style={{color:'#666', fontSize:'14px'}}>題型</span>
                <select value={mode} onChange={e=>setMode(e.target.value)}>
                  <option value="mixed">混合</option>
                  <option value="en2zh">英 ➜ 中</option>
                  <option value="zh2en">中 ➜ 英</option>
                  <option value="audio">聽音辨義</option>
                </select>
              </label>
              <label className="row" style={{gap:8, alignItems:'center'}}>
                <span style={{color:'#666', fontSize:'14px'}}>作答</span>
                <select value={answerType} onChange={e=>setAnswerType(e.target.value)}>
                  <option value="mcq">選擇題</option>
                  <option value="input">填空題</option>
                </select>
              </label>
            </div>
            <button className="btn" onClick={start} disabled={pool.length===0} style={{padding:'10px 24px', marginTop:'8px', marginBottom:'8px'}}>
              開始測驗 ({pool.length} 題)
            </button>
          </div>
        </div>
      )}

      {started && (
        <div className="panel row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <span className="progress">正確率 {accuracy}%（{score}/{count}）</span>
          <button className="btn secondary" onClick={endQuiz}>結束測驗</button>
        </div>
      )}

      {started && q && (
        <div className="card quiz-card">
          <div className="row" style={{justifyContent:'space-between'}}>
            <span className="chip">{dir==='audio' ? '聽音 ➜ 中' : (dir==='en2zh' ? '英 ➜ 中' : '中 ➜ 英')}</span>
          </div>
          <div className="question" style={{marginTop:8, marginBottom:12}}>
            {dir==='en2zh' ? q.word : dir==='zh2en' ? q.meaning_cht : '請聽音選擇中文意思'}
          </div>

          {dir==='audio' && (
            <div className="row" style={{marginBottom:8}}>
              <button className="btn accent" type="button" onClick={replayAudio}>🔊 再播一次</button>
            </div>
          )}

          {answerType === 'mcq' ? (
            <div className="stack" style={{gap:10}}>
              <div className="row" style={{flexWrap:'wrap', gap:8}}>
                {options.map(opt => (
                  <button key={opt} className={`btn ${selectedOption===opt? 'secondary':''}`} onClick={()=>setSelectedOption(opt)} type="button" style={{minWidth:120}}>
                    {opt}
                  </button>
                ))}
              </div>
              <div className="row" style={{gap:8}}>
                <button className="btn" onClick={check}>送出</button>
                <button className="btn secondary" type="button" onClick={next}>跳過/下一題</button>
              </div>
            </div>
          ) : (
            <form onSubmit={check} className="stack" style={{gap:12}}>
              <input
                autoFocus
                value={answer}
                onChange={e=>setAnswer(e.target.value)}
                placeholder={dir==='zh2en' ? '請輸入英文單字' : '請輸入中文意思'}
              />
              <div className="row" style={{gap:8}}>
                <button className="btn" type="submit">送出</button>
                <button type="button" className="btn secondary" onClick={next}>跳過/下一題</button>
              </div>
            </form>
          )}

          {correct != null && (
            <div style={{marginTop:10}}>
              {correct ? (
                <span className="badge">答對了！</span>
              ) : (
                <span className="badge error">再試試看～ 正解：{dir==='zh2en' ? q.word : q.meaning_cht}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

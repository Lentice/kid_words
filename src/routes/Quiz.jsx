import React, { useMemo, useState } from 'react'
import useWordData from '../hooks/useWordData'
import SectionPicker from '../components/SectionPicker'

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)] }

export default function Quiz(){
  const { words, sections, bySections, loading, error } = useWordData()
  const [selected, setSelected] = useState([])
  const pool = useMemo(()=>bySections(selected),[bySections, selected, words])

  const [started, setStarted] = useState(false)
  const [q, setQ] = useState(null)
  const [dir, setDir] = useState('en2zh')
  const [answer, setAnswer] = useState('')
  const [correct, setCorrect] = useState(null)
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)

  const makeQuestion = () => {
    const item = pickRandom(pool)
    const direction = Math.random()<0.5 ? 'en2zh' : 'zh2en'
    setQ(item)
    setDir(direction)
    setAnswer('')
    setCorrect(null)
  }

  const start = () => { setStarted(true); makeQuestion() }

  const check = (e) => {
    e.preventDefault()
    if (!q) return
    const user = answer.trim().toLowerCase()
    const target = (dir==='en2zh' ? q.meaning_cht : q.word).trim().toLowerCase()
    const ok = user === target
    setCorrect(ok)
    setCount(c=>c+1)
    if (ok) setScore(s=>s+1)
  }

  const next = () => makeQuestion()

  if (loading) return <div>載入中…</div>
  if (error) return <div>載入資料時發生錯誤</div>

  return (
    <div className="stack" style={{gap:16,maxWidth:900,width:'100%'}}>
      <SectionPicker sections={sections} selectedIds={selected} onChange={setSelected} />

      {!started ? (
        <div className="panel row" style={{justifyContent:'space-between'}}>
          <div>題庫：{pool.length} 題</div>
          <button className="btn" onClick={start} disabled={pool.length===0}>開始測驗</button>
        </div>
      ) : (
        <div className="card quiz-card">
          <div className="row" style={{justifyContent:'space-between'}}>
            <span className="chip">{dir==='en2zh' ? '英 ➜ 中' : '中 ➜ 英'}</span>
            <span className="progress">分數 {score} / {count}</span>
          </div>
          <div className="question" style={{marginTop:8, marginBottom:12}}>
            {dir==='en2zh' ? q.word : q.meaning_cht}
          </div>
          <form onSubmit={check} className="stack" style={{gap:12}}>
            <input
              autoFocus
              value={answer}
              onChange={e=>setAnswer(e.target.value)}
              placeholder={dir==='en2zh' ? '請輸入中文意思' : '請輸入英文單字'}
            />
            <div className="row" style={{gap:8}}>
              <button className="btn" type="submit">送出</button>
              <button type="button" className="btn secondary" onClick={next}>跳過/下一題</button>
            </div>
          </form>
          {correct != null && (
            <div style={{marginTop:10}}>
              {correct ? (
                <span className="badge">答對了！</span>
              ) : (
                <span className="badge error">再試試看～ 正解：{dir==='en2zh' ? q.meaning_cht : q.word}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

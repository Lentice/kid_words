import React from 'react'
import { speak, googleTTS } from '../utils/speech'
import { getProgress } from '../utils/progress'

export default function Flashcard({ item, learned, onPrev, onNext, onToggleLearned }){
  if (!item) return null
  const { wordSpeed, exampleSpeed } = getProgress()
  const speakWord = () => speak(item.word, { rate: wordSpeed })
  const speakExample = () => googleTTS(item.example_en, { rate: exampleSpeed })

  return (
    <div className="card">
        {/* word row with speak button (left) and learned toggle aligned right */}
        <h2 className="word">
        <span onClick={speakWord} title="點擊聽發音">
            {item.word}
        </span>
        <button
          className={`learn-toggle ${learned ? 'on' : ''}`}
          aria-pressed={learned}
          aria-label={learned ? '取消已學' : '標記已學'}
          title={learned ? '取消已學' : '標記已學'}
          onClick={onToggleLearned}
        >
          {learned ? '✅' : '⬜'}
        </button>
      </h2>
      <p className="meaning">{item.meaning_cht}</p>
      <div className="examples" onClick={speakExample} title="點擊聽例句">
        <div className="en">{item.example_en}</div>
        <div className="zh">{item.example_cht}</div>
      </div>
      <div className="controls">
        <button className="btn secondary" onClick={onPrev}>上一個</button>
        <button className="btn" onClick={onNext}>下一個</button>
      </div>
    </div>
  )
}

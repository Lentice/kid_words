import { useState } from 'react'
import { speak, googleTTS } from '../utils/speech'
import { getProgress } from '../utils/progress'

export default function Flashcard({ item, learned, onPrev, onNext, onToggleLearned, onExampleClick }){
  if (!item) return null
  const { wordSpeed, exampleSpeed } = getProgress()
  const [isPlayingExample, setIsPlayingExample] = useState(false)
  
  const speakWord = () => speak(item.word, { rate: wordSpeed })
  const speakExample = () => {
    if (isPlayingExample) return
    setIsPlayingExample(true)
    googleTTS(item.example_en, { rate: exampleSpeed })
      .then(() => {
        setIsPlayingExample(false)
        if (onExampleClick) onExampleClick()
      })
      .catch(() => {
        setIsPlayingExample(false)
      })
  }

  // 根據單字長度動態調整字體大小
  const getWordFontSize = () => {
    const len = item.word.length
    if (len <= 8) return '44px'
    if (len <= 12) return '36px'
    if (len <= 16) return '30px'
    return '24px'
  }

  return (
    <div className="card-wrapper">
      <button
        className={`learn-toggle floating ${learned ? 'on' : ''}`}
        aria-pressed={learned}
        aria-label={learned ? '取消已學' : '標記已學'}
        title={learned ? '取消已學' : '標記已學'}
        onClick={onToggleLearned}
      >
        {learned ? '★' : '☆'}
      </button>
      <div className="card">
        <h2 className="word word-center" style={{ fontSize: getWordFontSize(), lineHeight: '44px' }}>
          <span onClick={speakWord} title="點擊聽發音">
            {item.word}
          </span>
        </h2>
        <p className="meaning">{item.meaning_cht}</p>
      <div className="examples" onClick={speakExample} title="點擊聽例句">
        <div className="en">{item.example_en}</div>
        <div className="zh">{item.example_cht}</div>
      </div>
      <div className="controls">
        <button className="btn secondary" onClick={onPrev}>&lt; 上一個</button>
        <button className="btn" onClick={onNext}>下一個 &gt;</button>
      </div>
      </div>
    </div>
  )
}

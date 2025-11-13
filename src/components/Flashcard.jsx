import React from 'react'
import { speak, googleTTSUrl } from '../utils/speech'

export default function Flashcard({ item, section, pos, learned, onPrev, onNext }){
  if (!item) return null
  const speakWord = () => speak(item.word)
  const ttsLink = googleTTSUrl(item.word)

  return (
    <div className="card">
      <div className="card-header">
        <span className="chip">{section ? `${section.number}. ${section.name}` : 'Section'}</span>
        <span className="progress">{pos}</span>
      </div>
      <h2 className="word">{item.word} {learned ? '✅' : ''}</h2>
      <p className="meaning">{item.meaning_cht}</p>
      <div className="examples">
        <div className="en">{item.example_en}</div>
        <div className="zh">{item.example_cht}</div>
      </div>
      <div className="controls">
        <button className="btn secondary" onClick={onPrev}>上一個</button>
        <button className="btn" onClick={onNext}>下一個</button>
        <button className="btn accent" onClick={speakWord}>發音</button>
        <a className="btn ghost" href={ttsLink} target="_blank" rel="noreferrer">Google TTS</a>
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import useWordData from '../hooks/useWordData'
import QuizOptions from '../components/QuizOptions'
import QuizContent from '../components/QuizContent'
import { getProgress } from '../utils/progress'
import { speak, googleTTS } from '../utils/speech'
import { useQuizStore } from '../stores/quizStore'

function speakWord(text) {
  const { wordSpeed } = getProgress()
  speak(text, { rate: wordSpeed })
}

function speakSentence(text) {
  const { exampleSpeed } = getProgress()
  googleTTS(text, { lang: 'en', rate: exampleSpeed })
}

export default function Quiz(){
  const { words, sections, bySections, loading, error } = useWordData()
  const learned = getProgress().learnedIds
  const {
    selected, setSelected,
    filterMode, setFilterMode,
    mode, setMode,
    answerType, setAnswerType,
    started,
    q,
    dir,
    options,
    answer, setAnswer,
    selectedOption, setSelectedOption,
    correct, setCorrect,
    count,
    score,
    accuracy,
    makeQuestion,
    startQuiz,
    endQuiz: endQuizStore,
    checkAnswer,
    replayAudio: replayAudioStore,
    selectOption
  } = useQuizStore()

  // 根據單字長度動態調整字體大小
  // 如果 word 有中文字，中文字一個字視為 2 個英文字符長度
  const getWordFontSize = (word = '') => {
    const cjkRe = /[\u3400-\u4DBF\u4E00-\u9FFF]/
    let effectiveLen = 0
    for (const ch of word) {
      effectiveLen += cjkRe.test(ch) ? 2 : 1
    }

    if (effectiveLen <= 8) return '44px'
    if (effectiveLen <= 12) return '36px'
    if (effectiveLen <= 16) return '30px'
    return '24px'
  }
  const pool = useMemo(()=>{
    if (filterMode === 'learned') {
      return words.filter(w=>learned.has(w.id))
    }
    // filterMode === 'sections'
    return selected.length === 0 ? words : bySections(selected)
  },[filterMode, selected, bySections, words, learned])

  const start = () => { startQuiz(); makeQuestion(pool, words) }

  const endQuiz = () => endQuizStore()

  const check = (e) => {
    if (e) e.preventDefault()
    checkAnswer()
  }

  const next = () => makeQuestion(pool, words)
  const replayAudio = () => replayAudioStore(speakWord, speakSentence)

  useEffect(()=>{ if (started) makeQuestion(pool, words) }, [filterMode, selected, mode, answerType])

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
        accuracy={accuracy()}
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
        makeQuestion={() => makeQuestion(pool, words)}
        answerType={answerType}
        answer={answer}
        setAnswer={setAnswer}
        check={check}
        next={next}
        selectOption={selectOption}
        target={q ? ((dir === 'zh2en' || dir === 'sentence') ? q.word : q.meaning_cht) : ''}
      />
    </div>
  )
}

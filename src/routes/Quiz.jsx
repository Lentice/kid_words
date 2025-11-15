import { useEffect, useMemo, useState } from 'react'
import useWordData from '../hooks/useWordData'
import QuizOptions from '../components/QuizOptions'
import QuizContent from '../components/QuizContent'
import { getProgress } from '../utils/progress'
import { speak } from '../utils/speech'
import { useQuizStore } from '../stores/quizStore'

function speakWithConfig(text) {
  const { wordSpeed } = getProgress()
  speak(text, { rate: wordSpeed })
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

  const start = () => { startQuiz(); makeQuestion(pool, speakWithConfig) }

  const endQuiz = () => endQuizStore()

  const check = (e) => {
    if (e) e.preventDefault()
    checkAnswer()
  }

  const next = () => makeQuestion(pool, speakWithConfig)
  const replayAudio = () => replayAudioStore(speakWithConfig)

  useEffect(()=>{ if (started) makeQuestion(pool, speakWithConfig) }, [filterMode, selected, mode, answerType])

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
        makeQuestion={() => makeQuestion(pool, speakWithConfig)}
        answerType={answerType}
        answer={answer}
        setAnswer={setAnswer}
        check={check}
        next={next}
        selectOption={selectOption}
        target={q ? (dir === 'zh2en' ? q.word : q.meaning_cht) : ''}
      />
    </div>
  )
}

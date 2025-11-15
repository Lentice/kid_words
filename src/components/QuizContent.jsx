import React from 'react';
import QuizCard from './QuizCard';

export default function QuizContent({
  started,
  accuracy,
  score,
  count,
  endQuiz,
  dir,
  q,
  getWordFontSize,
  replayAudio,
  options,
  selectedOption,
  correct,
  setSelectedOption,
  setCorrect,
  setCount,
  setScore,
  makeQuestion,
  writeQuizState,
  qs,
  answerType,
  answer,
  setAnswer,
  check,
  next
}) {
  return (
    <>
      {started && (
        <div className="panel row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <span className="progress">正確率 {accuracy}%（{score}/{count}）</span>
          <button className="btn secondary" onClick={endQuiz}>結束測驗</button>
        </div>
      )}

      {started && q && (
        <QuizCard
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
      )}
    </>
  );
}
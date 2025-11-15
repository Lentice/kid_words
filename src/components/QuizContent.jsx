
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
  makeQuestion,
  answerType,
  answer,
  setAnswer,
  check,
  next,
  selectOption,
  target
}) {
  if (!q) return null;
  return (
    <>
      {started && (
        <div className="panel row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <span className="progress">正確率 {accuracy}%（{score}/{count}）</span>
          <button className="btn secondary" onClick={endQuiz}>結束測驗</button>
        </div>
      )}

      {started && q && (
        <div className="card quiz-card">
          <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
            <span className="chip">{dir==='audio' ? '聽音 ➜ 中' : (dir==='en2zh' ? '英 ➜ 中' : '中 ➜ 英')}</span>
            {dir === 'audio' && (
              <div style={{fontSize:'14px', color:'#555'}}>
                請聽音選擇中文意思
              </div>
            )}
          </div>
          {dir === 'audio' ? (
            <div className="stack" style={{alignItems:'center', marginTop:6, marginBottom:6}}>
              <button 
                className="btn accent" 
                type="button" 
                onClick={replayAudio}
                style={{
                  fontSize: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                🔊
              </button>
            </div>
          ) : (
            <div className="question" style={{
              marginTop:8, 
              marginBottom:12, 
              textAlign:'center',
              fontSize: getWordFontSize(dir==='en2zh' ? q.word : q.meaning_cht),
              lineHeight: '44px'
            }}>
              {dir==='en2zh' ? q.word : q.meaning_cht}
            </div>
          )}

          {answerType === 'choice' ? (
            <div className="stack" style={{gap:10}}>
              {options.map(opt => {
                const isCorrectAnswer = opt === target;
                const isSelected = selectedOption === opt;
                const showWrong = isSelected && correct === false;
                const showCorrect = isSelected && correct === true;
                
                return (
                  <button 
                    key={opt} 
                    onClick={()=>{
                      if (showWrong) {
                        setCorrect(null);
                        setSelectedOption(null);
                        return;
                      }
                      
                      const isCorrect = selectOption(opt, target);
                      if (isCorrect) {
                        setTimeout(() => makeQuestion(), 300);
                      }
                    }} 
                    type="button" 
                    style={{
                      padding: '12px 20px',
                      paddingRight: showWrong ? '40px' : '20px',
                      border: `1.5px solid ${showWrong ? '#ffb3ba' : showCorrect ? '#4CAF50' : '#d0d0d0'}`,
                      borderRadius: '8px',
                      background: showWrong ? '#fff5f5' : showCorrect ? '#e8f5e9' : 'transparent',
                      cursor: 'pointer',
                      fontSize: '18px',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (!showWrong && !showCorrect) {
                        e.target.style.borderColor = '#4A90E2';
                        e.target.style.background = '#f8f9fa';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!showWrong && !showCorrect) {
                        e.target.style.borderColor = '#d0d0d0';
                        e.target.style.background = 'transparent';
                      }
                    }}
                  >
                    {opt}
                    {showWrong && <span style={{position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', color: '#ff6b6b'}}>✗</span>}
                  </button>
                );
              })}
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

          {correct != null && answerType === 'input' && (
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
    </>
  );
}
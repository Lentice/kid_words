
import { useEffect, useState } from 'react';
import { onPlayingChange } from '../utils/speech';

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
  const [isPlaying, setIsPlaying] = useState(false);

  // 註冊播放狀態監聽
  useEffect(() => {
    onPlayingChange(setIsPlaying);
    return () => onPlayingChange(null);
  }, []);

  // 當題目是 audio 或 sentence 時自動播放一次
  useEffect(() => {
    if (q && (dir === 'audio' || dir === 'sentence' || dir === 'en2zh')) {
      replayAudio();
    }
  }, [q, dir]);

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
        <div className="card quiz-card" style={{display: 'flex', flexDirection: 'column'}}>
          <div>
            <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
              <span className="chip">{dir==='sentence' ? '例句聽力' : (dir==='audio' ? '聽音 ➜ 中' : (dir==='en2zh' ? '英 ➜ 中' : '中 ➜ 英'))}</span>
              {dir === 'audio' && (
                <div style={{fontSize:'14px', color:'#555'}}>
                  請聽音選擇中文意思
                </div>
              )}
              {dir === 'sentence' && (
                <div style={{fontSize:'14px', color:'#555'}}>
                  請聽例句並選出出現過的單字
                </div>
              )}
            </div>
            {(dir === 'audio' || dir === 'sentence') ? (
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
                    borderRadius: '10%',
                    boxShadow: 'none',
                    opacity: isPlaying ? 0.6 : 1,
                    transform: isPlaying ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    animation: isPlaying ? 'pulse 1s infinite' : 'none',
                  }}
                >
                  🔊
                </button>
                <style>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                  }
                `}</style>
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
          </div>

          {answerType === 'choice' ? (
            <div className="stack" style={{gap:10, marginTop: 'auto'}}>
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
                      fontSize: dir === 'en2zh' ? '22px' : '24px',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      position: 'relative',
                      color:'#212121', 
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
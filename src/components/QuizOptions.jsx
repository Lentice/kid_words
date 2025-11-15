import React from 'react';

export default function QuizOptions({ filterMode, setFilterMode, selected, setSelected, sections, mode, setMode, answerType, setAnswerType, pool, start }) {
  return (
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
            <select value={selected[0]||''} onChange={e=>setSelected(e.target.value ? [e.target.value] : [])} style={{flex:'1', minWidth:'180px', maxWidth:'300px', marginLeft: 'auto', marginRight: 'auto'}}>
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
  );
}
import React, { useState, useMemo } from 'react'

export default function SectionPicker({ sections, selectedId, onChange }){
  const select = (id) => {
    onChange(id)
  }

  const [open, setOpen] = useState(false)
  const currentSection = useMemo(() => {
    return sections.find(s => s.id === selectedId)
  }, [sections, selectedId])

  const summary = currentSection ? `${currentSection.number}. ${currentSection.name}` : '請選擇'

  return (
    <div className="panel">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div className="row" style={{gap:8, alignItems:'center'}}>
          <strong>學習主題 Section</strong>
          <span className="muted">{summary}</span>
        </div>
        <div className="row" style={{gap:8}}>
          <button className="btn" onClick={()=>setOpen(o=>!o)}>{open ? '收合' : '切換…'}</button>
        </div>
      </div>
      {open && (
        <div className="section-list" style={{marginTop:8}}>
          {sections.map(s => (
            <label key={s.id} className="section-item">
              <input type="radio" name="section" checked={selectedId === s.id} onChange={()=>select(s.id)} />
              <span>{s.number}. {s.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

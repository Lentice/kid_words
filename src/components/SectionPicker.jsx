import React from 'react'

export default function SectionPicker({ sections, selectedIds, onChange }){
  const toggle = (id) => {
    const has = selectedIds.includes(id)
    const next = has ? selectedIds.filter(x=>x!==id) : [...selectedIds, id]
    onChange(next)
  }
  const allSelected = selectedIds.length === 0 || selectedIds.length === sections.length
  const selectAll = () => onChange([]) // empty means all

  return (
    <div className="panel">
      <div className="row" style={{justifyContent:'space-between'}}>
        <strong>選擇學習主題 Section</strong>
        <button className="btn ghost" onClick={selectAll}>{allSelected ? '全部已選' : '選擇全部'}</button>
      </div>
      <div className="section-list" style={{marginTop:8}}>
        {sections.map(s => (
          <label key={s.id} className="section-item">
            <input type="checkbox" checked={selectedIds.length===0 ? true : selectedIds.includes(s.id)} onChange={()=>toggle(s.id)} />
            <span>{s.number}. {s.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

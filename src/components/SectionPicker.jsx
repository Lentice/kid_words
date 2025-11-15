import { useState, useMemo } from 'react'

export default function SectionPicker({ sections, selectedId, selectedIds, onChange }){
  // Support both single and multi-select modes
  const isMulti = selectedIds !== undefined
  
  const select = (id) => {
    if (isMulti) {
      // Multi-select: toggle selection
      const newSelected = selectedIds.includes(id)
        ? selectedIds.filter(x => x !== id)
        : [...selectedIds, id]
      onChange(newSelected)
    } else {
      // Single select
      onChange(id)
    }
  }

  const [open, setOpen] = useState(false)
  
  const summary = useMemo(() => {
    if (isMulti) {
      if (selectedIds.length === 0) return '請選擇（可多選）'
      if (selectedIds.length === sections.length) return '全部主題'
      const names = selectedIds.map(id => {
        const s = sections.find(x => x.id === id)
        return s ? s.number : ''
      }).filter(Boolean)
      return `已選 ${names.length} 個：${names.join(', ')}`
    } else {
      const currentSection = sections.find(s => s.id === selectedId)
      return currentSection ? `${currentSection.number}. ${currentSection.name}` : '請選擇'
    }
  }, [sections, selectedId, selectedIds, isMulti])

  const toggleAll = () => {
    if (selectedIds.length === sections.length) {
      // 取消全選
      onChange([])
    } else {
      // 全選
      onChange(sections.map(s => s.id))
    }
  }

  return (
    <div className="panel">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div className="row" style={{gap:8, alignItems:'center'}}>
          <strong>學習主題 Section</strong>
          <span className="muted">{summary}</span>
        </div>
        <div className="row" style={{gap:8}}>
          {isMulti && (
            <button className="btn secondary" onClick={toggleAll}>
              {selectedIds.length === sections.length ? '取消全選' : '全選'}
            </button>
          )}
          <button className="btn" onClick={()=>setOpen(o=>!o)}>{open ? '收合' : '切換…'}</button>
        </div>
      </div>
      {open && (
        <div className="section-list" style={{marginTop:8}}>
          {sections.map(s => (
            <label key={s.id} className="section-item">
              {isMulti ? (
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(s.id)} 
                  onChange={()=>select(s.id)} 
                />
              ) : (
                <input 
                  type="radio" 
                  name="section" 
                  checked={selectedId === s.id} 
                  onChange={()=>select(s.id)} 
                />
              )}
              <span>{s.number}. {s.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

import React, { useEffect, useMemo, useState } from 'react'
import useWordData from '../hooks/useWordData'
import Flashcard from '../components/Flashcard'
import SectionPicker from '../components/SectionPicker'
import { getProgress, saveProgress } from '../utils/progress'

export default function Learn(){
  const { words, sections, sectionMap, bySections, loading, error } = useWordData()
  const saved = useMemo(()=>getProgress(),[])
  
  // 根據最後學習的單字 ID 找到對應的類別
  const initialSection = useMemo(() => {
    if (saved.lastWordId && words.length > 0) {
      const lastWord = words.find(w => w.id === saved.lastWordId)
      return lastWord ? lastWord.section_id : (sections.length > 0 ? sections[0].id : null)
    }
    return sections.length > 0 ? sections[0].id : null
  }, [saved.lastWordId, words, sections])

  const [selectedSection, setSelectedSection] = useState(initialSection)
  const [learnedIds, setLearnedIds] = useState(saved.learnedIds || new Set())
  const [exampleClickedId, setExampleClickedId] = useState(null)
  const [isEditingProgress, setIsEditingProgress] = useState(false)
  const [progressInput, setProgressInput] = useState('')
  const [showSectionMenu, setShowSectionMenu] = useState(false)

  const filtered = useMemo(()=>{
    if (!selectedSection) return []
    const list = bySections([selectedSection])
    return list
  },[bySections, selectedSection, words])

  // 根據最後學習的單字 ID 找到在當前類別中的索引
  const initialIndex = useMemo(() => {
    if (saved.lastWordId && filtered.length > 0) {
      const idx = filtered.findIndex(w => w.id === saved.lastWordId)
      return idx >= 0 ? idx : 0
    }
    return 0
  }, [saved.lastWordId, filtered])

  const [index, setIndex] = useState(initialIndex)

  useEffect(()=>{
    // if current index exceeds filtered length, reset to 0
    if (index >= filtered.length) setIndex(0)
  },[filtered.length])

  const handleSectionChange = (sectionId) => {
    setSelectedSection(sectionId)
    setIndex(0)
  }

  const current = filtered[index] || null
  const pos = `${index+1} / ${filtered.length}`

  useEffect(()=>{
    setExampleClickedId(null)
  },[current?.id])

  useEffect(()=>{
    if (exampleClickedId !== null){
      setLearnedIds(prev => {
        if (!prev.has(exampleClickedId)) {
          const nextSet = new Set(prev)
          nextSet.add(exampleClickedId)
          saveProgress({ learnedIds: nextSet })
          return nextSet
        }
        return prev
      })
    }
  },[exampleClickedId])

  const onPrev = () => {
    setIndex(i=>{
      const ni = (i-1+filtered.length)%filtered.length
      const wordId = filtered[ni]?.id
      if (wordId) saveProgress({ lastWordId: wordId })
      return ni
    })
  }
  const onNext = () => {
    setIndex(i=>{
      const ni = (i+1)%filtered.length
      const wordId = filtered[ni]?.id
      if (wordId) saveProgress({ lastWordId: wordId })
      return ni
    })
  }

  const toggleLearned = (id) => {
    const next = new Set(learnedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setLearnedIds(next)
    saveProgress({ learnedIds: next })
  }

  const handleProgressClick = () => {
    setIsEditingProgress(true)
    setProgressInput('')
  }

  const handleProgressSubmit = () => {
    const num = parseInt(progressInput, 10)
    if (!isNaN(num) && num >= 1 && num <= filtered.length) {
      const newIndex = num - 1
      setIndex(newIndex)
      const wordId = filtered[newIndex]?.id
      if (wordId) saveProgress({ lastWordId: wordId })
    }
    setIsEditingProgress(false)
  }

  const handleProgressKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleProgressSubmit()
    } else if (e.key === 'Escape') {
      setIsEditingProgress(false)
    }
  }

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSectionMenu && !e.target.closest('.chip')) {
        setShowSectionMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showSectionMenu])

  if (loading) return <div>載入中…</div>
  if (error) return <div>載入資料時發生錯誤</div>
  if (!filtered.length) return (
    <div className="stack" style={{maxWidth:900,width:'100%'}}>
      <SectionPicker sections={sections} selectedId={selectedSection} onChange={handleSectionChange} />
      <div className="panel">沒有符合的單字</div>
    </div>
  )

  return (
    <div className="stack" style={{gap:16,maxWidth:900,width:'100%'}}>
      <div className="card-header" style={{marginBottom:-8}}>
        <div style={{position: 'relative'}}>
          <span 
            className="chip" 
            onClick={() => setShowSectionMenu(!showSectionMenu)}
            style={{cursor: 'pointer', userSelect: 'none'}}
            title="點擊選擇類別"
          >
            {sectionMap[current.section_id] ? `${sectionMap[current.section_id].number}. ${sectionMap[current.section_id].name}` : 'Section'}
          </span>
          {showSectionMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '4px',
                background: 'white',
                border: '2px solid #4A90E2',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                minWidth: '200px',
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              {sections.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    handleSectionChange(s.id)
                    setShowSectionMenu(false)
                  }}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    background: s.id === selectedSection ? '#E3F2FD' : 'white',
                    fontWeight: s.id === selectedSection ? 'bold' : 'normal',
                    borderBottom: '1px solid #eee'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#F5F5F5'}
                  onMouseLeave={(e) => e.target.style.background = s.id === selectedSection ? '#E3F2FD' : 'white'}
                >
                  {s.number}. {s.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {isEditingProgress ? (
          <input
            type="number"
            value={progressInput}
            onChange={(e) => setProgressInput(e.target.value)}
            onBlur={handleProgressSubmit}
            onKeyDown={handleProgressKeyDown}
            autoFocus
            min="1"
            max={filtered.length}
            style={{
              width: '80px',
              padding: '4px 8px',
              fontSize: '14px',
              textAlign: 'center',
              border: '2px solid #4A90E2',
              borderRadius: '8px'
            }}
          />
        ) : (
          <span 
            className="progress" 
            onClick={handleProgressClick}
            style={{cursor: 'pointer', userSelect: 'none'}}
            title="點擊跳轉到指定單字"
          >
            {pos}
          </span>
        )}
      </div>
      <Flashcard
        item={current}
        learned={learnedIds.has(current.id)}
        onPrev={onPrev}
        onNext={onNext}
        onToggleLearned={()=>toggleLearned(current.id)}
        onExampleClick={()=>setExampleClickedId(current.id)}
      />
      <div className="row" style={{justifyContent:'space-between'}}>
        <div className="progress">已學會:{learnedIds.size} / {words.length}</div>
        <div className="progress">
          例句 {exampleClickedId === current?.id ? '✅' : '❌'}
        </div>
      </div>
    </div>
  )
}

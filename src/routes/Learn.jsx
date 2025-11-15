import { useEffect, useMemo } from 'react'
import useWordData from '../hooks/useWordData'
import Flashcard from '../components/Flashcard'
import SectionPicker from '../components/SectionPicker'
import { getProgress } from '../utils/progress'
import { useLearnStore } from '../stores/learnStore'

export default function Learn(){
  const { words, sections, sectionMap, bySections, loading, error } = useWordData()
  const {
    learnedIds,
    sectionProgress,
    exampleClickedId,
    isEditingProgress,
    progressInput,
    showSectionMenu,
    index,
    setExampleClickedId,
    setProgressInput,
    setShowSectionMenu,
    setIndex,
    initializeFromProgress,
    handleSectionChange,
    onPrev,
    onNext,
    toggleLearned,
    handleProgressClick,
    handleProgressSubmit,
    handleProgressKeyDown,
    onExampleClick
  } = useLearnStore()

  // Initialize from progress on mount
  useEffect(() => {
    if (words.length > 0 && sections.length > 0) {
      initializeFromProgress(words, sections, bySections)
    }
  }, [words.length, sections.length]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=>{
    // if current index exceeds words length, reset to 0
    if (index >= words.length) setIndex(0)
  },[words.length, setIndex])

  const current = words[index] || null
  const pos = `${index+1} / ${words.length}`

  // Derive selectedSection from the currently shown word
  const section_id = current?.section_id ?? (sections[0]?.id ?? null)
  const currentSection = section_id ? sectionMap[section_id] : null

  useEffect(()=>{
    setExampleClickedId(null)
  },[current?.id, setExampleClickedId])

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSectionMenu && !e.target.closest('.chip')) {
        setShowSectionMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showSectionMenu, setShowSectionMenu])

  if (loading) return <div>載入中…</div>
  if (error) return <div>載入資料時發生錯誤</div>
  if (!words.length) return (
    <div className="stack" style={{maxWidth:900,width:'100%'}}>
      <SectionPicker sections={sections} selectedId={section_id} onChange={handleSectionChange} />
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
            {currentSection ? (
              <>
                {currentSection.number}. {currentSection.name}
                <span style={{fontWeight: 'bold', color: '#4A90E2', marginLeft: '12px'}}>{(sectionProgress[section_id]?.percentage || 0)}%</span>
              </>
            ) : 'Section'}
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
              {sections.map(s => {
                const progress = sectionProgress[s.id] || { percentage: 0 }
                
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      handleSectionChange(s.id, words, getProgress)
                      setShowSectionMenu(false)
                    }}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      background: s.id === section_id ? '#E3F2FD' : 'white',
                      fontWeight: s.id === section_id ? 'bold' : 'normal',
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#F5F5F5'}
                    onMouseLeave={(e) => e.target.style.background = s.id === section_id ? '#E3F2FD' : 'white'}
                  >
                    <span>{s.number}. {s.name}</span>
                    <span style={{fontWeight: 'bold', color: '#4A90E2', marginLeft: '16px'}}>{progress.percentage}%</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        {isEditingProgress ? (
          <input
            type="number"
            value={progressInput}
            onChange={(e) => setProgressInput(e.target.value)}
            onBlur={() => handleProgressSubmit(words)}
            onKeyDown={(e) => handleProgressKeyDown(e, words)}
            autoFocus
            min="1"
            max={words.length}
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
        onPrev={() => onPrev(words, current, bySections)}
        onNext={() => onNext(words, current, bySections)}
        onToggleLearned={()=>toggleLearned(current, sections, bySections)}
        onExampleClick={()=>onExampleClick(current, sections, bySections)}
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

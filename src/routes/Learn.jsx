import React, { useEffect, useMemo, useState } from 'react'
import useWordData from '../hooks/useWordData'
import Flashcard from '../components/Flashcard'
import SectionPicker from '../components/SectionPicker'
import { getProgress, saveProgress } from '../utils/progress'

export default function Learn(){
  const { words, sections, sectionMap, bySections, loading, error } = useWordData()
  const saved = useMemo(()=>getProgress(),[])
  const [selected, setSelected] = useState(saved.selectedSectionIds || [])
  const [index, setIndex] = useState(saved.lastIndex || 0)
  const [learnedIds, setLearnedIds] = useState(saved.learnedIds || new Set())
  const [dwellReady, setDwellReady] = useState(false)
  const [exampleClicked, setExampleClicked] = useState(false)

  const filtered = useMemo(()=>{
    const list = bySections(selected)
    return list
  },[bySections, selected, words])

  useEffect(()=>{
    // if current index exceeds filtered length, reset to 0
    if (index >= filtered.length) setIndex(0)
  },[filtered.length])

  useEffect(()=>{
    saveProgress({ selectedSectionIds: selected })
  },[selected])

  const current = filtered[index] || null
  const pos = `${index+1} / ${filtered.length}`

  useEffect(()=>{
    setDwellReady(false)
    setExampleClicked(false)
    if (!current) return
    const t = setTimeout(()=>setDwellReady(true), 5000)
    return ()=>clearTimeout(t)
  },[current?.id])

  useEffect(()=>{
    if (current && dwellReady && exampleClicked && !learnedIds.has(current.id)){
      const nextSet = new Set(learnedIds)
      nextSet.add(current.id)
      setLearnedIds(nextSet)
      saveProgress({ learnedIds: nextSet })
    }
  },[current?.id, dwellReady, exampleClicked])

  const onPrev = () => {
    setIndex(i=>{
      const ni = (i-1+filtered.length)%filtered.length
      saveProgress({ lastIndex: ni })
      return ni
    })
  }
  const onNext = () => {
    setIndex(i=>{
      const ni = (i+1)%filtered.length
      saveProgress({ lastIndex: ni })
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

  if (loading) return <div>載入中…</div>
  if (error) return <div>載入資料時發生錯誤</div>
  if (!filtered.length) return (
    <div className="stack" style={{maxWidth:900,width:'100%'}}>
      <SectionPicker sections={sections} selectedIds={selected} onChange={setSelected} />
      <div className="panel">沒有符合的單字</div>
    </div>
  )

  return (
    <div className="stack" style={{gap:16,maxWidth:900,width:'100%'}}>
      <SectionPicker sections={sections} selectedIds={selected} onChange={setSelected} />
      <div className="card-header" style={{marginBottom:-8}}>
        <span className="chip">{sectionMap[current.section_id] ? `${sectionMap[current.section_id].number}. ${sectionMap[current.section_id].name}` : 'Section'}</span>
        <span className="progress">{pos}</span>
      </div>
      <Flashcard
        item={current}
        learned={learnedIds.has(current.id)}
        onPrev={onPrev}
        onNext={onNext}
        onToggleLearned={()=>toggleLearned(current.id)}
        onExampleClick={()=>setExampleClicked(true)}
      />
      <div className="row" style={{justifyContent:'space-between'}}>
        <div className="progress">已學會:{learnedIds.size} / {words.length}</div>
        <div className="progress">
          停留 {dwellReady ? '✅' : '⏱️'} | 例句 {exampleClicked ? '✅' : '❌'}
        </div>
      </div>
    </div>
  )
}

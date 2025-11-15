import React, { useEffect, useMemo } from 'react'
import useWordData from '../hooks/useWordData'
import SectionPicker from '../components/SectionPicker'
import { getProgress } from '../utils/progress'
import { useAdminStore } from '../stores/adminStore'

export default function Admin(){
  const { words, sections, loading, error, bySections } = useWordData()
  const prog = getProgress()
  const learnedIds = prog.learnedIds
  const learnedCount = learnedIds.size
  const total = words.length

  const {
    selected,
    setSelected,
    initializeFromProgress,
    clearAll,
    clearSelectedSections
  } = useAdminStore()

  useEffect(() => {
    initializeFromProgress()
  }, [initializeFromProgress])

  const filtered = useMemo(()=>bySections(selected),[bySections, selected, words])

  if (loading) return <div>載入中…</div>
  if (error) return <div>載入資料時發生錯誤</div>

  return (
    <div className="stack" style={{gap:16,maxWidth:900,width:'100%'}}>
      <div className="panel row" style={{justifyContent:'space-between'}}>
        <div>
          <strong>統計</strong>
          <div className="row" style={{gap:16, marginTop:6}}>
            <span className="chip">總單字：{total}</span>
            <span className="chip">已學：{learnedCount}</span>
            <span className="chip">完成率：{total? Math.round(learnedCount*100/total) : 0}%</span>
          </div>
        </div>
        <div className="row" style={{gap:8}}>
          <button className="btn ghost" onClick={clearAll}>清除全部記錄</button>
        </div>
      </div>

      <SectionPicker sections={sections} selectedIds={selected} onChange={setSelected} />
      <div className="panel row" style={{justifyContent:'space-between'}}>
        <div>所選 Section 單字數：{filtered.length}</div>
        <button className="btn secondary" onClick={() => clearSelectedSections(filtered)} disabled={selected.length===0}>清除所選 Section 記錄</button>
      </div>
    </div>
  )
}

import { useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import SidePanel from './components/SidePanel.jsx'
import MainPanel from './components/MainPanel.jsx'
import { calculateVDrop } from './utils/calculateVDrop.js'
import { calculateSC } from './utils/calculateSC.js'

let nextId = 1

export default function App() {
  const [activeTab, setActiveTab] = useState('vdrop')

  const [vdValues, setVdValues] = useState({
    phaseType: 3, distance: '', current: '', r: '', x: '', sysVoltage: '',
  })
  const [vdResult, setVdResult] = useState(null)

  const [scValues, setScValues] = useState({
    kva: '', vll: '', pctZ: '', zFactor: 0.9, unit: 'ft',
  })
  const [segments, setSegments] = useState([
    { id: 0, len: '', c: '', n: 1, conduitType: 'steel' },
  ])
  const [scResult, setScResult] = useState(null)

  const handleVdCalculate = useCallback(() => {
    const { phaseType, distance, current, r, x, sysVoltage } = vdValues
    if (!distance || !current || !r || !x || !sysVoltage) return
    const result = calculateVDrop({
      phaseType: Number(phaseType), distance: Number(distance),
      current: Number(current), r: Number(r), x: Number(x),
      sysVoltage: Number(sysVoltage),
    })
    setVdResult(result)
  }, [vdValues])

  const handleScCalculate = useCallback(() => {
    const { kva, vll, pctZ, zFactor, unit } = scValues
    if (!kva || !vll || !pctZ) return
    const result = calculateSC({
      kva: Number(kva), vll: Number(vll), pctZ: Number(pctZ),
      zFactor: Number(zFactor),
      segments: segments.map(s => ({
        len: s.len ? Number(s.len) : 0,
        c: s.c ? Number(s.c) : 0,
        n: s.n || 1,
        conduitType: s.conduitType || 'steel',
        unit,
      })),
    })
    if (result) setScResult(result)
  }, [scValues, segments])

  const addSegment = useCallback(() => {
    setSegments(prev => [...prev, { id: nextId++, len: '', c: '', n: 1, conduitType: 'steel' }])
  }, [])

  const removeSegment = useCallback((id) => {
    setSegments(prev => prev.filter(s => s.id !== id))
  }, [])

  const updateSegment = useCallback((id, field, value) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }, [])

  const handleVdChange = useCallback((field, value) => {
    setVdValues(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleScChange = useCallback((field, value) => {
    setScValues(prev => ({ ...prev, [field]: value }))
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a2a] flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} hasResult={!!(vdResult || scResult)} />

      <div className="flex-1 flex max-w-[1400px] mx-auto w-full px-6 gap-0 pt-5 pb-6">
        <SidePanel
          activeTab={activeTab}
          vdValues={vdValues}
          onVdChange={handleVdChange}
          onVdCalculate={handleVdCalculate}
          scValues={scValues}
          onScChange={handleScChange}
          segments={segments}
          onSegmentUpdate={updateSegment}
          onSegmentAdd={addSegment}
          onSegmentRemove={removeSegment}
          onScCalculate={handleScCalculate}
        />

        <MainPanel
          activeTab={activeTab}
          vdResult={vdResult}
          scResult={scResult}
          vdValues={vdValues}
          segments={segments}
        />
      </div>

      <footer className="text-center text-xs text-[#555577] italic border-t border-[#2a2a45] py-3 px-4 mt-auto opacity-70 select-none">
        Disclaimer: This tool is for informational purposes only. Always verify results with a licensed professional before making electrical decisions. No liability for errors or misuse.
      </footer>
    </div>
  )
}

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header.jsx'
import SidePanel from './components/SidePanel.jsx'
import MainPanel from './components/MainPanel.jsx'
import Dashboard from './components/Dashboard.jsx'
import Disclaimer from './components/Disclaimer.jsx'
import { calculateVDrop } from './utils/calculateVDrop.js'
import { calculateSC } from './utils/calculateSC.js'

let nextId = 1

export default function App() {
  const [view, setView] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const [vdValues, setVdValues] = useState({
    phaseType: 3, distance: '', current: '', r: '', x: '', sysVoltage: '',
  })
  const [vdResult, setVdResult] = useState(null)

  const [scValues, setScValues] = useState({
    kva: '', vll: '', pctZ: '', zFactor: 0.9, unit: 'ft', phaseType: 3,
  })
  const [segments, setSegments] = useState([
    { id: 0, len: '', c: '', n: 1, conduitType: 'steel' },
  ])
  const [scResult, setScResult] = useState(null)

  const navigate = useCallback((target) => {
    setView(target)
    setSearchQuery('')
  }, [])

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
    const { kva, vll, pctZ, zFactor, unit, phaseType } = scValues
    if (!kva || !vll || !pctZ) return
    const result = calculateSC({
      kva: Number(kva), vll: Number(vll), pctZ: Number(pctZ),
      zFactor: Number(zFactor), phaseType: Number(phaseType),
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

  const activeTab = view === 'vdrop' ? 'vdrop' : 'shortcircuit'

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Header view={view} onNavigate={navigate} onSearch={setSearchQuery} />

      <AnimatePresence mode="wait">
        {view === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex"
          >
            <Dashboard onNavigate={navigate} searchQuery={searchQuery} />
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex max-w-[1400px] mx-auto w-full px-6 gap-0 pt-5 pb-6"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      <Disclaimer />
    </div>
  )
}

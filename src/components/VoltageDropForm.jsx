import { useState, useEffect, useRef } from 'react'
import { Calculator, ChevronDown } from 'lucide-react'
import { PEC_RX } from '../data/pecRxValues.js'

function DropdownPortal({ children, parentRef, open }) {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 200 })

  useEffect(() => {
    if (open && parentRef.current) {
      const r = parentRef.current.getBoundingClientRect()
      setPos({ top: r.bottom + 4, left: r.left, width: r.width })
    }
  }, [open, parentRef])

  if (!open) return null
  return (
    <div
      style={{ position: 'fixed', top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
      className="bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden"
    >
      {children}
    </div>
  )
}

function RxCombobox({ value, onUpdate, options, param }) {
  const [open, setOpen] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const match = options.find(([, r, x]) => param === 'r' ? r === value : x === value)
    if (match) {
      const val = param === 'r' ? match[1] : match[2]
      setDisplayText(`${match[0]} — ${val.toFixed(3)}`)
    } else if (value || value === 0) {
      setDisplayText(String(value))
    } else {
      setDisplayText('')
    }
  }, [value, options, param])

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = options.filter(([name, r, x]) => {
    if (!displayText) return true
    const q = displayText.toLowerCase()
    const val = param === 'r' ? r : x
    return name.toLowerCase().includes(q) || String(val).includes(q)
  })

  return (
    <div ref={ref}>
      <div className="relative">
        <input
          type="text"
          value={displayText}
          onChange={e => {
            setDisplayText(e.target.value)
            const num = e.target.value.replace(/[^0-9.]/g, '')
            onUpdate(param, num ? Number(num) : '')
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Type or select..."
          className="input-field pr-7"
        />
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
      <DropdownPortal parentRef={ref} open={open && filtered.length > 0}>
        <div className="max-h-44 overflow-y-auto">
          <div className="py-0.5 px-2 text-[0.55rem] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            {filtered.length} match{filtered.length !== 1 ? 'es' : ''}
          </div>
          {filtered.map(([name, r, x]) => {
            const val = param === 'r' ? r : x
            return (
              <div
                key={name}
                onMouseDown={() => {
                  setDisplayText(`${name} — ${val.toFixed(3)}`)
                  onUpdate(param, val)
                  setOpen(false)
                }}
                className={`px-3 py-1.5 text-[0.7rem] font-mono cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors flex justify-between items-center ${
                  val === value ? 'bg-primary/5 text-primary' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="font-semibold">{name}</span>
                <span className="text-slate-400 dark:text-slate-500">{val.toFixed(3)}</span>
              </div>
            )
          })}
        </div>
      </DropdownPortal>
    </div>
  )
}

function ConduitSelector({ value, onUpdate }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const options = [
    { value: 'steel', label: 'Steel' },
    { value: 'nonmagnetic', label: 'Non Magnetic' },
  ]
  const current = options.find(o => o.value === value) || options[0]

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref}>
      <div className="relative">
        <input
          type="text"
          value={current.label}
          onFocus={() => setOpen(true)}
          onChange={() => {}}
          placeholder="Select conduit..."
          className="input-field cursor-pointer select-none pr-7"
          readOnly
        />
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
      <DropdownPortal parentRef={ref} open={open}>
        {options.map(opt => (
          <div
            key={opt.value}
            onMouseDown={() => {
              onUpdate('conduitType', opt.value)
              onUpdate('r', '')
              onUpdate('x', '')
              setOpen(false)
            }}
            className={`px-3 py-2 text-[0.7rem] font-sans cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors ${
              opt.value === value ? 'bg-primary/5 text-primary font-semibold' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {opt.label}
          </div>
        ))}
      </DropdownPortal>
    </div>
  )
}

export default function VoltageDropForm({ values, onChange, onCalculate }) {
  const rows = PEC_RX[values.conduitType || 'steel']

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded bg-primary/10 border border-primary/25 flex items-center justify-center">
          <Calculator size={12} className="text-primary" />
        </div>
        <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-100 tracking-wide uppercase">Voltage Drop Inputs</h3>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        <div className="col-span-1">
          <label className="label-sm block mb-1">Phase Type</label>
          <select
            value={values.phaseType}
            onChange={e => onChange('phaseType', e.target.value)}
            className="input-field select-arrow cursor-pointer"
          >
            <option value={1}>1-Phase</option>
            <option value={3}>3-Phase</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">Conduit</label>
          <ConduitSelector
            value={values.conduitType || 'steel'}
            onUpdate={onChange}
          />
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">Distance D (m)</label>
          <input
            type="number"
            value={values.distance}
            onChange={e => onChange('distance', e.target.value)}
            placeholder="0"
            className="input-field"
          />
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">Current I (A)</label>
          <input
            type="number"
            value={values.current}
            onChange={e => onChange('current', e.target.value)}
            placeholder="0"
            className="input-field"
          />
        </div>

        <div className="col-span-2">
          <label className="label-sm block mb-1">Voltage (V)</label>
          <input
            type="number"
            value={values.sysVoltage}
            onChange={e => onChange('sysVoltage', e.target.value)}
            placeholder="230"
            className="input-field"
          />
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">R (Ω/305m)</label>
          <RxCombobox
            value={values.r}
            onUpdate={onChange}
            options={rows}
            param="r"
          />
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">X (Ω/305m)</label>
          <RxCombobox
            value={values.x}
            onUpdate={onChange}
            options={rows}
            param="x"
          />
        </div>
      </div>

      <button
        onClick={onCalculate}
        className="btn-primary w-full mt-2"
      >
        <span>Calculate</span>
      </button>
    </div>
  )
}

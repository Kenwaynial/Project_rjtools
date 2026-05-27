import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { C_VALUES } from '../data/cValues.js'

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

function ConduitCombobox({ value, onUpdate }) {
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

function CValueCombobox({ value, options, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const match = options.find(([, v]) => v === value)
    if (match) {
      setDisplayText(`${match[0]} — ${match[1].toLocaleString()}`)
    } else if (value || value === 0) {
      setDisplayText(String(value))
    } else {
      setDisplayText('')
    }
  }, [value, options])

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = options.filter(([name, val]) => {
    if (!displayText) return true
    const q = displayText.toLowerCase()
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
            onUpdate('c', num ? Number(num) : '')
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
          {filtered.map(([name, val]) => (
            <div
              key={name}
              onMouseDown={() => {
                setDisplayText(`${name} — ${val.toLocaleString()}`)
                onUpdate('c', val)
                setOpen(false)
              }}
              className={`px-3 py-1.5 text-[0.7rem] font-mono cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors flex justify-between items-center ${
                val === value ? 'bg-primary/5 text-primary' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <span className="font-semibold">{name}</span>
              <span className="text-slate-400 dark:text-slate-500">{val.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </DropdownPortal>
    </div>
  )
}

export default function SegmentCard({ index, segment, onUpdate, onRemove, canRemove }) {
  const sizes = Object.entries(C_VALUES[segment.conduitType || 'steel'])

  return (
    <div className="bg-white dark:bg-[#0f1629] border border-slate-200/80 dark:border-slate-800/80 rounded-lg p-3 hover:border-primary/30 transition-all duration-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.6rem] font-bold text-primary uppercase tracking-wider">Fault {index + 2}</span>
        {canRemove && (
          <button onClick={onRemove} className="text-[0.55rem] font-semibold text-red-500/70 hover:text-red-400 transition-colors uppercase tracking-wider">
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2.5">
        <div className="col-span-2">
          <label className="label-sm block mb-0.5">Length</label>
          <input
            type="number"
            value={segment.len}
            onChange={e => onUpdate('len', e.target.value)}
            placeholder="0"
            className="input-field"
          />
        </div>
        <div className="col-span-1">
          <label className="label-sm block mb-0.5">Parallels</label>
          <input
            type="number"
            value={segment.n}
            onChange={e => onUpdate('n', e.target.value)}
            min="1"
            placeholder="1"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label-sm block mb-0.5">Conduit</label>
          <ConduitCombobox
            value={segment.conduitType || 'steel'}
            onUpdate={onUpdate}
          />
        </div>
        <div>
          <label className="label-sm block mb-0.5">C Value</label>
          <CValueCombobox
            value={segment.c}
            options={sizes}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </div>
  )
}

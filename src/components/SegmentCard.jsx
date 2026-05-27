import { C_VALUES } from '../data/cValues.js'

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
          <select
            value={segment.conduitType || 'steel'}
            onChange={e => onUpdate('conduitType', e.target.value)}
            className="input-field select-arrow cursor-pointer"
          >
            <option value="steel">Steel</option>
            <option value="nonmagnetic">Non-Mag</option>
          </select>
        </div>
        <div>
          <label className="label-sm block mb-0.5">C Value</label>
          <select
            value={segment.c || ''}
            onChange={e => { if (e.target.value) onUpdate('c', Number(e.target.value)) }}
            className="input-field select-arrow cursor-pointer"
          >
            <option value="">Select...</option>
            {sizes.map(([name, val]) => (
              <option key={name} value={val}>{name} — {val.toLocaleString()}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

import { Plus, Triangle, Cable } from 'lucide-react'
import SegmentCard from './SegmentCard.jsx'

export default function ShortCircuitForm({
  values, onChange, segments, onSegmentUpdate,
  onSegmentAdd, onSegmentRemove, onCalculate,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded bg-primary/10 border border-primary/25 flex items-center justify-center">
          <Triangle size={12} className="text-primary" />
        </div>
        <h3 className="text-xs font-semibold text-slate-800 tracking-wide uppercase">Short Circuit Inputs</h3>
      </div>

      {/* System Settings Group */}
      <div className="bg-slate-50/60 border border-slate-200/80 p-3 rounded-lg flex flex-col gap-2.5 shadow-sm">
        <span className="text-[0.6rem] font-bold text-primary uppercase tracking-wide">System Settings</span>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-sm block mb-1">Unit</label>
            <select
              value={values.unit}
              onChange={e => onChange('unit', e.target.value)}
              className="input-field select-arrow cursor-pointer"
            >
              <option value="ft">Feet</option>
              <option value="m">Meters</option>
            </select>
          </div>
          <div>
            <label className="label-sm block mb-1">Z Factor</label>
            <input
              type="number"
              value={values.zFactor}
              onChange={e => onChange('zFactor', e.target.value)}
              min="0.8" max="1.2" step="0.05"
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Transformer Section */}
      <div className="bg-slate-50/60 border border-slate-200/80 p-3 rounded-lg flex flex-col gap-2.5 shadow-sm">
        <span className="text-[0.6rem] font-bold text-primary uppercase tracking-wide">Transformer Base</span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'kva', label: 'kVA' },
            { key: 'vll', label: 'VLL (V)' },
            { key: 'pctZ', label: '%Z' },
          ].map(f => (
            <div key={f.key}>
              <label className="label-sm block mb-1">{f.label}</label>
              <input
                type="number"
                value={values[f.key]}
                onChange={e => onChange(f.key, e.target.value)}
                placeholder="0"
                className="input-field"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cable Segments Section */}
      <div className="bg-slate-50/60 border border-slate-200/80 p-3 rounded-lg flex flex-col gap-2.5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Cable size={12} className="text-primary/75" />
          <span className="text-[0.6rem] font-bold text-primary uppercase tracking-wide">Conductor Segments</span>
        </div>

        <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
          {segments.map((seg, idx) => (
            <SegmentCard
              key={seg.id}
              index={idx}
              segment={seg}
              onUpdate={(field, val) => onSegmentUpdate(seg.id, field, val)}
              onRemove={() => onSegmentRemove(seg.id)}
              canRemove={segments.length > 1}
            />
          ))}
        </div>

        {/* Highly Visible Dash Add Button */}
        <button
          type="button"
          onClick={onSegmentAdd}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 rounded-lg text-primary text-xs font-semibold tracking-wide transition-all select-none cursor-pointer mt-1"
        >
          <Plus size={14} />
          <span>Add Cable Segment</span>
        </button>
      </div>

      <button
        onClick={onCalculate}
        className="btn-primary w-full mt-1.5"
      >
        <Triangle size={12} className="opacity-80 rotate-90" />
        <span>Calculate</span>
      </button>
    </div>
  )
}

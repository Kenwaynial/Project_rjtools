import SegmentCard from './SegmentCard.jsx'

export default function ShortCircuitForm({
  values, onChange, segments, onSegmentUpdate,
  onSegmentAdd, onSegmentRemove, onCalculate,
}) {
  return (
    <>
      <h3 className="text-base font-semibold text-[#f0f0f5] mb-2">Short Circuit Calculator</h3>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#8888aa] uppercase tracking-wide">Unit</label>
          <select
            value={values.unit}
            onChange={e => onChange('unit', e.target.value)}
            className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2.5 text-sm text-[#f0f0f5] outline-none focus:border-[#3b82f6] transition-colors cursor-pointer"
          >
            <option value="ft">Feet</option>
            <option value="m">Meters</option>
          </select>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#8888aa] uppercase tracking-wide">Z Factor</label>
          <input
            type="number"
            value={values.zFactor}
            onChange={e => onChange('zFactor', e.target.value)}
            min="0.8" max="1.2" step="0.05"
            className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2.5 text-sm text-[#f0f0f5] outline-none focus:border-[#3b82f6] transition-colors"
          />
        </div>
      </div>

      <div className="h-px bg-[#333355] my-1" />

      <h4 className="text-sm font-semibold text-[#3b82f6]">Transformer</h4>

      <div className="flex gap-3">
        {[
          { key: 'kva', label: 'kVA', placeholder: '500' },
          { key: 'vll', label: 'VLL (V)', placeholder: '400' },
          { key: 'pctZ', label: '%Z', placeholder: '5.75' },
        ].map(f => (
          <div key={f.key} className="flex-1 flex flex-col gap-1">
            <label className="text-[0.65rem] font-medium text-[#8888aa] uppercase tracking-wide">{f.label}</label>
            <input
              type="number"
              value={values[f.key]}
              onChange={e => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2.5 text-sm text-[#f0f0f5] outline-none placeholder:text-[#555577] focus:border-[#3b82f6] transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="h-px bg-[#333355] my-1" />

      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#3b82f6]">Cable Segments</h4>
        <button
          onClick={onSegmentAdd}
          className="text-xs text-[#3b82f6] hover:text-[#60a5fa] transition-colors font-medium"
        >
          + Add Segment
        </button>
      </div>

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

      <button
        onClick={onCalculate}
        className="mt-2 py-2.5 rounded-lg text-sm font-semibold bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-lg shadow-[#3b82f6]/20 transition-all active:scale-[0.98]"
      >
        Calculate
      </button>
    </>
  )
}

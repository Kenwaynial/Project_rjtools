import { C_VALUES } from '../data/cValues.js'

export default function SegmentCard({ index, segment, onUpdate, onRemove, canRemove }) {
  const sizes = Object.entries(C_VALUES[segment.conduitType || 'steel'])

  return (
    <div className="bg-[#1a1a2a] border border-[#333355] rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono font-medium text-[#3b82f6]">Segment {index + 1}</span>
        {canRemove && (
          <button onClick={onRemove} className="text-xs text-[#ef4444] hover:text-[#f87171] transition-colors">
            Remove
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-[0.65rem] font-medium text-[#8888aa] uppercase tracking-wide">Length</label>
          <input
            type="number"
            value={segment.len}
            onChange={e => onUpdate('len', e.target.value)}
            placeholder="Length"
            className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2 text-sm text-[#f0f0f5] outline-none placeholder:text-[#555577] focus:border-[#3b82f6] transition-colors w-full"
          />
        </div>

        <div className="w-[110px] flex flex-col gap-1">
          <label className="text-[0.65rem] font-medium text-[#8888aa] uppercase tracking-wide">Parallels (n)</label>
          <input
            type="number"
            value={segment.n}
            onChange={e => onUpdate('n', e.target.value)}
            min="1"
            placeholder="n"
            className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2 text-sm text-[#f0f0f5] outline-none placeholder:text-[#555577] focus:border-[#3b82f6] transition-colors w-full"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-[0.65rem] font-medium text-[#8888aa] uppercase tracking-wide">Conduit Type</label>
          <select
            value={segment.conduitType || 'steel'}
            onChange={e => onUpdate('conduitType', e.target.value)}
            className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2 text-sm text-[#f0f0f5] outline-none focus:border-[#3b82f6] transition-colors cursor-pointer"
          >
            <option value="steel">Steel</option>
            <option value="nonmagnetic">Non-Magnetic</option>
          </select>
        </div>

        <div className="flex-[2] flex flex-col gap-1">
          <label className="text-[0.65rem] font-medium text-[#8888aa] uppercase tracking-wide">C Value</label>
          <div className="flex gap-2">
            <select
              value={segment.c || ''}
              onChange={e => {
                if (e.target.value) onUpdate('c', Number(e.target.value))
              }}
              className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2 text-sm text-[#f0f0f5] outline-none focus:border-[#3b82f6] transition-colors cursor-pointer min-w-0 flex-1"
            >
              <option value="">Select conductor...</option>
              {sizes.map(([name, val]) => (
                <option key={name} value={val}>{name} — {val.toLocaleString()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

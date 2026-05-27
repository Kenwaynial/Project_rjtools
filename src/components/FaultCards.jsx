import { fmt } from '../utils/fmt.js'

export default function FaultCards({ results }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {results.map((r, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#22223a] border border-slate-200 dark:border-[#333355] rounded-lg p-4 hover:border-primary/30 dark:hover:border-[#3b82f6]/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold text-primary">{r.point}</span>
            <span className="text-[0.65rem] text-slate-500 dark:text-[#8888aa]">{r.label}</span>
          </div>
          <div className="font-mono text-base font-semibold text-slate-900 dark:text-[#f0f0f5]">{fmt(r.isc, 2)} A</div>
          {r.suggestedKAIC && (
            <div className="text-xs text-green mt-1">→ {r.suggestedKAIC} KAIC</div>
          )}
        </div>
      ))}
    </div>
  )
}

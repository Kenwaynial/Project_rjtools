import { fmt } from '../utils/fmt.js'

export default function HeroResult({ isc1, suggestedKAIC }) {
  return (
    <div className="bg-gradient-to-br from-[#22223a] to-[#2a2a45] border border-[#333355] rounded-xl p-6 flex justify-between items-center">
      <div>
        <div className="text-xs font-medium text-[#8888aa] uppercase tracking-wide mb-1">
          Symmetrical RMS Fault Current
        </div>
        <div className="font-mono text-3xl font-bold text-[#3b82f6] leading-tight">
          {isc1} <span className="text-base font-medium text-[#8888aa]">A</span>
        </div>
      </div>
      {suggestedKAIC && (
        <div className="bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-lg px-4 py-2.5 text-center">
          <div className="text-[0.65rem] font-medium text-[#8888aa] uppercase tracking-wide">Suggested Breaker</div>
          <div className="font-mono text-lg font-bold text-[#22c55e]">{suggestedKAIC} KAIC</div>
        </div>
      )}
    </div>
  )
}

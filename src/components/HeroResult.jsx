import { fmt } from '../utils/fmt.js'

export default function HeroResult({ isc1, suggestedKAIC }) {
  return (
    <div className="bg-black border border-white/[0.06] rounded-xl p-5 flex justify-between items-center">
      <div>
        <div className="label-sm block mb-1">Symmetrical RMS Fault Current</div>
        <div className="font-mono text-3xl font-bold text-primary leading-tight">
          {isc1} <span className="text-base font-medium text-muted">A</span>
        </div>
      </div>
      {suggestedKAIC && (
        <div className="bg-green/5 border border-green/20 rounded-lg px-4 py-2.5 text-center">
          <div className="text-[0.55rem] font-medium text-muted uppercase tracking-wider">Suggested Breaker</div>
          <div className="font-mono text-lg font-bold text-green">{suggestedKAIC} KAIC</div>
        </div>
      )}
    </div>
  )
}

export default function StepsPanel({ steps }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="bg-[#22223a] border border-[#333355] rounded-lg p-5">
      <h4 className="text-sm font-semibold text-[#f0f0f5] mb-3">Step-by-Step Solution</h4>
      <div className="space-y-1.5">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`font-mono text-sm leading-relaxed ${
              s.sub ? 'pl-5 text-[#8888aa]' : 'text-[#f0f0f5]'
            } ${i > 0 && !s.sub ? 'border-t border-[#333355] pt-2 mt-2' : ''}`}
          >
            {s.sub && <span className="text-[#555577] mr-2">↳</span>}
            <span className="text-[#3b82f6] font-semibold">{s.var}</span>
            <span className="text-[#f59e0b] font-bold mx-1">=</span>
            <span>{s.expr}</span>
            <span className="text-[#f59e0b] font-bold mx-1">=</span>
            <span className="text-[#22d3ee] font-semibold">{s.result}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

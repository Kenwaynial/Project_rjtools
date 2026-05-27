import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

export default function StepsPanel({ scResult }) {
  const { steps, results } = scResult
  if (!steps || steps.length === 0) return null

  const groups = []
  if (steps.length >= 3) {
    groups.push({
      point: steps[2].var,
      label: results?.[0]?.label || 'Transformer Terminals',
      result: steps[2].result,
      kaic: results?.[0]?.suggestedKAIC || null,
      substeps: [steps[0], steps[1]],
      mainStep: steps[2],
    })
  }
  let i = 3
  let segIdx = 1
  while (i + 2 < steps.length) {
    const res = results?.[segIdx]
    groups.push({
      point: steps[i + 2].var,
      label: res?.label || `After Segment ${segIdx}`,
      result: steps[i + 2].result,
      kaic: res?.suggestedKAIC || null,
      substeps: [steps[i], steps[i + 1]],
      mainStep: steps[i + 2],
    })
    i += 3
    segIdx++
  }

  return (
    <div className="bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800/50">
        <Calculator size={13} className="text-primary" />
        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Calculation Method &mdash; Fault Current Derivation</h4>
      </div>

      <div className="flex flex-col gap-2.5">
        {groups.map((g, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.2 }}
            className="group"
          >
            <div className="bg-slate-50/60 dark:bg-slate-800/20 border border-slate-200/60 dark:border-slate-700/40 rounded-lg px-4 py-2.5 hover:border-primary/20 dark:hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary tracking-wide">
                  {g.point} &mdash; {g.label}
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                    {g.result}
                  </span>
                  {g.kaic && (
                    <span className="text-[0.6rem] font-bold text-green bg-green/10 border border-green/20 rounded-md px-1.5 py-0.5">
                      {g.kaic} KAIC
                    </span>
                  )}
                </span>
              </div>

              <div className="pl-3 border-l-2 border-primary/20 space-y-1">
                {g.substeps.map((s, si) => (
                  <div key={si} className="font-mono text-[0.65rem] leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="text-primary font-semibold">{s.var}</span>
                    <span className="text-amber mx-1">=</span>
                    <span className="break-all">{s.expr}</span>
                    <span className="text-amber mx-1">=</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{s.result}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 dark:border-slate-700/50 pt-1 font-mono text-[0.65rem] leading-relaxed">
                  <span className="text-primary font-bold">{g.point}</span>
                  <span className="text-amber mx-1">=</span>
                  <span className="text-slate-600 dark:text-slate-400 break-all">{g.mainStep.expr}</span>
                  <span className="text-amber mx-1">=</span>
                  <span className="text-green font-bold">{g.result}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

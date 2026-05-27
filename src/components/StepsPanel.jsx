import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

export default function StepsPanel({ scResult }) {
  const { steps, results } = scResult
  if (!steps || steps.length === 0) return null

  const groups = []
  if (steps.length >= 3) {
    groups.push({
      point: steps[2].var,
      label: 'Transformer Terminals',
      substeps: [steps[0], steps[1]],
      mainStep: steps[2],
    })
  }
  let i = 3
  let segIdx = 1
  while (i + 2 < steps.length) {
    groups.push({
      point: steps[i + 2].var,
      label: `Fault ${segIdx + 1}`,
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

      <div className="flex flex-col gap-4">
        {groups.map((g, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.2 }}
          >
            <div className="bg-slate-50/60 dark:bg-slate-800/20 border border-slate-200/60 dark:border-slate-700/40 rounded-lg px-5 py-4 hover:scale-[1.015] hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200">
              <div className="mb-2">
                <span className="text-xs font-bold text-primary tracking-wide">
                  {g.point} <span className="text-slate-400 dark:text-slate-500 font-normal">&mdash;</span> {g.label}
                </span>
              </div>

              <div className="pl-4 border-l-2 border-primary/20 space-y-1.5">
                {g.substeps.map((s, si) => (
                  <div key={si} className="font-mono text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="text-primary font-semibold">{s.var}</span>
                    <span className="text-amber mx-1">=</span>
                    <span className="break-all">{s.expr}</span>
                    <span className="text-amber mx-1">=</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{s.result}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 dark:border-slate-700/50 pt-1 font-mono text-xs leading-relaxed">
                  <span className="text-primary font-bold">{g.point}</span>
                  <span className="text-amber mx-1">=</span>
                  <span className="text-slate-600 dark:text-slate-400 break-all">{g.mainStep.expr}</span>
                  <span className="text-amber mx-1">=</span>
                  <span className="text-green font-bold">{g.mainStep.result}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

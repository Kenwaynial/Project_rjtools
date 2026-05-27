import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight } from 'lucide-react'

function getStepDetails(s) {
  if (s.var === 'I_tr') {
    return {
      title: 'Step 1: Transformer Secondary Full-Load Current',
      desc: 'Calculates the baseline secondary full-load current of the transformer based on its kVA capacity and line-to-line voltage.',
      isSub: false,
    }
  }
  if (s.var === 'M₁') {
    return {
      title: 'Step 2: Transformer Impedance Multiplier',
      desc: 'Computes the multiplier factor (M1) using the transformer percent impedance (%Z) adjusted by the Z-factor.',
      isSub: false,
    }
  }
  if (s.var === 'F₁') {
    return {
      title: 'Step 3: Symmetrical Fault Current at Transformer Terminals',
      desc: 'Determines the baseline secondary terminal available fault current (point F1) before any cable segment runs.',
      isSub: false,
    }
  }

  const segNum = parseInt(s.var.slice(1)) - 1
  if (s.var.startsWith('F') && s.sub) {
    return {
      title: `Segment ${segNum} Conductor Impedance Factor (f)`,
      desc: 'Calculates the conductor impedance ratio (f) using the length, current at the start, C-value, and parallel runs.',
      isSub: true,
    }
  }
  if (s.var.startsWith('M')) {
    return {
      title: `Segment ${segNum} Mitigation Multiplier (M)`,
      desc: 'Calculates the mitigation multiplier showing the fault current attenuation over the conductor length.',
      isSub: true,
    }
  }
  if (s.var.startsWith('F') && !s.sub) {
    return {
      title: `Fault Current at Point ${s.var} (After Segment ${segNum})`,
      desc: 'Determines the final diminished available symmetrical RMS fault current at the end of this conductor run.',
      isSub: false,
    }
  }

  return {
    title: `Calculation Step: ${s.var}`,
    desc: 'Intermediate mathematical computation.',
    isSub: s.sub || false,
  }
}

export default function StepsPanel({ steps }) {
  if (!steps || steps.length === 0) return null

  let stepCounter = 0
  return (
    <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-700/50">
        <CheckCircle2 size={13} className="text-primary" />
        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Step-by-Step Short Circuit Analysis</h4>
      </div>

      <div className="relative pl-4 border-l border-slate-200 dark:border-slate-700 space-y-5 ml-2.5">
        {steps.map((s, i) => {
          const details = getStepDetails(s)
          if (!details.isSub) stepCounter++

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className="relative group"
            >
              <div className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                details.isSub
                  ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 group-hover:border-primary/40'
                  : 'bg-slate-50 dark:bg-slate-800 border-primary/30 text-primary group-hover:border-primary'
              }`}>
                {details.isSub ? (
                  <ChevronRight size={8} />
                ) : (
                  <span className="text-[0.45rem] font-bold">{stepCounter}</span>
                )}
              </div>

              <div className={`rounded-lg p-3 border transition-colors ${
                details.isSub
                  ? 'bg-slate-50/40 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-700/50 ml-2 hover:border-slate-200 dark:hover:border-slate-600'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 hover:border-primary/10'
              }`}>
                <h5 className={`text-[0.7rem] font-bold tracking-wide transition-colors ${
                  details.isSub ? 'text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200' : 'text-slate-800 dark:text-slate-100'
                }`}>
                  {details.title}
                </h5>
                <p className="text-[0.65rem] text-slate-500 dark:text-slate-400 leading-relaxed mt-1 mb-2.5">
                  {details.desc}
                </p>

                <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded p-2 font-mono text-[0.65rem] flex flex-wrap items-center gap-1.5 overflow-x-auto text-slate-800 dark:text-slate-100">
                  <span className="text-primary font-semibold">{s.var}</span>
                  <span className="text-amber font-semibold">=</span>
                  <span className="text-slate-600 dark:text-slate-400 break-all">{s.expr}</span>
                  <span className="text-amber font-semibold">=</span>
                  <span className="text-green font-bold bg-green/10 border border-green/20 px-1.5 py-0.5 rounded text-[0.6rem] whitespace-nowrap">
                    {s.result}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

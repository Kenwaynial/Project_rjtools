import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import FaultTable from './FaultTable.jsx'
import StepsPanel from './StepsPanel.jsx'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } },
  exit: { opacity: 0, y: -6 },
}

export default function MainPanel({ activeTab, vdResult, scResult, vdValues }) {
  if (activeTab === 'vdrop') {
    return (
      <main className="flex-1 bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col gap-5 min-w-0 overflow-y-auto shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Voltage Drop Result</h2>

        <AnimatePresence mode="wait">
          {vdResult ? (
            <motion.div key="vd-result" {...fadeUp} className="flex flex-col gap-4">
              <div className="bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
                  <span className="text-[0.65rem] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Voltage Drop Summary Table</span>
                  <span className={`text-[0.6rem] font-bold px-2.5 py-0.5 rounded-md ${
                    vdResult.percent <= 3 ? 'text-green bg-green/10 border border-green/20' : 'text-amber bg-amber/10 border border-amber/20'
                  }`}>
                    {vdResult.percent <= 3 ? 'NEC Compliant' : 'Exceeds 3% Recommendation'}
                  </span>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[0.55rem] uppercase tracking-wider font-semibold bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-4 py-2.5 font-medium">Electrical Parameter</th>
                      <th className="px-4 py-2.5 font-medium">Symbol / Formula</th>
                      <th className="text-right px-4 py-2.5 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-mono text-[0.7rem]">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-2.5 font-sans text-xs text-slate-700 dark:text-slate-300">System Source Voltage</td>
                      <td className="px-4 py-2.5 text-slate-400 dark:text-slate-500">V_sys</td>
                      <td className="px-4 py-2.5 text-right text-slate-900 dark:text-slate-100">{vdValues.sysVoltage} V</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-2.5 font-sans text-xs text-slate-700 dark:text-slate-300">One-way Conductor Distance</td>
                      <td className="px-4 py-2.5 text-slate-400 dark:text-slate-500">D</td>
                      <td className="px-4 py-2.5 text-right text-slate-900 dark:text-slate-100">{vdValues.distance} m</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-2.5 font-sans text-xs text-slate-700 dark:text-slate-300">Line Load Current</td>
                      <td className="px-4 py-2.5 text-slate-400 dark:text-slate-500">I</td>
                      <td className="px-4 py-2.5 text-right text-slate-900 dark:text-slate-100">{vdValues.current} A</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-2.5 font-sans text-xs text-slate-700 dark:text-slate-300">Calculated Impedance per 305m</td>
                      <td className="px-4 py-2.5 text-slate-400 dark:text-slate-500">Z = √(R² + X²)</td>
                      <td className="px-4 py-2.5 text-right text-slate-900 dark:text-slate-100">
                        {Math.sqrt(vdValues.r*vdValues.r + vdValues.x*vdValues.x).toFixed(5)} Ω
                      </td>
                    </tr>
                    <tr className="bg-primary/5 border-t border-primary/20 transition-colors">
                      <td className="px-4 py-3 font-sans text-xs font-semibold text-primary">Voltage Drop (L-L)</td>
                      <td className="px-4 py-3 text-primary-dark">V_drop = k × I × Z × D / 305</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-primary">{vdResult.vDrop.toFixed(3)} V</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-sans text-xs font-semibold text-slate-800 dark:text-slate-100">Percent Voltage Drop</td>
                      <td className="px-4 py-3 text-slate-400 dark:text-slate-500">V_% = (V_drop / V_sys) × 100</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-green">
                        {vdResult.percent.toFixed(2)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <StepCard label="Step-by-Step Solution" steps={[
                { var: 'Vd', expr: `${vdValues.phaseType == 1 ? '2' : '√3'} × ${vdValues.distance} × ${vdValues.current} × √(R²+X²) / 305`, result: `${vdResult.vDrop.toFixed(3)} V` },
                { var: '%', expr: `${vdResult.vDrop.toFixed(3)} / ${vdValues.sysVoltage} × 100`, result: `${vdResult.percent.toFixed(2)}%` },
              ]} />
            </motion.div>
          ) : (
            <motion.div key="vd-empty" {...fadeUp} className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-3">
                  <BarChart3 size={18} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-400 dark:text-slate-500">Enter values and click Calculate</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col gap-5 min-w-0 overflow-y-auto shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Short Circuit Result</h2>

      <AnimatePresence mode="wait">
        {scResult ? (
          <motion.div key="sc-result" {...fadeUp} className="flex flex-col gap-4">
            <FaultTable results={scResult.results} />
            <StepsPanel scResult={scResult} />
          </motion.div>
        ) : (
          <motion.div key="sc-empty" {...fadeUp} className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-3">
                <BarChart3 size={18} className="text-slate-400" />
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-500">Enter values and click Calculate</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
function StepCard({ label, steps }) {
  return (
    <div className="bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-800/50">{label}</h4>
      <div className="relative pl-4 border-l border-slate-200 dark:border-slate-700 space-y-4 ml-2.5">
        {steps.map((s, i) => {
          const title = s.var === 'Vd' ? 'Step 1: Calculate Total Conductor Voltage Drop' : 'Step 2: Calculate Percentage Voltage Drop';
          const desc = s.var === 'Vd'
            ? 'Determine the voltage drop across the system using the phase coefficient, distance, current, and conductor impedance properties.'
            : 'Convert the computed voltage drop into a percentage of the source voltage to evaluate national standard compliance.';

          return (
            <div key={i} className="relative group">
              <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-slate-50 dark:bg-slate-800 border border-primary/30 text-primary flex items-center justify-center">
                <span className="text-[0.45rem] font-bold">{i + 1}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-lg p-3 hover:border-primary/20 transition-colors">
                <h5 className="text-[0.7rem] font-bold text-slate-800 dark:text-slate-100 tracking-wide">{title}</h5>
                <p className="text-[0.65rem] text-slate-500 dark:text-slate-400 leading-relaxed mt-1 mb-2">
                  {desc}
                </p>
                <div className="bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800 rounded p-2 font-mono text-[0.65rem] flex flex-wrap items-center gap-1.5 overflow-x-auto text-slate-800 dark:text-slate-100">
                  <span className="text-primary font-semibold">{s.var}</span>
                  <span className="text-amber font-semibold">=</span>
                  <span className="text-slate-600 dark:text-slate-400 break-all">{s.expr}</span>
                  <span className="text-amber font-semibold">=</span>
                  <span className="text-green font-bold bg-green/10 border border-green/20 px-1.5 py-0.5 rounded text-[0.6rem] whitespace-nowrap">
                    {s.result}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

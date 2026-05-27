import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import HeroResult from './HeroResult.jsx'
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
      <main className="flex-1 bg-[#0d0d0d] border border-white/[0.06] rounded-xl p-6 flex flex-col gap-5 min-w-0 overflow-y-auto">
        <h2 className="text-lg font-bold text-white tracking-tight">Voltage Drop Result</h2>

        <AnimatePresence mode="wait">
          {vdResult ? (
            <motion.div key="vd-result" {...fadeUp} className="flex flex-col gap-4">
              <div className="bg-black border border-white/[0.06] rounded-xl overflow-hidden shadow-md">
                <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
                  <span className="text-[0.65rem] font-bold text-white uppercase tracking-wider">Voltage Drop Summary Table</span>
                  <span className={`text-[0.6rem] font-bold px-2.5 py-0.5 rounded-md ${
                    vdResult.percent <= 3 ? 'text-green bg-green/10 border border-green/20' : 'text-amber bg-amber/10 border border-amber/20'
                  }`}>
                    {vdResult.percent <= 3 ? 'NEC Compliant' : 'Exceeds 3% Recommendation'}
                  </span>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-muted text-[0.55rem] uppercase tracking-wider font-semibold bg-[#070707]">
                      <th className="px-4 py-2.5 font-medium">Electrical Parameter</th>
                      <th className="px-4 py-2.5 font-medium">Symbol / Formula</th>
                      <th className="text-right px-4 py-2.5 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03] font-mono text-[0.7rem]">
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-2.5 font-sans text-xs text-white/80">System Source Voltage</td>
                      <td className="px-4 py-2.5 text-muted">V_sys</td>
                      <td className="px-4 py-2.5 text-right text-white">{vdValues.sysVoltage} V</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-2.5 font-sans text-xs text-white/80">One-way Conductor Distance</td>
                      <td className="px-4 py-2.5 text-muted">D</td>
                      <td className="px-4 py-2.5 text-right text-white">{vdValues.distance} m</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-2.5 font-sans text-xs text-white/80">Line Load Current</td>
                      <td className="px-4 py-2.5 text-muted">I</td>
                      <td className="px-4 py-2.5 text-right text-white">{vdValues.current} A</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-2.5 font-sans text-xs text-white/80">Calculated Impedance per 305m</td>
                      <td className="px-4 py-2.5 text-muted">Z = √(R² + X²)</td>
                      <td className="px-4 py-2.5 text-right text-white">
                        {Math.sqrt(vdValues.r*vdValues.r + vdValues.x*vdValues.x).toFixed(5)} Ω
                      </td>
                    </tr>
                    <tr className="bg-primary/5 border-t border-primary/20 transition-colors">
                      <td className="px-4 py-3 font-sans text-xs font-semibold text-primary">Voltage Drop (L-L)</td>
                      <td className="px-4 py-3 text-primary-dark">V_drop = k × I × Z × D / 305</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-primary">{vdResult.vDrop.toFixed(3)} V</td>
                    </tr>
                    <tr className="bg-[#121212] transition-colors">
                      <td className="px-4 py-3 font-sans text-xs font-semibold text-white">Percent Voltage Drop</td>
                      <td className="px-4 py-3 text-muted">V_% = (V_drop / V_sys) × 100</td>
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
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-3">
                  <BarChart3 size={18} className="text-muted" />
                </div>
                <p className="text-sm text-muted">Enter values and click Calculate</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-[#0d0d0d] border border-white/[0.06] rounded-xl p-6 flex flex-col gap-5 min-w-0 overflow-y-auto">
      <h2 className="text-lg font-bold text-white tracking-tight">Short Circuit Result</h2>

      <AnimatePresence mode="wait">
        {scResult ? (
          <motion.div key="sc-result" {...fadeUp} className="flex flex-col gap-4">
            <HeroResult
              isc1={scResult.isc1}
              suggestedKAIC={scResult.results[0]?.suggestedKAIC}
            />
            <FaultTable results={scResult.results} />
            <StepsPanel steps={scResult.steps} />
          </motion.div>
        ) : (
          <motion.div key="sc-empty" {...fadeUp} className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-3">
                <BarChart3 size={18} className="text-muted" />
              </div>
              <p className="text-sm text-muted">Enter values and click Calculate</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function StepCard({ label, steps }) {
  return (
    <div className="bg-black border border-white/[0.06] rounded-xl p-5 shadow-lg">
      <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.06]">{label}</h4>
      <div className="relative pl-4 border-l border-white/[0.08] space-y-4 ml-2.5">
        {steps.map((s, i) => {
          const title = s.var === 'Vd' ? 'Step 1: Calculate Total Conductor Voltage Drop' : 'Step 2: Calculate Percentage Voltage Drop';
          const desc = s.var === 'Vd'
            ? 'Determine the voltage drop across the system using the phase coefficient, distance, current, and conductor impedance properties.'
            : 'Convert the computed voltage drop into a percentage of the source voltage to evaluate national standard compliance.';
          
          return (
            <div key={i} className="relative group">
              <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#121212] border border-primary/40 text-primary flex items-center justify-center">
                <span className="text-[0.45rem] font-bold">{i + 1}</span>
              </div>
              <div className="bg-[#121212] border border-white/[0.05] rounded-lg p-3 hover:border-primary/10 transition-colors">
                <h5 className="text-[0.7rem] font-bold text-primary tracking-wide">{title}</h5>
                <p className="text-[0.65rem] text-muted leading-relaxed mt-1 mb-2">
                  {desc}
                </p>
                <div className="bg-[#050505] border border-white/[0.04] rounded p-2 font-mono text-[0.65rem] flex flex-wrap items-center gap-1.5 overflow-x-auto text-white/90">
                  <span className="text-primary font-semibold">{s.var}</span>
                  <span className="text-amber font-semibold">=</span>
                  <span className="text-white/70 break-all">{s.expr}</span>
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

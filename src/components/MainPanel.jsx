import { motion, AnimatePresence } from 'framer-motion'
import HeroResult from './HeroResult.jsx'
import FaultCards from './FaultCards.jsx'
import StepsPanel from './StepsPanel.jsx'

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } },
  exit: { opacity: 0, y: -8 },
}

export default function MainPanel({
  activeTab, vdResult, scResult, vdValues, segments,
}) {
  if (activeTab === 'vdrop') {
    return (
      <main className="flex-1 glass rounded-xl p-8 flex flex-col gap-5 min-w-0 overflow-y-auto">
        <h2 className="text-xl font-bold text-white tracking-tight">Voltage Drop Result</h2>

        <AnimatePresence mode="wait">
          {vdResult ? (
            <motion.div key="vd-result" {...fadeUp} className="flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-baseline gap-8">
                  <div>
                    <div className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Voltage Drop</div>
                    <div className="font-mono text-2xl font-bold text-primary">{vdResult.vDrop.toFixed(3)} <span className="text-sm font-medium text-muted">V</span></div>
                  </div>
                  <div className="w-px h-10 bg-white/[0.06]" />
                  <div>
                    <div className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Percent Drop</div>
                    <div className="font-mono text-2xl font-bold text-[#22c55e]">{vdResult.percent.toFixed(2)} <span className="text-sm font-medium text-muted">%</span></div>
                  </div>
                </div>
              </motion.div>

              <StepBox label="Step-by-Step Solution">
                <div className="font-mono text-sm space-y-1.5 text-white">
                  <p>
                    <span className="text-primary font-semibold">Vd</span>
                    <span className="text-accent font-bold mx-1">=</span>
                    {vdValues.phaseType == 1 ? 2 : '√3'} &times; {vdValues.distance} &times; {vdValues.current} &times; √(R²+X²) / 305
                    <span className="text-accent font-bold mx-1">=</span>
                    <span className="text-cyan font-semibold">{vdResult.vDrop.toFixed(3)} V</span>
                  </p>
                  <p>
                    <span className="text-white">%</span>
                    <span className="text-accent font-bold mx-1">=</span>
                    {vdResult.vDrop.toFixed(3)} / {vdValues.sysVoltage} &times; 100
                    <span className="text-accent font-bold mx-1">=</span>
                    <span className="text-cyan font-semibold">{vdResult.percent.toFixed(2)}%</span>
                  </p>
                </div>
              </StepBox>

              {vdValues.sysVoltage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-xl p-5 flex items-center gap-4"
                >
                  <img src="/images/vdFormula.png" alt="Formula" className="h-12" />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="vd-empty" {...fadeUp} className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
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
    <main className="flex-1 glass rounded-xl p-8 flex flex-col gap-5 min-w-0 overflow-y-auto">
      <h2 className="text-xl font-bold text-white tracking-tight">Short Circuit Result</h2>

      <AnimatePresence mode="wait">
        {scResult ? (
          <motion.div key="sc-result" {...fadeUp} className="flex flex-col gap-5">
            <HeroResult
              isc1={scResult.isc1}
              suggestedKAIC={scResult.results[0]?.suggestedKAIC}
            />
            <FaultCards results={scResult.results} />
            <StepsPanel steps={scResult.steps} />
          </motion.div>
        ) : (
          <motion.div key="sc-empty" {...fadeUp} className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <p className="text-sm text-muted">Enter values and click Calculate</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function StepBox({ label, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass rounded-xl p-5"
    >
      <h4 className="text-sm font-semibold text-white mb-3">{label}</h4>
      {children}
    </motion.div>
  )
}

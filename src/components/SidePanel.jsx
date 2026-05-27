import { motion, AnimatePresence } from 'framer-motion'
import VoltageDropForm from './VoltageDropForm.jsx'
import ShortCircuitForm from './ShortCircuitForm.jsx'

export default function SidePanel({
  activeTab, vdValues, onVdChange, onVdCalculate,
  scValues, onScChange, segments, onSegmentUpdate,
  onSegmentAdd, onSegmentRemove, onScCalculate, onReset,
}) {
  return (
    <aside className="w-[35%] min-w-[320px] max-w-[400px] max-h-[calc(100vh-6rem)] bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800 rounded-xl p-5 mr-5 flex flex-col gap-4 overflow-y-auto sticky top-[4.5rem] self-start shadow-sm">
      <AnimatePresence mode="wait">
        {activeTab === 'vdrop' ? (
          <motion.div
            key="vdrop"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.12 }}
          >
            <VoltageDropForm
              values={vdValues}
              onChange={onVdChange}
              onCalculate={onVdCalculate}
            />
          </motion.div>
        ) : (
          <motion.div
            key="shortcircuit"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.12 }}
          >
            <ShortCircuitForm
              values={scValues}
              onChange={onScChange}
              segments={segments}
              onSegmentUpdate={onSegmentUpdate}
              onSegmentAdd={onSegmentAdd}
              onSegmentRemove={onSegmentRemove}
              onCalculate={onScCalculate}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={onReset}
        className="w-full text-[0.6rem] font-semibold text-slate-400 hover:text-red-400 dark:hover:text-red-400 py-1.5 border-t border-slate-200/60 dark:border-slate-700/40 mt-auto transition-colors tracking-wider uppercase cursor-pointer"
      >
        Reset All Fields
      </button>
    </aside>
  )
}

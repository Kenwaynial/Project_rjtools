import { motion, AnimatePresence } from 'framer-motion'
import VoltageDropForm from './VoltageDropForm.jsx'
import ShortCircuitForm from './ShortCircuitForm.jsx'

export default function SidePanel({
  activeTab, vdValues, onVdChange, onVdCalculate,
  scValues, onScChange, segments, onSegmentUpdate,
  onSegmentAdd, onSegmentRemove, onScCalculate,
}) {
  return (
    <aside className="w-[35%] min-w-[320px] max-w-[400px] glass rounded-xl p-6 mr-5 flex flex-col gap-4 overflow-y-auto">
      <AnimatePresence mode="wait">
        {activeTab === 'vdrop' ? (
          <motion.div
            key="vdrop"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15 }}
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
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15 }}
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
    </aside>
  )
}

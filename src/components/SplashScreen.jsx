import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function SplashScreen({ onAgree }) {
  const [exiting, setExiting] = useState(false)

  const handleAgree = () => {
    setExiting(true)
    setTimeout(() => onAgree(), 600)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-6 max-w-md px-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 100, damping: 12 }}
          >
            <motion.img
              src="/images/icon.png"
              alt="RJ Tools"
              className="w-16 h-16"
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
            />

            <motion.h1
              className="text-3xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              RJ Electrical Tools
            </motion.h1>

            <motion.p
              className="text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Electrical Engineering Suite
            </motion.p>

            <motion.div
              className="w-full h-px bg-slate-700/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            />

            <motion.p
              className="text-center text-xs text-slate-400 italic leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Disclaimer: This tool is for informational purposes only. Always verify results with a licensed professional before making electrical decisions. No liability for errors or misuse.
            </motion.p>

            <motion.div
              className="w-full h-px bg-slate-700/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            />

            <motion.button
              onClick={handleAgree}
              className="px-8 py-3.5 bg-primary text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              I Agree &amp; Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

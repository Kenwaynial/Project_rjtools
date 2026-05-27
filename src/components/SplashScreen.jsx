import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function SplashScreen({ onAgree }) {
  const [exiting, setExiting] = useState(false)

  const handleAgree = () => {
    setExiting(true)
    setTimeout(() => onAgree(), 500)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Static background with blur — never animated */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-accent/20" />
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Animated card only */}
          <motion.div
            className="relative flex flex-col items-center gap-5 max-w-sm w-full mx-6 bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl px-8 py-10 shadow-2xl"
            style={{ backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Glow accent */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/30 rounded-full blur-3xl pointer-events-none" />

            <motion.img
              src="/images/icon.png"
              alt="RJ Tools"
              className="w-14 h-14 relative"
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 13, delay: 0.3 }}
            />

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <h1 className="text-2xl font-bold text-white tracking-tight">RJ Electrical Tools</h1>
              <p className="text-white/50 text-xs mt-1 tracking-widest uppercase">Engineering Suite</p>
            </motion.div>

            <motion.div
              className="w-full h-px bg-white/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />

            <motion.p
              className="text-center text-[0.7rem] text-white/45 italic leading-relaxed px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              This tool is for informational purposes only. Always verify results with a licensed professional. No liability for errors or misuse.
            </motion.p>

            <motion.div
              className="w-full h-px bg-white/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            />

            <motion.button
              onClick={handleAgree}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-primary/30"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.35 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              I Agree &amp; Continue
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

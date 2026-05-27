import { motion } from 'framer-motion'
import { Zap, ShieldCheck, ArrowRight } from 'lucide-react'

const tools = [
  {
    id: 'vdrop',
    title: 'Voltage Drop',
    desc: 'Calculate voltage drop across conductors for single and three phase systems.',
    icon: Zap,
    color: 'from-primary to-accent',
  },
  {
    id: 'shortcircuit',
    title: 'Short Circuit',
    desc: 'Compute symmetrical RMS fault current and suggested breaker KAIC ratings.',
    icon: ShieldCheck,
    color: 'from-accent to-amber',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

export default function Dashboard({ onNavigate, searchQuery }) {
  const filtered = tools.filter(t =>
    !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 flex flex-col">
      <div className="max-w-[1000px] mx-auto w-full px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Electrical Tools</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Select a tool to get started with your calculations.</p>
        </motion.div>
 
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filtered.map(tool => {
            const Icon = tool.icon
            return (
              <motion.button
                key={tool.id}
                variants={item}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(tool.id)}
                className="group cursor-pointer text-left"
              >
                <div className="bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-primary/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 hover:shadow-md transition-all duration-200 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{tool.stats}</span>
                  </div>
 
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">{tool.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{tool.desc}</p>
 
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                    Open Tool <ArrowRight size={11} />
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
 
          {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-sm">No tools match your search.</p>
          </div>
        )}
      </div>
 
      <div className="mt-auto border-t border-slate-200 dark:border-slate-700/50 py-4 px-6">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span className="text-slate-300 dark:text-slate-600">RJ Electrical Tools v2.0</span>
        </div>
      </div>
    </div>
  )
}

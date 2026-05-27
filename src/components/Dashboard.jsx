import { motion } from 'framer-motion'
import { Zap, ShieldCheck, ArrowRight, BarChart3, FileOutput, History } from 'lucide-react'

const tools = [
  {
    id: 'vdrop',
    title: 'Voltage Drop',
    desc: 'Calculate voltage drop across conductors for single and three phase systems.',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    badge: 'Popular',
    stats: '1.2k uses',
  },
  {
    id: 'shortcircuit',
    title: 'Short Circuit',
    desc: 'Compute symmetrical RMS fault current and suggested breaker KAIC ratings.',
    icon: ShieldCheck,
    color: 'from-purple-500 to-pink-500',
    badge: 'Pro',
    stats: '856 uses',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
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
      <div className="max-w-[1000px] mx-auto w-full px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-white tracking-tight">Electrical Tools</h1>
          <p className="text-muted text-sm mt-1.5">Select a tool to get started with your calculations.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filtered.map(tool => {
            const Icon = tool.icon
            return (
              <motion.button
                key={tool.id}
                variants={item}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(tool.id)}
                className="glass glass-hover rounded-xl p-6 text-left group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  {tool.badge && (
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5">{tool.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{tool.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">{tool.stats}</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    Open Tool <ArrowRight size={12} />
                  </span>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BarChart3 size={32} className="mx-auto text-muted mb-3 opacity-50" />
            <p className="text-muted text-sm">No tools match your search.</p>
          </div>
        )}
      </div>

      <div className="mt-auto border-t border-white/[0.06] py-4 px-6">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><FileOutput size={12} /> v2.0</span>
            <span className="flex items-center gap-1.5"><History size={12} /> Last calc saved</span>
          </div>
          <span className="text-white/30">RJ Electrical Tools</span>
        </div>
      </div>
    </div>
  )
}

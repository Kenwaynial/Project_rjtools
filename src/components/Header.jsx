import { useState } from 'react'
import { Search, ArrowLeft, Zap, ShieldCheck, Sun, Moon } from 'lucide-react'

export default function Header({ view, onNavigate, onSearch, theme, onToggleTheme }) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0f1e]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {view !== 'dashboard' && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img src="/images/icon.png" alt="RJ Tools" className="w-8 h-8" />
            <span className="font-bold text-base text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-primary transition-colors">RJ Tools</span>
          </div>
        </div>

        <div className={`flex-1 max-w-sm transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
          <div className="relative rounded-lg">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tools..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={e => onSearch?.(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all focus:bg-white dark:focus:bg-[#1e293b] focus:border-primary focus:shadow-[0_0_0_1px_#4f46e5,0_0_12px_rgba(79,70,229,0.05)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => onNavigate('vdrop')}
              className={`px-3 py-1.5 text-[0.7rem] font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                view === 'vdrop' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              <Zap size={11} className={view === 'vdrop' ? 'text-white' : 'text-slate-400 dark:text-slate-500'} fill={view === 'vdrop' ? 'currentColor' : 'none'} />
              <span>Voltage Drop</span>
            </button>
            <button
              onClick={() => onNavigate('shortcircuit')}
              className={`px-3 py-1.5 text-[0.7rem] font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                view === 'shortcircuit' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              <ShieldCheck size={11} className={view === 'shortcircuit' ? 'text-white' : 'text-slate-400 dark:text-slate-500'} />
              <span>Short Circuit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

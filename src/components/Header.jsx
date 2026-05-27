import { useState } from 'react'
import { Zap, Search, Sun, Moon, ArrowLeft } from 'lucide-react'

export default function Header({ view, onNavigate, onSearch }) {
  const [dark, setDark] = useState(true)
  const [searchFocused, setSearchFocused] = useState(false)

  const toggleTheme = () => setDark(p => !p)

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {view !== 'dashboard' && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">RJ Tools</span>
          </div>
        </div>

        <div className={`flex-1 max-w-md transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
          <div className="relative glow-border rounded-lg">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search tools..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={e => onSearch?.(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-muted outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-white/[0.04] rounded-lg p-0.5 border border-white/[0.06]">
            <button
              onClick={() => onNavigate('vdrop')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                view === 'vdrop' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-white'
              }`}
            >
              V-Drop
            </button>
            <button
              onClick={() => onNavigate('shortcircuit')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                view === 'shortcircuit' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-white'
              }`}
            >
              S-Circuit
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  )
}

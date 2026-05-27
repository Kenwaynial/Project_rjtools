export default function Header({ activeTab, onTabChange, hasResult }) {
  const tabs = [
    { id: 'vdrop', label: 'Voltage Drop' },
    { id: 'shortcircuit', label: 'Short Circuit' },
  ]

  return (
    <header className="bg-[#22223a] border-b border-[#333355]">
      <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <img src="/images/icon.png" alt="RJ" className="w-7 h-7" />
            <span className="font-bold text-lg text-[#f0f0f5] tracking-wide">RJ Electrical Tools</span>
          </div>

          <nav className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/25'
                    : 'text-[#8888aa] hover:text-[#f0f0f5] hover:bg-[#2a2a45]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className={`w-2.5 h-2.5 rounded-full ${hasResult ? 'bg-[#22c55e] shadow-lg shadow-[#22c55e]/30' : 'bg-[#555577]'}`} />
      </div>
    </header>
  )
}

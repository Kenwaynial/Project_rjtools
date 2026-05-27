export default function VoltageDropForm({ values, onChange, onCalculate }) {
  return (
    <>
      <h3 className="text-base font-semibold text-[#f0f0f5] mb-2">Voltage Drop Calculator</h3>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-[#8888aa] uppercase tracking-wide">Phase Type</label>
        <select
          value={values.phaseType}
          onChange={e => onChange('phaseType', e.target.value)}
          className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2.5 text-sm text-[#f0f0f5] outline-none focus:border-[#3b82f6] transition-colors cursor-pointer"
        >
          <option value={1}>Single Phase</option>
          <option value={3}>Three Phase</option>
        </select>
      </div>

      {[
        { key: 'distance', label: 'Distance D (m)' },
        { key: 'current', label: 'Line Current I (A)' },
        { key: 'r', label: 'R (Ohm per 305m)' },
        { key: 'x', label: 'X (Ohm per 305m)' },
        { key: 'sysVoltage', label: 'System Voltage (V)' },
      ].map(f => (
        <div key={f.key} className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#8888aa] uppercase tracking-wide">{f.label}</label>
          <input
            type="number"
            value={values[f.key]}
            onChange={e => onChange(f.key, e.target.value)}
            placeholder={f.label}
            className="bg-[#1a1a2a] border border-[#333355] rounded-lg px-3 py-2.5 text-sm text-[#f0f0f5] outline-none placeholder:text-[#555577] focus:border-[#3b82f6] transition-colors"
          />
        </div>
      ))}

      <button
        onClick={onCalculate}
        className="mt-2 py-2.5 rounded-lg text-sm font-semibold bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-lg shadow-[#3b82f6]/20 transition-all active:scale-[0.98]"
      >
        Calculate
      </button>
    </>
  )
}

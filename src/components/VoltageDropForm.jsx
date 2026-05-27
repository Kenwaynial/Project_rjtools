import { Calculator } from 'lucide-react'

export default function VoltageDropForm({ values, onChange, onCalculate }) {
  const inputClass = "w-full bg-dark-bg border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white outline-none placeholder:text-muted/50 transition-all focus:border-primary focus:shadow-[0_0_0_1px_#6366f1,0_0_16px_rgba(99,102,241,0.1)]"

  return (
    <>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Calculator size={13} className="text-white" />
        </div>
        <h3 className="text-sm font-semibold text-white">Voltage Drop Calculator</h3>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.65rem] font-medium text-muted uppercase tracking-wide">Phase Type</label>
        <select
          value={values.phaseType}
          onChange={e => onChange('phaseType', e.target.value)}
          className={`${inputClass} cursor-pointer appearance-none`}
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
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="text-[0.65rem] font-medium text-muted uppercase tracking-wide">{f.label}</label>
          <input
            type="number"
            value={values[f.key]}
            onChange={e => onChange(f.key, e.target.value)}
            placeholder="0"
            className={inputClass}
          />
        </div>
      ))}

      <button
        onClick={onCalculate}
        className="mt-3 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 shadow-glow transition-all active:scale-[0.98]"
      >
        Calculate
      </button>
    </>
  )
}

import { Calculator } from 'lucide-react'



export default function VoltageDropForm({ values, onChange, onCalculate }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded bg-primary/10 border border-primary/25 flex items-center justify-center">
          <Calculator size={12} className="text-primary" />
        </div>
        <h3 className="text-xs font-semibold text-slate-800 tracking-wide uppercase">Voltage Drop Inputs</h3>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        <div className="col-span-1">
          <label className="label-sm block mb-1">Phase Type</label>
          <select
            value={values.phaseType}
            onChange={e => onChange('phaseType', e.target.value)}
            className="input-field select-arrow cursor-pointer"
          >
            <option value={1}>1-Phase</option>
            <option value={3}>3-Phase</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">Distance D (m)</label>
          <input
            type="number"
            value={values.distance}
            onChange={e => onChange('distance', e.target.value)}
            placeholder="0"
            className="input-field"
          />
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">Current I (A)</label>
          <input
            type="number"
            value={values.current}
            onChange={e => onChange('current', e.target.value)}
            placeholder="0"
            className="input-field"
          />
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">Voltage (V)</label>
          <input
            type="number"
            value={values.sysVoltage}
            onChange={e => onChange('sysVoltage', e.target.value)}
            placeholder="230"
            className="input-field"
          />
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">R (Ω/305m)</label>
          <input
            type="number"
            value={values.r}
            onChange={e => onChange('r', e.target.value)}
            placeholder="0.1"
            className="input-field"
          />
        </div>

        <div className="col-span-1">
          <label className="label-sm block mb-1">X (Ω/305m)</label>
          <input
            type="number"
            value={values.x}
            onChange={e => onChange('x', e.target.value)}
            placeholder="0.04"
            className="input-field"
          />
        </div>
      </div>

      <button
        onClick={onCalculate}
        className="btn-primary w-full mt-2"
      >
        <Calculator size={13} className="opacity-80" />
        <span>Calculate</span>
      </button>
    </div>
  )
}

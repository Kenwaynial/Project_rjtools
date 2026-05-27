import { C_VALUES } from '../data/cValues.js'
import { fmt } from '../utils/fmt.js'

export default function CValueTable({ conduitType }) {
  const data = Object.entries(C_VALUES.steel)
  const conv = conduitType === 'nonmagnetic' ? 'Non-Magnetic' : 'Steel'

  return (
    <details className="mt-1 bg-black border border-white/[0.06] rounded-lg overflow-hidden">
      <summary className="text-[0.55rem] text-primary font-semibold px-3 py-1.5 cursor-pointer select-none hover:text-primary-dark transition-colors">
        C Value Reference - {conv}
      </summary>
      <div className="max-h-[160px] overflow-y-auto border-t border-white/[0.06]">
        <table className="w-full text-[0.5rem]">
          <thead className="sticky top-0 bg-black">
            <tr className="text-muted border-b border-white/[0.06]">
              <th className="text-left px-3 py-1 font-medium">Conductor</th>
              <th className="text-right px-3 py-1 font-medium">C ({conv})</th>
            </tr>
          </thead>
          <tbody>
            {data.map(([name]) => (
              <tr key={name} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td className="px-3 py-1 text-white/80">{name}</td>
                <td className="px-3 py-1 text-right font-mono text-primary">
                  {fmt(C_VALUES[conduitType][name])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

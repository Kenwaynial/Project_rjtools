import { C_VALUES } from '../data/cValues.js'
import { fmt } from '../utils/fmt.js'

export default function CValueTable({ conduitType }) {
  const data = Object.entries(C_VALUES.steel)
  const isNonMag = conduitType === 'nonmagnetic'
  const conv = isNonMag ? 'Non-Magnetic' : 'Steel'

  return (
    <details className="mt-1 bg-[#0d0c1d] border border-[#2a2950] rounded-md overflow-hidden">
      <summary className="text-[0.6rem] text-[#818cf8] font-semibold px-2.5 py-1.5 cursor-pointer select-none hover:text-[#a5b4fc] transition-colors">
        C Value Reference — {conv}
      </summary>
      <div className="max-h-[160px] overflow-y-auto border-t border-[#2a2950]">
        <table className="w-full text-[0.55rem]">
          <thead className="sticky top-0 bg-[#0d0c1d]">
            <tr className="text-[#6b6b8a] border-b border-[#2a2950]">
              <th className="text-left px-2.5 py-1 font-medium">Conductor</th>
              <th className="text-right px-2.5 py-1 font-medium">C ({conv})</th>
            </tr>
          </thead>
          <tbody>
            {data.map(([name]) => (
              <tr key={name} className="border-b border-[#1a1a35] hover:bg-[#15142a]/50 transition-colors">
                <td className="px-2.5 py-1 text-[#e0e0f0]">{name}</td>
                <td className="px-2.5 py-1 text-right font-mono text-[#818cf8]">
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

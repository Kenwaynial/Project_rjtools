import { C_VALUES } from '../data/cValues.js'
import { fmt } from '../utils/fmt.js'

export default function CValueTable({ conduitType }) {
  const data = Object.entries(C_VALUES.steel)
  const conv = conduitType === 'nonmagnetic' ? 'Non-Magnetic' : 'Steel'

  return (
    <details className="mt-1 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
      <summary className="text-[0.55rem] text-primary font-bold px-3 py-1.5 cursor-pointer select-none hover:text-primary-dark transition-colors">
        C Value Reference - {conv}
      </summary>
      <div className="max-h-[160px] overflow-y-auto border-t border-slate-200 dark:border-slate-700">
        <table className="w-full text-[0.5rem]">
          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800">
            <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 font-semibold">
              <th className="text-left px-3 py-1.5 font-medium">Conductor</th>
              <th className="text-right px-3 py-1.5 font-medium">C ({conv})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {data.map(([name]) => (
              <tr key={name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-3 py-1.5 text-slate-700 dark:text-slate-300 font-medium">{name}</td>
                <td className="px-3 py-1.5 text-right font-mono text-primary font-bold">
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

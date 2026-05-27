import { motion } from 'framer-motion'
import { fmt } from '../utils/fmt.js'

export default function FaultTable({ results }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Symmetrical Short-Circuit Profiles</span>
        <span className="text-[0.65rem] font-medium text-slate-500">Calculated Node Levels</span>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 text-[0.65rem] uppercase tracking-wider font-semibold bg-slate-50">
            <th className="px-5 py-3 font-semibold">Node Point</th>
            <th className="px-5 py-3 font-semibold">Location / System Node</th>
            <th className="text-right px-5 py-3 font-semibold">Fault Current (Isc)</th>
            <th className="text-right px-5 py-3 font-semibold">Suggested Protection</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-mono text-sm text-slate-700">
          {results.map((r, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className="hover:bg-slate-50/50 transition-colors"
            >
              <td className="px-5 py-3.5">
                <span className="font-bold text-primary text-sm">{r.point}</span>
              </td>
              <td className="px-5 py-3.5 font-sans text-sm text-slate-800 font-medium">{r.label}</td>
              <td className="px-5 py-3.5 text-right text-slate-900 font-bold text-sm">{fmt(r.isc, 2)} A</td>
              <td className="px-5 py-3.5 text-right font-sans">
                {r.suggestedKAIC ? (
                  <span className="text-xs font-bold text-green bg-green/10 border border-green/20 rounded-md px-2.5 py-1 whitespace-nowrap">
                    {r.suggestedKAIC} KAIC
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">--</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

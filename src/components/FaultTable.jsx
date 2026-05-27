import { motion } from 'framer-motion'
import { fmt } from '../utils/fmt.js'

export default function FaultTable({ results }) {
  return (
    <div className="bg-black border border-white/[0.06] rounded-xl overflow-hidden shadow-lg">
      <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.01]">
        <span className="text-[0.65rem] font-bold text-white uppercase tracking-wider">Symmetrical Short-Circuit Profiles</span>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/[0.06] text-muted text-[0.55rem] uppercase tracking-wider font-semibold bg-[#070707]">
            <th className="px-4 py-2.5 font-medium">Node Point</th>
            <th className="px-4 py-2.5 font-medium">Location / System Node</th>
            <th className="text-right px-4 py-2.5 font-medium">Fault Current (Isc)</th>
            <th className="text-right px-4 py-2.5 font-medium">Breaker Recommendation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03] font-mono text-[0.7rem]">
          {results.map((r, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className="hover:bg-white/[0.01] transition-colors"
            >
              <td className="px-4 py-2.5">
                <span className="font-bold text-primary">{r.point}</span>
              </td>
              <td className="px-4 py-2.5 font-sans text-xs text-white/80">{r.label}</td>
              <td className="px-4 py-2.5 text-right text-white font-bold">{fmt(r.isc, 2)} A</td>
              <td className="px-4 py-2.5 text-right font-sans">
                {r.suggestedKAIC ? (
                  <span className="text-[0.6rem] font-bold text-green bg-green/10 border border-green/20 rounded-md px-2 py-0.5 whitespace-nowrap">
                    {r.suggestedKAIC} KAIC
                  </span>
                ) : (
                  <span className="text-[0.6rem] text-muted/40">--</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import HeroResult from './HeroResult.jsx'
import FaultCards from './FaultCards.jsx'
import StepsPanel from './StepsPanel.jsx'

export default function MainPanel({
  activeTab, vdResult, scResult, vdValues, onVdCalculate, onScCalculate, segments,
}) {
  if (activeTab === 'vdrop') {
    return (
      <main className="flex-1 bg-[#1a1a2a] border border-[#333355] rounded-xl p-8 flex flex-col gap-5 min-w-0">
        <h2 className="text-xl font-bold text-[#f0f0f5]">Voltage Drop Result</h2>

        {vdResult ? (
          <>
            <div className="bg-[#22223a] border border-[#333355] rounded-xl p-6">
              <div className="flex items-baseline gap-8">
                <div>
                  <div className="text-xs font-medium text-[#8888aa] uppercase tracking-wide mb-1">Voltage Drop</div>
                  <div className="font-mono text-2xl font-bold text-[#3b82f6]">{vdResult.vDrop.toFixed(3)} <span className="text-sm font-medium text-[#8888aa]">V</span></div>
                </div>
                <div className="w-px h-10 bg-[#333355]" />
                <div>
                  <div className="text-xs font-medium text-[#8888aa] uppercase tracking-wide mb-1">Percent Drop</div>
                  <div className="font-mono text-2xl font-bold text-[#22c55e]">{vdResult.percent.toFixed(2)} <span className="text-sm font-medium text-[#8888aa]">%</span></div>
                </div>
              </div>
            </div>

            <div className="bg-[#22223a] border border-[#333355] rounded-xl p-5">
              <h4 className="text-sm font-semibold text-[#f0f0f5] mb-3">Step-by-Step Solution</h4>
              <div className="font-mono text-sm space-y-1.5 text-[#f0f0f5]">
                <p>
                  <span className="text-[#3b82f6] font-semibold">Vd</span>
                  <span className="text-[#f59e0b] font-bold mx-1">=</span>
                  {vdValues.phaseType == 1 ? 2 : '√3'} &times; {vdValues.distance} &times; {vdValues.current} &times; √(R²+X²) / 305
                  <span className="text-[#f59e0b] font-bold mx-1">=</span>
                  <span className="text-[#22d3ee] font-semibold">{vdResult.vDrop.toFixed(3)} V</span>
                </p>
                <p>
                  <span className="text-[#f0f0f5]">%</span>
                  <span className="text-[#f59e0b] font-bold mx-1">=</span>
                  {vdResult.vDrop.toFixed(3)} / {vdValues.sysVoltage} &times; 100
                  <span className="text-[#f59e0b] font-bold mx-1">=</span>
                  <span className="text-[#22d3ee] font-semibold">{vdResult.percent.toFixed(2)}%</span>
                </p>
              </div>
            </div>

            {vdValues.sysVoltage && (
              <div className="bg-[#22223a] border border-[#333355] rounded-xl p-5 flex items-center gap-4">
                <img src="/images/vdFormula.png" alt="Formula" className="h-12" />
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-[#8888aa]">Enter values and click Calculate</p>
          </div>
        )}
      </main>
    )
  }

  return (
    <main className="flex-1 bg-[#1a1a2a] border border-[#333355] rounded-xl p-8 flex flex-col gap-5 min-w-0 overflow-y-auto">
      <h2 className="text-xl font-bold text-[#f0f0f5]">Short Circuit Result</h2>

      {scResult ? (
        <>
          <HeroResult
            isc1={scResult.isc1}
            suggestedKAIC={scResult.results[0]?.suggestedKAIC}
          />
          <FaultCards results={scResult.results} />
          <StepsPanel steps={scResult.steps} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-[#8888aa]">Enter values and click Calculate</p>
        </div>
      )}
    </main>
  )
}

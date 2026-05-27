import VoltageDropForm from './VoltageDropForm.jsx'
import ShortCircuitForm from './ShortCircuitForm.jsx'

export default function SidePanel({
  activeTab, vdValues, onVdChange, onVdCalculate,
  scValues, onScChange, segments, onSegmentUpdate,
  onSegmentAdd, onSegmentRemove, onScCalculate,
}) {
  return (
    <aside className="w-[35%] min-w-[320px] max-w-[400px] bg-[#22223a] border border-[#333355] rounded-xl p-6 mr-5 flex flex-col gap-4 overflow-y-auto">
      {activeTab === 'vdrop' ? (
        <VoltageDropForm
          values={vdValues}
          onChange={onVdChange}
          onCalculate={onVdCalculate}
        />
      ) : (
        <ShortCircuitForm
          values={scValues}
          onChange={onScChange}
          segments={segments}
          onSegmentUpdate={onSegmentUpdate}
          onSegmentAdd={onSegmentAdd}
          onSegmentRemove={onSegmentRemove}
          onCalculate={onScCalculate}
        />
      )}
    </aside>
  )
}

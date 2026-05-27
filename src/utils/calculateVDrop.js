export function calculateVDrop(values) {
  const { phaseType, distance, current, r, x, sysVoltage } = values;
  const k = phaseType === 1 ? 2 : 1.732;
  const rOhm = r / 305;
  const xOhm = x / 305;
  const impedance = Math.sqrt(rOhm * rOhm + xOhm * xOhm);
  const vDropVal = k * distance * current * impedance;
  const percentDrop = (vDropVal / sysVoltage) * 100;
  return { vDrop: vDropVal, percent: percentDrop };
}

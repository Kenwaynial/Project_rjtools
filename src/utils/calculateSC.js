import { fmt } from './fmt.js'

const KAIC_RATINGS = [10, 14, 18, 22, 25, 35, 42, 50, 65, 100, 150, 200];

export function suggestKAIC(isc) {
  const ka = isc / 1000;
  for (const r of KAIC_RATINGS) {
    if (r >= ka) return r;
  }
  return null;
}

export function calculateSC(values) {
  const { kva, vll, pctZ, zFactor, segments } = values;
  if (!kva || !vll || !pctZ) return null;

  const sqrt3 = 1.7320508;
  const itr = (kva * 1000) / (sqrt3 * vll);
  const m1 = 100 / (pctZ * zFactor);
  const isc1 = itr * m1;

  const results = [{ point: 'F1', isc: isc1, label: 'Transformer' }];
  const steps = [
    { var: 'I_tr', expr: `${fmt(kva)} × 1000 / (√3 × ${fmt(vll)})`, result: `${fmt(itr, 2)} A` },
    { var: 'M₁', expr: `100 / (${pctZ} × ${zFactor})`, result: `${fmt(m1, 3)}` },
    { var: 'F₁', expr: `${fmt(itr, 2)} × ${fmt(m1, 3)}`, result: `${fmt(isc1, 2)} A` },
  ];

  let iscPrev = isc1;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (!seg.len || !seg.c) continue;
    const len = seg.unit === 'm' ? seg.len * 3.28084 : seg.len;
    const pt = `F${i + 2}`;
    const f = (sqrt3 * len * iscPrev) / (seg.c * seg.n * vll);
    const m = 1 / (1 + f);
    const iscNext = iscPrev * m;

    steps.push({
      var: `F${i + 2}`,
      expr: `√3 × ${fmt(seg.len, 1)} × ${fmt(iscPrev, 2)} / (${fmt(seg.c)} × ${seg.n} × ${fmt(vll)})`,
      result: `${fmt(f, 3)}`,
      sub: true,
    });
    steps.push({
      var: `M${i + 2}`,
      expr: `1 / (1 + ${fmt(f, 3)})`,
      result: `${fmt(m, 3)}`,
      sub: true,
    });
    steps.push({
      var: pt,
      expr: `${fmt(iscPrev, 2)} × ${fmt(m, 3)}`,
      result: `${fmt(iscNext, 2)} A`,
      sub: false,
    });

    results.push({
      point: pt,
      isc: iscNext,
      label: `After Seg ${i + 1}`,
      suggestedKAIC: suggestKAIC(iscNext),
    });
    iscPrev = iscNext;
  }

  results[0].suggestedKAIC = suggestKAIC(isc1);

  return { results, steps, itr: fmt(itr, 2), m1: fmt(m1, 3), isc1: fmt(isc1, 2) };
}



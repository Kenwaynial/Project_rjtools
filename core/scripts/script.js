function calculateOhms() {
  const v = parseFloat(document.getElementById('voltage').value);
  const i = parseFloat(document.getElementById('current').value);
  const r = parseFloat(document.getElementById('resistance').value);
  let result = '';
  if (!isNaN(v) && !isNaN(i)) {
    result = `Resistance: ${(v/i).toFixed(2)} Ω`;
  } else if (!isNaN(v) && !isNaN(r)) {
    result = `Current: ${(v/r).toFixed(2)} A`;
  } else if (!isNaN(i) && !isNaN(r)) {
    result = `Voltage: ${(i*r).toFixed(2)} V`;
  } else {
    result = 'Enter any two values to calculate the third.';
  }
  document.getElementById('result').innerText = result;
}

function calculateVDrop() {
  const phaseType = parseInt(document.getElementById('phaseType').value);
  const k = (phaseType === 1) ? 2 : 1.732;
  const d = parseFloat(document.getElementById('distance').value);
  const i = parseFloat(document.getElementById('current2').value);
  let r = parseFloat(document.getElementById('r').value);
  let x = parseFloat(document.getElementById('x').value);
  const sysV = parseFloat(document.getElementById('sysVoltage').value);
  let vdrop = '';
  let percent = '';
  if (!isNaN(k) && !isNaN(d) && !isNaN(i) && !isNaN(r) && !isNaN(x) && !isNaN(sysV) && sysV !== 0) {
    r = r / 305;
    x = x / 305;
    const impedance = Math.sqrt(r*r + x*x);
    const vDropVal = k * d * i * impedance;
    const percentDrop = (vDropVal / sysV) * 100;
    vdrop = `Voltage Drop: ${vDropVal.toFixed(3)} V`;
    percent = `Percent Voltage Drop: ${percentDrop.toFixed(2)} %`;
  } else {
    vdrop = 'Please fill in all fields.';
    percent = '';
  }
  document.getElementById('vdropResult').innerHTML = `<div>${vdrop}</div><div>${percent}</div>`;
  const resultSection = document.getElementById('resultSection');
  if (resultSection) {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ====== Tab Switching ======
function switchTab(tabName) {
  document.querySelectorAll('.nav-tabs .tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.nav-tabs .tab[data-tab="${tabName}"]`);
  if (tab) tab.classList.add('active');

  document.querySelectorAll('.sidebar .tab-panel').forEach(p => p.classList.remove('active'));
  const sidebarPanel = document.querySelector(`.sidebar .tab-panel[data-tab="${tabName}"]`);
  if (sidebarPanel) sidebarPanel.classList.add('active');

  document.querySelectorAll('.content .tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll(`.content .tab-panel[data-tab="${tabName}"]`).forEach(p => p.classList.add('active'));
  return false;
}

// ====== Segment Management ======
let segmentCount = 0;

const C_VALUES = {
  '#14 AWG': 389, '#12 AWG': 617, '#10 AWG': 981, '#8 AWG': 1557,
  '#6 AWG': 2425, '#4 AWG': 3806, '#3 AWG': 4774, '#2 AWG': 5907,
  '#1 AWG': 7293, '1/0 AWG': 8925, '2/0 AWG': 10755, '3/0 AWG': 12844,
  '4/0 AWG': 15082, '250 kcmil': 16483, '300 kcmil': 18177,
  '350 kcmil': 19704, '400 kcmil': 20566, '500 kcmil': 22185,
  '600 kcmil': 22965, '750 kcmil': 24137, '1000 kcmil': 25278
};

function conductorOptions() {
  return Object.entries(C_VALUES).map(([name, val]) =>
    `<option value="${val}">${name} (${fmt(val)})</option>`
  ).join('');
}

function createSegmentHTML(index) {
  const unit = document.getElementById('scUnit')?.value || 'ft';
  return `<div class="sc-segment" data-index="${index}">
  <h5 class="segment-title">Segment ${index + 1}</h5>
  <select class="sc-conductor" onchange="setCValue(this)">
    <option value="">— Conductor size —</option>
    ${conductorOptions()}
  </select>
  <input type="number" class="sc-length" placeholder="Length (${unit})" step="any">
  <input type="number" class="sc-c" placeholder="C Value (or select above)" step="any">
  <input type="number" class="sc-n" placeholder="Parallels (n)" value="1" min="1" step="1">
  ${index > 0 ? '<button type="button" class="remove-seg" onclick="removeSegment(this)">− Remove</button>' : ''}
</div>`;
}

function setCValue(select) {
  if (select.value) {
    select.closest('.sc-segment').querySelector('.sc-c').value = select.value;
  }
}

function addSegment() {
  segmentCount++;
  document.getElementById('scSegments').insertAdjacentHTML('beforeend', createSegmentHTML(segmentCount));
}

function removeSegment(btn) {
  btn.closest('.sc-segment').remove();
  document.querySelectorAll('#scSegments .sc-segment').forEach((el, i) => {
    el.dataset.index = i;
    el.querySelector('.segment-title').textContent = `Segment ${i + 1}`;
  });
  segmentCount = document.querySelectorAll('#scSegments .sc-segment').length - 1;
}

// ====== Short Circuit Calculation ======
function calculateSC() {
  const kva = parseFloat(document.getElementById('scKva').value);
  const vll = parseFloat(document.getElementById('scVll').value);
  const pctZ = parseFloat(document.getElementById('scPctZ').value);
  const zFactor = Math.min(1.2, Math.max(0.8, parseFloat(document.getElementById('scZFactor').value) || 1.0));
  const unit = document.getElementById('scUnit').value;

  if (!kva || kva <= 0) { showSCError('Enter valid transformer kVA.'); return; }
  if (!vll || vll <= 0) { showSCError('Enter valid secondary voltage (VLL).'); return; }
  if (!pctZ || pctZ <= 0) { showSCError('Enter valid %Z impedance.'); return; }

  const segments = [];
  let hasInvalid = false;
  document.querySelectorAll('#scSegments .sc-segment').forEach(el => {
    let len = parseFloat(el.querySelector('.sc-length').value) || 0;
    const c = parseFloat(el.querySelector('.sc-c').value) || 0;
    const n = parseInt(el.querySelector('.sc-n').value) || 1;
    const rawLen = len;
    if (unit === 'm') len *= 3.28084;
    if (len <= 0 || c <= 0) hasInvalid = true;
    segments.push({ len, c, n, rawLen });
  });

  if (hasInvalid) { showSCError('Fill in all cable segment fields.'); return; }

  const sqrt3 = 1.7320508;
  const itr = (kva * 1000) / (sqrt3 * vll);
  const m1 = 100 / (pctZ * zFactor);
  const isc1 = itr * m1;

  const results = [{ point: 'F1', isc: isc1 }];
  const steps = [
    `Itr = ${fmt(kva)} × 1000 / (√3 × ${fmt(vll)}) = ${fmt(itr, 2)} A`,
    `M1 = 100 / (${pctZ} × ${zFactor}) = ${fmt(m1, 3)}`,
    `Isc1 = ${fmt(itr, 2)} × ${fmt(m1, 3)} = ${fmt(isc1, 2)} A`
  ];

  let iscPrev = isc1;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const pt = `F${i + 2}`;
    const f = (sqrt3 * seg.len * iscPrev) / (seg.c * seg.n * vll);
    const m = 1 / (1 + f);
    const iscNext = iscPrev * m;

    steps.push(
      `F = √3 × ${fmt(seg.rawLen, 1)} ${unit} × ${fmt(iscPrev, 2)} / (${fmt(seg.c)} × ${seg.n} × ${fmt(vll)}) = ${fmt(f, 3)}`,
      `M = 1 / (1 + ${fmt(f, 3)}) = ${fmt(m, 3)}`,
      `Isc${pt} = ${fmt(iscPrev, 2)} × ${fmt(m, 3)} = ${fmt(iscNext, 2)} A`
    );

    results.push({ point: pt, isc: iscNext });
    iscPrev = iscNext;
  }

  displaySCResults(results, steps);
}

function displaySCResults(results, steps) {
  const rows = results.map(r => {
    const kaic = r.isc !== null ? suggestKAIC(r.isc) : '—';
    return `<tr><td><strong>${r.point}</strong></td><td>${r.isc !== null ? fmt(r.isc, 2) + ' A' : 'N/A'}</td><td>${kaic !== '—' ? kaic + ' KAIC' : '—'}</td></tr>`;
  }).join('');

  const stepsHtml = steps.map(s => `<li style="margin-bottom:0.4rem;color:#ccc;font-size:0.92rem;">${s}</li>`).join('');

  document.getElementById('scResult').innerHTML = `
    <div class="sc-results-box">
      <table class="sc-table">
        <thead><tr><th>Fault Point</th><th>Isc (Symmetrical RMS)</th><th>Suggested Breaker KAIC</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div style="height:1.5rem;"></div>
    <div class="solution-align">
      <h4>Step-by-Step Solution</h4>
      <ol style="padding-left:1.2rem;">${stepsHtml}</ol>
    </div>
    <div style="height:1rem;"></div>
    ${generateDiagram(results)}`;

  const scSection = document.getElementById('scSection');
  if (scSection) scSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function generateDiagram(results) {
  if (!results.length) return '';
  const pts = results.map(r => `●${r.point}`).join(' → ');
  const labels = results.map(r => r.isc !== null ? fmt(r.isc, 0) + ' A' : '—').join('      ');
  const dots = results.map(() => '  |    ').join('      ');
  return `<div style="margin-top:1rem;padding:1rem;background:#1a1a2e;border-radius:10px;border:1px solid #333;">
    <h4 style="color:#8e7cff;margin:0 0 0.6rem 0;">Single-Line Diagram</h4>
    <pre style="color:#ccc;font-family:'Courier New',monospace;font-size:0.82rem;line-height:1.5;margin:0;">[Utility] → [Transformer] → ${pts} → [Load]
${' '.repeat(20)}${labels}</pre>
  </div>`;
}

function showSCError(msg) {
  document.getElementById('scResult').innerHTML = `<div class="result-box premium-result"><div class="result-content"><p class="result-main">${msg}</p></div></div>`;
}

function suggestKAIC(isc) {
  const ratings = [10, 14, 18, 22, 25, 35, 42, 50, 65, 100, 150, 200];
  const ka = isc / 1000;
  for (const r of ratings) { if (r >= ka) return r; }
  return '> 200';
}

function fmt(n, decimals) {
  if (n == null || isNaN(n)) return '0';
  if (decimals === undefined) decimals = 2;
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

// ====== Init ======
document.addEventListener('DOMContentLoaded', function () {
  segmentCount = 0;
  const segContainer = document.getElementById('scSegments');
  if (segContainer) segContainer.insertAdjacentHTML('beforeend', createSegmentHTML(0));

  document.getElementById('scUnit')?.addEventListener('change', function () {
    const unit = this.value;
    document.querySelectorAll('.sc-segment .sc-length').forEach(inp => { inp.placeholder = `Length (${unit})`; });
  });
});

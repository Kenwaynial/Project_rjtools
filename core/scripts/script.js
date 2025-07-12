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
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

export function fmt(n, decimals = 2) {
  if (n == null || isNaN(n)) return '0';
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

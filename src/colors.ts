export type Color = { r: number; g: number; b: number; a: number };
export const invert = (c: Color): Color => ({ r: 255 - c.r, g: 255 - c.g, b: 255 - c.b, a: c.a });
export const hex = (c: Color, alpha = true) => '#' + [c.r, c.g, c.b, ...(alpha && c.a < 1 ? [Math.round(c.a * 255)] : [])].map(n => n.toString(16).padStart(2, '0')).join('').toUpperCase();
export const rgb = (c: Color) => `rgb(${c.r}, ${c.g}, ${c.b})`;
export const rgba = (c: Color) => `rgba(${c.r}, ${c.g}, ${c.b}, ${Number(c.a.toFixed(3))})`;
export function parseColor(value: string): Color | null {
  const s = value.trim();
  const h = s.match(/^#?([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i);
  if (h) {
    let v = h[1]!;
    if (v.length < 5) v = [...v].map(x => x + x).join('');
    return { r: parseInt(v.slice(0, 2), 16), g: parseInt(v.slice(2, 4), 16), b: parseInt(v.slice(4, 6), 16), a: v.length === 8 ? parseInt(v.slice(6, 8), 16) / 255 : 1 };
  }
  const m = s.match(/^(rgb|rgba)\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (!m || (m[1]!.toLowerCase() === 'rgba' && m[5] === undefined)) return null;
  const [r, g, b, a] = [Number(m[2]), Number(m[3]), Number(m[4]), m[5] === undefined ? 1 : Number(m[5])];
  if ([r!, g!, b!].some(n => !Number.isInteger(n) || n > 255) || a! > 1) return null;
  return { r: r!, g: g!, b: b!, a: a! };
}

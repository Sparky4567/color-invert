import { useState } from 'react';
import { hex, invert, parseColor, rgb, rgba, type Color } from './colors';
import './index.css';

function CopyIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg> }
const examples = ['#B8A4ED', '#F4AE9D', '#A7CDBD', '#F0D384', '#8FBADD', '#DCA7C6'];
export function App() {
  const [color, setColor] = useState<Color>({ r: 184, g: 164, b: 237, a: 1 });
  const [input, setInput] = useState('#B8A4ED');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const [notice, setNotice] = useState('');
  const inverse = invert(color);
  function update(c: Color) { setColor(c); setInput(hex(c)); setError(''); }
  function apply(value: string) { setInput(value); const parsed = parseColor(value); if (parsed) { setColor(parsed); setError(''); } else setError('Enter a valid HEX, rgb(), or rgba() color.'); }
  async function copy(value: string, id: string) { try { await navigator.clipboard.writeText(value); setCopied(id); setNotice(`${value} copied to clipboard`); setTimeout(() => setCopied(current => current === id ? '' : current), 1800); } catch { setNotice('Clipboard unavailable. Select and copy the code directly.'); } }
  function card(c: Color, inverted: boolean) { return <section className="color-card">
    <div className="card-heading"><span className={'dot ' + (inverted ? 'green' : '')}/><h2>{inverted ? 'Inverted color' : 'Original color'}</h2><span className="card-tag">{inverted ? 'OUTPUT' : 'INPUT'}</span></div>
    <div className="swatch checker"><div style={{ background: rgba(c), color: (c.r * .299 + c.g * .587 + c.b * .114) > 150 ? '#202022' : '#fff' }}><span className="swatch-label">{inverted ? 'The other side.' : 'Your starting point.'}</span><span className="swatch-hex">{hex(c)}</span>{!inverted && <label className="picker-button" title="Choose a color"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m14 4 6 6M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 6z"/></svg><input aria-label="Choose original color" type="color" value={hex(c, false)} onChange={e => { const picked = parseColor(e.target.value)!; update({ ...picked, a: c.a }); }}/></label>}</div></div>
    <div className="codes">{[['HEX', hex(c)], ['RGB', rgb(c)], ['RGBA', rgba(c)]].map(([label, value]) => { const id = `${inverted}-${label}`; return <div className="code-row" key={label}><span>{label}</span><code>{value}</code><button aria-label={`Copy ${inverted ? 'inverted' : 'original'} ${label}`} onClick={() => copy(value!, id)}>{copied === id ? <span className="check">✓</span> : <CopyIcon/>}</button></div>; })}</div>
  </section> }
  return <div className="site"><header><a className="brand" href="/" aria-label="Invert home"><span className="brand-icon">◐</span> invert<span className="brand-period">.</span></a><span className="header-note">A little shift in perspective <span>↗</span></span></header>
    <main><div className="intro"><span className="eyebrow"><span/> THE COLOR INVERSION TOOL</span><h1>Every color has<br/>an <span>opposite.</span></h1><p>Find yours. Pick a color, flip its perspective, and copy<br className="desktop-break"/> the perfect inverse in any format.</p></div>
    <div className="workspace"><div className="toolbar"><div className="input-group"><label htmlFor="color-input">Start with a color</label><div className={'text-input ' + (error ? 'invalid' : '')}><span style={{ background: rgba(color) }}/><input id="color-input" value={input} placeholder="#B8A4ED or rgb(184, 164, 237)" onChange={e => apply(e.target.value)} aria-invalid={!!error} aria-describedby="input-help"/><span className="return-icon">↵</span></div><p id="input-help" className={error ? 'error' : ''}>{error || 'Paste a HEX, RGB, or RGBA value. We’ll take it from there.'}</p></div><button className="random-button" onClick={() => update({ r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256), a: 1 })}><span>⤨</span> Surprise me</button></div>
    <div className="cards">{card(color, false)}<button className="swap" aria-label="Swap original and inverted colors" title="Swap colors" onClick={() => update(inverse)}>⇄</button>{card(inverse, true)}</div>
    <div className="adjustments"><div className="adjust-title"><h3>Fine-tune your color</h3><span>Make it just right.</span></div><div className="sliders">{(['r', 'g', 'b', 'a'] as const).map((channel, i) => <label className="slider-control" key={channel}><span>{['Red', 'Green', 'Blue', 'Opacity'][i]}<b>{channel === 'a' ? `${Math.round(color.a * 100)}%` : color[channel]}</b></span><input aria-label={['Red', 'Green', 'Blue', 'Opacity'][i]} type="range" min="0" max={channel === 'a' ? 100 : 255} value={channel === 'a' ? color.a * 100 : color[channel]} style={{ accentColor: ['#c9948b', '#83a88b', '#8f9fc7', '#a3a09a'][i] }} onChange={e => update({ ...color, [channel]: Number(e.target.value) / (channel === 'a' ? 100 : 1) })}/></label>)}</div></div></div>
    <div className="examples"><span>A little inspiration</span><div>{examples.map(value => <button key={value} aria-label={`Use ${value}`} title={value} style={{ background: value }} onClick={() => update(parseColor(value)!)}/>)}</div><span className="examples-note">Pick a shade. See the other side.</span></div>
    <aside className="how"><span className="info-icon">i</span><p><strong>A simple flip. A whole new color.</strong> Inversion subtracts each RGB channel from 255.<br/>Your opacity stays the same. Your possibilities open up.</p><code>255 − R · 255 − G · 255 − B</code></aside></main>
    <footer><span>Made for curious minds & colorful ideas.</span><span>All colors welcome. <span className="footer-dot">✳</span></span></footer><div role="status" className="sr-only">{notice}</div></div>;
}
export default App;

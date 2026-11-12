// Ortak: fontlar, araç (VIP Vito) SVG, render yardımcısı
const fs = require('fs'), path = require('path');
const NM = process.env.NM || path.join(process.cwd(), 'node_modules');
const fd = path.join(NM, '@fontsource');
const font = (pkg, w) => { try { return fs.readFileSync(`${fd}/${pkg}/${w}.css`, 'utf8').replace(/url\(\.\/files\//g, `url(file://${fd}/${pkg}/files/`); } catch { return ''; } };
const FONTS = ['400','500','600','700','800'].map(w => font('plus-jakarta-sans', w)).join('') + font('jetbrains-mono', '700');
// Yandan görünüm siyah Mercedes Vito tarzı VIP minivan
const VAN = (body = '#121614', stripe = '#C9A24B') => `<svg viewBox="0 0 620 230" width="100%" style="display:block;overflow:visible">
 <defs><linearGradient id="vb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A302D"/><stop offset=".45" stop-color="${body}"/><stop offset="1" stop-color="#050706"/></linearGradient>
 <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A5560"/><stop offset="1" stop-color="#1B2026"/></linearGradient>
 <linearGradient id="lb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF6D8" stop-opacity=".9"/><stop offset="1" stop-color="#FFF6D8" stop-opacity="0"/></linearGradient></defs>
 <path d="M592 128 L720 108 L720 168 L592 150Z" fill="url(#lb)" opacity=".55"/>
 <path d="M14 168 V70 Q14 38 46 36 L392 30 Q418 30 436 44 L520 108 Q588 118 596 140 L598 168 Q598 180 586 180 H26 Q14 180 14 168Z" fill="url(#vb)"/>
 <path d="M36 54 L388 46 Q404 46 416 56 L486 108 L36 108Z" fill="url(#vg)"/>
 <rect x="150" y="48" width="5" height="62" fill="#0B0E0C"/><rect x="290" y="46" width="5" height="64" fill="#0B0E0C"/><rect x="402" y="50" width="4" height="58" fill="#0B0E0C"/>
 <path d="M18 122 H594" stroke="${stripe}" stroke-width="4"/>
 <rect x="16" y="110" width="12" height="28" rx="3" fill="#B3261E"/><rect x="580" y="128" width="16" height="10" rx="3" fill="#FFF3C4"/>
 ${[110, 490].map(x => `<circle cx="${x}" cy="180" r="44" fill="#050605"/><circle cx="${x}" cy="180" r="30" fill="#2B302E"/><circle cx="${x}" cy="180" r="27" fill="none" stroke="#7D8580" stroke-width="3"/>${[0,72,144,216,288].map(a => `<line x1="${x}" y1="180" x2="${x + 24 * Math.cos(a * Math.PI / 180)}" y2="${180 + 24 * Math.sin(a * Math.PI / 180)}" stroke="#8C948F" stroke-width="5" stroke-linecap="round"/>`).join('')}<circle cx="${x}" cy="180" r="7" fill="${stripe}"/>`).join('')}
</svg>`;
async function render(items, outDir, w = 1080, h = 1350) {
  const { chromium } = require(path.join(NM, 'playwright'));
  fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w, height: h } });
  for (const [file, html] of items) {
    const tmp = path.join(outDir, '_t.html'); fs.writeFileSync(tmp, html);
    await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(120);
    await p.screenshot({ path: path.join(outDir, file), type: 'jpeg', quality: 92 });
  }
  fs.rmSync(path.join(outDir, '_t.html'), { force: true }); await b.close();
}
module.exports = { FONTS, VAN, render };

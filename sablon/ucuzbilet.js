// Ucuz Bilet v2 şablonu: A = koyu yeşil + beyaz biniş kartı, B = nane zemin + koyu yeşil kart, V = VIP Vito + 3 bilgi kartı, STORY = 1080x1920 hikâye/Reels karesi
const { FONTS, VAN } = require('./ortak');
const DG = '#0F5C3A', G = '#1E8A55', LG = '#7FE0A8', MINT = '#E3F5EA';
const PLANE = (c = '#fff', s = 26) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" fill="${c}" transform="rotate(90 12 12)"/></svg>`;
const LOGO = (dark) => `<div style="display:flex;align-items:center;gap:12px"><span style="width:46px;height:46px;border-radius:13px;background:${dark ? '#fff' : G};display:grid;place-items:center">${PLANE(dark ? G : '#fff', 26)}</span><span style="font-size:32px;font-weight:800;letter-spacing:-.5px;color:${dark ? '#fff' : DG}">ucuz<span style="font-weight:600;opacity:.85">biletbak</span></span></div>`;
const BAR = (c) => `<svg width="70" height="150">${Array.from({ length: 18 }, (_, i) => `<rect x="${i * 4}" y="0" width="${[2, 1, 3, 1, 2][i % 5]}" height="150" fill="${c}"/>`).join('')}</svg>`;
function PASS(o, dark) { // dark: koyu yeşil kart (B stili)
  const bg = dark ? DG : '#fff', fg = dark ? '#fff' : '#0B2A1B', mut = dark ? '#9FD9B8' : '#6B8577', acc = dark ? LG : G;
  const cell = (k, v) => `<div><div style="font-size:15px;font-weight:800;letter-spacing:2px;color:${mut}">${k}</div><div style="font-size:26px;font-weight:800;color:${fg};margin-top:4px">${v}</div></div>`;
  return `<div style="position:relative;margin:0 60px;border-radius:30px;background:${bg};box-shadow:0 40px 80px rgba(0,0,0,.28);display:flex;transform:rotate(-2deg)">
   <div style="flex:1;padding:30px 40px">
    <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;letter-spacing:3px;color:${mut}"><span>BOARDING PASS</span><span style="color:${acc}">+ UCUZBİLETBAK</span></div>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:22px">
     <div><div style="font-size:15px;font-weight:800;letter-spacing:2px;color:${mut}">NEREDEN</div><div style="font-family:'JetBrains Mono';font-size:96px;font-weight:700;color:${fg};line-height:1">${o.from}</div><div style="font-size:22px;color:${mut};margin-top:4px">${o.fromCity}</div></div>
     <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:0 20px 40px"><span style="flex:1;border-top:3px dotted ${acc}"></span>${PLANE(acc, 40)}<span style="flex:1;border-top:3px dotted ${acc}"></span></div>
     <div style="text-align:right"><div style="font-size:15px;font-weight:800;letter-spacing:2px;color:${mut}">NEREYE</div><div style="font-family:'JetBrains Mono';font-size:96px;font-weight:700;color:${acc};line-height:1">${o.to}</div><div style="font-size:22px;color:${mut};margin-top:4px">${o.toCity}</div></div></div>
    <div style="display:flex;justify-content:space-between;margin-top:26px;padding-top:22px;border-top:2px dashed ${dark ? '#2C7A55' : '#D5E6DC'}">${cell('KAPI', o.gate || 'B13')}${cell('KOLTUK', o.seat || '14A')}${cell('SINIF', 'EKONOMİ')}${cell('E-BİLET', 'ANINDA')}</div>
   </div>
   <div style="width:110px;border-left:3px dashed ${dark ? '#2C7A55' : '#D5E6DC'};display:grid;place-items:center">${BAR(fg)}</div></div>`;
}
function post(o) { // o.style: 'A' | 'B'; o.kicker, o.h1a, o.h1b, o.from, o.to, o.fromCity, o.toCity, o.ghost, o.tag
  const dark = o.style !== 'B';
  const bg = dark ? `radial-gradient(circle at 80% 20%,#2E9B63 0,transparent 45%),linear-gradient(160deg,#1C7A4B,#0B4A2D)` : MINT;
  const fg = dark ? '#fff' : DG, sub = dark ? LG : G;
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>${FONTS}*{margin:0;box-sizing:border-box}</style></head><body>
<div style="width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'Plus Jakarta Sans';background:${bg}">
 <div style="position:absolute;right:-30px;bottom:150px;font-family:'Plus Jakarta Sans';font-weight:800;font-size:420px;letter-spacing:-20px;color:${dark ? 'rgba(255,255,255,.06)' : 'rgba(15,92,58,.07)'}">${o.ghost || o.to}</div>
 <div style="position:relative;padding:64px 70px 0;display:flex;justify-content:space-between;align-items:center">${LOGO(dark)}<span style="font-size:22px;font-weight:700;color:${fg};border:2px solid ${dark ? 'rgba(255,255,255,.35)' : 'rgba(15,92,58,.3)'};border-radius:999px;padding:10px 22px">${o.tag || 'Yurt dışı uçuşlar'}</span></div>
 <div style="position:relative;padding:56px 70px 0"><div style="font-size:24px;font-weight:800;letter-spacing:5px;color:${sub}">${o.kicker}</div>
  <div style="font-size:92px;font-weight:800;letter-spacing:-4px;line-height:1;color:${fg};margin-top:18px">${o.h1a}<br><span style="color:${sub}">${o.h1b}</span></div></div>
 <div style="position:relative;margin-top:60px">${PASS(o, !dark)}</div>
 <div style="position:absolute;left:70px;right:70px;bottom:150px;display:flex;gap:14px">${(o.chips || ['Yüzlerce havayolu tek aramada', 'Anında e-bilet']).map(c => `<span style="font-size:22px;font-weight:700;color:${fg};background:${dark ? 'rgba(255,255,255,.12)' : 'rgba(15,92,58,.08)'};border-radius:999px;padding:12px 22px">✓ ${c}</span>`).join('')}</div>
 <div style="position:absolute;left:70px;right:70px;bottom:56px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:30px;font-weight:800;background:${dark ? '#fff' : DG};color:${dark ? DG : '#fff'};border-radius:999px;padding:20px 40px">${o.cta || 'Bileti bul'} →</span><span style="font-size:30px;font-weight:800;color:${fg}">ucuzbiletbak.com</span></div>
</div></body></html>`;
}
function vip(o) { // o.kicker, o.h1a, o.h1b, o.cards [[başlık, alt]...]
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>${FONTS}*{margin:0;box-sizing:border-box}</style></head><body>
<div style="width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'Plus Jakarta Sans';background:radial-gradient(ellipse at 60% 62%,#2FA36A 0,transparent 50%),linear-gradient(165deg,#1C7A4B,#09391F)">
 <div style="position:relative;padding:64px 70px 0;display:flex;justify-content:space-between;align-items:center">${LOGO(true)}<span style="font-size:22px;font-weight:700;color:#fff;border:2px solid rgba(255,255,255,.35);border-radius:999px;padding:10px 22px">VIP Vito Transfer</span></div>
 <div style="position:relative;padding:56px 70px 0"><div style="font-size:24px;font-weight:800;letter-spacing:5px;color:${LG}">${o.kicker}</div>
  <div style="font-size:92px;font-weight:800;letter-spacing:-4px;line-height:1;color:#fff;margin-top:18px">${o.h1a}<br><span style="color:${LG}">${o.h1b}</span></div></div>
 <div style="position:absolute;left:70px;right:30px;top:560px"><div style="position:absolute;left:8%;right:8%;bottom:-20px;height:60px;background:radial-gradient(ellipse,rgba(0,0,0,.55),transparent 70%)"></div>${VAN()}</div>
 <div style="position:absolute;left:70px;right:70px;bottom:170px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">${o.cards.map(([a, b]) => `<div style="background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.22);border-radius:24px;padding:24px"><div style="font-size:28px;font-weight:800;color:#fff">${a}</div><div style="font-size:20px;color:#CDEEDB;margin-top:6px">${b}</div></div>`).join('')}</div>
 <div style="position:absolute;left:70px;right:70px;bottom:56px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:30px;font-weight:800;background:#fff;color:${DG};border-radius:999px;padding:20px 40px">Transfer ayırt →</span><span style="font-size:30px;font-weight:800;color:#fff">ucuzbiletbak.com</span></div>
</div></body></html>`;
}
const STORY = (imgPath) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}*{margin:0;box-sizing:border-box}</style></head><body><div style="width:1080px;height:1920px;position:relative;overflow:hidden;font-family:'Plus Jakarta Sans';background:radial-gradient(circle at 50% 30%,#3E8F52 0,#26693A 45%,#173F23 100%)"><img src="file://${imgPath}" style="position:absolute;left:60px;top:250px;width:960px;height:1200px;border-radius:36px;box-shadow:0 40px 90px rgba(0,0,0,.45)"><div style="position:absolute;left:0;right:0;bottom:150px;text-align:center"><span style="display:inline-block;background:#fff;color:#1F5A31;font-weight:800;font-size:44px;padding:22px 52px;border-radius:999px">ucuzbiletbak.com</span></div></div></body></html>`;
module.exports = { post, vip, STORY };

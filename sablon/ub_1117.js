// Ucuz Bilet: 17-19 Kasım gönderileri + 13-19 Kasım Reels kareleri. node ub_1117.js <cikti>
const { post, vip, STORY } = require('./ucuzbilet'); const { render } = require('./ortak');
const fs = require('fs'), path = require('path');
const A = (from, to, fromCity, toCity, kicker, h1a, h1b, extra = {}) => post({ style: 'A', from, to, fromCity, toCity, kicker, h1a, h1b, ...extra });
const B = (from, to, fromCity, toCity, kicker, h1a, h1b, extra = {}) => post({ style: 'B', from, to, fromCity, toCity, kicker, h1a, h1b, ...extra });
const YI = { tag: 'Yurt içi uçuşlar' };
const H = '#ucuzbiletbak #uçakbileti #ucuzbilet #seyahat';
const HV = '#ucuzbiletbak #viptransfer #vipvito #havalimanıtransfer #seyahat';
const POSTS = [
 ['20261117-10', A('IST', 'MUC', 'İstanbul', 'Münih', 'İSTANBUL → MÜNİH', 'Münih’e uç.', 'Noel pazarları açıldı.'), `Münih'e uç. Noel pazarları açıldı. 🇩🇪\n\nMünih uçuşlarını tek aramada karşılaştır, e-biletin anında gelsin.\n\nucuzbiletbak.com\n\n${H} #münih #almanya`],
 ['20261117-15', vip({ kicker: 'VIP VİTO TRANSFER', h1a: 'Havalimanından', h1b: 'otelinize VIP.', cards: [['Sabit fiyat', 'Sürpriz ücret yok'], ['Şoförlü', 'Kapıda karşılama'], ['Geniş araç', 'Bol bagaj alanı']] }), `Havalimanından otelinize VIP. 🚐\n\nŞoförlü VIP Vito, sabit fiyat, geniş bagaj alanı.\n\nRezervasyon: ucuzbiletbak.com/vip-transfer\n\n${HV}`],
 ['20261117-20', B('IST', 'ZRH', 'İstanbul', 'Zürih', 'İSTANBUL → ZÜRİH', 'Zürih’te kış.', 'Alpler çok yakın.'), `Zürih'te kış, Alpler çok yakın. 🇨🇭\n\nİsviçre uçuşlarında birçok havayolunu tek aramada karşılaştır.\n\nucuzbiletbak.com\n\n${H} #zürih #isviçre`],
 ['20261118-10', A('IST', 'CAI', 'İstanbul', 'Kahire', 'İSTANBUL → KAHİRE', 'Piramitlere uç.', 'Kışın güneşe kaç.'), `Piramitlere uç, kışın güneşe kaç. 🇪🇬\n\nKahire uçuşlarını tek aramada karşılaştır, sana uyanı seç.\n\nucuzbiletbak.com\n\n${H} #kahire #mısır`],
 ['20261118-15', B('IST', 'ERZ', 'İstanbul', 'Erzurum', 'İSTANBUL → ERZURUM', 'Palandöken’e uç.', 'Kayak sezonu geldi.', YI), `Palandöken'e uç, kayak sezonu geldi. ⛷️\n\nErzurum uçuşlarını tek aramada karşılaştır; havalimanından otelinize VIP Vito transferini de ekle.\n\nucuzbiletbak.com\n\n${H} #erzurum #palandöken #kayak`],
 ['20261118-20', vip({ kicker: 'AİLE & GRUP', h1a: 'Kalabalık mısınız?', h1b: 'Tek araç yeter.', cards: [['Aile & grup', 'Herkes tek araçta'], ['Bagaj', 'Valizler de sığar'], ['Tek fiyat', 'Araç başına']] }), `Kalabalık mısınız? Tek araç yeter. 🧳\n\nAile ve grup yolculuklarında şoförlü VIP Vito ile havalimanından otelinize, sabit fiyatla.\n\nRezervasyon: ucuzbiletbak.com/vip-transfer\n\n${HV} #ailetatili`],
 ['20261119-10', A('IST', 'RAK', 'İstanbul', 'Marakeş', 'İSTANBUL → MARAKEŞ', 'Marakeş’e uç.', 'Çarşılar seni bekler.'), `Marakeş'e uç, çarşılar seni bekler. 🇲🇦\n\nFas uçuşlarını tek aramada karşılaştır, e-biletin anında gelsin.\n\nucuzbiletbak.com\n\n${H} #marakeş #fas`],
 ['20261119-15', B('IST', 'KSY', 'İstanbul', 'Kars', 'İSTANBUL → KARS', 'Kars’a uç.', 'Kar beyazı bir kaçamak.', YI), `Kars'a uç, kar beyazı bir kaçamak. ❄️\n\nKars uçuşlarını tek aramada karşılaştır; havalimanından otelinize VIP transferi de ekle.\n\nucuzbiletbak.com\n\n${H} #kars #kış`],
 ['20261119-20', A('IST', 'HND', 'İstanbul', 'Tokyo', 'İSTANBUL → TOKYO', 'Tokyo’ya uç.', 'Uzak Doğu yakın.'), `Tokyo'ya uç, Uzak Doğu yakın. 🇯🇵\n\nUzak Doğu uçuşlarında birçok havayolunu tek aramada karşılaştır.\n\nucuzbiletbak.com\n\n${H} #tokyo #japonya`],
];
const EXTRA = [
 ['x01', A('IST', 'BRU', 'İstanbul', 'Brüksel', 'İSTANBUL → BRÜKSEL', 'Brüksel’e uç.', 'Çikolata ve kış ışıkları.')],
 ['x02', B('IST', 'WAW', 'İstanbul', 'Varşova', 'İSTANBUL → VARŞOVA', 'Varşova’ya uç.', 'Uygun bir Avrupa kaçamağı.')],
 ['x03', vip({ kicker: 'VIP VİTO TRANSFER', h1a: 'Kapıdan kapıya,', h1b: 'sabit fiyat.', cards: [['Önceden belli', 'Fiyat baştan net'], ['Kapıda karşılama', 'Şoförünüz hazır'], ['7/24', 'Gece uçuşlarında da']] })],
 ['x04', A('IST', 'BEG', 'İstanbul', 'Belgrad', 'İSTANBUL → BELGRAD', 'Belgrad’a uç.', 'Balkanlar’da hafta sonu.')],
 ['x05', B('IST', 'NAP', 'İstanbul', 'Napoli', 'İSTANBUL → NAPOLİ', 'Napoli’ye uç.', 'Gerçek pizza orada.')],
 ['x06', A('IST', 'ARN', 'İstanbul', 'Stockholm', 'İSTANBUL → STOCKHOLM', 'Stockholm’e uç.', 'Kuzeyin kış masalı.')],
 ['x07', vip({ kicker: 'VIP VİTO TRANSFER', h1a: 'Uçuş saatine göre', h1b: 'karşılama.', cards: [['Uçuş takibi', 'Saatinize göre plan'], ['Şoförlü', 'Kapıda hazır'], ['Konfor', 'Geniş VIP Vito']] })],
 ['x08', B('IST', 'BUS', 'İstanbul', 'Batum', 'İSTANBUL → BATUM', 'Batum’a uç.', 'Karadeniz’in öte yakası.')],
 ['x09', A('IST', 'SKP', 'İstanbul', 'Üsküp', 'İSTANBUL → ÜSKÜP', 'Üsküp’e uç.', 'Tanıdık sokaklar.')],
 ['x10', B('IST', 'NAV', 'İstanbul', 'Kapadokya', 'İSTANBUL → KAPADOKYA', 'Kapadokya’ya uç.', 'Balonlar seni bekler.', YI)],
 ['x11', A('IST', 'JFK', 'İstanbul', 'New York', 'İSTANBUL → NEW YORK', 'New York’a uç.', 'Yılbaşı ışıkları yanıyor.')],
 ['x12', B('IST', 'OSL', 'İstanbul', 'Oslo', 'İSTANBUL → OSLO', 'Oslo’ya uç.', 'Fiyortlar ve kuzey ışığı.')],
];
const out = process.argv[2] || 'cikti';
(async () => {
  await render([...POSTS.map(([d, h]) => [`ub-${d}.jpg`, h]), ...EXTRA.map(([k, h]) => [`ub-${k}.jpg`, h])], out);
  const all = [...POSTS.map(([d]) => `ub-${d}.jpg`), ...EXTRA.map(([k]) => `ub-${k}.jpg`)];
  await render(all.map(f => [f.replace('ub-', 'st-'), STORY(path.resolve(out, f))]), out, 1080, 1920);
  fs.writeFileSync(path.join(out, 'posts.json'), JSON.stringify(POSTS.map(([d, , t]) => ({ file: `ub-${d}.jpg`, date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T${d.slice(9, 11)}:00:00`, text: t })), null, 1));
  console.log(all.length);
})();

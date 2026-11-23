// Ucuz Bilet: 23-29 Kasım gönderileri + günlük Reels kareleri. node ub_1123.js <cikti>
const { post, vip, STORY } = require('./ucuzbilet'); const { render } = require('./ortak');
const fs = require('fs'), path = require('path');
const A = (from, to, fromCity, toCity, kicker, h1a, h1b, extra = {}) => post({ style: 'A', from, to, fromCity, toCity, kicker, h1a, h1b, ...extra });
const B = (from, to, fromCity, toCity, kicker, h1a, h1b, extra = {}) => post({ style: 'B', from, to, fromCity, toCity, kicker, h1a, h1b, ...extra });
const YI = { tag: 'Yurt içi uçuşlar' };
const H = '#ucuzbiletbak #uçakbileti #ucuzbilet #seyahat';
const HV = '#ucuzbiletbak #viptransfer #vipvito #havalimanıtransfer #seyahat';
const L = 'ucuzbiletbak.com', LV = 'Rezervasyon: ucuzbiletbak.com/vip-transfer';
const POSTS = [
 ['20261123-10', A('IST', 'PRG', 'İstanbul', 'Prag', 'İSTANBUL → PRAG', 'Prag’a uç.', 'Masal gibi bir kış.'), `Prag'a uç, masal gibi bir kış seni bekliyor. 🇨🇿\n\nPrag uçuşlarını tek aramada karşılaştır, e-biletin anında gelsin.\n\n${L}\n\n${H} #prag #çekya`],
 ['20261123-15', vip({ kicker: 'VIP VİTO TRANSFER', h1a: 'İndiğin an', h1b: 'aracın hazır.', cards: [['Karşılama', 'Kapıda şoför'], ['Sabit fiyat', 'Baştan belli'], ['Bagaj', 'Geniş alan']] }), `İndiğin an aracın hazır. 🚐\n\nŞoförlü VIP Vito ile havalimanından otelinize, sabit fiyatla.\n\n${LV}\n\n${HV}`],
 ['20261123-20', B('IST', 'TZX', 'İstanbul', 'Trabzon', 'İSTANBUL → TRABZON', 'Trabzon’a uç.', 'Karadeniz’de kış.', YI), `Trabzon'a uç, Karadeniz'de kış başka güzel. 🌲\n\nTrabzon uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #trabzon #karadeniz`],
 ['20261124-10', B('IST', 'VIE', 'İstanbul', 'Viyana', 'İSTANBUL → VİYANA', 'Viyana’ya uç.', 'Kahve ve klasik müzik.'), `Viyana'ya uç; kahve, klasik müzik ve Noel pazarları. 🇦🇹\n\nAvusturya uçuşlarında birçok havayolunu tek aramada karşılaştır.\n\n${L}\n\n${H} #viyana #avusturya`],
 ['20261124-15', vip({ kicker: 'AİLE TATİLİ', h1a: 'Çocuklar, valizler,', h1b: 'hepsi tek araçta.', cards: [['Geniş araç', 'Herkese yer var'], ['Bagaj', 'Valizler sığar'], ['Tek fiyat', 'Araç başına']] }), `Çocuklar, valizler, hepsi tek araçta. 👨‍👩‍👧‍👦\n\nAile tatilinde şoförlü VIP Vito ile havalimanından otelinize.\n\n${LV}\n\n${HV} #ailetatili`],
 ['20261124-20', A('IST', 'GZT', 'İstanbul', 'Gaziantep', 'İSTANBUL → GAZİANTEP', 'Antep’e uç.', 'Lezzet durağı.', YI), `Antep'e uç, lezzet durağına in. 🍢\n\nGaziantep uçuşlarını tek aramada karşılaştır, sana uyanı seç.\n\n${L}\n\n${H} #gaziantep #lezzet`],
 ['20261125-10', A('IST', 'BUD', 'İstanbul', 'Budapeşte', 'İSTANBUL → BUDAPEŞTE', 'Budapeşte’ye uç.', 'Tuna’da kış akşamı.'), `Budapeşte'ye uç, Tuna kıyısında bir kış akşamı. 🇭🇺\n\nMacaristan uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #budapeşte #macaristan`],
 ['20261125-15', vip({ kicker: 'VIP VİTO TRANSFER', h1a: 'Taksi kuyruğu', h1b: 'yok.', cards: [['Önceden ayır', 'Yerin hazır'], ['Şoförlü', 'Kapıda karşılama'], ['Sabit fiyat', 'Sürpriz yok']] }), `Havalimanında taksi kuyruğu yok. ✈️\n\nTransferini önceden ayırt, şoförlü VIP Vito seni kapıda karşılasın.\n\n${LV}\n\n${HV}`],
 ['20261125-20', B('IST', 'LIS', 'İstanbul', 'Lizbon', 'İSTANBUL → LİZBON', 'Lizbon’a uç.', 'Kışın da güneşli.'), `Lizbon'a uç, kışın da güneşli. 🇵🇹\n\nPortekiz uçuşlarında birçok havayolunu tek aramada karşılaştır.\n\n${L}\n\n${H} #lizbon #portekiz`],
 ['20261126-10', B('IST', 'ATH', 'İstanbul', 'Atina', 'İSTANBUL → ATİNA', 'Atina’ya uç.', 'Tarih çok yakın.'), `Atina'ya uç, tarih bir uçuş uzağında. 🇬🇷\n\nYunanistan uçuşlarını tek aramada karşılaştır, e-biletin anında gelsin.\n\n${L}\n\n${H} #atina #yunanistan`],
 ['20261126-15', vip({ kicker: 'İŞ SEYAHATİ', h1a: 'Toplantıya', h1b: 'dinlenmiş git.', cards: [['Konfor', 'Sessiz yolculuk'], ['Zamanında', 'Uçuşa göre plan'], ['Kurumsal', 'Ekip ve misafir']] }), `İş seyahatinde toplantıya dinlenmiş git. 💼\n\nŞoförlü VIP Vito ile havalimanından toplantına, sabit fiyatla.\n\n${LV}\n\n${HV} #işseyahati`],
 ['20261126-20', A('IST', 'VAN', 'İstanbul', 'Van', 'İSTANBUL → VAN', 'Van’a uç.', 'Kahvaltının başkenti.', YI), `Van'a uç, kahvaltının başkentine. 🍳\n\nVan uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #van #kahvaltı`],
 ['20261127-10', A('IST', 'GYD', 'İstanbul', 'Bakü', 'İSTANBUL → BAKÜ', 'Bakü’ye uç.', 'Rüzgârlı şehir seni bekler.'), `Bakü'ye uç, rüzgârlı şehir seni bekler. 🇦🇿\n\nAzerbaycan uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #bakü #azerbaycan`],
 ['20261127-15', vip({ kicker: 'GECE UÇUŞU', h1a: 'Gece indin,', h1b: 'aracın kapıda.', cards: [['Önceden ayır', 'Gece aramak yok'], ['Sabit fiyat', 'Gece farkı yok'], ['Şoförlü', 'Seni bekler']] }), `Uçağın gece mi iniyor? 🌙\n\nTransferini önceden ayırt; şoförlü VIP Vito seni kapıda beklesin, fiyat baştan belli.\n\n${LV}\n\n${HV} #geceuçuşu`],
 ['20261127-20', B('IST', 'CPH', 'İstanbul', 'Kopenhag', 'İSTANBUL → KOPENHAG', 'Kopenhag’a uç.', 'Noel ışıkları yanıyor.'), `Kopenhag'a uç, Noel ışıkları yanıyor. 🇩🇰\n\nİskandinavya uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #kopenhag #danimarka`],
 ['20261128-10', B('IST', 'HTY', 'İstanbul', 'Hatay', 'İSTANBUL → HATAY', 'Hatay’a uç.', 'Sofraya otur.', YI), `Hatay'a uç, sofraya otur. 🫒\n\nHatay uçuşlarını tek aramada karşılaştır, sana uyanı seç.\n\n${L}\n\n${H} #hatay #lezzet`],
 ['20261128-15', vip({ kicker: 'DÜĞÜN & ORGANİZASYON', h1a: 'Misafirlerin', h1b: 'VIP gelsin.', cards: [['Birden çok araç', 'Tek seferde ayır'], ['Havalimanı', 'Otel ve mekân'], ['Şoförlü', 'Kapıda karşılama']] }), `Düğün ya da organizasyon mu var? 🤵\n\nMisafirlerin havalimanından otele, otelden mekâna şoförlü VIP Vito ile gelsin.\n\n${LV}\n\n${HV} #düğün`],
 ['20261128-20', A('IST', 'MXP', 'İstanbul', 'Milano', 'İSTANBUL → MİLANO', 'Milano’ya uç.', 'Moda ve kış alışverişi.'), `Milano'ya uç; moda, kubbeler ve kış alışverişi. 🇮🇹\n\nİtalya uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #milano #italya`],
 ['20261129-10', A('IST', 'TBS', 'İstanbul', 'Tiflis', 'İSTANBUL → TİFLİS', 'Tiflis’e uç.', 'Kısa, keyifli kaçamak.'), `Tiflis'e uç, kısa ve keyifli bir kaçamak. 🇬🇪\n\nGürcistan uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #tiflis #gürcistan`],
 ['20261129-15', vip({ kicker: 'VIP VİTO TRANSFER', h1a: 'Bileti al,', h1b: 'transferi ekle.', cards: [['Uçuşa göre', 'Karşılama saati'], ['Sabit fiyat', 'Baştan net'], ['Türkiye geneli', 'Havalimanlarında']] }), `Bileti al, transferi ekle. ✈️🚐\n\nUçuşuna göre karşılama, şoförlü VIP Vito, sabit fiyat.\n\n${LV}\n\n${HV}`],
 ['20261129-20', B('IST', 'DUB', 'İstanbul', 'Dublin', 'İSTANBUL → DUBLİN', 'Dublin’e uç.', 'Yeşil adaya kış turu.'), `Dublin'e uç, yeşil adaya kış turu. 🇮🇪\n\nİrlanda uçuşlarında birçok havayolunu tek aramada karşılaştır.\n\n${L}\n\n${H} #dublin #irlanda`],
];
const out = process.argv[2] || 'cikti';
(async () => {
  await render(POSTS.map(([d, h]) => [`ub-${d}.jpg`, h]), out);
  await render(POSTS.map(([d]) => [`st-${d}.jpg`, STORY(path.resolve(out, `ub-${d}.jpg`))]), out, 1080, 1920);
  fs.writeFileSync(path.join(out, 'posts-1123.json'), JSON.stringify(POSTS.map(([d, , t]) => ({ file: `ub-${d}.jpg`, date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T${d.slice(9, 11)}:00:00`, text: t })), null, 1));
  console.log(POSTS.length);
})();

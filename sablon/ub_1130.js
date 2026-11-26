// Ucuz Bilet: 30 Kasım - 6 Aralık gönderileri + günlük Reels kareleri. node ub_1130.js <cikti>
const { post, vip, STORY } = require('./ucuzbilet'); const { render } = require('./ortak');
const fs = require('fs'), path = require('path');
const A = (from, to, fromCity, toCity, kicker, h1a, h1b, extra = {}) => post({ style: 'A', from, to, fromCity, toCity, kicker, h1a, h1b, ...extra });
const B = (from, to, fromCity, toCity, kicker, h1a, h1b, extra = {}) => post({ style: 'B', from, to, fromCity, toCity, kicker, h1a, h1b, ...extra });
const YI = { tag: 'Yurt içi uçuşlar' };
const H = '#ucuzbiletbak #uçakbileti #ucuzbilet #seyahat';
const HV = '#ucuzbiletbak #viptransfer #vipvito #havalimanıtransfer #seyahat';
const L = 'ucuzbiletbak.com', LV = 'Rezervasyon: ucuzbiletbak.com/vip-transfer';
const POSTS = [
 ['20261130-10', A('IST', 'EDI', 'İstanbul', 'Edinburgh', 'İSTANBUL → EDINBURGH', 'Edinburgh’a uç.', 'Şatolu bir kış.'), `Edinburgh'a uç, şatolu bir kış seni bekliyor. ✈️\n\nİskoçya uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #edinburgh #iskoçya`],
 ['20261130-15', vip({ kicker: 'YILBAŞI', h1a: 'Yılbaşı planın', h1b: 'hazır mı?', cards: [['Önceden ayır', 'Yoğun günler'], ['Şoförlü', 'Kapıda karşılama'], ['Sabit fiyat', 'Baştan belli']] }), `Yılbaşı planın hazır mı? 🎄\n\nYoğun günlerde transferini önceden ayırt; şoförlü VIP Vito havalimanında seni beklesin.\n\n${LV}\n\n${HV} #yılbaşı`],
 ['20261130-20', B('IST', 'ASR', 'İstanbul', 'Kayseri', 'İSTANBUL → KAYSERİ', 'Erciyes’e uç.', 'Kayak sezonu açılıyor.', YI), `Erciyes'e uç, kayak sezonu açılıyor. ⛷️\n\nKayseri uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #kayseri #erciyes #kayak`],
 ['20261201-10', B('IST', 'KRK', 'İstanbul', 'Krakov', 'İSTANBUL → KRAKOV', 'Krakov’a uç.', 'Uygun bir Avrupa kışı.'), `Krakov'a uç, uygun bir Avrupa kışı. 🇵🇱\n\nPolonya uçuşlarını tek aramada karşılaştır, e-biletin anında gelsin.\n\n${L}\n\n${H} #krakov #polonya`],
 ['20261201-15', vip({ kicker: 'KAYAK TATİLİ', h1a: 'Havalimanından', h1b: 'otele, kayakla.', cards: [['Ekipman', 'Kayaklar sığar'], ['Şoförlü', 'Karlı yolda rahat'], ['Sabit fiyat', 'Araç başına']] }), `Kayak tatiline ekipmanınla rahat git. 🎿\n\nHavalimanından otelinize şoförlü VIP Vito; kayaklar ve valizler aynı araçta.\n\n${LV}\n\n${HV} #kayaktatili`],
 ['20261201-20', A('IST', 'DIY', 'İstanbul', 'Diyarbakır', 'İSTANBUL → DİYARBAKIR', 'Diyarbakır’a uç.', 'Surların içinde bir gün.', YI), `Diyarbakır'a uç, surların içinde bir gün geçir. 🏰\n\nDiyarbakır uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #diyarbakır #tarih`],
 ['20261202-10', A('IST', 'SJJ', 'İstanbul', 'Saraybosna', 'İSTANBUL → SARAYBOSNA', 'Saraybosna’ya uç.', 'Tanıdık bir şehir.'), `Saraybosna'ya uç, tanıdık bir şehir seni bekliyor. 🇧🇦\n\nBosna uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #saraybosna #bosna`],
 ['20261202-15', vip({ kicker: 'VIP VİTO TRANSFER', h1a: 'Uzun yolda', h1b: 'konforlu yolculuk.', cards: [['Geniş koltuk', 'Rahat yolculuk'], ['Şoförlü', 'Sen dinlen'], ['Sabit fiyat', 'Mesafe fark etmez']] }), `Havalimanından uzak bir otele mi gidiyorsun? 🚐\n\nUzun yolda şoförlü VIP Vito ile rahat yolculuk, fiyat baştan belli.\n\n${LV}\n\n${HV}`],
 ['20261202-20', B('IST', 'MAD', 'İstanbul', 'Madrid', 'İSTANBUL → MADRİD', 'Madrid’e uç.', 'Tapas ve müzeler.'), `Madrid'e uç; tapas, müzeler ve kış güneşi. 🇪🇸\n\nİspanya uçuşlarında birçok havayolunu tek aramada karşılaştır.\n\n${L}\n\n${H} #madrid #ispanya`],
 ['20261203-10', B('IST', 'ICN', 'İstanbul', 'Seul', 'İSTANBUL → SEUL', 'Seul’e uç.', 'Uzak Doğu’nun ışıkları.'), `Seul'e uç, Uzak Doğu'nun ışıkları seni bekliyor. 🇰🇷\n\nKore uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #seul #kore`],
 ['20261203-15', vip({ kicker: 'KURUMSAL', h1a: 'Misafirinizi', h1b: 'VIP karşılayın.', cards: [['Şoförlü', 'Kapıda karşılama'], ['Zamanında', 'Uçuşa göre plan'], ['Sabit fiyat', 'Kurumsal net']] }), `Şirketinize gelen misafiri VIP karşılayın. 🤝\n\nHavalimanından otele ya da ofise şoförlü VIP Vito, sabit fiyatla.\n\n${LV}\n\n${HV} #kurumsal`],
 ['20261203-20', A('IST', 'GNY', 'İstanbul', 'Şanlıurfa', 'İSTANBUL → ŞANLIURFA', 'Urfa’ya uç.', 'Göbeklitepe seni bekler.', YI), `Urfa'ya uç, Göbeklitepe seni bekler. 🏺\n\nŞanlıurfa uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #şanlıurfa #göbeklitepe`],
 ['20261204-10', A('IST', 'DOH', 'İstanbul', 'Doha', 'İSTANBUL → DOHA', 'Doha’ya uç.', 'Kışın sıcak bir mola.'), `Doha'ya uç, kışın sıcak bir mola ver. 🇶🇦\n\nKörfez uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #doha #katar`],
 ['20261204-15', vip({ kicker: 'BALAYI', h1a: 'Balayına', h1b: 'VIP başlangıç.', cards: [['İkinize özel', 'Şoförlü araç'], ['Karşılama', 'Kapıda hazır'], ['Sabit fiyat', 'Sürpriz yok']] }), `Balayına VIP bir başlangıç. 💍\n\nHavalimanından otelinize şoförlü VIP Vito, ikinize özel.\n\n${LV}\n\n${HV} #balayı`],
 ['20261204-20', B('IST', 'HEL', 'İstanbul', 'Helsinki', 'İSTANBUL → HELSİNKİ', 'Helsinki’ye uç.', 'Kuzeyin kış masalı.'), `Helsinki'ye uç, kuzeyin kış masalına. 🇫🇮\n\nFinlandiya uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #helsinki #finlandiya`],
 ['20261205-10', B('IST', 'MLA', 'İstanbul', 'Malta', 'İSTANBUL → MALTA', 'Malta’ya uç.', 'Akdeniz’in küçük incisi.'), `Malta'ya uç, Akdeniz'in küçük incisi. 🇲🇹\n\nMalta uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #malta #akdeniz`],
 ['20261205-15', vip({ kicker: 'VIP VİTO TRANSFER', h1a: 'Bavul çok,', h1b: 'dert yok.', cards: [['Geniş bagaj', 'Hepsi sığar'], ['Tek araç', 'Herkes birlikte'], ['Sabit fiyat', 'Araç başına']] }), `Bavul çok, dert yok. 🧳\n\nŞoförlü VIP Vito'nun geniş bagaj alanında hepsine yer var.\n\n${LV}\n\n${HV}`],
 ['20261205-20', A('IST', 'MLX', 'İstanbul', 'Malatya', 'İSTANBUL → MALATYA', 'Malatya’ya uç.', 'Kayısının memleketi.', YI), `Malatya'ya uç, kayısının memleketine. 🍑\n\nMalatya uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #malatya #kayısı`],
 ['20261206-10', A('IST', 'BKK', 'İstanbul', 'Bangkok', 'İSTANBUL → BANGKOK', 'Bangkok’a uç.', 'Yılbaşı öncesi kaçamak.'), `Bangkok'a uç, yılbaşı öncesi sıcak bir kaçamak. 🇹🇭\n\nUzak Doğu uçuşlarında birçok havayolunu tek aramada karşılaştır.\n\n${L}\n\n${H} #bangkok #tayland`],
 ['20261206-15', vip({ kicker: 'HAFTA SONU', h1a: 'Kısa kaçamakta', h1b: 'bekleme yok.', cards: [['Önceden ayır', 'Araç hazır'], ['Şoförlü', 'Kapıda karşılama'], ['Sabit fiyat', 'Baştan belli']] }), `Hafta sonu kaçamağında vaktin değerli. ⏱️\n\nTransferini önceden ayırt, şoförlü VIP Vito seni kapıda beklesin.\n\n${LV}\n\n${HV} #haftasonu`],
 ['20261206-20', B('IST', 'RIX', 'İstanbul', 'Riga', 'İSTANBUL → RİGA', 'Riga’ya uç.', 'Baltık’ta Noel.'), `Riga'ya uç, Baltık'ta Noel havası. 🇱🇻\n\nLetonya uçuşlarını tek aramada karşılaştır.\n\n${L}\n\n${H} #riga #letonya`],
];
const out = process.argv[2] || 'cikti';
(async () => {
  await render(POSTS.map(([d, h]) => [`ub-${d}.jpg`, h]), out);
  await render(POSTS.map(([d]) => [`st-${d}.jpg`, STORY(path.resolve(out, `ub-${d}.jpg`))]), out, 1080, 1920);
  fs.writeFileSync(path.join(out, 'posts-1130.json'), JSON.stringify(POSTS.map(([d, , t]) => ({ file: `ub-${d}.jpg`, date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T${d.slice(9, 11)}:00:00`, text: t })), null, 1));
  console.log(POSTS.length);
})();

/**
 * ECRİN'İN GALAKSİSİ - ÖZELLEŞTİRME VE AYARLAR
 * 
 * Bu dosyadan sitendeki tüm yazıları, anıları, fotoğrafları ve tarihleri
 * dilediğin gibi kolayca değiştirebilirsin!
 */

export const CONFIG = {
  // Sevgilinin ve senin ismin
  partnerName: "Ecrin",
  yourName: "Efe",

  // Birlikteliğinizin başladığı tarih: 20 Ocak 2026 (20 Ocak 2027'de tam 365 gün olacak)
  startDate: new Date(2026, 0, 20, 0, 0, 0),

  // Galaksideki Özel Yıldızın Bilgileri
  star: {
    name: "Ecrin'in Yıldızı ✨",
    subtitle: "Milyarlarca yıldız arasında sadece senin için parlayan gök cismi",
    constellation: "Sonsuz Kalp Takımyıldızı (Cor Amoris)",
    coordinates: "RA 18h 36m 56s | Dec +38° 47′ 01″",
    magnitude: "Gözlerinin ışıltısı kadar parlak (Sonsuz Mag)",
    distance: "Kalbimin tam merkezinde (0 ışık yılı)",
    quote: "Gökyüzündeki tüm yıldızlar bir araya gelse, senin tek bir gülüşün kadar aydınlatamaz dünyamı..."
  },

  // Giriş karşılama mesajları (Galaksi açılırken)
  welcome: {
    title: "Bu Evrende Bir Yıldız Var...",
    subtitle: "Sadece senin adınla parlayan, sonsuza kadar sana ait olan bir yıldız.",
    actionHint: "Galaksiyi keşfetmek için sürükle, parlayan yıldıza tıklayarak bizim dünyamıza gir ✨"
  },

  // Kalbimden Gelen Mektup
  letter: {
    title: "Benim En Güzel Gökyüzüm, Ecrin'e 💌",
    salutation: "Canım Ecrinim,",
    content: [
      "Bazen oturup bu uçsuz bucaksız evreni düşünüyorum; milyarlarca galaksi, trilyonlarca yıldız ve sonsuz bir karanlık... Sonra sana bakıyorum ve anlıyorum ki, benim evrenimin başladığı ve bittiği tek yer senin gözlerin.",
      "Sen hayatıma girdiğin andan itibaren dünyamdaki sıradan her şey büyüleyici bir renge büründü. Gülüşün bana en karanlık günlerimde bile yolumu gösteren bir kutup yıldızı oldu. Elini tuttuğumda hissettiğim o sıcaklık, hiçbir göktaşının, hiçbir güneşin veremeyeceği bir huzur.",
      "İşte bu yüzden gökyüzündeki bu özel yıldızı sana adadım. Bu yıldız ne zaman gökyüzüne baksan, benim seni ne kadar çok sevdiğimi ve kalbimin daima senin için çarptığını hatırlatsın.",
      "İyi ki varsın sevgilim, iyi ki benim gökyüzümsün. Birlikte yazacağımız daha binlerce sayfamız, geçireceğimiz sayısız güzel günümüz var."
    ],
    signature: "Seni sonsuza dek sevecek olan,",
    author: "Efe ❤️"
  },

  // Zaman Tüneli & Özel Anılarımız
  // Kendi fotoğraflarını assets/photos/ klasörüne atıp isimlerini buraya yazabilirsin!
  timeline: [
    {
      id: 1,
      title: "Göz Göze Geldiğimiz İlk An 👀",
      date: "İlk Günümüz",
      location: "Zamanın Durduğu Yer",
      description: "İlk kez gözlerine baktığımda içimde kopan o fırtınayı asla unutamam. O an anlamıştım, hayatımın geri kalanında hep o gözlere bakmak isteyeceğimi.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "İlk Kahvemiz ve Uzun Sohbetimiz ☕",
      date: "Unutulmaz Bir Akşam",
      location: "En Sevdiğimiz Köşe",
      description: "Saatlerin nasıl geçtiğini anlamadığımız, konuşacak şeylerin hiç bitmediği o ilk buluşma. Sesindeki o huzur beni o gün sana aşık etti.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Yıldızların Altında İlk Yürüyüşümüz 🌌",
      date: "Ilık Bir Gece",
      location: "Sessiz Sahil Yolu",
      description: "Elimi ilk tuttuğun an kalbimin nasıl deli gibi çarptığını bilsen... Gökyüzünde binlerce yıldız vardı ama benim gözüm sadece sendeydi.",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Gülüşünle Dünyamı Aydınlattığın O Gün 🌸",
      date: "Güneşli Bir Pazar",
      location: "Rengarenk Bir Park",
      description: "Öyle içten kahkaha atıyordun ki, o an dünyanın bütün dertleri yok oldu. Gülüşünün sesini bir şişe içine koyup sonsuza dek saklamak istedim.",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Birlikte Islak Sokaklarda Islanışımız 🌧️",
      date: "Yağmurlu Bir Gün",
      location: "Şehrin Işıkları",
      description: "Aniden bastıran yağmurda tek bir şemsiyenin altında birbirimize sığınışımız. Islanmak hiç bu kadar romantik ve güzel olmamıştı.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Bugün ve Geleceğimiz ♾️",
      date: "Sonsuza Kadar",
      location: "Bizim Evrenimiz",
      description: "Şimdi buradayız ve hikayemiz her geçen saniye daha da güzelleşiyor. Önümüzde paylaşacağımız koca bir ömür var sevgilim.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop"
    }
  ],

  // Fotoğraf Galerisi (Polaroid Tarzı)
  gallery: [
    {
      title: "En Güzel Gülüşün",
      subtitle: "Güneşten daha parlak",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Gözlerinin İçi",
      subtitle: "Kaybolmayı en sevdiğim yer",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "El Ele Anlar",
      subtitle: "Güvenin ve aşkın resmi",
      image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Küçük Kaçamağımız",
      subtitle: "Dünyadan uzak, sadece ikimiz",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Sessiz Huzur",
      subtitle: "Omuzumdaki başın",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Sonsuz Sevgimle",
      subtitle: "Daima ve her zaman",
      image: "https://images.unsplash.com/photo-1501901609772-df0848060b33?q=80&w=1000&auto=format&fit=crop"
    }
  ],

  // Seni Sevmemin Sebepleri (Tam 100 Neden)
  reasons: [
    "Gülümseyince gözlerinin etrafında beliren o tatlı çizgiler.",
    "Bana baktığında dünyadaki tek insanmışım gibi hissettirmen.",
    "En zor günlerimde bile sesini duyunca içime yayılan o tarifsiz dinginlik.",
    "Uykulu halindeki ses tonunun ve masumluğunun dünyadaki her şeyden tatlı olması.",
    "Bana koşulsuz şartsız güvenmen ve her zaman yanımda olman.",
    "Birlikte saçma sapan şeylere dakikalarca gülebilmemiz.",
    "Elimi tuttuğunda parmaklarının benimkilerin arasına tam oturması.",
    "Küçük şeylerle bile çocuk gibi mutlu olabilen o tertemiz kalbin.",
    "Benim en büyük destekçim ve en iyi sırdaşım olman.",
    "Gözlerinin içine her baktığımda ilk günkü gibi heyecanlanmam.",
    "Yemek yerken çıkardığın o sevimli mırıldanmalar.",
    "Bana sarıldığında kalbinin atışını göğsümde hissetmek.",
    "Dünyada kimsenin bilmediği sırlarımı sadece seninle paylaşabilmem.",
    "Bana kendimi olduğum gibi, mükemmel hissettirmen.",
    "İçinde kötülük barındırmayan, herkesin iyiliğini isteyen güzel yüreğin.",
    "Birlikte kurduğumuz gelecek hayallerinin güzelliği.",
    "En sessiz anlarımızda bile aramızdaki o güçlü bağın hiç kopmaması.",
    "Seninle geçen her bir saniyenin ömrüme ömür katması.",
    "Bana aşkın sadece bir kelime değil, bir yuva olduğunu öğretmen.",
    "Yanındayken zamanın nasıl akıp gittiğini hiç anlayamamam.",
    "Saçlarınla oynarken hissettiğim o eşsiz huzur.",
    "Üşüdüğünde ellerini montumun cebine saklaman.",
    "Bana baktığında gözlerinin içinin parıldaması.",
    "En kötü şakalarıma bile içtenlikle kahkaha atabilmen.",
    "Kızdığında kaşlarını çatıp dudak büküşünün bile dünyalar tatlısı olması.",
    "Bir şeye heveslendiğinde gözlerindeki o çocuksu ışıltı.",
    "Dünyanın en güvenli yerinin senin kolların olduğunu hissettirmen.",
    "Gece uyumadan önce duyduğum son sesin, sabah uyandığımda ilk düşüncemin sen olması.",
    "Benim için endişelenip 'kendine dikkat et' deyişindeki o derin şefkat.",
    "Yolda yürürken aniden koluma girip bana sokulman.",
    "Hayatımı sıradanlıktan çıkarıp büyülü bir masal haline getirmen.",
    "Kalbimin ritmini tek bir bakışınla değiştirebilmen.",
    "Benimle birlikte hayal kurmaktan hiç yorulmaman.",
    "Birbirimize verdiğimiz sözlerin arkasında dimdik durabilmemiz.",
    "Seninle aynı gökyüzünün altında nefes almanın bile bir lütuf olması.",
    "Kahve içerken fincanı iki elinle birden tutuşundaki tatlılık.",
    "Yağmur yağdığında cam kenarında oturup seninle konuşmanın verdiği huzur.",
    "Bana her gün yeniden aşık olma sebebi vermen.",
    "Beni dinlerken gözlerini benden hiç ayırmaman.",
    "Zor anlarımda sırtımı yaslayabileceğim en sağlam liman olman.",
    "Beraber susabilmenin bile ne kadar güzel olduğunu bana göstermen.",
    "Gülerken başını omzuma yaslaman.",
    "Bana kattığın her güzel duygu ve olgunluk.",
    "Sen güldüğünde tüm dünyanın bir anlığına güzelleşmesi.",
    "İçindeki o saf merhamet ve canlılara olan sevgin.",
    "En ufak bir jestimde bile gözlerinin sevinçle dolması.",
    "Birlikte yürüdüğümüz her yolun cennet gibi hissettirmesi.",
    "Bana 'sevgilim' dediğinde içimde kelebeklerin uçuşması.",
    "Her mevsimi seninle yaşamanın ayrı bir şiir olması.",
    "Hayatıma girdiğin andan itibaren eksik olan parçamın tamamlanması.",
    "Kendimi yalnız hissettiğim tek bir an bile bırakmaman.",
    "Birlikte söylediğimiz şarkılarda detone oluşumuza gülmemiz.",
    "Kokunun bana evimi ve huzuru hatırlatması.",
    "Dünyadaki tüm karmaşadan kaçıp sana sığınabilmem.",
    "Benim başarılarımla benden daha çok gururlanman.",
    "Düşüncelerimi tek bir bakışımdan anlayabilen o güçlü sezgin.",
    "Bana sevmeyi ve sevilmeyi en saf haliyle yaşatman.",
    "Sana her sarıldığımda içimdeki tüm yorgunluğun yok olması.",
    "Geleceğe baktığımda her karenin içinde senin olman.",
    "Sabah güne senin bir mesajınla başlamanın verdiği o tarifsiz enerji.",
    "İnatlaştığımızda bile sonunda birbirimize sarılmadan duramayışımız.",
    "Benim eksiklerimi kapatıp beni her gün daha iyi bir insan yapman.",
    "Beraber yediğimiz en basit yemeğin bile bir ziyafete dönüşmesi.",
    "Bana hayatın her şeye rağmen yaşamaya değer olduğunu hatırlatman.",
    "Gözlerini kaçırarak utangaçça gülümsediğin o anlar.",
    "Birbirimizin en doğal, filtresiz hallerini delicesine sevmemiz.",
    "Sesinin tonunun kalbime bir ninni gibi gelmesi.",
    "Yaşadığımız her küçük anıyı bir hazine gibi aklında tutman.",
    "Dünyada milyarlarca insan varken kaderimin seni karşıma çıkarmış olması.",
    "Bana verdiğin o koşulsuz aidiyet hissi.",
    "Küçük bir çocuk gibi heyecanla anlattığın hikayeler.",
    "Elim elindeyken hiçbir fırtınanın beni korkutamaması.",
    "Bana sadece bir sevgili değil, hayat yolunda en sadık yol arkadaşı olman.",
    "Kalbimin kapılarını tereddütsüz sadece sana açabilmiş olmam.",
    "Birbirimize duyduğumuz saygının sevgimiz kadar büyük olması.",
    "Yanımdayken telefonun bile aklımıza gelmediği o dolu dolu sohbetler.",
    "Beni benden daha iyi tanıdığın anların güzelliği.",
    "Birlikte yaşlanma fikrinin içimi ısıtması.",
    "Dünyanın en güzel çiçeğinin senin gülüşün olması.",
    "Bana kendimi dünyadaki en şanslı adam gibi hissettirmen.",
    "Gözlerindeki derinlikte kaybolmanın verdiği o tatlı sarhoşluk.",
    "Benim için yaptığın en küçük fedakarlığın bile kalbimde devleşmesi.",
    "Sevginin bana kattığı o sarsılmaz güç ve inanç.",
    "Saçlarının rüzgarda savruluşundaki o doğal asalet.",
    "Birbirimizin gözlerine bakıp tek kelime etmeden anlaşabilmemiz.",
    "Hayatımın en doğru, en güzel kararı olman.",
    "Benimle aynı hayallere inanıp aynı yöne bakabilmen.",
    "Her 'seni seviyorum' deyişinde bunu kalbimin en derininde hissettirmem.",
    "Yanındayken çocukça şımarabilmem, kendim olabilmem.",
    "Kalbimin evrende seçtiği tek ve daimi yıldız olman.",
    "Yaşadığımız her zorluğun bizi birbirimize daha da kenetlemesi.",
    "Bana her sarılışında zamanın donup kalması.",
    "Dünyadaki bütün dertlerin senin tek bir tebessümünle silinmesi.",
    "Benim hayattaki en büyük şansım ve en güzel duam olman.",
    "Her yeni güne seninle uyanacak olmanın heyecanı.",
    "Beni hiç değiştirmeye çalışmadan, tüm kusurlarımla sevmen.",
    "Ruhunun temizliğinin yüzüne yansıyan o eşsiz nuru.",
    "Kalbime kattığın sonsuz neşe, umut ve aşk.",
    "Sonsuzluğun bile seninle geçireceğim zamana az gelecek olması.",
    "Kısacası Ecrin, sadece 'sen' olduğun ve benim evrenim olduğun için seni her şeyden çok seviyorum!"
  ],

  // Birlikte Gerçekleştireceğimiz Hayaller (Dilek Listesi)
  bucketList: [
    { text: "Kuzey ışıklarının altında el ele gökyüzünü izlemek", done: false },
    { text: "Yağmurun altında sırılsıklam olana kadar dans etmek", done: false },
    { text: "Kendi evimizin balkonunda sıcak kahvelerimizle gün batımını seyretmek", done: false },
    { text: "Hiç bilmediğimiz bir sahil kasabasında kaybolmak", done: false },
    { text: "Birlikte bir fidan dikip onunla beraber büyümek", done: false },
    { text: "Yıldızların altında çadır kurup sabaha kadar konuşmak", done: true },
    { text: "Birlikte kocaman bir kitaplık dolusu anı biriktirmek", done: false },
    { text: "Saçlarımız beyazlayana kadar el ele yürümek", done: false }
  ],

  // 1. Yıl Dönümü Tarihi (Geri sayım için: 20 Ocak 2027)
  anniversaryDate: new Date(2027, 0, 20, 0, 0, 0),

  // Galaksideki Gizli Yıldız (Paskalya Yumurtası)
  secretStar: {
    title: "Tebrikler Sevgilim, Gizli Yıldızı Buldun! 🤫💖",
    message: "Bu koca evrenin en ıssız köşesinde saklı duran bu yıldızı bulabildiysen bil ki kalbimin en derin yerindesin.\n\nHerkesin gördüğü o parlak yıldızımız bir yana; sadece ikimizin bildiği küçük sırlarımız, fısıltılarımız ve gülüşmelerimiz bu gizli yıldızda saklı.\n\nSeni bu evrenin sınırlarının da ötesinde çok seviyorum Ecrin...",
    date: "Sonsuzluğun Gizli Köşesi"
  },

  // 1. Yıl Dönümünde Açılacak Kilitli Zaman Kapsülü
  timeCapsule: {
    unlockDate: new Date(2027, 0, 20, 0, 0, 0),
    title: "1. Yıl Dönümü Kozmik Zaman Kapsülü 🔐",
    teaser: "Bu kapsülün içinde 20 Ocak 2027 tarihinde (tam 1 yılımızı doldurduğumuz gün) açılacak gizli bir mektup mühürlenmiştir. O güne kadar kilitli kalacaktır!",
    secretLetter: "Canım sevgilim Ecrin,\n\nBugün seninle tam 365 günü, yani koskoca 1 yılı geride bıraktık! Bu mektubu siteyi ilk hazırladığım gün buraya mühürlemiştim ve şimdi buradasın.\n\nSeninle geçen her bir günüm bir öncekinden daha güzel, daha huzurlu ve daha aşık geçti. Bana kattığın güzellikler, yüzümdeki her bir tebessüm için teşekkür ederim. Birlikte kutlayacağımız nice 10'larca, 50'lerce yıla sevgilim!\n\nİyi ki varsın, 1. yılımız kutlu olsun birtanem! ❤️"
  },

  // Müzik & Spotify ayarları
  music: {
    customAudioPath: "",
    defaultSongTitle: "Seni Seviyorum",
    artist: "Bora Öztoprak",
    albumCover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02ad45de517ff1bd676684adfe",
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/55fc2164a2bdc4ed87e1855977993c8fd62d5327",
    // Spotify Şarkı Embed Kodu (Track ID: 3ShpooIC9O00sS8ra0AAJP)
    spotifyTrackUrl: "https://open.spotify.com/embed/track/3ShpooIC9O00sS8ra0AAJP?utm_source=oembed",
    spotifyDirectUrl: "https://open.spotify.com/track/3ShpooIC9O00sS8ra0AAJP?si=G6Z9MRJBRgSp6mdZjvzYUA&utm_source=whatsapp"
  },

  // Sesli Aşk Notu Ayarları (Kendi ses kaydını assets/music/ klasörüne atabilirsin)
  voiceNote: {
    title: "Kalbimden Gelen Sesli Mesaj 🎙️",
    subtitle: "Sadece senin için fısıldandı...",
    customAudioPath: "", // Örn: "assets/music/sesli_not.mp3"
    transcript: "Bu evrendeki her şey, yıldızlar ve galaksiler bile bir gün değişebilir; ama sana olan sevgim ve hissettiklerim daima ilk günkü gibi sonsuz kalacak birtanem..."
  }
};


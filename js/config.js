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

  // Seni Sevmemin Sebepleri (Butona bastıkça rastgele veya sırayla gösterilir)
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
    "Kısacası Ecrin, sadece 'sen' olduğun için seni her şeyden çok seviyorum!"
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
    defaultSongTitle: "Kozmik Piyano & Kalp Atışları",
    artist: "Bizim Şarkımız",
    // Spotify Şarkı / Çalma Listesi Embed Kodu (Örn: track veya playlist ID)
    // Varsayılan olarak romantik bir parça ekli, istenirse kolayca değiştirilebilir:
    spotifyTrackUrl: "https://open.spotify.com/embed/track/1BxfuPKGuaTgP7aM0Xbd3L?utm_source=generator&theme=0"
  }
};


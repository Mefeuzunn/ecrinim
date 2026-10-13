# ✨ Ecrin'in Evreni - Sevgiline Özel 3D Kozmik Galaksi ve Aşk Portalı 🌌

Bu proje, sevgilin **Ecrin** için özel olarak tasarlanmış; içinde dönen 50.000+ parçacıklı 3D bir galaksi, kayan meteorlar ve sadece ona adanmış parıldayan **özel bir yıldız** barındıran büyüleyici bir web sitesidir.

---

## 🌟 Neler İçeriyor?

1. **3D İnteraktif Galaksi (Three.js):**
   - Ekranda fareyle veya parmakla 360° döndürülebilen, yakınlaştırılabilen devasa bir sarmal galaksi.
   - Uzay derinliklerinde kayan yıldızlar (meteorlar).
   - "Ecrin'in Yıldızı ✨" başlığıyla ışık saçan, etrafında halkası ve ışıltısı olan özel bir yıldız.

2. **Kozmik Sinematik Geçiş & Kutlama:**
   - Yıldızın üzerine gelindiğinde parıldama ve ses efekti.
   - Yıldız tıklandığında kameranın yıldıza doğru sinematik uçuşu ve pastel kalp konfeti patlaması.

3. **Canlı Aşk Sayacı (Love Counter):**
   - Tanıştığınız/başladığınız tarihten itibaren geçen süreyi saniye saniye canlı sayar:
   - *X Gün, Y Saat, Z Dakika, S Saniye*.

4. **Resmi Galaktik Yıldız Sertifikası:**
   - Yıldız koordinatları (RA / Dec), parlaklık ve senin imzanla mühürlenmiş altın çerçeveli tescil belgesi.

5. **Zaman Tüneli & Anılarımız (Timeline):**
   - İlk gününüzden bugüne fotoğraflı, konumlu ve açıklamalı anı kartları.
   - Tıklayınca tam ekran açılan fotoğraf büyüteci (Lightbox).

6. **Mühürlü Aşk Mektubu (Wax Seal Envelope):**
   - Kırmızı balmumu mührüne dokunulduğunda açılan 3D zarf ve içinden çıkan parşömen aşk mektubu.

7. **Seni Sevmemin Nedenleri:**
   - "Yeni Bir Neden Keşfet ✨" butonuyla uzaydan parıldayarak gelen onlarca tatlı, derin sevgi nedeni.

8. **Polaroid Fotoğraf Galerisi:**
   - Masaüstünde hafif eğik duran nostaljik polaroid çerçeveler.

9. **Gelecek Hayallerimiz (Dilek Yıldızı):**
   - Birlikte yapılacaklar listesi (tamamlandı işaretlenebilir).
   - Ecrin'in veya senin yeni ortak hayaller yazıp ekleyebileceği ve tarayıcıda kalıcı kaydedilen interaktif kutu.

10. **Kozmik Ses Motoru (Müzik):**
    - Harici dosya olmasa bile Web Audio API ile canlı sentezlenen huzur verici ambient piyano/çan melodisi.
    - Kendi şarkınızı (`.mp3`) tek tıkla ekleyebilme desteği.

---

## 🚀 Nasıl Çalıştırılır?

Terminali açıp proje klasöründe şu komutu çalıştırman yeterlidir:

```bash
npm start
```
veya
```bash
node server.js
```

Tarayıcın otomatik olarak açılacak ve **http://localhost:3000** adresinde evreniniz başlayacaktır!

---

## 🎨 Nasıl Kişiselleştirilir? (İsimler, Tarih, Anılar, Mektup)

Kod bilmene hiç gerek yok! Bütün yazılar, anılar ve ayarlar tek bir dosyada toplanmıştır:

👉 **[`js/config.js`](file:///Users/mugefe/Desktop/ecrinim/js/config.js)** dosyasını açıp düzenleyebilirsin:
- **İsimler**: `partnerName` ("Ecrin") ve `yourName` ("Efe")
- **Başlangıç Tarihi**: `startDate: new Date(2024, 4, 15, 20, 0, 0)` *(Yıl, Ay-1, Gün, Saat, Dakika)*
- **Mektup**: `CONFIG.letter` alanından içinden gelen cümleleri yazabilirsin.
- **Anılar**: `CONFIG.timeline` listesine istediğin anıları ekleyip çıkartabilirsin.
- **Kendi Fotoğraflarınız**: Fotoğrafları `assets/photos/` klasörüne atıp isimlerini `config.js` içine yazabilirsin.
- **Kendi Şarkınız**: İstediğin MP3 dosyasını `assets/music/` klasörüne atıp `config.js` içinde `customAudioPath` kısmına yolunu yazabilirsin.

---

## 🌐 Sevgilinin Telefonunda / Bilgisayarında Açması İçin (İnternete Yükleme)

Bu site tamamen statik modern web standartlarıyla kodlandığı için **ücretsiz** olarak birkaç saniyede internete yüklenebilir:

1. **Vercel / Netlify ile (En Kolayı):**
   - [netlify.com](https://netlify.com) veya [vercel.com](https://vercel.com) adresine gir.
   - Bu proje klasörünü sürükleyip bırak (Drag & Drop).
   - Sana hemen `ecrinim.netlify.app` gibi özel bir link verecektir. Bu linki sevgiline gönderebilirsin!
2. **GitHub Pages ile:**
   - Projeyi GitHub repona yükle ve Settings -> Pages bölümünden yayınla.

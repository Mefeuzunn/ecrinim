# Özel Şarkınız Buraya! 🎵

Eğer arka planda kendinize ait özel bir şarkının (örneğin ilk dans müziğiniz, sevdiğiniz bir şarkı) çalmasını istersen:

1. Şarkıyı buraya kopyala (Örn: `bizim_sarkimiz.mp3`)
2. `js/config.js` dosyasını açıp müzik ayarını şu şekilde yap:
   ```javascript
   music: {
     customAudioPath: "assets/music/bizim_sarkimiz.mp3",
     defaultSongTitle: "Bizim Şarkımız",
     artist: "Sanatçı Adı"
   }
   ```
3. Eğer buraya hiçbir şarkı koymazsan, sistem otomatik olarak yapay zeka tarafından sentezlenen huzur verici ve romantik kozmik ambient melodisini çalacaktır!

/**
 * ANA UYGULAMA MANTIĞI & ARAYÜZ YÖNETİCİSİ
 * 
 * - Galaksi, Özel Yıldız ve Gizli Yıldız (Easter Egg)
 * - Kozmik Kalp Takımyıldızı Açma/Kapama
 * - Kayan Yıldıza Dilek Tutma & Fırlatma
 * - Canlı Aşk Sayacı ve 1. Yıl Dönümü Geri Sayımı (20 Ocak 2027)
 * - Kilitli Zaman Kapsülü ve Spotify Çalar
 * - Mühürlü Aşk Mektubu, Zaman Tüneli, Galeri ve Dilek Listesi
 */

import { CONFIG } from './config.js?v=3.1';
import { GalaxyEngine } from './galaxy.js';
import { cosmicAudio } from './audio.js';
import { RealStarMapEngine } from './starmap.js';

class UniverseApp {
  constructor() {
    this.currentReasonIndex = 0;
    this.dreams = [];
    this.wishes = [];
    this.galaxyEngine = null;
    this.starMapEngine = null;
    this.timerInterval = null;

    this.init();
  }

  init() {
    // 1. Ayarları DOM'a uygula
    this.applyConfig();

    // 2. Ses motorunu hazırla
    cosmicAudio.init();

    // 3. 3D Galaksi Motorunu Başlat (Özel Yıldız & Gizli Yıldız Callbackleri)
    const canvasContainer = document.getElementById('galaxy-canvas-container');
    this.galaxyEngine = new GalaxyEngine(
      canvasContainer,
      () => this.openPortal(),
      () => this.openSecretStarModal()
    );

    // 4. Sayaçları Başlat (Geçen Zaman + 1. Yıl Geri Sayımı)
    this.startLoveCounters();
    this.setupCounterToggle();

    // 5. İçerikleri ve Özellikleri Başlat
    this.renderTimeline();
    this.renderGallery();
    this.renderReasons();
    this.initBucketList();
    this.setupLetterEnvelope();
    this.setupTimeCapsule();
    this.setupSpotify();
    this.setupWishSystem();
    this.setupSecretStarModal();
    this.setupTabs();
    this.setupMobilePullToDismiss();
    this.setupVoiceNote();
    this.setupCertificateDownload();
    this.registerServiceWorker();
    this.setupMusicControls();
    this.setupLightbox();
    this.setupGeneralEvents();
  }

  applyConfig() {
    // İsimleri yerleştir
    document.querySelectorAll('.partner-name').forEach(el => el.textContent = CONFIG.partnerName);
    document.querySelectorAll('.your-name').forEach(el => el.textContent = CONFIG.yourName);

    // Yıldız bilgileri
    const starNameEl = document.getElementById('star-name-display');
    if (starNameEl) starNameEl.textContent = CONFIG.star.name;

    const starCoordEl = document.getElementById('star-coords-display');
    if (starCoordEl) starCoordEl.textContent = CONFIG.star.coordinates;

    const starConstelEl = document.getElementById('star-constellation-display');
    if (starConstelEl) starConstelEl.textContent = CONFIG.star.constellation;

    const starQuoteEl = document.getElementById('star-quote-display');
    if (starQuoteEl) starQuoteEl.textContent = CONFIG.star.quote;

    const starDistEl = document.getElementById('star-dist-display');
    if (starDistEl) starDistEl.textContent = CONFIG.star.distance;

    const starMagEl = document.getElementById('star-mag-display');
    if (starMagEl) starMagEl.textContent = CONFIG.star.magnitude;

    const actionHint = document.getElementById('galaxy-hint');
    if (actionHint) actionHint.textContent = CONFIG.welcome.actionHint;
  }

  // Canlı Sayaçlar (Birlikte Geçen Süre + 1. Yıl Geri Sayımı)
  startLoveCounters() {
    const updateCounters = () => {
      const now = new Date();
      
      // 1. Geçen Zaman Sayacı (20 Ocak 2026'dan beri)
      const start = new Date(CONFIG.startDate);
      const diffPassed = now - start;

      if (diffPassed > 0) {
        const totalSecs = Math.floor(diffPassed / 1000);
        const days = Math.floor(totalSecs / (3600 * 24));
        const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSecs % 3600) / 60);
        const seconds = totalSecs % 60;

        const dEl = document.getElementById('counter-days');
        const hEl = document.getElementById('counter-hours');
        const mEl = document.getElementById('counter-mins');
        const sEl = document.getElementById('counter-secs');

        if (dEl) dEl.textContent = days;
        if (hEl) hEl.textContent = hours.toString().padStart(2, '0');
        if (mEl) mEl.textContent = minutes.toString().padStart(2, '0');
        if (sEl) sEl.textContent = seconds.toString().padStart(2, '0');
      }

      // 2. 1. Yıl Dönümü Geri Sayımı (20 Ocak 2027)
      const anniversary = new Date(CONFIG.anniversaryDate);
      const diffRemaining = anniversary - now;

      const aDEl = document.getElementById('anniv-days');
      const aHEl = document.getElementById('anniv-hours');
      const aMEl = document.getElementById('anniv-mins');
      const aSEl = document.getElementById('anniv-secs');
      const capsuleTimeLeft = document.getElementById('capsule-time-left');

      if (diffRemaining > 0) {
        const totalRemSecs = Math.floor(diffRemaining / 1000);
        const remDays = Math.floor(totalRemSecs / (3600 * 24));
        const remHours = Math.floor((totalRemSecs % (3600 * 24)) / 3600);
        const remMins = Math.floor((totalRemSecs % 3600) / 60);
        const remSecs = totalRemSecs % 60;

        if (aDEl) aDEl.textContent = remDays;
        if (aHEl) aHEl.textContent = remHours.toString().padStart(2, '0');
        if (aMEl) aMEl.textContent = remMins.toString().padStart(2, '0');
        if (aSEl) aSEl.textContent = remSecs.toString().padStart(2, '0');

        if (capsuleTimeLeft) {
          capsuleTimeLeft.textContent = `Açılmasına: ${remDays} Gün ${remHours} Saat ${remMins} Dakika ${remSecs} Saniye kaldı`;
        }
      } else {
        if (aDEl) aDEl.textContent = '0';
        if (aHEl) aHEl.textContent = '00';
        if (aMEl) aMEl.textContent = '00';
        if (aSEl) aSEl.textContent = '00';
        if (capsuleTimeLeft) {
          capsuleTimeLeft.textContent = '🎉 1. Yılımız Kutlu Olsun! Kilit Açıldı!';
        }
        const letterBox = document.getElementById('capsule-letter-box');
        const lockIcon = document.getElementById('capsule-lock-icon');
        if (letterBox && letterBox.style.display !== 'block') {
          letterBox.style.display = 'block';
        }
        if (lockIcon) lockIcon.textContent = '🔓';
      }
    };

    updateCounters();
    this.timerInterval = setInterval(updateCounters, 1000);
  }

  // ✨ TAKIMYILDIZI ÇİZİM BUTONU
  setupConstellationButton() {
    const btn = document.getElementById('constellation-toggle-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!this.galaxyEngine) return;
      const isVisible = this.galaxyEngine.toggleConstellation();
      if (isVisible) {
        btn.classList.add('active');
        this.triggerCosmicConfetti();
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // 🌠 DİLEK TUTMA SİSTEMİ
  setupWishSystem() {
    const wishBtn = document.getElementById('wish-meteor-btn');
    const modal = document.getElementById('wish-modal');
    const closeBtn = document.getElementById('close-wish-modal-btn');
    const form = document.getElementById('launch-wish-form');
    const input = document.getElementById('wish-input');
    const cloud = document.getElementById('wishes-cloud');

    // Kayıtlı dilekleri yükle
    const saved = localStorage.getItem('cosmic_wishes');
    if (saved) {
      try {
        this.wishes = JSON.parse(saved);
      } catch (e) {
        this.wishes = ["Sonsuza kadar seninle olmak ✨", "Gözlerinin hiç solmaması 🌸"];
      }
    } else {
      this.wishes = ["Sonsuza kadar seninle olmak ✨", "Gözlerinin hiç solmaması 🌸"];
    }

    const renderWishesCloud = () => {
      if (!cloud) return;
      cloud.innerHTML = this.wishes.map(w => `<span class="wish-tag">✦ ${w}</span>`).join('');
    };

    renderWishesCloud();

    const openWishModal = () => {
      if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-active');
        cosmicAudio.playSynthNote(440, 1.0);
      }
    };

    const closeWishModal = () => {
      if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-active');
      }
    };

    if (wishBtn) wishBtn.addEventListener('click', openWishModal);
    if (closeBtn) closeBtn.addEventListener('click', closeWishModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeWishModal();
      });
    }

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const wishText = input.value.trim();
        if (!wishText) return;

        // 1. Dileği kaydet
        this.wishes.unshift(wishText);
        localStorage.setItem('cosmic_wishes', JSON.stringify(this.wishes));
        renderWishesCloud();

        // 2. Galakside parıldayan kayan yıldız fırlat
        if (this.galaxyEngine) {
          this.galaxyEngine.launchWishMeteor();
        }

        // 3. Konfeti ve kutlama
        this.triggerHaptic(25);
        this.triggerCosmicConfetti();
        input.value = '';
        closeWishModal();
      });
    }
  }

  // 🤫 GİZLİ YILDIZ (EASTER EGG) MODALI
  setupSecretStarModal() {
    const modal = document.getElementById('secret-star-modal');
    const closeBtn = document.getElementById('close-secret-modal-btn');
    const loveBtn = document.getElementById('secret-love-btn');

    const closeModal = () => {
      if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-active');
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (loveBtn) {
      loveBtn.addEventListener('click', () => {
        this.triggerCosmicConfetti();
        closeModal();
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  }

  openSecretStarModal() {
    const modal = document.getElementById('secret-star-modal');
    const titleEl = document.getElementById('secret-star-title');
    const textEl = document.getElementById('secret-star-text');

    if (titleEl) titleEl.textContent = CONFIG.secretStar.title;
    if (textEl) textEl.textContent = CONFIG.secretStar.message;

    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-active');
      cosmicAudio.playChime();
      this.triggerCosmicConfetti();
    }
  }

  // ⏳ ZAMAN KAPSÜLÜ YÖNETİMİ
  setupTimeCapsule() {
    const titleEl = document.getElementById('capsule-title');
    const teaserEl = document.getElementById('capsule-teaser');
    const letterBox = document.getElementById('capsule-letter-box');
    const letterContent = document.getElementById('capsule-letter-content');
    const lockIcon = document.getElementById('capsule-lock-icon');

    if (titleEl) titleEl.textContent = CONFIG.timeCapsule.title;
    if (teaserEl) teaserEl.textContent = CONFIG.timeCapsule.teaser;
    if (letterContent) letterContent.textContent = CONFIG.timeCapsule.secretLetter;

    const now = new Date();
    const isUnlocked = now >= new Date(CONFIG.timeCapsule.unlockDate);

    if (isUnlocked) {
      if (lockIcon) lockIcon.textContent = '🔓';
      if (letterBox) letterBox.style.display = 'block';
    } else {
      if (lockIcon) lockIcon.textContent = '🔒';
      if (letterBox) letterBox.style.display = 'none';
    }
  }

  // 🎧 SPOTIFY ENTEGRASYONU
  setupSpotify() {
    const iframe = document.getElementById('spotify-iframe');
    if (iframe && CONFIG.music.spotifyTrackUrl) {
      iframe.src = CONFIG.music.spotifyTrackUrl;
    }
    const directLink = document.getElementById('spotify-direct-link');
    if (directLink && CONFIG.music.spotifyDirectUrl) {
      directLink.href = CONFIG.music.spotifyDirectUrl;
    }

    // Doğrudan Şarkı Önizleme Oynatıcısı (HTML5 Audio)
    const previewBtn = document.getElementById('preview-play-btn');
    const previewIcon = document.getElementById('preview-play-icon');
    let previewAudio = null;
    let isPlayingPreview = false;

    if (CONFIG.music.audioPreviewUrl) {
      previewAudio = new Audio(CONFIG.music.audioPreviewUrl);
      previewAudio.addEventListener('ended', () => {
        isPlayingPreview = false;
        if (previewIcon) previewIcon.textContent = '▶';
      });
    }

    if (previewBtn) {
      previewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerHaptic(15);
        if (!previewAudio) {
          window.open(CONFIG.music.spotifyDirectUrl, '_blank');
          return;
        }

        isPlayingPreview = !isPlayingPreview;
        if (isPlayingPreview) {
          if (cosmicAudio.isPlaying) {
            cosmicAudio.stop();
          }
          if (previewIcon) previewIcon.textContent = '⏸';
          previewAudio.play().catch(() => {});
        } else {
          if (previewIcon) previewIcon.textContent = '▶';
          previewAudio.pause();
        }
      });
    }
  }

  // Portalı Aç & Kutlama Yap
  openPortal() {
    const portal = document.getElementById('portal-overlay');
    const container = document.querySelector('.portal-glass-container');
    if (container) {
      container.scrollTop = 0;
      container.style.transform = '';
    }
    portal.classList.add('active');
    document.body.classList.add('portal-open');

    this.triggerHaptic(20);
    this.triggerCosmicConfetti();

    if (!cosmicAudio.isPlaying) {
      cosmicAudio.play();
    }
  }

  closePortal() {
    const portal = document.getElementById('portal-overlay');
    const container = document.querySelector('.portal-glass-container');
    if (container) {
      container.style.transform = '';
    }
    portal.classList.remove('active');
    document.body.classList.remove('portal-open');
    this.triggerHaptic(15);

    if (this.galaxyEngine) {
      this.galaxyEngine.resetCameraView();
    }
  }

  triggerCosmicConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff99c8', '#fcf6bd', '#d0f4de', '#a9def9', '#e4c1f9', '#ffffff']
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#ffb3c6', '#ffd6a5', '#ffffff']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#ffb3c6', '#ffd6a5', '#ffffff']
        });
      }, 250);
    }
  }

  // Zaman Tüneli Kartları
  renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = CONFIG.timeline.map((item, index) => `
      <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
        <div class="timeline-dot">
          <div class="dot-inner"></div>
        </div>
        <div class="timeline-card">
          <div class="timeline-card-image" style="background-image: url('${item.image}')" data-full="${item.image}" data-caption="${item.title}">
            <div class="image-overlay">
              <span class="zoom-hint">🔍 Yakından Bak</span>
            </div>
          </div>
          <div class="timeline-card-body">
            <div class="timeline-meta">
              <span class="timeline-date">📅 ${item.date}</span>
              <span class="timeline-location">📍 ${item.location}</span>
            </div>
            <h3 class="timeline-title">${item.title}</h3>
            <p class="timeline-desc">${item.description}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Polaroid Fotoğraf Galerisi
  renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;

    container.innerHTML = CONFIG.gallery.map(item => `
      <div class="polaroid-card" data-full="${item.image}" data-caption="${item.title} - ${item.subtitle}">
        <div class="polaroid-img-wrapper">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="polaroid-caption">
          <h4>${item.title}</h4>
          <p>${item.subtitle}</p>
        </div>
      </div>
    `).join('');
  }

  // Mühürlü Mektup Zarfı
  setupLetterEnvelope() {
    const seal = document.getElementById('envelope-wax-seal');
    const envelope = document.getElementById('love-envelope');
    const contentBox = document.getElementById('letter-paragraphs');

    if (contentBox) {
      document.getElementById('letter-salutation').textContent = CONFIG.letter.salutation;
      contentBox.innerHTML = CONFIG.letter.content.map(p => `<p>${p}</p>`).join('');
      document.getElementById('letter-signature').textContent = CONFIG.letter.signature;
      document.getElementById('letter-author').textContent = CONFIG.letter.author;
    }

    if (seal && envelope) {
      seal.addEventListener('click', () => {
        this.triggerHaptic(25);
        envelope.classList.toggle('opened');
        cosmicAudio.playChime();
        if (envelope.classList.contains('opened')) {
          this.triggerCosmicConfetti();
        }
      });
    }
  }

  // Seni Sevmemin Nedenleri
  renderReasons() {
    const textEl = document.getElementById('reason-text');
    const countEl = document.getElementById('reason-counter');
    const nextBtn = document.getElementById('next-reason-btn');

    const showReason = (idx) => {
      this.currentReasonIndex = idx;
      if (textEl) {
        textEl.style.opacity = '0';
        textEl.style.transform = 'translateY(10px)';
        setTimeout(() => {
          textEl.textContent = `"${CONFIG.reasons[idx]}"`;
          textEl.style.opacity = '1';
          textEl.style.transform = 'translateY(0)';
        }, 200);
      }
      if (countEl) {
        countEl.textContent = `Sebep #${idx + 1} / ${CONFIG.reasons.length}`;
      }
    };

    showReason(0);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.triggerHaptic(12);
        const nextIdx = (this.currentReasonIndex + 1) % CONFIG.reasons.length;
        cosmicAudio.playSynthNote(523.25 + Math.random() * 200, 1.5);
        showReason(nextIdx);
      });
    }
  }

  // Gelecek Hayallerimiz (Bucket List)
  initBucketList() {
    const saved = localStorage.getItem('ecrin_dreams');
    if (saved) {
      try {
        this.dreams = JSON.parse(saved);
      } catch (e) {
        this.dreams = [...CONFIG.bucketList];
      }
    } else {
      this.dreams = [...CONFIG.bucketList];
    }

    this.renderBucketList();

    const addForm = document.getElementById('add-dream-form');
    const input = document.getElementById('new-dream-input');

    if (addForm && input) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = input.value.trim();
        if (!val) return;

        this.dreams.push({ text: val, done: false });
        this.saveDreams();
        this.renderBucketList();
        input.value = '';
        cosmicAudio.playChime();
      });
    }
  }

  saveDreams() {
    localStorage.setItem('ecrin_dreams', JSON.stringify(this.dreams));
  }

  renderBucketList() {
    const listEl = document.getElementById('dreams-list');
    if (!listEl) return;

    listEl.innerHTML = this.dreams.map((item, idx) => `
      <li class="dream-item ${item.done ? 'done' : ''}">
        <label class="custom-checkbox">
          <input type="checkbox" ${item.done ? 'checked' : ''} data-index="${idx}">
          <span class="checkmark"></span>
          <span class="dream-text">${item.text}</span>
        </label>
      </li>
    `).join('');

    listEl.querySelectorAll('input[type="checkbox"]').forEach(box => {
      box.addEventListener('change', (e) => {
        const i = parseInt(e.target.dataset.index);
        this.dreams[i].done = e.target.checked;
        this.saveDreams();
        this.renderBucketList();
        if (e.target.checked) {
          this.triggerCosmicConfetti();
        }
      });
    });
  }

  // 🔭 GERÇEK YILDIZ HARİTASI (PLANETARIUM) BAŞLATICI
  initStarMap() {
    if (!this.starMapEngine) {
      this.starMapEngine = new RealStarMapEngine('planetarium-canvas-container');
      const focusBtn = document.getElementById('focus-ecrin-star-btn');
      if (focusBtn && this.starMapEngine) {
        focusBtn.addEventListener('click', () => {
          this.starMapEngine.focusOnEcrinStar();
        });
      }
    } else {
      this.starMapEngine.onResize();
    }
  }

  // 📳 Haptic Titreşim Geri Bildirimi (Android & Destekleyen Tarayıcılar)
  triggerHaptic(duration = 15) {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(duration);
      } catch (e) {}
    }
  }

  // ⏱️ Mobil Kompakt Segmentli Sayaç Geçişi
  setupCounterToggle() {
    const pills = document.querySelectorAll('.counter-pill-btn');
    const elapsedBox = document.getElementById('counter-box-elapsed');
    const annivBox = document.getElementById('counter-box-anniv');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const target = pill.dataset.target;
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        this.triggerHaptic(12);

        if (target === 'elapsed') {
          if (elapsedBox) elapsedBox.classList.add('mobile-active');
          if (annivBox) annivBox.classList.remove('mobile-active');
        } else {
          if (annivBox) annivBox.classList.add('mobile-active');
          if (elapsedBox) elapsedBox.classList.remove('mobile-active');
        }
      });
    });
  }

  // 📑 Sekme Geçişleri, Yatay Kayan Çubuk Odaklaması ve Dokunmatik Jestler
  setupTabs() {
    const tabButtons = Array.from(document.querySelectorAll('.portal-tab-btn'));
    const tabPanels = document.querySelectorAll('.portal-tab-panel');

    const activateTab = (targetId, triggerHaptics = true) => {
      const btn = tabButtons.find(b => b.dataset.tab === targetId);
      if (!btn) return;

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      // Mobilde aktif olan sekmeyi tek satır yatay çubukta ortala
      try {
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } catch (e) {}

      if (triggerHaptics) {
        this.triggerHaptic(15);
      }

      // Eğer Yıldız Haritası sekmesi seçildiyse teleskop motorunu başlat/yenile
      if (targetId === 'starmap') {
        setTimeout(() => {
          this.initStarMap();
        }, 80);
      }

      // Eğer Spotify sekmesi seçildiyse arka plan piyano sesini duraklatarak şarkının net duyulmasını sağla
      if (targetId === 'spotify') {
        if (cosmicAudio.isPlaying) {
          cosmicAudio.stop();
        }
      } else {
        cosmicAudio.playSynthNote(440, 0.8);
      }
    };

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activateTab(btn.dataset.tab);
      });
    });

    // Sekmeler arası parmakla sola/sağa kaydırma (Swipe Gestures)
    this.setupSwipeTabs(tabButtons, activateTab);

    // Sekmeler çubuğunu fare ile tutup sürükleyerek kaydırma (Drag to Scroll)
    this.setupTabsDragScroll();
  }

  // 🖱️ Sekme Çubuğunu Mouse / Touch ile Tutup Kaydırma
  setupTabsDragScroll() {
    const nav = document.getElementById('portal-nav-tabs');
    if (!nav) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    nav.addEventListener('mousedown', (e) => {
      isDown = true;
      nav.classList.add('grabbing');
      startX = e.pageX - nav.offsetLeft;
      scrollLeft = nav.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
      nav.classList.remove('grabbing');
    });

    nav.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - nav.offsetLeft;
      const walk = (x - startX) * 1.5;
      nav.scrollLeft = scrollLeft - walk;
    });
  }

  // 👆 Parmakla Sola/Sağa Kaydırarak Sekme Değiştirme (Swipe Gestures)
  setupSwipeTabs(tabButtons, activateTab) {
    const body = document.querySelector('.portal-content-body');
    if (!body) return;

    let touchStartX = 0;
    let touchStartY = 0;

    body.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      const target = e.target;
      // 3D planetarium haritası, form girdileri, butonlar veya mühür üzerinde gezinirken sekme kaydırmayı engelle
      if (
        target.closest('#planetarium-canvas-container') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('button') ||
        target.closest('.timeline-card') ||
        target.closest('.wax-seal') ||
        target.closest('.polaroid-card')
      ) {
        touchStartX = 0;
        touchStartY = 0;
        return;
      }
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    body.addEventListener('touchend', (e) => {
      if (touchStartX === 0 && touchStartY === 0) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      touchStartX = 0;
      touchStartY = 0;

      // Yatayda belirgin kaydırma eşiği (65px ve yatay hareket dikey hareketin 1.5 katı)
      if (Math.abs(deltaX) > 65 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        const activeBtn = document.querySelector('.portal-tab-btn.active');
        if (!activeBtn) return;
        const currentIndex = tabButtons.indexOf(activeBtn);
        if (currentIndex === -1) return;

        if (deltaX < 0) {
          // Sola kaydırıldı -> Sıradaki sekme
          const nextIndex = (currentIndex + 1) % tabButtons.length;
          activateTab(tabButtons[nextIndex].dataset.tab);
        } else {
          // Sağa kaydırıldı -> Önceki sekme
          const prevIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
          activateTab(tabButtons[prevIndex].dataset.tab);
        }
      }
    }, { passive: true });
  }

  // 📐 Mobilde Aşağı Çekerek Kapatma (Pull Down to Dismiss)
  setupMobilePullToDismiss() {
    const handle = document.getElementById('mobile-pull-handle');
    const container = document.querySelector('.portal-glass-container');
    if (!handle || !container) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    handle.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      container.style.transition = 'none';
    }, { passive: true });

    handle.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        container.style.transform = `translateY(${deltaY}px)`;
      }
    }, { passive: true });

    const finishDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      const deltaY = currentY - startY;
      if (deltaY > 75) {
        this.triggerHaptic(20);
        this.closePortal();
        setTimeout(() => {
          container.style.transform = '';
        }, 400);
      } else {
        container.style.transform = '';
      }
    };

    handle.addEventListener('touchend', finishDrag);
    handle.addEventListener('touchcancel', finishDrag);
  }

  // 🎙️ SESLİ AŞK NOTU OYNATICISI
  setupVoiceNote() {
    const titleEl = document.getElementById('voice-title');
    const subEl = document.getElementById('voice-sub');
    const transEl = document.getElementById('voice-transcript');
    const playBtn = document.getElementById('play-voice-btn');
    const btnIcon = document.getElementById('voice-btn-icon');
    const waveBox = document.getElementById('voice-wave-container');

    if (titleEl && CONFIG.voiceNote) titleEl.textContent = CONFIG.voiceNote.title;
    if (subEl && CONFIG.voiceNote) subEl.textContent = CONFIG.voiceNote.subtitle;
    if (transEl && CONFIG.voiceNote) transEl.textContent = `"${CONFIG.voiceNote.transcript}"`;

    let isPlayingVoice = false;
    let voiceAudio = null;

    if (CONFIG.voiceNote && CONFIG.voiceNote.customAudioPath && CONFIG.voiceNote.customAudioPath.trim() !== '') {
      voiceAudio = new Audio(CONFIG.voiceNote.customAudioPath);
      voiceAudio.addEventListener('ended', () => {
        isPlayingVoice = false;
        if (waveBox) waveBox.classList.remove('playing');
        if (btnIcon) btnIcon.textContent = '▶';
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        isPlayingVoice = !isPlayingVoice;
        if (isPlayingVoice) {
          if (btnIcon) btnIcon.textContent = '⏸';
          if (waveBox) waveBox.classList.add('playing');
          if (voiceAudio) {
            voiceAudio.play().catch(() => {});
          } else {
            // Canlı fısıltı armonisi
            cosmicAudio.playSynthNote(329.63, 4.0);
            setTimeout(() => cosmicAudio.playSynthNote(440, 3.5), 400);
            setTimeout(() => cosmicAudio.playSynthNote(523.25, 3.0), 800);
            setTimeout(() => {
              isPlayingVoice = false;
              if (waveBox) waveBox.classList.remove('playing');
              if (btnIcon) btnIcon.textContent = '▶';
            }, 4500);
          }
        } else {
          if (btnIcon) btnIcon.textContent = '▶';
          if (waveBox) waveBox.classList.remove('playing');
          if (voiceAudio) voiceAudio.pause();
        }
      });
    }
  }

  // 📜 RESMİ YILDIZ SERTİFİKASINI YÜKSEK ÇÖZÜNÜRLÜKLÜ PNG OLARAK İNDİRME
  setupCertificateDownload() {
    const btn = document.getElementById('download-cert-btn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      this.triggerCosmicConfetti();
      cosmicAudio.playChime();

      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 850;
      const ctx = canvas.getContext('2d');

      // 1. Gece Mavisi Radyal Arka Plan
      const bgGrad = ctx.createRadialGradient(600, 425, 60, 600, 425, 750);
      bgGrad.addColorStop(0, '#1c0f33');
      bgGrad.addColorStop(1, '#070210');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 850);

      // Yıldız tozları
      for (let i = 0; i < 240; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`;
        ctx.fillRect(Math.random() * 1200, Math.random() * 850, Math.random() * 2 + 1, Math.random() * 2 + 1);
      }

      // 2. Altın Çerçeveler
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.strokeRect(35, 35, 1130, 780);

      ctx.strokeStyle = 'rgba(252, 231, 161, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(46, 46, 1108, 758);

      // 3. Başlık
      ctx.fillStyle = '#fce7a1';
      ctx.font = 'bold 36px "Cinzel", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('EVRENSEL YILDIZ TESCİL SERTİFİKASI', 600, 120);

      ctx.fillStyle = '#d8cde6';
      ctx.font = 'italic 18px "Playfair Display", serif';
      ctx.fillText('Bu belge ile gökyüzündeki aşağıdaki koordinatlara sahip gök cisminin sonsuza dek tescil edildiği onaylanır.', 600, 165);

      // 4. Yıldız Sahibi: Ecrin
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 56px "Playfair Display", Georgia, serif';
      ctx.fillText(`✨  ${CONFIG.partnerName}  ✨`, 600, 260);

      // 5. Özellikler Tablosu
      const specs = [
        ['Takımyıldızı', CONFIG.star.constellation],
        ['Galaktik Koordinatlar', CONFIG.star.coordinates],
        ['Uzaklık Derecesi', CONFIG.star.distance],
        ['Parlaklık (Magnitude)', CONFIG.star.magnitude]
      ];

      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(150, 310, 900, 260);
      ctx.strokeStyle = 'rgba(252, 231, 161, 0.35)';
      ctx.lineWidth = 1;
      ctx.strokeRect(150, 310, 900, 260);

      specs.forEach(([label, val], idx) => {
        const row = Math.floor(idx / 2);
        const col = idx % 2;
        const x = col === 0 ? 200 : 670;
        const y = 370 + row * 110;

        ctx.textAlign = 'left';
        ctx.fillStyle = '#fce7a1';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(label.toUpperCase(), x, y);

        ctx.fillStyle = '#ffffff';
        ctx.font = '22px sans-serif';
        ctx.fillText(val, x, y + 36);
      });

      // 6. İmzalar ve Mühür
      ctx.fillStyle = '#fce7a1';
      ctx.font = 'italic 34px "Dancing Script", cursive, serif';
      ctx.textAlign = 'center';
      ctx.fillText(CONFIG.yourName, 320, 715);
      ctx.fillStyle = '#b3a2c7';
      ctx.font = '14px sans-serif';
      ctx.fillText('Gökbilimci & Sevgilin', 320, 745);

      // Altın Mühür
      ctx.beginPath();
      ctx.arc(600, 695, 48, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#2b1704';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('DAİMA', 600, 690);
      ctx.fillText('AŞKLA', 600, 708);

      ctx.fillStyle = '#fce7a1';
      ctx.font = 'italic 34px "Dancing Script", cursive, serif';
      ctx.fillText('Sonsuzluk', 880, 715);
      ctx.fillStyle = '#b3a2c7';
      ctx.font = '14px sans-serif';
      ctx.fillText('Geçerlilik Süresi', 880, 745);

      // İndirme
      const a = document.createElement('a');
      a.download = `ecrin-yildiz-sertifikasi.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    });
  }

  // 📲 PROGRESSIVE WEB APP (OFFLINE CACHE)
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }

  // Müzik Çalar Kontrolleri
  setupMusicControls() {
    const toggleBtn = document.getElementById('music-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cosmicAudio.toggle();
      });
    }

    const unlockAudio = () => {
      cosmicAudio.ensureAudioContext();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
  }

  // Fotoğraf Büyüteci (Lightbox)
  setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let currentItems = [];
    let currentIndex = 0;

    const showItem = (idx) => {
      if (!currentItems.length || !img) return;
      currentIndex = (idx + currentItems.length) % currentItems.length;
      const item = currentItems[currentIndex];
      img.src = item.url;
      if (caption) {
        const countPrefix = currentItems.length > 1 ? `(${currentIndex + 1}/${currentItems.length}) ` : '';
        caption.textContent = `${countPrefix}${item.cap || ''}`;
      }
    };

    const openImage = (clickedCard) => {
      if (!modal || !img) return;
      const container = clickedCard.closest('.portal-tab-panel') || document.body;
      const elements = Array.from(container.querySelectorAll('[data-full]'));
      currentItems = elements.map(el => ({
        url: el.getAttribute('data-full'),
        cap: el.getAttribute('data-caption')
      }));

      currentIndex = elements.indexOf(clickedCard);
      if (currentIndex === -1) currentIndex = 0;

      showItem(currentIndex);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    };

    const closeImage = () => {
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    };

    const nextImage = () => {
      this.triggerHaptic(10);
      showItem(currentIndex + 1);
    };

    const prevImage = () => {
      this.triggerHaptic(10);
      showItem(currentIndex - 1);
    };

    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-full]');
      if (card) {
        openImage(card);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeImage);
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeImage();
      });

      // Dokunmatik Kaydırma (Touch Swipe) Desteği
      let touchStartX = 0;
      let touchStartY = 0;

      modal.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      modal.addEventListener('touchend', (e) => {
        if (e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
            if (deltaX < 0) {
              nextImage();
            } else {
              prevImage();
            }
          }
        }
      }, { passive: true });
    }

    // Klavye Yön Tuşları ile Galeri Gezinmesi
    window.addEventListener('keydown', (e) => {
      if (!modal || !modal.classList.contains('active')) return;
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    });
  }

  setupGeneralEvents() {
    const closeBtn = document.getElementById('close-portal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closePortal();
      });
    }

    const songHeaderBtn = document.getElementById('open-song-header-btn');
    if (songHeaderBtn) {
      songHeaderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openPortal();
        const tabBtn = document.querySelector('.portal-tab-btn[data-tab="spotify"]');
        if (tabBtn) tabBtn.click();
      });
    }

    const starmapHeaderBtn = document.getElementById('open-starmap-header-btn');
    if (starmapHeaderBtn) {
      starmapHeaderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openPortal();
        const tabBtn = document.querySelector('.portal-tab-btn[data-tab="starmap"]');
        if (tabBtn) tabBtn.click();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox-modal');
        const wishModal = document.getElementById('wish-modal');
        const secretModal = document.getElementById('secret-star-modal');

        if (lightbox && lightbox.classList.contains('active')) {
          lightbox.classList.remove('active');
        } else if (wishModal && wishModal.classList.contains('active')) {
          wishModal.classList.remove('active');
          document.body.classList.remove('modal-active');
        } else if (secretModal && secretModal.classList.contains('active')) {
          secretModal.classList.remove('active');
          document.body.classList.remove('modal-active');
        } else {
          this.closePortal();
        }
      }
    });
  }
}

// Sayfa yüklendiğinde başlat
window.addEventListener('DOMContentLoaded', () => {
  new UniverseApp();
});

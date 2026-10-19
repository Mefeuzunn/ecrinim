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
          this.triggerHaptic(20);
          this.starMapEngine.focusOnEcrinStar();
        });
      }

      // 📱 Mobil Hızlı Zoom Butonları (+ / −)
      const zoomInBtn = document.getElementById('starmap-zoom-in-btn');
      const zoomOutBtn = document.getElementById('starmap-zoom-out-btn');
      if (zoomInBtn && this.starMapEngine) {
        zoomInBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.triggerHaptic(10);
          this.starMapEngine.zoomIn();
        });
      }
      if (zoomOutBtn && this.starMapEngine) {
        zoomOutBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.triggerHaptic(10);
          this.starMapEngine.zoomOut();
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

    // 🔒 Sekmeler arası parmakla sola/sağa kaydırma (Swipe Gestures) kapatıldı (Kullanıcı talebi: Sayfa kaydırırken sekmeler sağa sola kaymasın, sabit dursun)
    // this.setupSwipeTabs(tabButtons, activateTab);

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
        target.closest('.planetarium-viewport-box') ||
        target.closest('#planetarium-canvas-container') ||
        target.closest('.telescope-hud-overlay') ||
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

  // 📜 RESMİ YILDIZ SERTİFİKASINI YÜKSEK ÇÖZÜNÜRLÜKLÜ PNG OLARAK İNDİRME / PAYLAŞMA
  setupCertificateDownload() {
    const btn = document.getElementById('download-cert-btn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      this.triggerHaptic(25);
      this.triggerCosmicConfetti();
      cosmicAudio.playChime();

      const originalHtml = btn.innerHTML;
      btn.innerHTML = `<span class="btn-icon">⏳</span><span class="btn-text">Sertifika Hazırlanıyor...</span>`;
      btn.disabled = true;

      try {
        // Fontların hazır olmasını bekle (en fazla 300ms, tarayıcı jestini kaçırmamak için)
        if (document.fonts && document.fonts.ready) {
          await Promise.race([
            document.fonts.ready,
            new Promise(res => setTimeout(res, 300))
          ]);
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        this.renderProfessionalCertificateCanvas(canvas, ctx);

        // Canvas -> PNG Blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.98));
        if (!blob) throw new Error('Sertifika görseli üretilemedi');

        const fileName = `Ecrin-Resmi-Yildiz-Sertifikasi.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        let shared = false;
        // 1. Mobil Cihazlar (iOS Safari & Android Chrome): Web Share API
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: "Ecrin'in Resmi Yıldız Tescil Sertifikası ✨",
              text: "Trilyonlarca yıldız arasında sadece senin adınla tescil edilen resmi yıldız sertifikan...",
              files: [file]
            });
            shared = true;
          } catch (shareErr) {
            if (shareErr.name !== 'AbortError') {
              console.warn('Share API hatası:', shareErr);
            }
          }
        }

        const blobUrl = URL.createObjectURL(blob);

        // 2. Masaüstü ve Paylaşım desteklemeyen tarayıcılar için doğrudan indirme
        if (!shared) {
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = blobUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
          }, 1500);

          // 3. Ekranda yüksek çözünürlüklü Lightbox Önizlemesi aç (Uzun basarak 'Fotoğraflara Kaydet' seçeneği)
          this.showCertificateLightbox(blobUrl);
        }
      } catch (err) {
        console.error('Sertifika oluşturma/indirme hatası:', err);
        alert('Sertifikanız hazırlanırken bir sorun oluştu. Lütfen sayfayı yenileyip tekrar deneyin.');
      } finally {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
      }
    });
  }

  // 🎨 Profesyonel 2000x1420 Yüksek Çözünürlüklü Sertifika Çizimi
  renderProfessionalCertificateCanvas(canvas, ctx) {
    const w = 2000;
    const h = 1420;
    canvas.width = w;
    canvas.height = h;

    // 1. Gece Mavisi / Obsidyen Radyal Arka Plan
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, 1100);
    bgGrad.addColorStop(0, '#1d0e38');
    bgGrad.addColorStop(0.55, '#0c051a');
    bgGrad.addColorStop(1, '#05020c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Yıldız Tozları
    for (let i = 0; i < 280; i++) {
      const sx = Math.random() * w;
      const sy = Math.random() * h;
      const sSize = Math.random() * 2.4 + 0.6;
      const sAlpha = Math.random() * 0.7 + 0.25;
      ctx.fillStyle = `rgba(255, 255, 255, ${sAlpha})`;
      ctx.fillRect(sx, sy, sSize, sSize);
    }

    // 3. Altın Kenarlıklar & Köşe İşlemeleri
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, w - 100, h - 100);

    ctx.strokeStyle = 'rgba(252, 231, 161, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(66, 66, w - 132, h - 132);

    // 4 Köşe İşlemesi
    const cornerSize = 44;
    const drawCorner = (x, y) => {
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, cornerSize, cornerSize);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.fillText('❖', x + cornerSize / 2, y + cornerSize / 2 + 8);
    };
    drawCorner(80, 80);
    drawCorner(w - 80 - cornerSize, 80);
    drawCorner(80, h - 80 - cornerSize);
    drawCorner(w - 80 - cornerSize, h - 80 - cornerSize);

    // 4. Kurumsal Üst Başlık & Sicil Amblemi
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fde68a';
    ctx.font = '28px serif';
    ctx.fillText('✦  🪐  ✦', w / 2, 130);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px "Cinzel", Georgia, serif';
    ctx.fillText('INTERNATIONAL CELESTIAL STAR REGISTRY', w / 2, 168);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText('Uluslararası Resmi Göksel Yıldız Sicili & Astronomi Arşivi', w / 2, 198);

    // 5. Ana Belge Başlığı
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 52px "Cinzel", Georgia, serif';
    ctx.fillText('YILDIZ TESCİL SERTİFİKASI', w / 2, 275);

    // Tescil Sicil No
    ctx.fillStyle = 'rgba(251, 191, 36, 0.12)';
    ctx.fillRect(w / 2 - 290, 295, 580, 38);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(w / 2 - 290, 295, 580, 38);

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Sicil Kayıt No: ISR-2026-ECR-0120-∞  •  ONAYLANDI & MÜHÜRLENDİ', w / 2, 320);

    // 6. Resmi Beyan Paragrafı
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'italic 21px "Playfair Display", Georgia, serif';
    ctx.fillText('İşbu resmi göksel tescil belgesiyle onaylanır ki; gökyüzünün aşağıda belirtilen kesin astronomik koordinatlarında yer alan yıldız,', w / 2, 385);
    ctx.fillText('resmi göksel yıldız kataloğunda tescil edilmiş olup sonsuza kadar sadece aşağıdaki hak sahibinin adıyla anılacaktır:', w / 2, 415);

    // 7. Hak Sahibi Hero Plakası (Ecrin)
    ctx.fillStyle = 'rgba(236, 72, 153, 0.1)';
    ctx.fillRect(w / 2 - 480, 445, 960, 150);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(w / 2 - 480, 445, 960, 150);

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('GÖKSEL HAK SAHİBİ & YILDIZ ADI', w / 2, 480);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
    ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
    ctx.shadowBlur = 30;
    ctx.fillText(`✨  ${CONFIG.partnerName}  ✨`, w / 2, 545);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#fde68a';
    ctx.font = 'italic 16px sans-serif';
    ctx.fillText('✦ Sonsuz Aşkın, Sadakatin ve Işığın Tescilli Yıldızı ✦', w / 2, 580);

    // 8. Astronomik Özellikler Tablosu (2 Sütun x 3 Satır)
    const tableX = 220;
    const tableY = 625;
    const tableW = 1560;
    const tableH = 360;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(tableX, tableY, tableW, tableH);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(tableX, tableY, tableW, tableH);

    // Hücre bölme çizgileri
    ctx.beginPath();
    ctx.moveTo(tableX + tableW / 2, tableY);
    ctx.lineTo(tableX + tableW / 2, tableY + tableH);
    ctx.moveTo(tableX, tableY + 120);
    ctx.lineTo(tableX + tableW, tableY + 120);
    ctx.moveTo(tableX, tableY + 240);
    ctx.lineTo(tableX + tableW, tableY + 240);
    ctx.stroke();

    const specItems = [
      { label: 'TAKIMYILDIZI', val: 'Lir / Sonsuz Kalp (Lyra)' },
      { label: 'GÖK KOORDİNATLARI (J2000)', val: 'RA 18h 36m 56s | Dec +38° 47′ 01″' },
      { label: 'DÜNYAYA UZAKLIK', val: '0 Işık Yılı (Kalbimin İçi)' },
      { label: 'GÖRÜNÜR PARLAKLIK (MAGNITUDE)', val: 'Gözlerinin Işıltısı Kadar Sonsuz' },
      { label: 'GÖK CİSMİ TÜRÜ', val: 'Mavi-Beyaz Anakol Yıldızı (Vega Civarı)' },
      { label: 'TESCİL TARİHİ & GEÇERLİLİK', val: '20 Ocak 2026 — Sonsuza Dek (Ömür Boyu)' }
    ];

    specItems.forEach((item, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cellX = tableX + col * (tableW / 2) + 40;
      const cellY = tableY + row * 120 + 45;

      ctx.textAlign = 'left';
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(item.label, cellX, cellY);

      ctx.fillStyle = '#ffffff';
      ctx.font = '22px sans-serif';
      ctx.fillText(item.val, cellX, cellY + 38);
    });

    // 9. İmzalar ve Resmi Altın Mühür
    const footerY = 1120;

    // Sol İmza: Efe
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fde68a';
    ctx.font = 'italic 46px "Dancing Script", cursive, serif';
    ctx.fillText(CONFIG.yourName, 460, footerY);

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(310, footerY + 20);
    ctx.lineTo(610, footerY + 20);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px sans-serif';
    ctx.fillText('Yetkili Gökbilimci & Kalbinin Sahibi', 460, footerY + 48);

    // Orta Mühür: 3D Altın Kabartma
    const sealX = w / 2;
    const sealY = footerY + 10;
    const sealR = 64;

    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
    const sealGrad = ctx.createRadialGradient(sealX - 20, sealY - 20, 10, sealX, sealY, sealR);
    sealGrad.addColorStop(0, '#fef08a');
    sealGrad.addColorStop(0.5, '#eab308');
    sealGrad.addColorStop(1, '#854d0e');
    ctx.fillStyle = sealGrad;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#3e1f05';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('★ ★ ★', sealX, sealY - 22);
    ctx.font = 'bold 18px "Cinzel", Georgia, serif';
    ctx.fillText('DAİMA', sealX, sealY);
    ctx.fillText('AŞKLA', sealX, sealY + 20);
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('★ ★ ★', sealX, sealY + 38);

    // Sağ İmza: Sonsuzluk
    ctx.fillStyle = '#fde68a';
    ctx.font = 'italic 46px "Dancing Script", cursive, serif';
    ctx.fillText('Sonsuzluk', w - 460, footerY);

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w - 610, footerY + 20);
    ctx.lineTo(w - 310, footerY + 20);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px sans-serif';
    ctx.fillText('Evrensel Aşk Sicili Onayı & Geçerlilik', w - 460, footerY + 48);

    // 10. Alt Güvenlik & Doğrulama Şeridi
    ctx.fillStyle = '#64748b';
    ctx.font = '13px sans-serif';
    ctx.fillText('SECURE REGISTRY ARCHIVE ID: ECR-2026-LYRA-9941  •  DOĞRULANMIŞ RESMİ KAYIT  •  TÜM EVRENDE GEÇERLİDİR', w / 2, h - 75);
  }

  // 🖼️ Sertifika Önizleme Lightbox'ı (İndirme engellendiğinde ya da mobilde doğrudan kaydetme için)
  showCertificateLightbox(url) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    if (!modal || !img) return;

    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    img.src = url;
    if (caption) {
      caption.innerHTML = `📜 <strong>Resmi Yıldız Tescil Sertifikan Hazır!</strong><br><span style="font-size:0.82rem;color:#fde68a;">💡 Görsele parmağınla basılı tutarak "Fotoğraflara Kaydet" diyebilirsin.</span>`;
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
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

      if (prevBtn) prevBtn.style.display = '';
      if (nextBtn) nextBtn.style.display = '';

      showItem(currentIndex);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    };

    const closeImage = () => {
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (prevBtn) prevBtn.style.display = '';
        if (nextBtn) nextBtn.style.display = '';
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
          const pBtn = document.getElementById('lightbox-prev');
          const nBtn = document.getElementById('lightbox-next');
          if (pBtn) pBtn.style.display = '';
          if (nBtn) nBtn.style.display = '';
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

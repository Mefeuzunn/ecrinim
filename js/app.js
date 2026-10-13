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

import { CONFIG } from './config.js';
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

    // 5. İçerikleri ve Özellikleri Başlat
    this.renderTimeline();
    this.renderGallery();
    this.renderReasons();
    this.initBucketList();
    this.setupLetterEnvelope();
    this.setupTimeCapsule();
    this.setupSpotify();
    this.setupConstellationButton();
    this.setupWishSystem();
    this.setupSecretStarModal();
    this.setupTabs();
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
    const peekBtn = document.getElementById('peek-capsule-btn');
    const lockIcon = document.getElementById('capsule-lock-icon');

    if (titleEl) titleEl.textContent = CONFIG.timeCapsule.title;
    if (teaserEl) teaserEl.textContent = CONFIG.timeCapsule.teaser;
    if (letterContent) letterContent.textContent = CONFIG.timeCapsule.secretLetter;

    const now = new Date();
    const isUnlocked = now >= new Date(CONFIG.timeCapsule.unlockDate);

    if (isUnlocked) {
      if (lockIcon) lockIcon.textContent = '🔓';
      if (letterBox) letterBox.style.display = 'block';
      if (peekBtn) peekBtn.style.display = 'none';
    } else {
      if (peekBtn) {
        peekBtn.addEventListener('click', () => {
          if (letterBox.style.display === 'none') {
            letterBox.style.display = 'block';
            peekBtn.textContent = 'Gizli Mektubu Gizle 🙈';
            cosmicAudio.playChime();
            this.triggerCosmicConfetti();
          } else {
            letterBox.style.display = 'none';
            peekBtn.textContent = 'Merak Ettim, Gizlice Bak 🤫';
          }
        });
      }
    }
  }

  // 🎧 SPOTIFY ENTEGRASYONU
  setupSpotify() {
    const iframe = document.getElementById('spotify-iframe');
    if (iframe && CONFIG.music.spotifyTrackUrl) {
      iframe.src = CONFIG.music.spotifyTrackUrl;
    }
  }

  // Portalı Aç & Kutlama Yap
  openPortal() {
    const portal = document.getElementById('portal-overlay');
    portal.classList.add('active');
    document.body.classList.add('portal-open');

    this.triggerCosmicConfetti();

    if (!cosmicAudio.isPlaying) {
      cosmicAudio.play();
    }
  }

  closePortal() {
    const portal = document.getElementById('portal-overlay');
    portal.classList.remove('active');
    document.body.classList.remove('portal-open');

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
    }
  }

  // Tab Geçişleri
  setupTabs() {
    const tabButtons = document.querySelectorAll('.portal-tab-btn');
    const tabPanels = document.querySelectorAll('.portal-tab-panel');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(`tab-${targetId}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }

        // Eğer Yıldız Haritası sekmesi seçildiyse teleskop motorunu başlat/yenile
        if (targetId === 'starmap') {
          setTimeout(() => {
            this.initStarMap();
          }, 80);
        }

        cosmicAudio.playSynthNote(440, 0.8);
      });
    });
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

    const openImage = (url, cap) => {
      if (!modal || !img) return;
      img.src = url;
      if (caption) caption.textContent = cap || '';
      modal.classList.add('active');
    };

    const closeImage = () => {
      if (modal) modal.classList.remove('active');
    };

    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-full]');
      if (card) {
        const full = card.getAttribute('data-full');
        const cap = card.getAttribute('data-caption');
        if (full) {
          openImage(full, cap);
        }
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeImage);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeImage();
      });
    }
  }

  setupGeneralEvents() {
    const closeBtn = document.getElementById('close-portal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closePortal();
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

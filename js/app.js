/**
 * ANA UYGULAMA MANTIĞI & ARAYÜZ YÖNETİCİSİ
 * 
 * - Galaksi ve 3D Yıldız etkileşimi
 * - Canlı Aşk Sayacı (Gün, Saat, Dakika, Saniye)
 * - Mühürlü Aşk Mektubu Zarf Animasyonu
 * - Zaman Tüneli, Galeri, Nedenler ve Dilek Listesi
 * - Lightbox Fotoğraf Büyüteci ve Konfeti Efektleri
 */

import { CONFIG } from './config.js';
import { GalaxyEngine } from './galaxy.js';
import { cosmicAudio } from './audio.js';

class UniverseApp {
  constructor() {
    this.currentReasonIndex = 0;
    this.dreams = [];
    this.galaxyEngine = null;
    this.timerInterval = null;

    this.init();
  }

  init() {
    // 1. Ayarları DOM'a uygula
    this.applyConfig();

    // 2. Ses motorunu hazırla
    cosmicAudio.init();

    // 3. 3D Galaksi Motorunu Başlat
    const canvasContainer = document.getElementById('galaxy-canvas-container');
    this.galaxyEngine = new GalaxyEngine(canvasContainer, () => {
      this.openPortal();
    });

    // 4. Aşk Sayacını Başlat
    this.startLoveCounter();

    // 5. İçerikleri Render Et
    this.renderTimeline();
    this.renderGallery();
    this.renderReasons();
    this.initBucketList();
    this.setupLetterEnvelope();
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

    // Karşılama ipucu
    const actionHint = document.getElementById('galaxy-hint');
    if (actionHint) actionHint.textContent = CONFIG.welcome.actionHint;
  }

  // Canlı Aşk Sayacı
  startLoveCounter() {
    const updateCounter = () => {
      const now = new Date();
      const start = new Date(CONFIG.startDate);
      const diffMs = now - start;

      if (diffMs < 0) {
        document.getElementById('counter-days').textContent = '0';
        document.getElementById('counter-hours').textContent = '0';
        document.getElementById('counter-mins').textContent = '0';
        document.getElementById('counter-secs').textContent = '0';
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const dEl = document.getElementById('counter-days');
      const hEl = document.getElementById('counter-hours');
      const mEl = document.getElementById('counter-mins');
      const sEl = document.getElementById('counter-secs');

      if (dEl) dEl.textContent = days;
      if (hEl) hEl.textContent = hours.toString().padStart(2, '0');
      if (mEl) mEl.textContent = minutes.toString().padStart(2, '0');
      if (sEl) sEl.textContent = seconds.toString().padStart(2, '0');
    };

    updateCounter();
    this.timerInterval = setInterval(updateCounter, 1000);
  }

  // Yıldız Seçildiğinde Portalı Aç ve Kutlama Yap
  openPortal() {
    const portal = document.getElementById('portal-overlay');
    portal.classList.add('active');
    document.body.classList.add('portal-open');

    // Büyüleyici Konfeti Patlaması
    this.triggerCosmicConfetti();

    // Eğer müzik henüz açık değilse ilk tıklamada otomatik başlat
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
      // Kalp ve yıldız tozu renkleri
      confetti({
        particleCount: 75,
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
    const letterPaper = document.getElementById('letter-paper');
    const contentBox = document.getElementById('letter-paragraphs');

    // Mektup metnini doldur
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

    // İlk kullanıcı etkileşiminde ses context'ini uyandır
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

    // Zaman tüneli ve galeri kartlarına tıklama
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
    // Portalı Kapat ve Galaksiye Dön
    const closeBtn = document.getElementById('close-portal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closePortal();
      });
    }

    // Esc tuşu ile kapatma
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox-modal');
        if (lightbox && lightbox.classList.contains('active')) {
          lightbox.classList.remove('active');
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

/**
 * KOZMİK SES & MÜZİK MOTORU
 * 
 * Eğer kullanıcının kendi MP3 dosyası varsa onu çalar.
 * Yoksa, Web Audio API kullanarak uzaysal, büyüleyici, romantik
 * bir piyano/çan arpeji ve kozmik ambient tonları sentezler.
 */

import { CONFIG } from './config.js';

class CosmicAudioPlayer {
  constructor() {
    this.isPlaying = false;
    this.audioElement = null;
    this.audioCtx = null;
    this.synthInterval = null;
    this.notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C D E G A C D E (Huzur veren majör pentatonik)
    this.isUsingCustom = false;
  }

  init() {
    if (CONFIG.music.customAudioPath && CONFIG.music.customAudioPath.trim() !== '') {
      this.audioElement = new Audio(CONFIG.music.customAudioPath);
      this.audioElement.loop = true;
      this.isUsingCustom = true;
    }
  }

  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Büyüleyici uzay çanı / piyano tınısı sentezleyici
  playSynthNote(freq, duration = 3.5) {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Sıcak tını için lowpass filtre
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Zarif yükseliş ve yavaş sönüş (Attack - Decay)
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Hafif dip kozmik uğultu / drone (rahatlatıcı uzay ambiyansı)
  startAmbientDrone() {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;

    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    droneOsc.type = 'triangle';
    droneOsc.frequency.setValueAtTime(130.81, ctx.currentTime); // C3 bas nota

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, ctx.currentTime);

    droneGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 3);

    droneOsc.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(ctx.destination);

    droneOsc.start();
    this.droneOsc = droneOsc;
    this.droneGain = droneGain;
  }

  startProceduralMusic() {
    this.ensureAudioContext();
    this.startAmbientDrone();

    // Her 1.8 - 2.5 saniyede bir rastgele yumuşak bir nota çal
    let step = 0;
    const melody = [0, 2, 4, 7, 5, 4, 2, 0, 4, 7, 9, 7];

    this.synthInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const noteIdx = melody[step % melody.length];
      const baseFreq = this.notes[noteIdx % this.notes.length];
      this.playSynthNote(baseFreq, 4.0);

      // Zaman zaman hafif bir armoni ekle
      if (Math.random() > 0.5) {
        setTimeout(() => {
          if (!this.isPlaying) return;
          const harmonyFreq = baseFreq * 1.5; // Beşli aralık
          this.playSynthNote(harmonyFreq, 3.5);
        }, 400);
      }

      step++;
    }, 1800);
  }

  stopProceduralMusic() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.droneGain && this.audioCtx) {
      try {
        this.droneGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
        setTimeout(() => {
          if (this.droneOsc) {
            this.droneOsc.stop();
            this.droneOsc.disconnect();
          }
        }, 1100);
      } catch (e) {}
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    if (this.isUsingCustom && this.audioElement) {
      this.audioElement.play()
        .then(() => {
          this.isPlaying = true;
          this.updateUi();
        })
        .catch(err => {
          console.warn("Özel ses çalınamadı, synthesizer'a geçiliyor:", err);
          this.startProceduralMusic();
          this.isPlaying = true;
          this.updateUi();
        });
    } else {
      this.startProceduralMusic();
      this.isPlaying = true;
      this.updateUi();
    }
  }

  pause() {
    if (this.isUsingCustom && this.audioElement) {
      this.audioElement.pause();
    } else {
      this.stopProceduralMusic();
    }
    this.isPlaying = false;
    this.updateUi();
  }

  stop() {
    this.pause();
    if (this.isUsingCustom && this.audioElement) {
      this.audioElement.currentTime = 0;
    }
  }

  // Yıldız parıltısı / tıklama minik efekti
  playChime() {
    try {
      this.ensureAudioContext();
      const ctx = this.audioCtx;
      const chimeFreqs = [784.0, 987.77, 1318.51, 1567.98]; // G5, B5, E6, G6
      chimeFreqs.forEach((freq, idx) => {
        setTimeout(() => {
          this.playSynthNote(freq, 2.0);
        }, idx * 90);
      });
    } catch (e) {}
  }

  // Romantik çift kalp atışı (Lub-Dub) ve göksel sevgi arpeji
  playHeartbeat() {
    try {
      this.ensureAudioContext();
      const ctx = this.audioCtx;
      if (!ctx) return;

      const playThump = (freq, delay, dur) => {
        setTimeout(() => {
          if (!this.audioCtx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + dur);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(130, ctx.currentTime);

          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.24, ctx.currentTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + dur + 0.05);
        }, delay);
      };

      // Lub-Dub: Çift kalp atış sesi
      playThump(92, 0, 0.22);
      playThump(78, 160, 0.28);

      // Üzerine göksel kristal sevgi arpeji
      setTimeout(() => {
        const loveChimes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        loveChimes.forEach((f, i) => {
          setTimeout(() => this.playSynthNote(f, 2.5), i * 110);
        });
      }, 340);
    } catch (e) {}
  }

  updateUi() {
    const btn = document.getElementById('music-toggle-btn');
    const label = document.getElementById('music-status-text');
    const visualizer = document.getElementById('music-visualizer');

    if (btn) {
      if (this.isPlaying) {
        btn.classList.add('playing');
        if (label) label.textContent = CONFIG.music.defaultSongTitle;
        if (visualizer) visualizer.classList.add('active');
      } else {
        btn.classList.remove('playing');
        if (label) label.textContent = 'Müziği Başlat';
        if (visualizer) visualizer.classList.remove('active');
      }
    }
  }
}

export const cosmicAudio = new CosmicAudioPlayer();

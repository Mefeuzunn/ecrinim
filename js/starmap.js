/**
 * GERÇEK ASTRONOMİK GÖKYÜZÜ VE YILDIZ HARİTASI (PLANETARIUM)
 * 
 * Gerçek gök koordinatları (RA / Dec) kullanan, gerçek takımyıldızlarını
 * ve trilyonlarca yıldızın arasında Ecrin'in tescilli yıldızını gösteren
 * interaktif 3D astronomi teleskop motoru.
 */

import { CONFIG } from './config.js';
import { cosmicAudio } from './audio.js';

export class RealStarMapEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.starsMesh = null;
    this.constellationLines = null;
    this.labelsGroup = null;
    this.ecrinMarkerGroup = null;
    this.ecrinStarPos = null;

    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0.3, y: -1.2 };
    this.currentRotation = { x: 0.3, y: -1.2 };
    this.cameraDistance = 0.1; // İçeriden küreye bakış (Teleskop bakışı)
    this.fov = 65;
    this.targetFov = 65;

    this.showConstellationLines = true;
    this.showStarNames = true;

    this.init();
  }

  // RA (Saat) ve Dec (Derece) -> 3D Küresel Koordinat Dönüşümü
  raDecToVector3(raHours, decDeg, radius = 100) {
    const raRad = (raHours * 15 * Math.PI) / 180;
    const decRad = (decDeg * Math.PI) / 180;

    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.sin(decRad);
    const z = radius * Math.cos(decRad) * Math.sin(raRad);

    return new THREE.Vector3(x, y, z);
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || 550;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.fov, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 0); // Gözlemci Dünya/Teleskop merkezinde

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Işıklandırma
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambient);

    // Samanyolu & Gerçek Yıldız Kataloğu
    this.buildMilkyWayGlow();
    this.buildDeepStarfield();
    this.buildNamedStarsAndConstellations();
    this.buildEcrinTargetStar();

    this.setupEvents();
    this.animate();
  }

  createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(230, 240, 255, 0.8)');
    grad.addColorStop(0.6, 'rgba(150, 180, 255, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }

  // Samanyolu Kuşağı (Milky Way Band)
  buildMilkyWayGlow() {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 4000 : 8000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Samanyolu düzlemi boyunca yayılım
      const theta = Math.random() * Math.PI * 2;
      const widthSpread = (Math.random() - 0.5) * 0.45;
      const radius = 95;

      const v = new THREE.Vector3(
        Math.cos(theta) * radius,
        widthSpread * 35,
        Math.sin(theta) * radius
      );
      // Samanyolu eğimi (Galaktik eğim ~60 derece)
      v.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.95);

      pos[i3] = v.x;
      pos[i3 + 1] = v.y;
      pos[i3 + 2] = v.z;

      col[i3] = 0.85 + Math.random() * 0.15;
      col[i3 + 1] = 0.8 + Math.random() * 0.2;
      col[i3 + 2] = 1.0;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.65,
      map: this.createGlowTexture(),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    const mw = new THREE.Points(geo, mat);
    this.scene.add(mw);
  }

  // Derin Uzay Arka Plan Yıldızları (12.000+ Gerçekçi Arka Plan Yıldızı)
  buildDeepStarfield() {
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 6000 : 12000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = 98;

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const temp = Math.random();
      if (temp > 0.8) {
        col[i3] = 0.75; col[i3 + 1] = 0.85; col[i3 + 2] = 1.0; // Mavi devler
      } else if (temp > 0.3) {
        col[i3] = 1.0; col[i3 + 1] = 1.0; col[i3 + 2] = 1.0;  // Beyaz yıldızlar
      } else {
        col[i3] = 1.0; col[i3 + 1] = 0.85; col[i3 + 2] = 0.65; // Sarı/Kırmızı yıldızlar
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.4,
      map: this.createGlowTexture(),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    const sf = new THREE.Points(geo, mat);
    this.scene.add(sf);
  }

  // Gerçek Takımyıldızları & İsimli Ana Yıldızlar
  buildNamedStarsAndConstellations() {
    this.constellationLines = new THREE.Group();
    this.labelsGroup = new THREE.Group();

    // Gerçek Astronomik Yıldız Veritabanı [Ad, RA (Saat), Dec (Derece), Parlaklık]
    const realStars = {
      // Lyra (Lir / Çalgı - Sonsuz Aşk Takımyıldızı)
      vega: { name: 'Vega (Lir)', ra: 18.61, dec: 38.78, mag: 0.03, color: 0x99ccff },
      sheliak: { name: 'Sheliak', ra: 18.83, dec: 33.36, mag: 3.5, color: 0xffffff },
      sulafat: { name: 'Sulafat', ra: 18.98, dec: 32.69, mag: 3.2, color: 0xffffff },
      deltaLyr: { name: 'δ Lyrae', ra: 18.91, dec: 36.90, mag: 4.2, color: 0xffffff },
      epsilonLyr: { name: 'ε Lyrae (Çift)', ra: 18.74, dec: 39.67, mag: 4.6, color: 0xffffff },

      // Ursa Major (Büyük Ayı)
      dubhe: { name: 'Dubhe', ra: 11.06, dec: 61.75, mag: 1.8, color: 0xffcc88 },
      merak: { name: 'Merak', ra: 11.03, dec: 56.38, mag: 2.3, color: 0xffffff },
      phecda: { name: 'Phecda', ra: 11.90, dec: 53.69, mag: 2.4, color: 0xffffff },
      megrez: { name: 'Megrez', ra: 12.25, dec: 57.03, mag: 3.3, color: 0xffffff },
      alioth: { name: 'Alioth', ra: 12.90, dec: 55.96, mag: 1.7, color: 0xffffff },
      mizar: { name: 'Mizar', ra: 13.40, dec: 54.92, mag: 2.2, color: 0xffffff },
      alkaid: { name: 'Alkaid', ra: 13.79, dec: 49.31, mag: 1.8, color: 0x99ccff },

      // Ursa Minor (Küçük Ayı & Kutup Yıldızı)
      polaris: { name: 'Kutup Yıldızı (Polaris)', ra: 2.53, dec: 89.26, mag: 1.9, color: 0xfff7cc },
      kochab: { name: 'Kochab', ra: 14.85, dec: 74.16, mag: 2.0, color: 0xffaa55 },
      pherkad: { name: 'Pherkad', ra: 15.35, dec: 71.83, mag: 3.0, color: 0xffffff },

      // Orion (Avcı)
      betelgeuse: { name: 'Betelgeuse', ra: 5.92, dec: 7.41, mag: 0.5, color: 0xff6644 },
      rigel: { name: 'Rigel', ra: 5.24, dec: -8.20, mag: 0.1, color: 0x88ccff },
      bellatrix: { name: 'Bellatrix', ra: 5.42, dec: 6.35, mag: 1.6, color: 0xaaddff },
      saiph: { name: 'Saiph', ra: 5.79, dec: -9.67, mag: 2.0, color: 0x88ccff },
      alnitak: { name: 'Alnitak', ra: 5.68, dec: -1.94, mag: 1.7, color: 0xaaddff },
      alnilam: { name: 'Alnilam', ra: 5.60, dec: -1.20, mag: 1.7, color: 0xaaddff },
      mintaka: { name: 'Mintaka', ra: 5.53, dec: -0.30, mag: 2.2, color: 0xaaddff },

      // Cassiopeia (Kraliçe - 'W')
      schedar: { name: 'Schedar', ra: 0.67, dec: 56.54, mag: 2.2, color: 0xffaa66 },
      caph: { name: 'Caph', ra: 0.15, dec: 59.15, mag: 2.2, color: 0xffffff },
      gammaCas: { name: 'γ Cas', ra: 0.94, dec: 60.72, mag: 2.1, color: 0xaaddff },
      ruchbah: { name: 'Ruchbah', ra: 1.43, dec: 60.23, mag: 2.6, color: 0xffffff },
      segin: { name: 'Segin', ra: 1.90, dec: 63.67, mag: 3.3, color: 0xaaddff },

      // Cygnus (Kuğu / Kuzey Haçı)
      deneb: { name: 'Deneb', ra: 20.69, dec: 45.28, mag: 1.2, color: 0xffffff },
      albireo: { name: 'Albireo (Göz Alıcı Çift)', ra: 19.51, dec: 27.96, mag: 3.0, color: 0xffbb44 },
      sadr: { name: 'Sadr', ra: 20.37, dec: 40.26, mag: 2.2, color: 0xffffff },

      // Canis Major (Büyük Köpek)
      sirius: { name: 'Sirius (En Parlak Yıldız)', ra: 6.75, dec: -16.72, mag: -1.46, color: 0xaae5ff }
    };

    const starPositions = {};
    const glowTex = this.createGlowTexture();

    // Yıldızları Sahneye Ekle
    Object.keys(realStars).forEach(key => {
      const s = realStars[key];
      const pos = this.raDecToVector3(s.ra, s.dec, 90);
      starPositions[key] = pos;

      const size = Math.max(1.2, 3.2 - s.mag * 0.5);
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        color: s.color,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      const sprite = new THREE.Sprite(mat);
      sprite.position.copy(pos);
      sprite.scale.set(size, size, 1);
      this.scene.add(sprite);
    });

    // Gerçek Takımyıldızı Çizgileri Bağlantıları
    const constellationPairs = [
      // Lyra (Lir - Çalgı)
      ['vega', 'epsilonLyr'], ['epsilonLyr', 'deltaLyr'],
      ['deltaLyr', 'sulafat'], ['sulafat', 'sheliak'],
      ['sheliak', 'vega'], ['sheliak', 'deltaLyr'],
      // Büyük Ayı (Ursa Major)
      ['dubhe', 'merak'], ['merak', 'phecda'], ['phecda', 'megrez'],
      ['megrez', 'dubhe'], ['megrez', 'alioth'], ['alioth', 'mizar'], ['mizar', 'alkaid'],
      // Küçük Ayı (Ursa Minor)
      ['polaris', 'kochab'], ['kochab', 'pherkad'],
      // Orion (Avcı)
      ['betelgeuse', 'bellatrix'], ['bellatrix', 'mintaka'],
      ['mintaka', 'alnilam'], ['alnilam', 'alnitak'],
      ['alnitak', 'saiph'], ['saiph', 'rigel'], ['rigel', 'mintaka'],
      ['betelgeuse', 'alnitak'],
      // Cassiopeia
      ['caph', 'schedar'], ['schedar', 'gammaCas'],
      ['gammaCas', 'ruchbah'], ['ruchbah', 'segin'],
      // Kuğu (Cygnus)
      ['deneb', 'sadr'], ['sadr', 'albireo']
    ];

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x5588cc,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const linesGeo = [];
    const pointsList = [];

    constellationPairs.forEach(([k1, k2]) => {
      if (starPositions[k1] && starPositions[k2]) {
        pointsList.push(starPositions[k1]);
        pointsList.push(starPositions[k2]);
      }
    });

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(pointsList);
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMat);
    this.constellationLines.add(lineSegments);

    this.scene.add(this.constellationLines);
  }

  // 🌟 ECRİN'İN YILDIZI (GERÇEK GÖKYÜZÜ HEDEFLİ İŞARETÇİSİ)
  buildEcrinTargetStar() {
    this.ecrinMarkerGroup = new THREE.Group();

    // Ecrin'in tescilli koordinatları: RA 18h 36m 56s (18.615 h), Dec +38° 47' 01" (+38.783°)
    // Lir takımyıldızında, Vega ile tam uyumlu göksel alan!
    this.ecrinStarPos = this.raDecToVector3(18.615, 38.783, 88);
    this.ecrinMarkerGroup.position.copy(this.ecrinStarPos);

    // 1. Parlayan Altın-Gül Yıldızı
    const glowTex = this.createGlowTexture();
    const starMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xff69b4,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const starSprite = new THREE.Sprite(starMat);
    starSprite.scale.set(6.5, 6.5, 1);
    this.ecrinMarkerGroup.add(starSprite);

    // 2. Teleskop Hedefleme Halkası (Holografik Reticle)
    const ringGeo = new THREE.RingGeometry(2.4, 2.7, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    this.reticleRing = new THREE.Mesh(ringGeo, ringMat);
    this.ecrinMarkerGroup.add(this.reticleRing);

    // 3. İkinci Dış Dönen Kesikli Halka
    const outerRingGeo = new THREE.RingGeometry(3.6, 3.8, 32);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xff99bb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });
    this.outerReticle = new THREE.Mesh(outerRingGeo, outerRingMat);
    this.ecrinMarkerGroup.add(this.outerReticle);

    this.scene.add(this.ecrinMarkerGroup);
  }

  // Ecrin'in Yıldızına Teleskopla Otomatik Odaklan & Yakınlaş
  focusOnEcrinStar() {
    if (!this.ecrinStarPos) return;

    cosmicAudio.playChime();

    // Kamerayı Ecrin'in yıldızının tam karşısına çevirecek açıları hesapla
    const targetDir = this.ecrinStarPos.clone().normalize();
    const targetYaw = Math.atan2(targetDir.x, targetDir.z);
    const targetPitch = Math.asin(targetDir.y);

    const startYaw = this.currentRotation.y;
    const startPitch = this.currentRotation.x;
    const startFov = this.targetFov;
    const endFov = 40; // Odaklanırken optik yakınlaşma sağla

    let progress = 0;
    const duration = 1500;
    const startTime = performance.now();

    const anim = (now) => {
      const elapsed = now - startTime;
      progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      this.currentRotation.y = startYaw + (targetYaw - startYaw) * ease;
      this.currentRotation.x = startPitch + (targetPitch - startPitch) * ease;
      this.targetRotation.y = this.currentRotation.y;
      this.targetRotation.x = this.currentRotation.x;
      this.targetFov = startFov + (endFov - startFov) * ease;

      if (progress < 1) {
        requestAnimationFrame(anim);
      } else {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#ffd700', '#ff69b4', '#ffffff']
          });
        }
      }
    };

    requestAnimationFrame(anim);
  }

  // Butonla Yakınlaşma / Uzaklaşma (Mobilde Tek Dokunuş Kontrolü)
  zoomIn() {
    this.targetFov = Math.max(25, this.targetFov - 12);
  }

  zoomOut() {
    this.targetFov = Math.min(85, this.targetFov + 12);
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || 550;
    if (w === 0 || h === 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  setupEvents() {
    const onMouseDown = (e) => {
      this.isDragging = true;
      this.previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseMove = (e) => {
      if (!this.isDragging) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      const deltaX = clientX - this.previousMousePosition.x;
      const deltaY = clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.005;
      this.targetRotation.x += deltaY * 0.005;
      this.targetRotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, this.targetRotation.x));

      this.previousMousePosition = { x: clientX, y: clientY };
    };

    const onMouseUp = () => {
      this.isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      this.targetFov += e.deltaY * 0.05;
      this.targetFov = Math.max(25, Math.min(85, this.targetFov));
    };

    const dom = this.renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // 📱 Mobil Dokunmatik Kontroller & İki Parmakla Yakınlaşma (Pinch-to-Zoom)
    let pinchStartDist = 0;
    let pinchStartFov = 65;

    const getTouchDist = (t1, t2) => {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.hypot(dx, dy);
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        pinchStartDist = getTouchDist(e.touches[0], e.touches[1]);
        pinchStartFov = this.targetFov;
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;

        const deltaX = clientX - this.previousMousePosition.x;
        const deltaY = clientY - this.previousMousePosition.y;

        this.targetRotation.y += deltaX * 0.006;
        this.targetRotation.x += deltaY * 0.006;
        this.targetRotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, this.targetRotation.x));

        this.previousMousePosition = { x: clientX, y: clientY };
      } else if (e.touches.length === 2 && pinchStartDist > 0) {
        const currentDist = getTouchDist(e.touches[0], e.touches[1]);
        const factor = (pinchStartDist - currentDist) * 0.15;
        this.targetFov = Math.max(25, Math.min(85, pinchStartFov + factor));
      }
    };

    const onTouchEnd = (e) => {
      if (e.touches.length === 0) {
        this.isDragging = false;
        pinchStartDist = 0;
      } else if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        pinchStartDist = 0;
      }
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    // Yeniden Boyutlandırma
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Yumuşak kamera sönümleme
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;
    this.fov += (this.targetFov - this.fov) * 0.08;

    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();

    // Küresel bakış açısı (İçeriden göğe bakış)
    const lookTarget = new THREE.Vector3(
      Math.sin(this.currentRotation.y) * Math.cos(this.currentRotation.x),
      Math.sin(this.currentRotation.x),
      Math.cos(this.currentRotation.y) * Math.cos(this.currentRotation.x)
    );
    this.camera.lookAt(lookTarget);

    // Ecrin hedefleme reticle animasyonu
    if (this.reticleRing && this.outerReticle) {
      this.reticleRing.rotation.z = time * 0.8;
      this.outerReticle.rotation.z = -time * 0.4;
      this.reticleRing.lookAt(this.camera.position);
      this.outerReticle.lookAt(this.camera.position);

      const pulse = Math.sin(time * 3) * 0.15 + 1.0;
      this.reticleRing.scale.set(pulse, pulse, 1);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

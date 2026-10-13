/**
 * 3D KOZMİK GALAKSİ VE ÖZEL YILDIZ MOTORU (THREE.JS)
 * 
 * - 50.000+ parçacıklı dönen sarmal galaksi
 * - Arka plan yıldız kümesi ve kayan yıldızlar (meteorlar)
 * - "Ecrin'in Yıldızı" özel ışık küresi, halkaları ve 3D etiketi
 * - Yumuşak kamera animasyonları ve etkileşimler
 */

import { CONFIG } from './config.js';
import { cosmicAudio } from './audio.js';

export class GalaxyEngine {
  constructor(canvasContainer, onStarSelected) {
    this.container = canvasContainer;
    this.onStarSelected = onStarSelected;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.galaxyPoints = null;
    this.specialStarGroup = null;
    this.specialStarMesh = null;
    this.specialStarPos = new THREE.Vector3(14, 2.5, 9);
    this.shootingStars = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isHoveringStar = false;
    this.isTransitioning = false;

    // Kamera kontrol değişkenleri
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.cameraDistance = 45;
    this.cameraPhi = Math.PI / 3.2; // dikey açı
    this.cameraTheta = Math.PI / 4;  // yatay açı
    this.targetTheta = this.cameraTheta;
    this.targetPhi = this.cameraPhi;
    this.targetDistance = this.cameraDistance;

    // Yıldız etiketi elementi
    this.starLabelEl = document.getElementById('special-star-label');

    this.init();
  }

  // Parçacıklar için yumuşak parıldayan ışık dokusu üretir (Harici resim gerektirmez!)
  createStarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 230, 245, 0.85)');
    gradient.addColorStop(0.5, 'rgba(215, 160, 255, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  init() {
    // 1. Sahne
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x04020a, 0.009);

    // 2. Kamera
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.updateCameraPosition();

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 4. Işıklandırmalar
    const ambientLight = new THREE.AmbientLight(0x221133, 1.2);
    this.scene.add(ambientLight);

    // 5. Galaksi ve Yıldızları Oluştur
    this.buildGalaxy();
    this.buildStarfield();
    this.buildSpecialStar();

    // 6. Olay Dinleyicileri
    this.setupEvents();

    // 7. Render Döngüsü Başlat
    this.clock = new THREE.Clock();
    this.animate();
  }

  buildGalaxy() {
    const parameters = {
      count: 48000,
      size: 0.18,
      radius: 32,
      branches: 4,
      spin: 1.1,
      randomness: 0.5,
      power: 3.2,
      insideColor: '#ffd6e8', // Gül pembesi & sıcak altın çekirdek
      outsideColor: '#7b52ff' // Derin kozmik leylak & yıldız mavisi
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const scales = new Float32Array(parameters.count);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);
    const colorCore = new THREE.Color('#fff7e6');

    for (let i = 0; i < parameters.count; i++) {
      // Yarıçap (merkeze doğru daha yoğun)
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      // Dağılım rastgeleliği
      const randomX = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius * 0.45;
      const randomZ = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Renk geçişi (Çekirdek -> Dış kollar)
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      if (radius < 4.5) {
        mixedColor.lerp(colorCore, 1 - (radius / 4.5));
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 1.4 + 0.6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const starTexture = this.createStarTexture();

    const material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.88
    });

    this.galaxyPoints = new THREE.Points(geometry, material);
    this.scene.add(this.galaxyPoints);
  }

  // Uzak arka plan yıldızları
  buildStarfield() {
    const starCount = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 90 + Math.random() * 90;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const isWarm = Math.random() > 0.4;
      colors[i3] = isWarm ? 1 : 0.8;
      colors[i3 + 1] = isWarm ? 0.9 : 0.85;
      colors[i3 + 2] = 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.45,
      map: this.createStarTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    const starfield = new THREE.Points(geometry, material);
    this.scene.add(starfield);
  }

  // "Ecrin'in Yıldızı" - Ana odak noktası ve ışık saçan yıldız
  buildSpecialStar() {
    this.specialStarGroup = new THREE.Group();
    this.specialStarGroup.position.copy(this.specialStarPos);

    // 1. Çekirdek Kristal Yıldız (Mesh)
    const coreGeo = new THREE.SphereGeometry(0.75, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfff0f5,
      transparent: true,
      opacity: 0.95
    });
    this.specialStarMesh = new THREE.Mesh(coreGeo, coreMat);
    this.specialStarMesh.userData = { isSpecialStar: true };
    this.specialStarGroup.add(this.specialStarMesh);

    // 2. İç Parıltı Halesi (Büyük Sprite)
    const starTex = this.createStarTexture();
    const haloMat = new THREE.SpriteMaterial({
      map: starTex,
      color: 0xff99bb,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.85
    });
    this.starHaloSprite = new THREE.Sprite(haloMat);
    this.starHaloSprite.scale.set(7.5, 7.5, 1);
    this.specialStarGroup.add(this.starHaloSprite);

    // 3. İkinci Dış Parıltı (Altın & Pembe Korona)
    const outerHaloMat = new THREE.SpriteMaterial({
      map: starTex,
      color: 0xffe6aa,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.65
    });
    this.starOuterHalo = new THREE.Sprite(outerHaloMat);
    this.starOuterHalo.scale.set(12, 12, 1);
    this.specialStarGroup.add(this.starOuterHalo);

    // 4. Yıldızın etrafındaki dönen minik yıldız tozu halkası (Satürn misali)
    const ringGeo = new THREE.BufferGeometry();
    const ringCount = 180;
    const ringPos = new Float32Array(ringCount * 3);
    const ringColors = new Float32Array(ringCount * 3);

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const r = 2.1 + (Math.random() - 0.5) * 0.4;
      ringPos[i * 3] = Math.cos(angle) * r;
      ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      ringPos[i * 3 + 2] = Math.sin(angle) * r;

      ringColors[i * 3] = 1.0;
      ringColors[i * 3 + 1] = 0.85 + Math.random() * 0.15;
      ringColors[i * 3 + 2] = 0.95;
    }

    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    ringGeo.setAttribute('color', new THREE.BufferAttribute(ringColors, 3));

    const ringMat = new THREE.PointsMaterial({
      size: 0.25,
      map: starTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    this.starRing = new THREE.Points(ringGeo, ringMat);
    this.starRing.rotation.x = Math.PI / 4;
    this.specialStarGroup.add(this.starRing);

    // 5. Yıldızın Kendi Işık Kaynağı (PointLight)
    const starLight = new THREE.PointLight(0xffb6c1, 2.5, 30);
    this.specialStarGroup.add(starLight);

    this.scene.add(this.specialStarGroup);
  }

  // Kayan yıldız (meteor) oluşturur
  spawnShootingStar() {
    const startX = (Math.random() - 0.5) * 70;
    const startY = 25 + Math.random() * 20;
    const startZ = (Math.random() - 0.5) * 70;

    const length = 12 + Math.random() * 8;
    const dir = new THREE.Vector3(-1, -0.6, -0.8).normalize();

    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      dir.clone().multiplyScalar(-length)
    ]);

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    });

    const line = new THREE.Line(geometry, material);
    line.position.set(startX, startY, startZ);

    this.scene.add(line);
    this.shootingStars.push({
      mesh: line,
      dir: dir,
      speed: 1.8 + Math.random() * 0.8,
      life: 1.0
    });
  }

  setupEvents() {
    const onPointerDown = (e) => {
      // Eğer etkileşimli UI açıksa kamera sürüklemeyi engelle
      if (document.body.classList.contains('portal-open')) return;
      this.isDragging = true;
      this.previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0
      };
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      // Raycaster için normalize fare koordinatları
      this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;

      if (this.isDragging && !document.body.classList.contains('portal-open')) {
        const deltaX = clientX - this.previousMousePosition.x;
        const deltaY = clientY - this.previousMousePosition.y;

        this.targetTheta += deltaX * 0.006;
        this.targetPhi -= deltaY * 0.006;

        // Phi açısını sınırla (kutup taklasını önle)
        this.targetPhi = Math.max(0.15, Math.min(Math.PI - 0.15, this.targetPhi));

        this.previousMousePosition = { x: clientX, y: clientY };
      }

      this.checkStarHover();
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    const onWheel = (e) => {
      if (document.body.classList.contains('portal-open')) return;
      this.targetDistance += e.deltaY * 0.04;
      this.targetDistance = Math.max(14, Math.min(80, this.targetDistance));
    };

    // Tıklama ile yıldızı seçme
    const onClick = (e) => {
      if (this.isTransitioning) return;
      if (this.isHoveringStar) {
        this.selectSpecialStar();
      }
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('click', onClick);

    // Etiket üzerine tıklanınca da yıldız seçilsin
    if (this.starLabelEl) {
      this.starLabelEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectSpecialStar();
      });
    }

    // Ekran yeniden boyutlandırma
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  checkStarHover() {
    if (!this.specialStarMesh || this.isTransitioning) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects([this.specialStarMesh]);

    const wasHovering = this.isHoveringStar;
    this.isHoveringStar = intersects.length > 0;

    if (this.isHoveringStar !== wasHovering) {
      document.body.style.cursor = this.isHoveringStar ? 'pointer' : 'default';
      if (this.starLabelEl) {
        if (this.isHoveringStar) {
          this.starLabelEl.classList.add('hovered');
        } else {
          this.starLabelEl.classList.remove('hovered');
        }
      }
    }
  }

  // Yıldızın ekran üzerindeki 2D koordinatını günceller (etiket için)
  updateStarLabelPosition() {
    if (!this.starLabelEl || !this.specialStarGroup) return;

    const starWorldPos = new THREE.Vector3();
    this.specialStarGroup.getWorldPosition(starWorldPos);

    // Kameranın arkasındaysa gizle
    const camDir = new THREE.Vector3();
    this.camera.getWorldDirection(camDir);
    const toStar = starWorldPos.clone().sub(this.camera.position).normalize();
    if (camDir.dot(toStar) < 0.2) {
      this.starLabelEl.style.opacity = '0';
      this.starLabelEl.style.pointerEvents = 'none';
      return;
    }

    const screenPos = starWorldPos.clone().project(this.camera);
    const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;

    this.starLabelEl.style.left = `${x}px`;
    this.starLabelEl.style.top = `${y}px`;
    this.starLabelEl.style.opacity = '1';
    this.starLabelEl.style.pointerEvents = 'auto';
  }

  // Yıldıza tıklandığında kamera o yıldıza doğru uçar
  selectSpecialStar() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Şık ses ve parıltı efekti
    cosmicAudio.playChime();

    // Kamerayı yıldıza yaklaştır
    const startCamPos = this.camera.position.clone();
    const starPos = this.specialStarPos.clone();
    
    // Yıldızın hemen önünde duracak hedef kamera konumu
    const targetCamPos = starPos.clone().add(new THREE.Vector3(2.5, 1.2, 4.5));
    const startTarget = this.cameraTarget.clone();

    let progress = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    const transitionAnim = (now) => {
      const elapsed = now - startTime;
      progress = Math.min(elapsed / duration, 1);
      
      // Yumuşak easeInOutCubic eğrisi
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      this.camera.position.lerpVectors(startCamPos, targetCamPos, ease);
      this.cameraTarget.lerpVectors(startTarget, starPos, ease);
      this.camera.lookAt(this.cameraTarget);

      if (progress < 1) {
        requestAnimationFrame(transitionAnim);
      } else {
        this.isTransitioning = false;
        if (this.onStarSelected) {
          this.onStarSelected();
        }
      }
    };

    requestAnimationFrame(transitionAnim);
  }

  // Galaksi genel bakışına geri dön
  resetCameraView() {
    this.targetDistance = 45;
    this.targetTheta = Math.PI / 4;
    this.targetPhi = Math.PI / 3.2;
    this.cameraTarget.set(0, 0, 0);
  }

  updateCameraPosition() {
    // Sönümlü (damping) yumuşak kamera takibi
    this.cameraTheta += (this.targetTheta - this.cameraTheta) * 0.06;
    this.cameraPhi += (this.targetPhi - this.cameraPhi) * 0.06;
    this.cameraDistance += (this.targetDistance - this.cameraDistance) * 0.06;

    const x = this.cameraDistance * Math.sin(this.cameraPhi) * Math.sin(this.cameraTheta);
    const y = this.cameraDistance * Math.cos(this.cameraPhi);
    const z = this.cameraDistance * Math.sin(this.cameraPhi) * Math.cos(this.cameraTheta);

    this.camera.position.set(
      this.cameraTarget.x + x,
      this.cameraTarget.y + y,
      this.cameraTarget.z + z
    );
    this.camera.lookAt(this.cameraTarget);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // 1. Galaksi yavaşça dönsün
    if (this.galaxyPoints) {
      this.galaxyPoints.rotation.y = time * 0.035;
    }

    // 2. Özel Yıldız animasyonları (Pulsing halo & orbiting ring)
    if (this.specialStarGroup) {
      const pulse = Math.sin(time * 2.8) * 0.15 + 1.0;
      if (this.starHaloSprite) {
        this.starHaloSprite.scale.set(7.5 * pulse, 7.5 * pulse, 1);
      }
      if (this.starOuterHalo) {
        const outerPulse = Math.cos(time * 1.8) * 0.12 + 1.0;
        this.starOuterHalo.scale.set(12 * outerPulse, 12 * outerPulse, 1);
      }
      if (this.starRing) {
        this.starRing.rotation.z = time * 0.6;
        this.starRing.rotation.y = time * 0.2;
      }
    }

    // 3. Kayan Yıldızlar (Meteorlar)
    if (Math.random() < 0.012) {
      this.spawnShootingStar();
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const meteor = this.shootingStars[i];
      meteor.mesh.position.addScaledVector(meteor.dir, meteor.speed);
      meteor.life -= delta * 0.85;
      meteor.mesh.material.opacity = Math.max(0, meteor.life);

      if (meteor.life <= 0) {
        this.scene.remove(meteor.mesh);
        meteor.mesh.geometry.dispose();
        meteor.mesh.material.dispose();
        this.shootingStars.splice(i, 1);
      }
    }

    // 4. Kamera Güncellemesi
    if (!this.isTransitioning) {
      // Kullanıcı sürüklemediğinde galaksi hafifçe dönsün
      if (!this.isDragging && !document.body.classList.contains('portal-open')) {
        this.targetTheta += delta * 0.02;
      }
      this.updateCameraPosition();
    }

    // 5. 3D Yıldız Etiketi Pozisyonu
    this.updateStarLabelPosition();

    // 6. Çizim
    this.renderer.render(this.scene, this.camera);
  }
}

/**
 * 3D KOZMİK GALAKSİ VE ÖZEL YILDIZ MOTORU (THREE.JS)
 * 
 * - 50.000+ parçacıklı sarmal galaksi
 * - "Ecrin'in Yıldızı" (Ana Odak)
 * - "Gizli Yıldız" (Paskalya Yumurtası / Easter Egg)
 * - "Kozmik Kalp & E♥E Takımyıldızı" (Açılıp kapatılabilen göksel çizgiler)
 * - "Dilek Kayan Yıldızı" (Özel animasyonlu meteor fırlatma sistemi)
 */

import { CONFIG } from './config.js';
import { cosmicAudio } from './audio.js';

export class GalaxyEngine {
  constructor(canvasContainer, onStarSelected, onSecretStarSelected) {
    this.container = canvasContainer;
    this.onStarSelected = onStarSelected;
    this.onSecretStarSelected = onSecretStarSelected;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.galaxyPoints = null;
    
    // Özel Yıldız
    this.specialStarGroup = null;
    this.specialStarMesh = null;
    this.specialStarPos = new THREE.Vector3(14, 2.5, 9);
    
    // Gizli Yıldız (Easter Egg)
    this.secretStarGroup = null;
    this.secretStarMesh = null;
    this.secretStarPos = new THREE.Vector3(-22, 6, -14);

    // Takımyıldızı Grubu (Kozmik Kalp)
    this.constellationGroup = null;
    this.isConstellationVisible = false;

    this.shootingStars = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;
    this.isTransitioning = false;

    // Kamera kontrol değişkenleri
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.cameraDistance = 45;
    this.cameraPhi = Math.PI / 3.2;
    this.cameraTheta = Math.PI / 4;
    this.targetTheta = this.cameraTheta;
    this.targetPhi = this.cameraPhi;
    this.targetDistance = this.cameraDistance;

    // 3D Etiket elementi
    this.starLabelEl = document.getElementById('special-star-label');
    this.gyroOffset = { x: 0, y: 0 };

    this.init();
  }

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

    return new THREE.CanvasTexture(canvas);
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

    // 4. Işık
    const ambientLight = new THREE.AmbientLight(0x221133, 1.2);
    this.scene.add(ambientLight);

    // 5. Göksel Cisimler
    this.buildGalaxy();
    this.buildStarfield();
    this.buildSpecialStar();
    this.buildSecretStar();
    this.buildConstellation();

    // 6. Olay Dinleyicileri
    this.setupEvents();

    // 7. Render Döngüsü
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
      insideColor: '#ffd6e8',
      outsideColor: '#7b52ff'
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const scales = new Float32Array(parameters.count);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);
    const colorCore = new THREE.Color('#fff7e6');

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius * 0.45;
      const randomZ = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

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

  buildSpecialStar() {
    this.specialStarGroup = new THREE.Group();
    this.specialStarGroup.position.copy(this.specialStarPos);

    const coreGeo = new THREE.SphereGeometry(0.75, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfff0f5, transparent: true, opacity: 0.95 });
    this.specialStarMesh = new THREE.Mesh(coreGeo, coreMat);
    this.specialStarMesh.userData = { type: 'special' };
    this.specialStarGroup.add(this.specialStarMesh);

    const starTex = this.createStarTexture();
    const haloMat = new THREE.SpriteMaterial({ map: starTex, color: 0xff99bb, transparent: true, blending: THREE.AdditiveBlending, opacity: 0.85 });
    this.starHaloSprite = new THREE.Sprite(haloMat);
    this.starHaloSprite.scale.set(7.5, 7.5, 1);
    this.specialStarGroup.add(this.starHaloSprite);

    const outerHaloMat = new THREE.SpriteMaterial({ map: starTex, color: 0xffe6aa, transparent: true, blending: THREE.AdditiveBlending, opacity: 0.65 });
    this.starOuterHalo = new THREE.Sprite(outerHaloMat);
    this.starOuterHalo.scale.set(12, 12, 1);
    this.specialStarGroup.add(this.starOuterHalo);

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

    const ringMat = new THREE.PointsMaterial({ size: 0.25, map: starTex, transparent: true, blending: THREE.AdditiveBlending, vertexColors: true, depthWrite: false });
    this.starRing = new THREE.Points(ringGeo, ringMat);
    this.starRing.rotation.x = Math.PI / 4;
    this.specialStarGroup.add(this.starRing);

    const starLight = new THREE.PointLight(0xffb6c1, 2.5, 30);
    this.specialStarGroup.add(starLight);

    this.scene.add(this.specialStarGroup);
  }

  // 🤫 GİZLİ YILDIZ (EASTER EGG)
  buildSecretStar() {
    this.secretStarGroup = new THREE.Group();
    this.secretStarGroup.position.copy(this.secretStarPos);

    const coreGeo = new THREE.SphereGeometry(0.45, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xccffff, transparent: true, opacity: 0.9 });
    this.secretStarMesh = new THREE.Mesh(coreGeo, coreMat);
    this.secretStarMesh.userData = { type: 'secret' };
    this.secretStarGroup.add(this.secretStarMesh);

    const starTex = this.createStarTexture();
    const spriteMat = new THREE.SpriteMaterial({
      map: starTex,
      color: 0x99ffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.75
    });
    this.secretStarSprite = new THREE.Sprite(spriteMat);
    this.secretStarSprite.scale.set(4.5, 4.5, 1);
    this.secretStarGroup.add(this.secretStarSprite);

    this.scene.add(this.secretStarGroup);
  }

  // ✨ KOZMİK KALP TAKIMYILDIZI (CONSTELLATION)
  buildConstellation() {
    this.constellationGroup = new THREE.Group();
    this.constellationGroup.visible = false;

    // Kalp noktaları (Parametrik eğri)
    const heartPoints = [];
    const count = 32;
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3) * 0.42;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.42 + 4;
      const z = Math.sin(t) * 2;
      heartPoints.push(new THREE.Vector3(x, y, z));
    }

    // 1. Çizgi Geometrisi
    const lineGeo = new THREE.BufferGeometry().setFromPoints(heartPoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xff85b3,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const heartLine = new THREE.Line(lineGeo, lineMat);
    this.constellationGroup.add(heartLine);

    // 2. Düğüm Yıldızları (Node Points)
    const starTex = this.createStarTexture();
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(heartPoints);
    const nodeMat = new THREE.PointsMaterial({
      size: 0.8,
      map: starTex,
      color: 0xffd1dc,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    this.constellationGroup.add(nodePoints);

    this.scene.add(this.constellationGroup);
  }

  // Takımyıldızını aç / kapat
  toggleConstellation() {
    this.isConstellationVisible = !this.isConstellationVisible;
    if (this.constellationGroup) {
      this.constellationGroup.visible = this.isConstellationVisible;
    }
    cosmicAudio.playChime();
    return this.isConstellationVisible;
  }

  // 🌠 DİLEK İÇİN ÖZEL PARLAK KAYAN YILDIZ FIRLAT
  launchWishMeteor() {
    const startPos = new THREE.Vector3(0, 0, 0);
    const endPos = new THREE.Vector3(
      (Math.random() - 0.5) * 60,
      25 + Math.random() * 20,
      (Math.random() - 0.5) * 60
    );

    const dir = endPos.clone().sub(startPos).normalize();
    const length = 20;

    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      dir.clone().multiplyScalar(-length)
    ]);

    const material = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    });

    const line = new THREE.Line(geometry, material);
    line.position.copy(startPos);
    this.scene.add(line);

    this.shootingStars.push({
      mesh: line,
      dir: dir,
      speed: 2.8,
      life: 1.6
    });

    cosmicAudio.playChime();
  }

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
      if (document.body.classList.contains('portal-open') || document.body.classList.contains('modal-active')) return;
      this.isDragging = true;
      this.previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0
      };
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;

      if (this.isDragging && !document.body.classList.contains('portal-open') && !document.body.classList.contains('modal-active')) {
        const deltaX = clientX - this.previousMousePosition.x;
        const deltaY = clientY - this.previousMousePosition.y;

        this.targetTheta += deltaX * 0.006;
        this.targetPhi -= deltaY * 0.006;
        this.targetPhi = Math.max(0.15, Math.min(Math.PI - 0.15, this.targetPhi));

        this.previousMousePosition = { x: clientX, y: clientY };
      }

      this.checkHover();
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    const onWheel = (e) => {
      if (document.body.classList.contains('portal-open') || document.body.classList.contains('modal-active')) return;
      this.targetDistance += e.deltaY * 0.04;
      this.targetDistance = Math.max(14, Math.min(80, this.targetDistance));
    };

    const onClick = (e) => {
      if (this.isTransitioning) return;
      if (this.hoveredObject === 'special') {
        this.selectSpecialStar();
      } else if (this.hoveredObject === 'secret') {
        if (this.onSecretStarSelected) {
          this.onSecretStarSelected();
        }
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

    if (this.starLabelEl) {
      this.starLabelEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectSpecialStar();
      });
    }

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    // Mobil Jiroskop (Gyroscope Parallax) Desteği
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.beta === null || e.gamma === null) return;
        const tiltX = (e.beta - 45) * 0.005;
        const tiltY = e.gamma * 0.005;
        this.gyroOffset.x = Math.max(-0.25, Math.min(0.25, tiltX));
        this.gyroOffset.y = Math.max(-0.25, Math.min(0.25, tiltY));
      }, { passive: true });
    }
  }

  checkHover() {
    if (this.isTransitioning) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const targets = [];
    if (this.specialStarMesh) targets.push(this.specialStarMesh);
    if (this.secretStarMesh) targets.push(this.secretStarMesh);

    const intersects = this.raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
      const objType = intersects[0].object.userData.type;
      this.hoveredObject = objType;
      document.body.style.cursor = 'pointer';

      if (this.starLabelEl) {
        if (objType === 'special') {
          this.starLabelEl.classList.add('hovered');
        } else {
          this.starLabelEl.classList.remove('hovered');
        }
      }
    } else {
      this.hoveredObject = null;
      document.body.style.cursor = 'default';
      if (this.starLabelEl) {
        this.starLabelEl.classList.remove('hovered');
      }
    }
  }

  updateStarLabelPosition() {
    if (!this.starLabelEl || !this.specialStarGroup) return;

    const starWorldPos = new THREE.Vector3();
    this.specialStarGroup.getWorldPosition(starWorldPos);

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

  selectSpecialStar() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    cosmicAudio.playChime();

    const startCamPos = this.camera.position.clone();
    const starPos = this.specialStarPos.clone();
    const targetCamPos = starPos.clone().add(new THREE.Vector3(2.5, 1.2, 4.5));
    const startTarget = this.cameraTarget.clone();

    let progress = 0;
    const duration = 1600;
    const startTime = performance.now();

    const transitionAnim = (now) => {
      const elapsed = now - startTime;
      progress = Math.min(elapsed / duration, 1);
      
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

  resetCameraView() {
    this.targetDistance = 45;
    this.targetTheta = Math.PI / 4;
    this.targetPhi = Math.PI / 3.2;
    this.cameraTarget.set(0, 0, 0);
  }

  updateCameraPosition() {
    this.cameraTheta += (this.targetTheta - this.cameraTheta) * 0.06;
    this.cameraPhi += (this.targetPhi - this.cameraPhi) * 0.06;
    this.cameraDistance += (this.targetDistance - this.cameraDistance) * 0.06;

    const phi = this.cameraPhi + this.gyroOffset.x;
    const theta = this.cameraTheta + this.gyroOffset.y;

    const x = this.cameraDistance * Math.sin(phi) * Math.sin(theta);
    const y = this.cameraDistance * Math.cos(phi);
    const z = this.cameraDistance * Math.sin(phi) * Math.cos(theta);

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

    // Galaksi dönüşü
    if (this.galaxyPoints) {
      this.galaxyPoints.rotation.y = time * 0.035;
    }

    // Özel Yıldız nabız atışı
    if (this.specialStarGroup) {
      const pulse = Math.sin(time * 2.8) * 0.15 + 1.0;
      if (this.starHaloSprite) this.starHaloSprite.scale.set(7.5 * pulse, 7.5 * pulse, 1);
      if (this.starOuterHalo) {
        const outerPulse = Math.cos(time * 1.8) * 0.12 + 1.0;
        this.starOuterHalo.scale.set(12 * outerPulse, 12 * outerPulse, 1);
      }
      if (this.starRing) {
        this.starRing.rotation.z = time * 0.6;
        this.starRing.rotation.y = time * 0.2;
      }
    }

    // Gizli Yıldız ışıltısı
    if (this.secretStarSprite) {
      const secPulse = Math.sin(time * 3.5) * 0.25 + 1.0;
      this.secretStarSprite.scale.set(4.5 * secPulse, 4.5 * secPulse, 1);
    }

    // Takımyıldızı hafif salınımı
    if (this.constellationGroup && this.isConstellationVisible) {
      this.constellationGroup.rotation.y = Math.sin(time * 0.5) * 0.05;
    }

    // Kayan Yıldızlar
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

    // Kamera güncellemesi
    if (!this.isTransitioning) {
      if (!this.isDragging && !document.body.classList.contains('portal-open') && !document.body.classList.contains('modal-active')) {
        this.targetTheta += delta * 0.02;
      }
      this.updateCameraPosition();
    }

    this.updateStarLabelPosition();
    this.renderer.render(this.scene, this.camera);
  }
}

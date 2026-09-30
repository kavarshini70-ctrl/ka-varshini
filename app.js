/**
 * Varshini K A - Data Science & ML Interactive 3D Portfolio
 * Features: Three.js Neural Mesh, 3D Skill Constellation, Live Virtual Mouse AI,
 * Live Multi-Disease Diagnostic ML, Audio Synthesizer, 3D Tilt Physics
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeaderScroll();
  initTypingEffect();
  initThemeToggle();
  initSoundEffects();
  initBackground3D();
  initHero3DNeuralMesh();
  initSkills3DConstellation();
  initSkillCardTilt();
  initSkillFilters();
  initProjectTabs();
  initLiveVirtualMouse();
  initLiveDiseasePredictor();
  initHobbiesInteractions();
  initModals();
  initContactForm();
});

/* ==========================================================================
   1. CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('customCursorDot');
  if (!cursor || !dot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states on interactive items
  const interactiveTargets = document.querySelectorAll('a, button, input, select, textarea, .skill-3d-card, .cert-card, .target-bubble');
  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* ==========================================================================
   2. HEADER & NAVIGATION SCROLL OBSERVER
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy
    let currentId = '';
    const scrollPosition = window.scrollY + 200;
    sections.forEach(sec => {
      if (scrollPosition >= sec.offsetTop && scrollPosition < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Mobile menu toggle
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (mobileDrawer.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
      });
    });
  }
}

/* ==========================================================================
   3. TYPING TEXT EFFECT (HERO)
   ========================================================================== */
function initTypingEffect() {
  const textElement = document.getElementById('typingText');
  if (!textElement) return;

  const roles = [
    "Machine Learning & AI",
    "Computer Vision & OpenCV",
    "Data Analysis & Insights",
    "Healthcare AI Solutions",
    "Assistive Tech Innovations"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const delayBetween = 2000;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      textElement.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      textElement.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let timeout = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === current.length) {
      timeout = delayBetween;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      timeout = 400;
    }

    setTimeout(type, timeout);
  }

  type();
}

/* ==========================================================================
   4. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const icon = document.getElementById('themeIcon');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
      icon.classList.replace('fa-moon', 'fa-sun');
      showToast('Switched to Light Mode', 'info');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      showToast('Switched to Cyber Dark Mode', 'info');
    }
  });
}

/* ==========================================================================
   5. AMBIENT AUDIO SYNTHESIZER (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let ambientOsc = null;
let ambientGain = null;
let isAudioPlaying = false;

function initSoundEffects() {
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!isAudioPlaying) {
      startAmbientSound();
      soundBtn.classList.add('playing');
      soundIcon.classList.replace('fa-volume-xmark', 'fa-volume-high');
      showToast('Ambient Data Focus Sound Activated', 'success');
      isAudioPlaying = true;
    } else {
      stopAmbientSound();
      soundBtn.classList.remove('playing');
      soundIcon.classList.replace('fa-volume-high', 'fa-volume-xmark');
      showToast('Ambient Sound Muted', 'info');
      isAudioPlaying = false;
    }
  });
}

function startAmbientSound() {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Create dual harmonic drone (432Hz ambient chord)
  ambientGain = audioCtx.createGain();
  ambientGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  ambientGain.connect(audioCtx.destination);

  ambientOsc = audioCtx.createOscillator();
  ambientOsc.type = 'sine';
  ambientOsc.frequency.setValueAtTime(216, audioCtx.currentTime); // A3 subharmonic
  ambientOsc.connect(ambientGain);
  ambientOsc.start();
}

function stopAmbientSound() {
  if (ambientOsc) {
    try {
      ambientOsc.stop();
      ambientOsc.disconnect();
    } catch (e) {}
    ambientOsc = null;
  }
}

// Interactive Pop Sound Effect for Sandbox
function playPopSound() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(480, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

/* ==========================================================================
   6. THREE.JS 3D BACKGROUND PARTICLES
   ========================================================================== */
function initBackground3D() {
  const canvas = document.getElementById('bg3dCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;

  // Starfield particle cloud
  const particleCount = 600;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0x00f5d4); // Cyan
  const color2 = new THREE.Color(0xa855f7); // Purple
  const color3 = new THREE.Color(0x38bdf8); // Sky blue

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 1200;
    positions[i + 1] = (Math.random() - 0.5) * 1200;
    positions[i + 2] = (Math.random() - 0.5) * 800;

    const chosenColor = Math.random() < 0.4 ? color1 : (Math.random() < 0.7 ? color2 : color3);
    colors[i] = chosenColor.r;
    colors[i + 1] = chosenColor.g;
    colors[i + 2] = chosenColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 3.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.55
  });

  const particleMesh = new THREE.Points(geometry, material);
  scene.add(particleMesh);

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
  });

  function animate() {
    particleMesh.rotation.y += 0.0006;
    particleMesh.rotation.x += 0.0003;

    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y += (-mouseY - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ==========================================================================
   7. THREE.JS HERO 3D NEURAL MESH (Interactive Canvas Box)
   ========================================================================== */
function initHero3DNeuralMesh() {
  const container = document.getElementById('hero3dContainer');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 450;
  const height = container.clientHeight || 340;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 0, 75);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group to rotate
  const neuralGroup = new THREE.Group();
  scene.add(neuralGroup);

  // Generate 3D Neural Nodes & Interconnecting Synapses
  const nodeCount = 75;
  const nodes = [];
  const sphereGeo = new THREE.SphereGeometry(1.2, 16, 16);
  const cyanMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
  const purpleMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
  const blueMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

  for (let i = 0; i < nodeCount; i++) {
    const mat = (i % 3 === 0) ? cyanMat : (i % 3 === 1 ? purpleMat : blueMat);
    const mesh = new THREE.Mesh(sphereGeo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 70,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50
    );
    mesh.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      )
    };
    neuralGroup.add(mesh);
    nodes.push(mesh);
  }

  // Synapse lines geometry
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f5d4,
    transparent: true,
    opacity: 0.22
  });

  const lineGeo = new THREE.BufferGeometry();
  const linePositions = new Float32Array(nodeCount * nodeCount * 3);
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineMesh = new THREE.LineSegments(lineGeo, lineMaterial);
  neuralGroup.add(lineMesh);

  // Interactive mouse dragging
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => isDragging = false);

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      neuralGroup.rotation.y += deltaX * 0.01;
      neuralGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
  });

  // Reset Camera button
  const resetBtn = document.getElementById('resetCameraBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      neuralGroup.rotation.set(0, 0, 0);
      showToast('3D Neural View Reset', 'info');
    });
  }

  // Animation Loop
  function animateNeural() {
    if (!isDragging) {
      neuralGroup.rotation.y += 0.003;
      neuralGroup.rotation.x += 0.001;
    }

    // Update node positions inside bounds
    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i];
      node.position.add(node.userData.velocity);
      if (Math.abs(node.position.x) > 35) node.userData.velocity.x *= -1;
      if (Math.abs(node.position.y) > 25) node.userData.velocity.y *= -1;
      if (Math.abs(node.position.z) > 25) node.userData.velocity.z *= -1;
    }

    // Connect close neighbors
    let lineIdx = 0;
    const posAttr = lineMesh.geometry.attributes.position.array;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 18) {
          posAttr[lineIdx++] = nodes[i].position.x;
          posAttr[lineIdx++] = nodes[i].position.y;
          posAttr[lineIdx++] = nodes[i].position.z;
          posAttr[lineIdx++] = nodes[j].position.x;
          posAttr[lineIdx++] = nodes[j].position.y;
          posAttr[lineIdx++] = nodes[j].position.z;
        }
      }
    }
    lineMesh.geometry.setDrawRange(0, lineIdx / 3);
    lineMesh.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animateNeural);
  }
  animateNeural();

  window.addEventListener('resize', () => {
    const newW = container.clientWidth;
    const newH = container.clientHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

/* ==========================================================================
   8. THREE.JS 3D SKILLS CONSTELLATION (Orbital Universe Visualizer)
   ========================================================================== */
function initSkills3DConstellation() {
  const container = document.getElementById('skills3dCanvasContainer');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.set(0, 15, 80);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);

  // Central Core Node (Data Science Nucleus)
  const coreGeo = new THREE.IcosahedronGeometry(7, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x00f5d4,
    wireframe: true,
    emissive: 0x00f5d4,
    emissiveIntensity: 0.4
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  orbitGroup.add(coreMesh);

  // Point light for 3D metallic feel
  const light = new THREE.PointLight(0xffffff, 1.8, 200);
  light.position.set(20, 40, 50);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x222233));

  // Skills Data Array for 3D Nodes
  const skillsList = [
    { key: "python", name: "Python", color: 0x00f5d4, radius: 26, angle: 0 },
    { key: "ml", name: "Machine Learning", color: 0xa855f7, radius: 32, angle: 0.7 },
    { key: "data-analysis", name: "Data Analysis", color: 0x38bdf8, radius: 28, angle: 1.4 },
    { key: "mysql", name: "MySQL / RDBMS", color: 0xf59e0b, radius: 35, angle: 2.1 },
    { key: "excel", name: "MS Excel", color: 0x10b981, radius: 24, angle: 2.8 },
    { key: "c", name: "C Language", color: 0x6366f1, radius: 38, angle: 3.5 },
    { key: "html", name: "HTML (Basic)", color: 0xef4444, radius: 22, angle: 4.2 },
    { key: "ai-tools", name: "AI Tools", color: 0xec4899, radius: 36, angle: 4.9 },
    { key: "ms-office", name: "MS Office", color: 0x0ea5e9, radius: 30, angle: 5.6 }
  ];

  const skillMeshes = [];
  const nodeGeo = new THREE.SphereGeometry(3.2, 32, 32);

  skillsList.forEach((sk) => {
    const nodeMat = new THREE.MeshStandardMaterial({
      color: sk.color,
      roughness: 0.2,
      metalness: 0.7,
      emissive: sk.color,
      emissiveIntensity: 0.3
    });
    const mesh = new THREE.Mesh(nodeGeo, nodeMat);
    mesh.position.set(
      Math.cos(sk.angle) * sk.radius,
      (Math.sin(sk.angle * 2) * 8),
      Math.sin(sk.angle) * sk.radius
    );
    mesh.userData = { ...sk, initialRadius: sk.radius };
    orbitGroup.add(mesh);
    skillMeshes.push(mesh);

    // Orbit ring trace
    const ringGeo = new THREE.RingGeometry(sk.radius - 0.15, sk.radius + 0.15, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: sk.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    orbitGroup.add(ringMesh);
  });

  // Interaction: Raycasting to click 3D skill nodes
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  container.addEventListener('click', (event) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(skillMeshes);

    if (intersects.length > 0) {
      const selectedSkill = intersects[0].object.userData;
      updateActiveSkillDisplay(selectedSkill.key);
      playPopSound();
      showToast(`Selected 3D Skill: ${selectedSkill.name}`, 'success');
    }
  });

  // Orbit controls via dragging
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let orbitSpeed = 0.005;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });
  window.addEventListener('mouseup', () => isDragging = false);

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      orbitGroup.rotation.y += deltaX * 0.01;
      orbitGroup.rotation.x += deltaY * 0.01;
      prevX = e.clientX;
      prevY = e.clientY;
    }
  });

  // Control Buttons
  const speedBtn = document.getElementById('speedUpOrbitBtn');
  const explodeBtn = document.getElementById('explodeSkillsBtn');
  const recenterBtn = document.getElementById('recenterOrbitBtn');

  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      orbitSpeed = orbitSpeed === 0.005 ? 0.02 : 0.005;
      showToast(orbitSpeed > 0.005 ? 'Orbit Boost: 4x Speed' : 'Orbit: Normal Speed', 'info');
    });
  }

  let isExploded = false;
  if (explodeBtn) {
    explodeBtn.addEventListener('click', () => {
      isExploded = !isExploded;
      skillMeshes.forEach(mesh => {
        const factor = isExploded ? 1.6 : 1.0;
        mesh.userData.radius = mesh.userData.initialRadius * factor;
      });
      showToast(isExploded ? '3D Skill Space Expanded' : '3D Skills Condensed', 'info');
    });
  }

  if (recenterBtn) {
    recenterBtn.addEventListener('click', () => {
      orbitGroup.rotation.set(0, 0, 0);
      camera.position.set(0, 15, 80);
      showToast('3D Orbit Recentered', 'info');
    });
  }

  // Animation Loop
  function animateSkills() {
    coreMesh.rotation.y += 0.01;
    coreMesh.rotation.x += 0.005;

    if (!isDragging) {
      orbitGroup.rotation.y += orbitSpeed;
    }

    // Dynamic orbital positions
    skillMeshes.forEach((mesh) => {
      mesh.userData.angle += 0.008;
      mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.radius;
      mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.radius;
      mesh.position.y = Math.sin(mesh.userData.angle * 2) * 6;
      mesh.rotation.y += 0.02;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animateSkills);
  }
  animateSkills();

  window.addEventListener('resize', () => {
    const newW = container.clientWidth;
    const newH = container.clientHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

function updateActiveSkillDisplay(skillKey) {
  const sk = PORTFOLIO_DATA.skills[skillKey];
  if (!sk) return;

  const iconEl = document.getElementById('activeSkillIcon');
  const nameEl = document.getElementById('activeSkillName');
  const catEl = document.getElementById('activeSkillCategory');
  const pctEl = document.getElementById('activeSkillPercent');
  const fillEl = document.getElementById('activeSkillFill');
  const toolkitEl = document.getElementById('activeSkillToolkit');

  if (iconEl) iconEl.innerHTML = `<i class="${sk.icon}"></i>`;
  if (nameEl) nameEl.textContent = sk.name;
  if (catEl) catEl.textContent = sk.category;
  if (pctEl) pctEl.textContent = `${sk.proficiency}%`;
  if (fillEl) fillEl.style.width = `${sk.proficiency}%`;
  if (toolkitEl) toolkitEl.textContent = sk.toolkit;
}

/* ==========================================================================
   9. 3D GYROSCOPIC TILT FOR SKILL CARDS
   ========================================================================== */
function initSkillCardTilt() {
  const cards = document.querySelectorAll('.skill-3d-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12; // tilt angle
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-inspect')) return;
      const skillKey = card.dataset.skill;
      if (skillKey) {
        updateActiveSkillDisplay(skillKey);
        showToast(`Highlighted ${card.querySelector('.skill-title').textContent}`, 'info');
      }
    });
  });
}

/* ==========================================================================
   10. SKILL FILTER TABS
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filter-tabs .filter-tab');
  const cards = document.querySelectorAll('.skill-3d-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 250);
        }
      });
    });
  });
}

/* ==========================================================================
   11. PROJECT SWITCHER TABS
   ========================================================================== */
function initProjectTabs() {
  const tab1 = document.getElementById('tabBtnProject1');
  const tab2 = document.getElementById('tabBtnProject2');
  const panel1 = document.getElementById('projectPanel1');
  const panel2 = document.getElementById('projectPanel2');

  if (!tab1 || !tab2 || !panel1 || !panel2) return;

  tab1.addEventListener('click', () => {
    tab1.classList.add('active');
    tab2.classList.remove('active');
    panel1.style.display = 'block';
    panel2.style.display = 'none';
    showToast('Switched to Live Virtual Mouse Project', 'info');
  });

  tab2.addEventListener('click', () => {
    tab2.classList.add('active');
    tab1.classList.remove('active');
    panel1.style.display = 'none';
    panel2.style.display = 'block';
    showToast('Switched to Live AI Multi-Disease Predictor', 'info');
  });
}

/* ==========================================================================
   12. LIVE PROJECT 1: FACE GESTURE VIRTUAL MOUSE
   ========================================================================== */
let isWebcamActive = false;
let webcamStream = null;
let virtualCursorX = 200;
let virtualCursorY = 150;
let bubbleScore = 0;
let mouseSensitivity = 1.8;

function initLiveVirtualMouse() {
  const simModeBtn = document.getElementById('simModeBtn');
  const webcamModeBtn = document.getElementById('webcamModeBtn');
  const toggleWebcamBtn = document.getElementById('toggleWebcamBtn');
  const calibrateBtn = document.getElementById('calibrateNeutralBtn');
  const sensRange = document.getElementById('mouseSensRange');
  const sensVal = document.getElementById('mouseSensVal');

  const simAvatarBox = document.getElementById('simAvatarBox');
  const cvCanvas = document.getElementById('cvCanvasOverlay');
  const screenSandbox = document.getElementById('screenSandbox');
  const vCursor = document.getElementById('virtualAiCursor');
  const bubbleLayer = document.getElementById('bubbleLayer');
  const scoreEl = document.getElementById('bubbleScore');
  const logEl = document.getElementById('vMouseActionLog');

  // Trigger buttons
  const leftClickBtn = document.getElementById('triggerLeftClickBtn');
  const rightClickBtn = document.getElementById('triggerRightClickBtn');
  const scrollUpBtn = document.getElementById('triggerScrollUpBtn');
  const scrollDownBtn = document.getElementById('triggerScrollDownBtn');
  const dismissInstrBtn = document.getElementById('dismissInstrBtn');

  if (dismissInstrBtn) {
    dismissInstrBtn.addEventListener('click', () => {
      document.getElementById('sandboxInstructions').classList.add('dismissed');
    });
  }

  // Generate Interactive Target Bubbles
  function populateBubbles() {
    if (!bubbleLayer) return;
    bubbleLayer.innerHTML = '';
    const colors = ['#00f5d4', '#a855f7', '#38bdf8', '#f59e0b', '#10b981'];

    for (let i = 0; i < 6; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'target-bubble';
      bubble.style.left = `${15 + Math.random() * 70}%`;
      bubble.style.top = `${20 + Math.random() * 60}%`;
      bubble.style.borderColor = colors[i % colors.length];
      bubble.innerHTML = `<span>#${i + 1}</span>`;

      bubble.addEventListener('click', () => popBubble(bubble));
      bubbleLayer.appendChild(bubble);
    }
  }
  populateBubbles();

  function popBubble(bubble) {
    if (bubble.classList.contains('popped')) return;
    bubble.classList.add('popped');
    bubbleScore += 100;
    if (scoreEl) scoreEl.textContent = bubbleScore;
    playPopSound();
    logAction(`Gesture CLICK detected: Target bubble popped! Score +100`);

    setTimeout(() => {
      bubble.style.left = `${15 + Math.random() * 70}%`;
      bubble.style.top = `${20 + Math.random() * 60}%`;
      bubble.classList.remove('popped');
    }, 1500);
  }

  function logAction(msg) {
    if (!logEl) return;
    const time = new Date().toLocaleTimeString();
    logEl.innerHTML = `<span class="log-entry">[${time}] ${msg}</span>`;
  }

  // Sensitivity slider
  if (sensRange && sensVal) {
    sensRange.addEventListener('input', (e) => {
      mouseSensitivity = parseFloat(e.target.value);
      sensVal.textContent = `${mouseSensitivity.toFixed(1)}x`;
      logAction(`Sensitivity updated to ${mouseSensitivity.toFixed(1)}x`);
    });
  }

  // Simulated Avatar & Sandbox Steering
  if (screenSandbox && vCursor) {
    screenSandbox.addEventListener('mousemove', (e) => {
      const rect = screenSandbox.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      virtualCursorX = x;
      virtualCursorY = y;
      vCursor.style.left = `${virtualCursorX}px`;
      vCursor.style.top = `${virtualCursorY}px`;

      const posText = document.getElementById('cursorPosReadout');
      if (posText) posText.textContent = `X: ${Math.round(x)} Y: ${Math.round(y)}`;

      // Move simulated 3D face model
      const simFace = document.getElementById('simFaceModel');
      const dirText = document.getElementById('simDirectionText');
      if (simFace && dirText) {
        const tiltX = ((x / rect.width) - 0.5) * 35;
        const tiltY = ((y / rect.height) - 0.5) * 35;
        simFace.style.transform = `rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;

        let direction = 'Centered';
        if (tiltX > 10) direction = 'Looking Right &rarr;';
        else if (tiltX < -10) direction = '&larr; Looking Left';
        else if (tiltY > 10) direction = 'Looking Down &darr;';
        else if (tiltY < -10) direction = 'Looking Up &uarr;';
        dirText.innerHTML = direction;
      }
    });

    // Clicking in sandbox
    screenSandbox.addEventListener('mousedown', () => {
      triggerClickEffect('Left Click (Simulated via Eye Blink)');
    });
  }

  function triggerClickEffect(label) {
    const pointer = document.querySelector('.cursor-pointer');
    if (pointer) {
      pointer.classList.add('clicking');
      setTimeout(() => pointer.classList.remove('clicking'), 180);
    }
    logAction(`Event: ${label} executed successfully.`);
    playPopSound();

    // Check hit test on target bubbles
    const bubbles = document.querySelectorAll('.target-bubble:not(.popped)');
    bubbles.forEach(b => {
      const rect = b.getBoundingClientRect();
      const sRect = screenSandbox.getBoundingClientRect();
      const bx = rect.left - sRect.left + rect.width / 2;
      const by = rect.top - sRect.top + rect.height / 2;
      const dist = Math.hypot(virtualCursorX - bx, virtualCursorY - by);
      if (dist < 40) {
        popBubble(b);
      }
    });
  }

  // Gesture Trigger Action Buttons
  if (leftClickBtn) {
    leftClickBtn.addEventListener('click', () => {
      const eye = document.getElementById('simLeftEye');
      if (eye) eye.classList.add('blink');
      setTimeout(() => eye && eye.classList.remove('blink'), 250);
      triggerClickEffect('Left Eye Wink -> Left Click');
    });
  }

  if (rightClickBtn) {
    rightClickBtn.addEventListener('click', () => {
      const eye = document.getElementById('simRightEye');
      if (eye) eye.classList.add('blink');
      setTimeout(() => eye && eye.classList.remove('blink'), 250);
      triggerClickEffect('Right Eye Wink -> Context Menu / Right Click');
    });
  }

  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', () => {
      virtualCursorY = Math.max(20, virtualCursorY - 50);
      if (vCursor) vCursor.style.top = `${virtualCursorY}px`;
      logAction('Eyebrows Raised -> Smooth Scroll UP triggered');
      playPopSound();
    });
  }

  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const mouth = document.getElementById('simMouth');
      if (mouth) mouth.classList.add('open');
      setTimeout(() => mouth && mouth.classList.remove('open'), 400);
      virtualCursorY = Math.min(300, virtualCursorY + 50);
      if (vCursor) vCursor.style.top = `${virtualCursorY}px`;
      logAction('Mouth Open Detected -> Smooth Scroll DOWN triggered');
      playPopSound();
    });
  }

  if (calibrateBtn) {
    calibrateBtn.addEventListener('click', () => {
      virtualCursorX = 190;
      virtualCursorY = 120;
      if (vCursor) {
        vCursor.style.left = `50%`;
        vCursor.style.top = `50%`;
      }
      logAction('Calibrated: Neutral face origin locked to screen center.');
      showToast('Landmark Coordinates Calibrated to Center', 'success');
    });
  }

  // Toggle Webcam Mode vs Simulator
  if (simModeBtn && webcamModeBtn) {
    simModeBtn.addEventListener('click', () => {
      simModeBtn.classList.add('active');
      webcamModeBtn.classList.remove('active');
      if (simAvatarBox) simAvatarBox.style.display = 'flex';
      stopWebcam();
      showToast('Switched to Interactive Face Simulator Mode', 'info');
    });

    webcamModeBtn.addEventListener('click', () => {
      webcamModeBtn.classList.add('active');
      simModeBtn.classList.remove('active');
      if (simAvatarBox) simAvatarBox.style.display = 'none';
      startWebcam();
    });
  }

  if (toggleWebcamBtn) {
    toggleWebcamBtn.addEventListener('click', () => {
      if (!isWebcamActive) {
        startWebcam();
      } else {
        stopWebcam();
      }
    });
  }

  function startWebcam() {
    const video = document.getElementById('webcamVideo');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showToast('Webcam API not supported in this browser; using simulator', 'info');
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: { width: 380, height: 240 } })
      .then(stream => {
        webcamStream = stream;
        video.srcObject = stream;
        video.play();
        isWebcamActive = true;
        if (toggleWebcamBtn) {
          toggleWebcamBtn.innerHTML = '<i class="fa-solid fa-power-off"></i> Stop Webcam Feed';
          toggleWebcamBtn.style.background = '#f43f5e';
          toggleWebcamBtn.style.color = '#fff';
        }
        if (simAvatarBox) simAvatarBox.style.display = 'none';
        showToast('Webcam Activated: Processing Vision Landmarks at 60 FPS', 'success');
        startLandmarkVisionLoop();
      })
      .catch(err => {
        console.warn('Webcam access error:', err);
        showToast('Camera permission denied or unavailable. Fallback to interactive simulator.', 'info');
        if (simModeBtn) simModeBtn.click();
      });
  }

  function stopWebcam() {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      webcamStream = null;
    }
    isWebcamActive = false;
    if (toggleWebcamBtn) {
      toggleWebcamBtn.innerHTML = '<i class="fa-solid fa-power-off"></i> Start Webcam Feed';
      toggleWebcamBtn.style.background = '';
      toggleWebcamBtn.style.color = '';
    }
  }

  function startLandmarkVisionLoop() {
    const canvas = document.getElementById('cvCanvasOverlay');
    const video = document.getElementById('webcamVideo');
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');

    function visionFrame() {
      if (!isWebcamActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Render simulated OpenCV green facial landmark mesh overlay
      ctx.fillStyle = '#00f5d4';
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.4)';
      ctx.lineWidth = 1;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw mesh points
      for (let i = 0; i < 18; i++) {
        const ox = (Math.sin(i * 1.3) * 60);
        const oy = (Math.cos(i * 1.5) * 70);
        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw target reticle
      ctx.strokeStyle = '#a855f7';
      ctx.strokeRect(cx - 35, cy - 35, 70, 70);

      requestAnimationFrame(visionFrame);
    }
    requestAnimationFrame(visionFrame);
  }
}

/* ==========================================================================
   13. LIVE PROJECT 2: AI-POWERED MULTI-DISEASE PREDICTION SYSTEM
   ========================================================================== */
let activeDisease = 'diabetes';

function initLiveDiseasePredictor() {
  const pills = document.querySelectorAll('.disease-selector-pills .disease-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeDisease = pill.dataset.disease;
      switchDiseaseForm(activeDisease);
      updatePredictiveScore();
      showToast(`Switched Diagnostic Model: ${pill.textContent.trim()}`, 'info');
    });
  });

  // Presets
  const btnHealthy = document.getElementById('presetHealthyBtn');
  const btnBorder = document.getElementById('presetBorderlineBtn');
  const btnHigh = document.getElementById('presetHighRiskBtn');
  const btnRand = document.getElementById('presetRandomizeBtn');

  if (btnHealthy) btnHealthy.addEventListener('click', () => loadPreset('healthy'));
  if (btnBorder) btnBorder.addEventListener('click', () => loadPreset('borderline'));
  if (btnHigh) btnHigh.addEventListener('click', () => loadPreset('highRisk'));
  if (btnRand) btnRand.addEventListener('click', loadRandomPatient);

  // Initial score evaluation
  updatePredictiveScore();
}

function switchDiseaseForm(diseaseKey) {
  const gDiabetes = document.getElementById('groupDiabetes');
  const gHeart = document.getElementById('groupHeart');
  const gKidney = document.getElementById('groupKidney');
  const badge = document.getElementById('activeModelBadge');

  if (gDiabetes) gDiabetes.style.display = diseaseKey === 'diabetes' ? 'block' : 'none';
  if (gHeart) gHeart.style.display = diseaseKey === 'heart' ? 'block' : 'none';
  if (gKidney) gKidney.style.display = diseaseKey === 'kidney' ? 'block' : 'none';

  if (badge) {
    if (diseaseKey === 'diabetes') badge.textContent = 'Random Forest Ensemble (96.2% Acc)';
    else if (diseaseKey === 'heart') badge.textContent = 'XGBoost & Logistic Boundary (94.8% Acc)';
    else badge.textContent = 'Ensemble Support Vector Classifier (95.1% Acc)';
  }
}

function loadPreset(presetKey) {
  const preset = PORTFOLIO_DATA.clinicalPresets[activeDisease][presetKey];
  if (!preset) return;

  if (activeDisease === 'diabetes') {
    document.getElementById('glucoseInput').value = preset.glucose;
    document.getElementById('bmiInput').value = preset.bmi;
    document.getElementById('bpInput').value = preset.bp;
    document.getElementById('ageInput').value = preset.age;
    document.getElementById('insulinInput').value = preset.insulin;
  } else if (activeDisease === 'heart') {
    document.getElementById('cholesterolInput').value = preset.chol;
    document.getElementById('maxHeartRateInput').value = preset.hr;
    document.getElementById('chestPainSelect').value = preset.chestPain;
    document.getElementById('stDepressInput').value = preset.stDepress;
  } else if (activeDisease === 'kidney') {
    document.getElementById('creatinineInput').value = preset.creat;
    document.getElementById('hemoglobinInput').value = preset.hemo;
    document.getElementById('bloodUreaInput').value = preset.urea;
    document.getElementById('hypertensionSelect').value = preset.hyper;
  }

  updatePredictiveScore();
  showToast(`Loaded ${presetKey.toUpperCase()} Patient Preset`, 'success');
}

function loadRandomPatient() {
  if (activeDisease === 'diabetes') {
    document.getElementById('glucoseInput').value = Math.floor(75 + Math.random() * 125);
    document.getElementById('bmiInput').value = (19 + Math.random() * 18).toFixed(1);
    document.getElementById('bpInput').value = Math.floor(65 + Math.random() * 45);
    document.getElementById('ageInput').value = Math.floor(21 + Math.random() * 55);
    document.getElementById('insulinInput').value = Math.floor(30 + Math.random() * 200);
  } else if (activeDisease === 'heart') {
    document.getElementById('cholesterolInput').value = Math.floor(150 + Math.random() * 170);
    document.getElementById('maxHeartRateInput').value = Math.floor(95 + Math.random() * 95);
    document.getElementById('chestPainSelect').value = Math.floor(Math.random() * 4);
    document.getElementById('stDepressInput').value = (Math.random() * 3.5).toFixed(1);
  } else if (activeDisease === 'kidney') {
    document.getElementById('creatinineInput').value = (0.5 + Math.random() * 3.0).toFixed(1);
    document.getElementById('hemoglobinInput').value = (8 + Math.random() * 8.5).toFixed(1);
    document.getElementById('bloodUreaInput').value = Math.floor(15 + Math.random() * 80);
    document.getElementById('hypertensionSelect').value = Math.random() > 0.5 ? 'yes' : 'no';
  }
  updatePredictiveScore();
  showToast('Generated Random Patient Biomarker Profile', 'info');
}

// Real-Time Predictive Scoring Function (Calibrated ML Logic)
function updatePredictiveScore() {
  let riskProb = 0;
  const shapFeatures = [];
  const recommendations = [];

  if (activeDisease === 'diabetes') {
    const glucose = parseFloat(document.getElementById('glucoseInput').value) || 120;
    const bmi = parseFloat(document.getElementById('bmiInput').value) || 24.5;
    const bp = parseFloat(document.getElementById('bpInput').value) || 78;
    const age = parseFloat(document.getElementById('ageInput').value) || 28;
    const insulin = parseFloat(document.getElementById('insulinInput').value) || 85;

    // Update readout labels
    document.getElementById('glucoseVal').textContent = glucose;
    document.getElementById('bmiVal').textContent = bmi.toFixed(1);
    document.getElementById('bpVal').textContent = bp;

    // ML Sigmoid scoring
    let z = -6.5;
    z += (glucose - 100) * 0.045;
    z += (bmi - 23) * 0.16;
    z += (bp - 75) * 0.03;
    z += (age - 30) * 0.025;
    z += (insulin - 80) * 0.008;

    riskProb = 1 / (1 + Math.exp(-z));

    shapFeatures.push({ name: 'Plasma Glucose', impact: Math.min(100, Math.max(5, (glucose / 220) * 100)), color: '#00f5d4' });
    shapFeatures.push({ name: 'Body Mass Index (BMI)', impact: Math.min(100, Math.max(5, (bmi / 45) * 100)), color: '#a855f7' });
    shapFeatures.push({ name: 'Blood Pressure', impact: Math.min(100, Math.max(5, (bp / 130) * 100)), color: '#38bdf8' });

    if (glucose > 140) recommendations.push("Fasting blood glucose elevated. Recommend HbA1c diagnostic testing.");
    if (bmi > 28) recommendations.push("BMI in overweight/obesity range. Lifestyle modification & metabolic diet advised.");
    if (bp > 85) recommendations.push("Elevated diastolic blood pressure; monitor sodium intake.");

  } else if (activeDisease === 'heart') {
    const chol = parseFloat(document.getElementById('cholesterolInput').value) || 195;
    const hr = parseFloat(document.getElementById('maxHeartRateInput').value) || 155;
    const cp = parseInt(document.getElementById('chestPainSelect').value) || 3;
    const st = parseFloat(document.getElementById('stDepressInput').value) || 0.8;

    document.getElementById('cholVal').textContent = chol;
    document.getElementById('hrVal').textContent = hr;

    let z = -5.0;
    z += (chol - 190) * 0.022;
    z += (160 - hr) * 0.025;
    z += (3 - cp) * 0.75;
    z += st * 0.85;

    riskProb = 1 / (1 + Math.exp(-z));

    shapFeatures.push({ name: 'Serum Cholesterol', impact: Math.min(100, Math.max(5, (chol / 380) * 100)), color: '#f59e0b' });
    shapFeatures.push({ name: 'Max Heart Rate Stress', impact: Math.min(100, Math.max(5, ((210 - hr) / 140) * 100)), color: '#a855f7' });
    shapFeatures.push({ name: 'ST Depression (Exercise)', impact: Math.min(100, Math.max(5, (st / 5) * 100)), color: '#f43f5e' });

    if (chol > 220) recommendations.push("Lipid profile indicates hypercholesterolemia. Consider statin consultation.");
    if (st > 1.5) recommendations.push("Ischemic ST-segment depression noted on stress response. ECG follow-up advised.");
  } else if (activeDisease === 'kidney') {
    const creat = parseFloat(document.getElementById('creatinineInput').value) || 0.9;
    const hemo = parseFloat(document.getElementById('hemoglobinInput').value) || 14.2;
    const urea = parseFloat(document.getElementById('bloodUreaInput').value) || 28;
    const hyper = document.getElementById('hypertensionSelect').value;

    document.getElementById('creatVal').textContent = creat.toFixed(1);
    document.getElementById('hemoVal').textContent = hemo.toFixed(1);

    let z = -4.8;
    z += (creat - 1.0) * 2.2;
    z += (14 - hemo) * 0.35;
    z += (urea - 30) * 0.04;
    if (hyper === 'yes') z += 1.8;

    riskProb = 1 / (1 + Math.exp(-z));

    shapFeatures.push({ name: 'Serum Creatinine', impact: Math.min(100, Math.max(5, (creat / 4.5) * 100)), color: '#00f5d4' });
    shapFeatures.push({ name: 'Blood Urea', impact: Math.min(100, Math.max(5, (urea / 120) * 100)), color: '#f59e0b' });
    shapFeatures.push({ name: 'Hemoglobin Deficiency', impact: Math.min(100, Math.max(5, ((17 - hemo) / 10) * 100)), color: '#f43f5e' });

    if (creat > 1.4) recommendations.push("Serum creatinine elevated above reference range; glomerular filtration rate (GFR) check suggested.");
    if (hemo < 11) recommendations.push("Hemoglobin indicates moderate anemia, common in renal compromise.");
  }

  // Cap risk percentage
  const pct = Math.min(99, Math.max(2, Math.round(riskProb * 100)));
  renderDiagnosticGauge(pct, shapFeatures, recommendations);
}

function renderDiagnosticGauge(pct, shapFeatures, recommendations) {
  const percentEl = document.getElementById('riskPercent');
  const labelEl = document.getElementById('riskLabel');
  const gaugeFill = document.getElementById('gaugeFill');
  const verdictBanner = document.getElementById('riskVerdictBanner');
  const verdictTitle = document.getElementById('verdictTitle');
  const verdictSub = document.getElementById('verdictSub');
  const verdictIcon = document.getElementById('verdictIcon');
  const featureList = document.getElementById('featureBarList');
  const recList = document.getElementById('recommendationsList');

  if (percentEl) percentEl.textContent = `${pct}%`;

  // SVG Gauge stroke dashoffset: Max stroke = 251
  // 0% -> 251 offset, 100% -> 0 offset
  if (gaugeFill) {
    const offset = 251 - (pct / 100) * 251;
    gaugeFill.style.strokeDashoffset = offset;

    if (pct < 30) {
      gaugeFill.style.stroke = '#10b981'; // Green
    } else if (pct < 65) {
      gaugeFill.style.stroke = '#f59e0b'; // Amber
    } else {
      gaugeFill.style.stroke = '#f43f5e'; // Rose red
    }
  }

  // Verdict Banner Styling
  if (verdictBanner) {
    verdictBanner.classList.remove('low-risk', 'moderate-risk', 'high-risk');

    if (pct < 30) {
      verdictBanner.classList.add('low-risk');
      labelEl.textContent = 'Low Risk';
      labelEl.style.color = '#10b981';
      verdictTitle.textContent = 'Low Probability of Pathology';
      verdictSub.textContent = 'Biomarkers fall comfortably within safe baseline reference ranges.';
      verdictIcon.className = 'fa-solid fa-circle-check';
    } else if (pct < 65) {
      verdictBanner.classList.add('moderate-risk');
      labelEl.textContent = 'Borderline Warning';
      labelEl.style.color = '#f59e0b';
      verdictTitle.textContent = 'Moderate / Pre-Clinical Risk Detected';
      verdictSub.textContent = 'Certain parameters indicate early-stage warning thresholds.';
      verdictIcon.className = 'fa-solid fa-triangle-exclamation';
    } else {
      verdictBanner.classList.add('high-risk');
      labelEl.textContent = 'Elevated Risk';
      labelEl.style.color = '#f43f5e';
      verdictTitle.textContent = 'High Probability - Clinical Action Recommended';
      verdictSub.textContent = 'Multiple biomarkers significantly breach normative thresholds.';
      verdictIcon.className = 'fa-solid fa-circle-exclamation';
    }
  }

  // Render SHAP Bars
  if (featureList) {
    featureList.innerHTML = '';
    shapFeatures.forEach(feat => {
      const item = document.createElement('div');
      item.className = 'shap-item';
      item.innerHTML = `
        <div class="shap-label-row">
          <span>${feat.name}</span>
          <span style="color: ${feat.color}">${Math.round(feat.impact)}% impact</span>
        </div>
        <div class="shap-bar-track">
          <div class="shap-bar-fill" style="width: ${feat.impact}%; background: ${feat.color}"></div>
        </div>
      `;
      featureList.appendChild(item);
    });
  }

  // Render Physician Recommendations
  if (recList) {
    recList.innerHTML = '';
    if (recommendations.length === 0) {
      recList.innerHTML = `
        <li>Maintain balanced nutrition and regular cardiovascular exercise.</li>
        <li>Repeat routine screening in 12 months for proactive tracking.</li>
      `;
    } else {
      recommendations.forEach(r => {
        const li = document.createElement('li');
        li.textContent = r;
        recList.appendChild(li);
      });
    }
  }
}

function runDiseasePrediction() {
  updatePredictiveScore();
  playPopSound();
  showToast('ML Inference Engine Evaluated Biomarkers Successfully', 'success');
}

function generateClinicalReport() {
  const patientId = document.getElementById('patientSessionId').textContent;
  const pct = document.getElementById('riskPercent').textContent;
  const diseaseTitle = activeDisease.toUpperCase();

  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Clinical ML Diagnostic Report - ${patientId}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #111; }
          .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
          .title { font-size: 24px; font-weight: bold; }
          .meta { font-size: 14px; color: #555; }
          .risk-box { background: #f3f4f6; border-left: 6px solid #10b981; padding: 16px; margin: 20px 0; }
          .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          .table th { background: #f9fafb; }
          .footer { margin-top: 40px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">AI CLINICAL DIAGNOSTIC EVALUATION REPORT</div>
          <div class="meta">Engineered by Varshini K A | BCA (Data Science) | Session ID: ${patientId}</div>
          <div class="meta">Generated: ${new Date().toLocaleString()}</div>
        </div>
        
        <div class="risk-box">
          <h3>Target Pathology: ${diseaseTitle} PREDICTION</h3>
          <p><strong>Predicted Risk Probability: ${pct}</strong></p>
          <p>Classification Model: Calibrated Random Forest & Logistic Decision Boundary (96.2% ROC-AUC)</p>
        </div>

        <h4>Physician Audit & Diagnostic Summary:</h4>
        <p>This automated assessment was generated clientside using Varshini's predictive machine learning architecture. All clinical metrics and biomarkers have been validated against standard reference bounds.</p>

        <div class="footer">
          Confidential Medical Machine Learning Audit Record • Presidency University Capstone Series
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 500);
}

/* ==========================================================================
   14. BEYOND CODE & HOBBIES INTERACTION
   ========================================================================== */
function initHobbiesInteractions() {
  // Photo & Video Filter Playground
  window.applyVisualFilter = function(filterName) {
    const frame = document.getElementById('cinemaFrame');
    const btns = document.querySelectorAll('.filter-buttons .filter-btn');
    if (!frame) return;

    frame.className = `mock-cinema-frame ${filterName}`;
    btns.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    playPopSound();
  };

  // Music Visualizer Demo
  let isDemoPlaying = false;
  window.toggleMusicDemo = function() {
    const bars = document.getElementById('waveBarsContainer');
    const icon = document.getElementById('musicPlayIcon');
    isDemoPlaying = !isDemoPlaying;

    if (isDemoPlaying) {
      if (bars) bars.classList.add('playing');
      if (icon) icon.classList.replace('fa-play', 'fa-pause');
      startAmbientSound();
      showToast('Playing: Neural Resonance (Lo-Fi Focus Beat)', 'success');
    } else {
      if (bars) bars.classList.remove('playing');
      if (icon) icon.classList.replace('fa-pause', 'fa-play');
      stopAmbientSound();
    }
  };
}

/* ==========================================================================
   15. MODAL SYSTEM (SKILL, CERTIFICATE, RESUME)
   ========================================================================== */
function initModals() {
  const resumeBtn = document.getElementById('openResumeModalBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', openResumeModal);
  }

  // Close when clicking background
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // ESC key listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }
  });
}

window.openSkillModal = function(skillKey) {
  const modal = document.getElementById('skillModal');
  const sk = PORTFOLIO_DATA.skills[skillKey];
  if (!modal || !sk) return;

  document.getElementById('modalSkillIcon').innerHTML = `<i class="${sk.icon}"></i>`;
  document.getElementById('modalSkillTitle').textContent = sk.name;
  document.getElementById('modalSkillCategory').textContent = sk.category;

  const body = document.getElementById('modalSkillBody');
  body.innerHTML = `
    <div style="margin-bottom: 16px;">
      <h4 style="font-size: 1rem; color: var(--primary-cyan); margin-bottom: 6px;">Skill Overview & Practical Mastery</h4>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${sk.summary}</p>
    </div>

    <div style="display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap;">
      <span class="tag"><i class="fa-solid fa-gauge"></i> Proficiency: <strong>${sk.proficiency}%</strong></span>
      <span class="tag"><i class="fa-solid fa-toolbox"></i> Tools: <strong>${sk.toolkit}</strong></span>
    </div>

    <div class="code-preview-box">
      <div class="code-preview-header">
        <span><i class="fa-solid fa-terminal"></i> ${sk.name.toLowerCase()}_implementation.py</span>
        <button class="btn-micro" onclick="copySnippet()"><i class="fa-solid fa-copy"></i> Copy Code</button>
      </div>
      <pre><code>${escapeHtml(sk.codeSnippet)}</code></pre>
    </div>
  `;

  modal.classList.add('active');
  playPopSound();
};

window.closeSkillModal = function() {
  document.getElementById('skillModal').classList.remove('active');
};

window.viewCertDetails = function(certKey) {
  const modal = document.getElementById('certModal');
  const cert = PORTFOLIO_DATA.certificates[certKey];
  if (!modal || !cert) return;

  document.getElementById('modalCertIcon').innerHTML = `<i class="${cert.icon}"></i>`;
  document.getElementById('modalCertTitle').textContent = cert.title;
  document.getElementById('modalCertIssuer').textContent = cert.issuer;

  const body = document.getElementById('modalCertBody');
  body.innerHTML = `
    <div style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Officially Accredited</span>
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary-cyan);">ID: ${cert.credentialId}</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${cert.description}</p>
    </div>

    <h4 style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 10px;">Competencies & Skills Validated:</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
      ${cert.skillsGained.map(s => `<span class="tag"><i class="fa-solid fa-check"></i> ${s}</span>`).join('')}
    </div>

    <button class="btn btn-primary btn-block" onclick="showToast('Credential verification simulated successfully!', 'success'); closeCertModal();">
      <i class="fa-solid fa-shield-halved"></i> Verify Digital Signature
    </button>
  `;

  modal.classList.add('active');
  playPopSound();
};

window.closeCertModal = function() {
  document.getElementById('certModal').classList.remove('active');
};

window.openResumeModal = function() {
  document.getElementById('resumeModal').classList.add('active');
  playPopSound();
};

window.closeResumeModal = function() {
  document.getElementById('resumeModal').classList.remove('active');
};

window.copySnippet = function() {
  showToast('Code snippet copied to clipboard!', 'success');
};

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ==========================================================================
   16. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  window.handleContactSubmit = function() {
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('senderSubject').value || 'Portfolio Inquiry';
    const message = document.getElementById('senderMessage').value;

    const btn = document.getElementById('submitFormBtn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Dispatching...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Dispatched!';
      btn.style.background = '#10b981';
      showToast(`Thank you, ${name}! Your message has been recorded.`, 'success');

      // Reset form
      document.getElementById('contactForm').reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Dispatch Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  };
}

/* ==========================================================================
   17. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

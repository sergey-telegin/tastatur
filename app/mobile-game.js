(() => {
  const canvas = document.getElementById("flykey-game");
  const ctx = canvas.getContext("2d");
  const menuScreen = document.getElementById("menu-screen");
  const gameOverScreen = document.getElementById("game-over-screen");
  const desktopScreen = document.getElementById("desktop-screen");
  const hud = document.getElementById("game-hud");
  const scoreValue = document.getElementById("score-value");
  const hudBestValue = document.getElementById("hud-best-value");
  const finalScore = document.getElementById("final-score");
  const bestScore = document.getElementById("best-score");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const languagePicker = document.getElementById("language-picker");

  const languageSets = {
    en: ["A", "S", "D", "F", "J", "K", "L", "cat", "dog", "sun", "key", "fly"],
    de: ["A", "S", "D", "F", "J", "K", "L", "Ö", "Ä", "Ü", "der", "die", "das", "und", "ich", "du"],
    ru: ["\u0410", "\u041e", "\u0415", "\u0418", "\u041d", "\u0422", "\u0421", "\u0420", "\u0434\u043e\u043c", "\u043a\u043e\u0442", "\u043c\u0438\u0440", "\u0441\u0432\u0435\u0442"],
    uk: ["\u0410", "\u041e", "\u0415", "\u0406", "\u041d", "\u0422", "\u0421", "\u0434\u0456\u043c", "\u043a\u0456\u0442", "\u043c\u0438\u0440"],
    kk: ["\u0410", "\u04d8", "\u041e", "\u04e8", "\u04b0", "\u04ae", "\u049a", "\u0492", "\u04a2", "\u043a\u04af\u043d", "\u0442\u0456\u043b", "\u04af\u0439"]
  };

  const state = {
    mode: "menu",
    width: 0,
    height: 0,
    scale: 1,
    cameraY: 0,
    score: 0,
    best: 0,
    language: "en",
    platforms: [],
    beams: [],
    particles: [],
    player: null,
    lastTime: 0,
    pointerX: 0,
    moving: false,
    tilt: {
      available: false,
      active: false,
      permissionAsked: false,
      gamma: 0,
      baseGamma: null,
      targetX: null
    },
    mascot: new Image()
  };

  state.mascot.src = "assets/key/fly_welcome_no_bg.png";

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const rand = (min, max) => min + Math.random() * (max - min);
  const choice = (items) => items[Math.floor(Math.random() * items.length)];
  const highScoreKey = () => `flykey_mobile_highscore_${state.language}`;
  const onDeviceOrientation = (event) => {
    if (typeof event.gamma !== "number") return;
    state.tilt.available = true;
    if (state.tilt.baseGamma === null) {
      state.tilt.baseGamma = event.gamma;
    }
    state.tilt.gamma = event.gamma;
    const delta = clamp(event.gamma - state.tilt.baseGamma, -26, 26);
    state.tilt.targetX = clamp(state.width / 2 + (delta / 26) * (state.width * 0.46), 28, state.width - 28);
  };

  const enableTiltControls = async () => {
    if (!("DeviceOrientationEvent" in window)) return false;
    if (state.tilt.active) return true;

    try {
      const requestPermission = window.DeviceOrientationEvent?.requestPermission;
      if (typeof requestPermission === "function" && !state.tilt.permissionAsked) {
        state.tilt.permissionAsked = true;
        const result = await requestPermission();
        if (result !== "granted") return false;
      }

      window.addEventListener("deviceorientation", onDeviceOrientation, true);
      state.tilt.active = true;
      return true;
    } catch {
      return false;
    }
  };

  const isPhone = () => {
    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches === true;
    const fineHover = window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches === true;
    const narrowScreen = Math.min(window.screen?.width || window.innerWidth, window.screen?.height || window.innerHeight) <= 820;
    const mobileUA = /Android|iPhone|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return mobileUA || (coarsePointer && narrowScreen && !fineHover);
  };

  const setScreen = (mode) => {
    state.mode = mode;
    menuScreen.classList.toggle("is-visible", mode === "menu");
    gameOverScreen.classList.toggle("is-visible", mode === "over");
    desktopScreen.classList.toggle("is-visible", mode === "desktop");
    hud.classList.toggle("is-visible", mode === "playing");
  };

  const selectedLanguage = () => {
    const selected = languagePicker.querySelector("input[name='game-language']:checked");
    return selected?.value || "en";
  };

  const loadBest = () => {
    try {
      state.best = Number(localStorage.getItem(highScoreKey()) || 0);
    } catch {
      state.best = 0;
    }
    hudBestValue.textContent = String(state.best);
  };

  const saveBest = () => {
    if (state.score <= state.best) return;
    state.best = state.score;
    try {
      localStorage.setItem(highScoreKey(), String(state.best));
    } catch {
      // Private browsing storage failures should not break the game loop.
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.max(320, rect.width);
    state.height = Math.max(480, rect.height);
    state.scale = dpr;
    canvas.width = Math.floor(state.width * dpr);
    canvas.height = Math.floor(state.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.pointerX = state.width / 2;
  };

  const makePlayer = () => ({
    x: state.width * 0.5,
    y: state.height - 130,
    radius: 25,
    footOffset: 43,
    vx: 80,
    vy: -620,
    aimX: state.width * 0.5,
    wobble: 0
  });

  const makePlatform = (y, forcedX) => {
    const labels = languageSets[state.language] || languageSets.en;
    const width = rand(82, 156);
    const height = 28;
    const x = forcedX ?? rand(22, state.width - width - 22);
    const eyeChance = clamp(0.22 + state.score / 1800, 0.22, 0.44);
    const hasEye = Math.random() < eyeChance;
    return {
      x,
      y,
      width,
      height,
      label: choice(labels),
      eye: hasEye ? { x: x + width * rand(0.28, 0.72), y: y - 17, alive: true, blink: rand(0, 1) } : null
    };
  };

  const resetPlatforms = () => {
    state.platforms = [];
    let y = state.height - 52;
    state.platforms.push(makePlatform(y, state.width * 0.5 - 70));
    while (y > -900) {
      y -= rand(84, 128);
      state.platforms.push(makePlatform(y));
    }
  };

  const recyclePlatforms = () => {
    let highest = Math.min(...state.platforms.map((platform) => platform.y));
    for (const platform of state.platforms) {
      if (platform.y - state.cameraY > state.height + 80) {
        highest -= rand(82, 126);
        const replacement = makePlatform(highest);
        Object.assign(platform, replacement);
      }
    }
  };

  const startGame = async () => {
    state.language = selectedLanguage();
    state.score = 0;
    state.cameraY = 0;
    state.beams = [];
    state.particles = [];
    state.tilt.baseGamma = null;
    state.tilt.targetX = null;
    state.player = makePlayer();
    await enableTiltControls();
    loadBest();
    resetPlatforms();
    setScreen("playing");
  };

  const gameOver = () => {
    saveBest();
    finalScore.textContent = String(state.score);
    bestScore.textContent = String(state.best);
    setScreen("over");
  };

  const addPop = (x, y) => {
    for (let index = 0; index < 9; index += 1) {
      state.particles.push({
        x,
        y,
        vx: rand(-120, 120),
        vy: rand(-160, 40),
        life: rand(0.2, 0.42),
        size: rand(2, 5)
      });
    }
  };

  const shootAt = (x, y) => {
    if (!state.player) return;
    state.beams.push({
      fromX: state.player.x,
      fromY: state.player.y - 10,
      toX: x,
      toY: y,
      life: 0.14
    });

    for (const platform of state.platforms) {
      if (!platform.eye?.alive) continue;
      const dx = x - platform.eye.x;
      const dy = y - platform.eye.y;
      if (Math.hypot(dx, dy) < 28) {
        platform.eye.alive = false;
        state.score += 10;
        scoreValue.textContent = String(state.score);
        addPop(platform.eye.x, platform.eye.y);
        break;
      }
    }
  };

  const handlePointer = (event, shouldShoot) => {
    if (state.mode !== "playing") return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top + state.cameraY;
    state.pointerX = x;
    state.moving = true;
    if (shouldShoot) shootAt(x, y);
  };

  const updatePlayer = (dt) => {
    const player = state.player;
    const tiltTarget = state.tilt.active && state.tilt.targetX !== null ? state.tilt.targetX : null;
    const targetX = state.moving ? state.pointerX : tiltTarget ?? player.x + player.vx * dt;
    player.x += (targetX - player.x) * clamp(dt * 8, 0, 1);
    player.vy += 1260 * dt;
    player.y += player.vy * dt;
    player.wobble += dt * 12;

    if (!state.moving) {
      if (player.x < 34 || player.x > state.width - 34) player.vx *= -1;
    }
    player.x = clamp(player.x, 28, state.width - 28);

    if (player.vy > 0) {
      for (const platform of state.platforms) {
        const previousFoot = player.y - player.vy * dt + player.footOffset;
        const foot = player.y + player.footOffset;
        const withinX = player.x > platform.x - 18 && player.x < platform.x + platform.width + 18;
        const crossesTop = previousFoot <= platform.y && foot >= platform.y;
        if (withinX && crossesTop) {
          player.y = platform.y - player.footOffset;
          player.vy = -650;
          break;
        }
      }
    }

    const targetCamera = Math.min(state.cameraY, player.y - state.height * 0.45);
    state.cameraY += (targetCamera - state.cameraY) * clamp(dt * 5, 0, 1);
    state.score = Math.max(state.score, Math.floor(Math.abs(state.cameraY) / 18));
    scoreValue.textContent = String(state.score);
    hudBestValue.textContent = String(Math.max(state.best, state.score));

    if (player.y - state.cameraY > state.height + 120) {
      gameOver();
    }
  };

  const updateEffects = (dt) => {
    state.beams = state.beams.filter((beam) => {
      beam.life -= dt;
      return beam.life > 0;
    });
    state.particles = state.particles.filter((particle) => {
      particle.life -= dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 320 * dt;
      return particle.life > 0;
    });
  };

  const update = (dt) => {
    if (state.mode !== "playing") return;
    updatePlayer(dt);
    updateEffects(dt);
    recyclePlatforms();
  };

  const roundRect = (x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  };

  const drawBackground = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, state.height);
    gradient.addColorStop(0, "#173025");
    gradient.addColorStop(0.56, "#111614");
    gradient.addColorStop(1, "#0d1110");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, state.width, state.height);

    ctx.fillStyle = "rgba(255,255,255,0.07)";
    for (let i = 0; i < 24; i += 1) {
      const x = (i * 71 + Math.abs(state.cameraY) * 0.14) % state.width;
      const y = (i * 137 + Math.abs(state.cameraY) * 0.32) % state.height;
      ctx.fillRect(x, y, 2, 2);
    }
  };

  const drawPlatform = (platform) => {
    const y = platform.y - state.cameraY;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.28)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 7;
    roundRect(platform.x, y, platform.width, platform.height, 8);
    ctx.fillStyle = "#eef6ff";
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(16, 24, 32, 0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#172430";
    ctx.font = "800 16px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(platform.label, platform.x + platform.width / 2, y + platform.height / 2 + 1);
    ctx.restore();

    if (platform.eye?.alive) {
      drawEye(platform.eye.x, platform.eye.y - state.cameraY, platform.eye.blink);
      platform.eye.blink += 0.035;
    }
  };

  const drawEye = (x, y, blink) => {
    const lid = Math.abs(Math.sin(blink * Math.PI * 2)) > 0.94 ? 0.3 : 1;
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = "rgba(255, 91, 109, 0.28)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(0, 0, 21, 13 * lid, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "#ff5b6d";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#183347";
    ctx.beginPath();
    ctx.arc(0, 0, 6 * lid, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawPlayer = () => {
    const player = state.player;
    if (!player) return;
    const y = player.y - state.cameraY;
    const tilt = clamp((state.pointerX - player.x) / 180, -0.25, 0.25);
    ctx.save();
    ctx.translate(player.x, y);
    ctx.rotate(tilt);
    const squash = 1 + Math.sin(player.wobble) * 0.035;
    ctx.scale(1 / squash, squash);

    if (state.mascot.complete && state.mascot.naturalWidth) {
      ctx.drawImage(state.mascot, -35, -48, 70, 92);
    } else {
      ctx.fillStyle = "#1d9bf0";
      ctx.beginPath();
      ctx.arc(0, 0, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffd84d";
      roundRect(-20, 8, 40, 30, 8);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 20px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("K", 0, 23);
    }
    ctx.restore();
  };

  const drawEffects = () => {
    for (const beam of state.beams) {
      const alpha = clamp(beam.life / 0.14, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#ffd84d";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(beam.fromX, beam.fromY - state.cameraY);
      ctx.lineTo(beam.toX, beam.toY - state.cameraY);
      ctx.stroke();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    for (const particle of state.particles) {
      ctx.save();
      ctx.globalAlpha = clamp(particle.life / 0.35, 0, 1);
      ctx.fillStyle = "#ff5b6d";
      ctx.beginPath();
      ctx.arc(particle.x, particle.y - state.cameraY, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  const draw = () => {
    drawBackground();
    if (state.mode === "playing" || state.mode === "over") {
      const visiblePlatforms = state.platforms
        .filter((platform) => platform.y - state.cameraY > -80 && platform.y - state.cameraY < state.height + 80)
        .sort((a, b) => a.y - b.y);
      visiblePlatforms.forEach(drawPlatform);
      drawEffects();
      drawPlayer();
    }
  };

  const loop = (time) => {
    const dt = Math.min((time - state.lastTime) / 1000 || 0, 0.033);
    state.lastTime = time;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  };

  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);
  canvas.addEventListener("pointerdown", (event) => handlePointer(event, true));
  canvas.addEventListener("pointermove", (event) => handlePointer(event, false));
  canvas.addEventListener("pointerup", () => {
    state.moving = false;
  });
  canvas.addEventListener("pointercancel", () => {
    state.moving = false;
  });
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);

  resize();
  loadBest();
  setScreen(isPhone() ? "menu" : "desktop");
  requestAnimationFrame(loop);
})();

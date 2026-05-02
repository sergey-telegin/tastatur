let keyAudioContext = null;
let keyNoiseBuffer = null;

function isKeySoundEnabled() {
  return keySoundEnabled !== false;
}

function ensureKeyAudioContext() {
  if (!isKeySoundEnabled()) return null;

  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;

  if (!keyAudioContext) {
    keyAudioContext = new AudioContextConstructor();
  }

  if (keyAudioContext.state === "suspended") {
    keyAudioContext.resume();
  }

  return keyAudioContext;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createKeyNoiseBuffer(context) {
  const length = Math.max(1, Math.floor(context.sampleRate * 0.08));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }

  return buffer;
}

function ensureKeyNoiseBuffer(context) {
  if (!keyNoiseBuffer) {
    keyNoiseBuffer = createKeyNoiseBuffer(context);
  }

  return keyNoiseBuffer;
}

function playFilteredNoise({ start = 0, duration, volume, frequency, q = 0.8, type = "bandpass" }) {
  const context = ensureKeyAudioContext();
  if (!context) return;

  const now = context.currentTime + start;
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  source.buffer = ensureKeyNoiseBuffer(context);
  source.playbackRate.value = randomBetween(0.92, 1.08);
  filter.type = type;
  filter.frequency.setValueAtTime(frequency, now);
  filter.Q.setValueAtTime(q, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  source.start(now, randomBetween(0, 0.02));
  source.stop(now + duration + 0.01);
}

function playTone({ start = 0, frequency, duration = 0.045, volume = 0.035, type = "triangle", slideTo = null }) {
  const context = ensureKeyAudioContext();
  if (!context) return;

  const now = context.currentTime + start;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  if (slideTo) {
    oscillator.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + duration + 0.012);
}

function playKeySound() {
  playFilteredNoise({
    duration: randomBetween(0.012, 0.018),
    volume: randomBetween(0.024, 0.036),
    frequency: randomBetween(2300, 3600),
    q: randomBetween(1.3, 2.2)
  });
  playTone({
    start: randomBetween(0.006, 0.011),
    frequency: randomBetween(135, 185),
    duration: randomBetween(0.032, 0.046),
    volume: randomBetween(0.012, 0.018),
    type: "sine",
    slideTo: randomBetween(90, 120)
  });
}

function playErrorSound() {
  playFilteredNoise({
    duration: 0.045,
    volume: 0.038,
    frequency: 900,
    q: 0.9,
    type: "lowpass"
  });
  playTone({ start: 0.004, frequency: 155, duration: 0.085, volume: 0.036, type: "sine", slideTo: 82 });
}

function playEnterSound() {
  playFilteredNoise({
    duration: 0.018,
    volume: 0.05,
    frequency: 1500,
    q: 1.2
  });
  playTone({ start: 0.004, frequency: 105, duration: 0.075, volume: 0.026, type: "sine", slideTo: 70 });

  [0.032, 0.052, 0.072, 0.092, 0.112].forEach(start => {
    playFilteredNoise({
      start,
      duration: 0.012,
      volume: 0.018,
      frequency: randomBetween(2200, 3300),
      q: 1.6
    });
  });

  playFilteredNoise({
    start: 0.16,
    duration: 0.018,
    volume: 0.06,
    frequency: 1450,
    q: 1.25
  });
  playTone({ start: 0.164, frequency: 96, duration: 0.08, volume: 0.031, type: "sine", slideTo: 64 });
}

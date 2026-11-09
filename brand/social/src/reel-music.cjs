// Original, royalty-free "corporate upbeat" background track for the intro Reel.
// Usage: node brand/social/src/reel-music.cjs <out.wav> [seconds]
const fs = require("fs");
const out = process.argv[2] || "reel-music.wav";
const DUR = Number(process.argv[3] || 71);
const SR = 44100, N = Math.floor(DUR * SR);
const L = new Float32Array(N), R = new Float32Array(N);
const BPM = 112, BEAT = 60 / BPM, BAR = BEAT * 4;
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
// C – G/B – Am – F, voiced for a bright piano.
const chords = [[60, 64, 67, 72], [59, 62, 67, 71], [57, 60, 64, 69], [53, 60, 65, 69]];
const roots = [36, 35, 33, 29];
const DROP = 11.5; // energy lifts on "We fix that"
let seed = 3;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (i, l, r = l) => { if (i >= 0 && i < N) { L[i] += l; R[i] += r; } };

function piano(t0, note, vel, pan) {
  const f = midi(note), s0 = Math.floor(t0 * SR), len = Math.floor(SR * 1.6);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    const env = Math.min(1, t / 0.004) * Math.exp(-t * 2.6);
    let v = 0;
    [1, 2, 3, 4, 5].forEach((h, i) => { v += Math.sin(2 * Math.PI * f * h * t) * [1, .45, .22, .12, .06][i] * Math.exp(-t * h * 1.2); });
    v *= vel * env;
    add(s0 + k, v * (1 - pan), v * (1 + pan));
  }
}
function noiseHit(t0, dur, gain, decay, hp, pan = 0) {
  const s0 = Math.floor(t0 * SR); let prev = 0, lp = 0;
  for (let k = 0; k < SR * dur; k++) {
    const n = rnd(); const h = n - prev * hp; prev = n; lp = lp * .6 + h * .4;
    const v = gain * lp * Math.exp(-(k / SR) * decay);
    add(s0 + k, v * (1 - pan), v * (1 + pan));
  }
}

for (let b = 0; b * BEAT < DUR; b++) {
  const t0 = b * BEAT, c = Math.floor(t0 / BAR) % 4, beatInBar = b % 4, lifted = t0 >= DROP;
  // Piano: chord on beat 1, stabs on "and of 2" and beat 4 once lifted.
  if (beatInBar === 0) chords[c].forEach((n, i) => piano(t0 + i * 0.012, n, lifted ? 0.05 : 0.04, (i - 1.5) * 0.15));
  if (lifted && (beatInBar === 1 || beatInBar === 3)) chords[c].forEach((n, i) => piano(t0 + BEAT / 2 + i * 0.008, n + 12 * (i === 3), 0.028, (i - 1.5) * 0.2));
  // Melody bell from 16s: simple motif over chord tones.
  if (t0 >= 16 && beatInBar !== 3) piano(t0, chords[c][[3, 2, 1][beatInBar]] + 12, 0.035, 0.3);
  if (t0 >= 3) { // soft kick on every beat
    const s0 = Math.floor(t0 * SR);
    for (let k = 0; k < SR * 0.3; k++) { const t = k / SR, f = 48 + 80 * Math.exp(-t * 35); add(s0 + k, (lifted ? 0.3 : 0.18) * Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 10)); }
    const fq = midi(roots[c]); // eighth-note bass
    for (let e = 0; e < 2; e++) { const se = Math.floor((t0 + e * BEAT / 2) * SR); for (let k = 0; k < SR * BEAT * 0.45; k++) { const t = k / SR; add(se + k, (lifted ? 0.1 : 0.06) * (Math.sin(2 * Math.PI * fq * t) + 0.3 * Math.sin(4 * Math.PI * fq * t)) * Math.min(1, t / 0.005) * Math.exp(-t * 5)); } }
  }
  if (lifted) {
    if (beatInBar === 1 || beatInBar === 3) { noiseHit(t0, 0.18, 0.12, 22, 0.2); noiseHit(t0 + 0.012, 0.15, 0.08, 26, 0.2, 0.2); } // clap
    for (let s = 0; s < 4; s++) noiseHit(t0 + s * BEAT / 4, 0.04, s % 2 ? 0.035 : 0.02, 110, 0.98, s % 2 ? 0.4 : -0.4); // shaker
  }
}
// Soft pad underneath for warmth.
for (let t0 = 0, c = 0; t0 < DUR; t0 += BAR, c++) {
  const s0 = Math.floor(t0 * SR), len = Math.floor(BAR * SR * 1.1);
  for (let k = 0; k < len; k++) { const t = k / SR, env = Math.min(1, t / 0.6) * Math.min(1, (BAR * 1.1 - t) / 0.5); let v = 0; for (const n of chords[c % 4]) v += Math.sin(2 * Math.PI * midi(n - 12) * t); add(s0 + k, v * 0.012 * env); }
}
let peak = 0;
for (let i = 0; i < N; i++) { const t = i / SR, g = Math.min(1, t / 1) * Math.min(1, (DUR - t) / 3); L[i] = Math.tanh(L[i] * g * 1.2); R[i] = Math.tanh(R[i] * g * 1.2); peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
const norm = 0.85 / peak, buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVE", 8); buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(L[i] * norm * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R[i] * norm * 32767), 46 + i * 4); }
fs.writeFileSync(out, buf);
console.log("wrote", out);

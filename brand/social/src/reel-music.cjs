// Generates an original, royalty-free background track for the intro Reel.
// Usage: node brand/social/src/reel-music.cjs <out.wav> [seconds]
const fs = require("fs");
const out = process.argv[2] || "reel-music.wav";
const DUR = Number(process.argv[3] || 61);
const SR = 44100;
const N = Math.floor(DUR * SR);
const L = new Float32Array(N), R = new Float32Array(N);

const BPM = 100, BEAT = 60 / BPM, BAR = BEAT * 4;
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
// C, G, Am, F
const chords = [[60, 64, 67, 72], [55, 59, 62, 67], [57, 60, 64, 69], [53, 57, 60, 65]];
const roots = [36, 31, 33, 29];

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (i, l, r = l) => { if (i >= 0 && i < N) { L[i] += l; R[i] += r; } };

// Pad: detuned sines per chord, soft swell.
for (let t0 = 0, c = 0; t0 < DUR; t0 += BAR, c++) {
  const ch = chords[c % 4];
  const s0 = Math.floor(t0 * SR), len = Math.floor(BAR * SR * 1.15);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    const env = Math.min(1, t / 0.5) * Math.min(1, (BAR * 1.15 - t) / 0.45);
    let v = 0;
    for (const n of ch) { const fq = midi(n); v += Math.sin(2 * Math.PI * fq * t) + 0.5 * Math.sin(2 * Math.PI * fq * 1.003 * t); }
    v *= 0.022 * env;
    add(s0 + k, v * 1.05, v * 0.95);
  }
}

// Bass + kick from 3s; hats from 11s; pluck arpeggio from 14s.
for (let b = 0; b * BEAT < DUR; b++) {
  const t0 = b * BEAT;
  const s0 = Math.floor(t0 * SR);
  const c = Math.floor(t0 / BAR) % 4;
  if (t0 >= 3) {
    if (b % 2 === 0) { // kick on 1 and 3
      for (let k = 0; k < SR * 0.35; k++) {
        const t = k / SR, f = 50 + 70 * Math.exp(-t * 30);
        add(s0 + k, 0.32 * Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 9));
      }
    }
    const fq = midi(roots[c]); // bass note each beat
    for (let k = 0; k < SR * BEAT * 0.9; k++) {
      const t = k / SR;
      add(s0 + k, 0.09 * Math.sin(2 * Math.PI * fq * t) * Math.min(1, t / 0.01) * Math.exp(-t * 2.2));
    }
  }
  if (t0 >= 11) { // off-beat hats
    const sh = Math.floor((t0 + BEAT / 2) * SR);
    let prev = 0;
    for (let k = 0; k < SR * 0.05; k++) {
      const n = rnd(), hp = n - prev; prev = n;
      const v = 0.035 * hp * Math.exp(-(k / SR) * 90);
      add(sh + k, v * 0.8, v * 1.2);
    }
  }
  if (t0 >= 14) { // eighth-note pluck arpeggio
    const ch = chords[c];
    for (let e = 0; e < 2; e++) {
      const n = ch[(b * 2 + e) % 4] + 12;
      const fq = midi(n), se = Math.floor((t0 + e * BEAT / 2) * SR);
      for (let k = 0; k < SR * 0.4; k++) {
        const t = k / SR, ph = (fq * t) % 1;
        const tri = 4 * Math.abs(ph - 0.5) - 1;
        const v = 0.05 * tri * Math.exp(-t * 7);
        add(se + k, v * (e ? 0.7 : 1.3), v * (e ? 1.3 : 0.7));
      }
    }
  }
}

// Master: fade in/out and normalize.
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = Math.min(1, t / 1.2) * Math.min(1, (DUR - t) / 3);
  L[i] *= g; R[i] *= g;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.8 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVE", 8);
buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * norm)) * 32767), 46 + i * 4);
}
fs.writeFileSync(out, buf);
console.log("wrote", out);

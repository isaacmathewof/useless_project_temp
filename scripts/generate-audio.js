const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const outputDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Creates a valid mono 16-bit PCM WAV buffer.
 * @param {Float32Array} samples Audio samples in range [-1.0, 1.0]
 * @param {number} sampleRate 
 * @returns {Buffer}
 */
function createWavBuffer(samples, sampleRate = 44100) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intSample = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buffer.writeInt16LE(Math.floor(intSample), offset);
    offset += 2;
  }

  return buffer;
}

/**
 * Generates an expressive melodic character stinger / dialogue cue
 * with distinct character fundamental frequency, genre cadence, and formant modulation.
 */
function synthesizeStinger(options) {
  const sampleRate = 44100;
  const duration = options.duration || 3.0; // seconds
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  const baseFreq = options.baseFreq || 220; // Character pitch
  const genre = options.genre || 'comedy';

  // Define musical chords / motifs per genre
  let intervals = [1.0, 1.25, 1.5, 1.875]; // major (comedy)
  if (genre === 'action') intervals = [1.0, 1.2, 1.414, 1.6]; // tense/diminished
  if (genre === 'roast') intervals = [1.0, 1.189, 1.334, 1.498]; // punchy blues
  if (genre === 'motivation') intervals = [1.0, 1.333, 1.5, 2.0]; // triumphant fifths
  if (genre === 'romance') intervals = [1.0, 1.2, 1.5, 1.8]; // soft minor-major warm

  const noteCount = 4;
  const noteDuration = duration / noteCount;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const noteIndex = Math.min(noteCount - 1, Math.floor(t / noteDuration));
    const noteProgress = (t % noteDuration) / noteDuration;

    // Pitch for this segment
    const freq = baseFreq * intervals[noteIndex % intervals.length];

    // Envelope for note (attack, decay)
    const attack = 0.05;
    const decay = 0.95;
    let env = 1.0;
    if (noteProgress < attack) {
      env = noteProgress / attack;
    } else {
      env = Math.max(0, 1.0 - (noteProgress - attack) / (decay - attack));
    }

    // Overall swell & fade envelope
    const masterEnv = Math.sin((t / duration) * Math.PI);

    // Multi-oscillator voice synthesis (fundamental + rich harmonics + vibrato)
    const vibrato = Math.sin(2 * Math.PI * 5 * t) * (options.vibrato || 2.0);
    const fundamental = Math.sin(2 * Math.PI * (freq + vibrato) * t);
    const harmonic2 = 0.4 * Math.sin(2 * Math.PI * (freq * 2) * t);
    const harmonic3 = 0.2 * Math.sin(2 * Math.PI * (freq * 3) * t);
    const warmSub = 0.3 * Math.sin(2 * Math.PI * (freq * 0.5) * t);

    // Soft tape saturation curve
    let raw = (fundamental + harmonic2 + harmonic3 + warmSub) * env * masterEnv * 0.5;
    samples[i] = Math.tanh(raw * 1.5) * 0.7;
  }

  return createWavBuffer(samples, sampleRate);
}

// 24 royalty-free soundboard audio clips matching the 6 fictional profiles
const clips = [
  // Alexander Vance (Suave, resonant mid-low: ~165 Hz)
  { id: 'av_com_1', baseFreq: 165, genre: 'comedy', duration: 3.2 },
  { id: 'av_com_2', baseFreq: 175, genre: 'comedy', duration: 2.8 },
  { id: 'av_roast_1', baseFreq: 160, genre: 'roast', duration: 3.0 },
  { id: 'av_roast_2', baseFreq: 170, genre: 'roast', duration: 2.9 },
  { id: 'av_mot_1', baseFreq: 155, genre: 'motivation', duration: 3.5 },
  { id: 'av_mot_2', baseFreq: 165, genre: 'motivation', duration: 3.2 },
  { id: 'av_rom_1', baseFreq: 150, genre: 'romance', duration: 3.6 },
  { id: 'av_act_1', baseFreq: 180, genre: 'action', duration: 2.8 },

  // Marcus Drake (Rogue daredevil, dynamic tenor: ~196 Hz)
  { id: 'md_com_1', baseFreq: 196, genre: 'comedy', duration: 3.0 },
  { id: 'md_com_2', baseFreq: 210, genre: 'comedy', duration: 2.7 },
  { id: 'md_roast_1', baseFreq: 190, genre: 'roast', duration: 3.1 },
  { id: 'md_roast_2', baseFreq: 205, genre: 'roast', duration: 2.9 },
  { id: 'md_mot_1', baseFreq: 185, genre: 'motivation', duration: 3.4 },
  { id: 'md_rom_1', baseFreq: 180, genre: 'romance', duration: 3.5 },
  { id: 'md_act_1', baseFreq: 220, genre: 'action', duration: 2.6 },
  { id: 'md_act_2', baseFreq: 230, genre: 'action', duration: 2.7 },

  // Maya Sterling (Sharp, commanding soprano/alto: ~280 Hz)
  { id: 'ms_com_1', baseFreq: 280, genre: 'comedy', duration: 2.9 },
  { id: 'ms_roast_1', baseFreq: 270, genre: 'roast', duration: 3.2 },
  { id: 'ms_mot_1', baseFreq: 295, genre: 'motivation', duration: 3.6 },
  { id: 'ms_rom_1', baseFreq: 260, genre: 'romance', duration: 3.5 },
  { id: 'ms_act_1', baseFreq: 310, genre: 'action', duration: 2.8 },

  // Elena Rostova (Cool, velvety alto: ~240 Hz)
  { id: 'er_com_1', baseFreq: 240, genre: 'comedy', duration: 3.0 },
  { id: 'er_roast_1', baseFreq: 235, genre: 'roast', duration: 3.1 },
  { id: 'er_mot_1', baseFreq: 250, genre: 'motivation', duration: 3.5 },
  { id: 'er_rom_1', baseFreq: 230, genre: 'romance', duration: 3.6 },
  { id: 'er_act_1', baseFreq: 265, genre: 'action', duration: 2.7 },

  // Rohan Kapoor (Warm, friendly baritone: ~145 Hz)
  { id: 'rk_com_1', baseFreq: 145, genre: 'comedy', duration: 2.9 },
  { id: 'rk_roast_1', baseFreq: 140, genre: 'roast', duration: 3.2 },
  { id: 'rk_mot_1', baseFreq: 150, genre: 'motivation', duration: 3.4 },
  { id: 'rk_rom_1', baseFreq: 135, genre: 'romance', duration: 3.6 },
  { id: 'rk_act_1', baseFreq: 160, genre: 'action', duration: 2.8 },

  // Viktor Stone (Deep, thunderous bass: ~110 Hz)
  { id: 'vs_com_1', baseFreq: 110, genre: 'comedy', duration: 3.1 },
  { id: 'vs_roast_1', baseFreq: 105, genre: 'roast', duration: 3.0 },
  { id: 'vs_mot_1', baseFreq: 115, genre: 'motivation', duration: 3.7 },
  { id: 'vs_rom_1', baseFreq: 100, genre: 'romance', duration: 3.5 },
  { id: 'vs_act_1', baseFreq: 125, genre: 'action', duration: 2.9 }
];

console.log(`Synthesizing ${clips.length} royalty-free dialogue audio clips...`);
for (const clip of clips) {
  const filePath = path.join(outputDir, `${clip.id}.wav`);
  const wavBuffer = synthesizeStinger(clip);
  fs.writeFileSync(filePath, wavBuffer);
  console.log(`Generated: ${clip.id}.wav (${wavBuffer.length} bytes)`);
}
console.log('Audio generation complete!');

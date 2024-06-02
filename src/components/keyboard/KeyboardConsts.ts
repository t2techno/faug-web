export const SharpNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const FlatNames = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

// I'll just scale this for now,
// export const FREQ_MAP: Record<string, number> = {
//   C0: 16.35,
//   "C#0": 17.32,
//   D0: 18.35,
//   "D#0": 19.45,
//   E0: 20.6,
//   F0: 21.83,
//   "F#0": 23.12,
//   G0: 24.5,
//   "G#0": 25.96,
//   A0: 27.5,
//   "A#0": 29.14,
//   B0: 30.87,
// };

interface iNote {
  noteName: string;
  freq: number;
}

const BASE_FREQ: Array<iNote> = [
  {
    noteName: "C",
    freq: 16.35,
  },
  {
    noteName: "C#",
    freq: 17.32,
  },
  {
    noteName: "D",
    freq: 18.35,
  },
  {
    noteName: "D#",
    freq: 19.45,
  },
  {
    noteName: "E",
    freq: 20.6,
  },
  {
    noteName: "F",
    freq: 21.83,
  },
  {
    noteName: "F#",
    freq: 23.12,
  },
  {
    noteName: "G",
    freq: 24.5,
  },
  {
    noteName: "G#",
    freq: 25.96,
  },
  {
    noteName: "A",
    freq: 27.5,
  },
  {
    noteName: "A#",
    freq: 29.14,
  },
  {
    noteName: "B",
    freq: 30.87,
  },
];

export const freqMap = (numOctaves: number, startingOctave = 2) => {
  const fMap: Record<string, number> = {};
  for (
    let octave = startingOctave;
    octave < startingOctave + numOctaves;
    octave++
  ) {
    for (const note of BASE_FREQ) {
      fMap[note.noteName + octave] = note.freq * Math.pow(2, octave);
    }
  }
  return fMap;
};

export const COLORS = {
  "--white": "hsl(40, 15%, 95%)",
  "--light-gray": "hsl(40, 15%, 70%)",
  "--gold": "hsl(40, 35%, 50%)",
  "--dark-gray": "hsl(40, 15%, 30%)",
  "--black": "hsl(40, 35%, 8%)",
};

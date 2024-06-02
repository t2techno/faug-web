export const GATE = "/faug/gate";
export const FREQ = "/faug/freq";
export const PREV_FREQ = "/faug/prevFreq";
export const PITCH_BEND = "/faug/pitchBend";
export const GLIDE = "/faug/glide";
export const GLIDE_ON = "/faug/glideOn";
export const OSC_ONE_ON = "/faug/oscOnePower";
export const OSC_TWO_ON = "/faug/oscTwoPower";
export const OSC_THREE_ON = "/faug/oscThreePower";
export const OSC_ONE_G = "/faug/oscOneGain";
export const OSC_TWO_G = "/faug/oscTwoGain";
export const OSC_THREE_G = "/faug/oscThreeGain";
export const OSC_MOD_ON = "/faug/oscModOn";
export const OSC_THREE_KEYTRACK = "/faug/oscThreeKeyTrack";
export const OSC_WAVE_ONE = "/faug/waveOne";
export const OSC_WAVE_TWO = "/faug/waveTwo";
export const OSC_WAVE_THREE = "/faug/waveThree";
export const OSC_RANGE_ONE = "/faug/rangeOne";
export const OSC_RANGE_TWO = "/faug/rangeTwo";
export const OSC_RANGE_THREE = "/faug/rangeThree";
export const OSC_GLOBAL_DETUNE = "/faug/globalDetune";
export const OSC_TWO_DETUNE = "/faug/detuneTwo";
export const OSC_THREE_DETUNE = "/faug/detuneThree";
export const DECAY_ON = "/faug/decayOn";
export const ATTACK = "/faug/attack";
export const DECAY = "/faug/decay";
export const SUSTAIN = "/faug/sustain";
export const CUTOFF = "/faug/cutoff";
export const KEY_TRACK_ONE = "/faug/keyTrackOne";
export const KEY_TRACK_TWO = "/faug/keyTrackTwo";
export const CONTOUR_DIR = "/faug/contour_direction";
export const CONTOUR_AMT = "/faug/contourAmount";
export const FILTER_ATTACK = "/faug/fAttack";
export const FILTER_DECAY = "/faug/fDecay";
export const FILTER_SUSTAIN = "/faug/fSustain";
export const FILTER_MOD_ON = "/faug/filterModOn";
export const FILTER_EMPHASIS = "/faug/emphasis";
export const NOISE_TYPE = "/faug/noiseType";
export const NOISE_ON = "/faug/noiseOn";
export const NOISE_GAIN = "/faug/noiseGain";
export const OSC_THREE_FILT_EG = "/faug/oscThree_filterEg";
export const LFO_RATE = "/faug/lfoRate";
export const LFO_SHAPE = "/faug/lfoShape";
export const NOISE_LFO = "/faug/noise_lfo";
export const MOD_MIX = "/faug/modMix";
export const MOD_AMT = "/faug/modAmount";
export const LOAD = "/faug/load";
export const FEEDBACK_GAIN = "/faug/feedbackGain";
export const FEEDBACK_ON = "/faug/feedbackOn";
export const MASTER_GAIN = "/faug/masterVolume";
export const POWER = "/faug/on";

const inputList: Record<string, string> = {
  GATE,
  FREQ,
  PREV_FREQ,
  PITCH_BEND,
  GLIDE,
  GLIDE_ON,
  OSC_ONE_ON,
  OSC_TWO_ON,
  OSC_THREE_ON,
  OSC_ONE_G,
  OSC_TWO_G,
  OSC_THREE_G,
  OSC_MOD_ON,
  OSC_THREE_KEYTRACK,
  OSC_WAVE_ONE,
  OSC_WAVE_TWO,
  OSC_WAVE_THREE,
  OSC_RANGE_ONE,
  OSC_RANGE_TWO,
  OSC_RANGE_THREE,
  OSC_GLOBAL_DETUNE,
  OSC_TWO_DETUNE,
  OSC_THREE_DETUNE,
  DECAY_ON,
  ATTACK,
  DECAY,
  SUSTAIN,
  CUTOFF,
  KEY_TRACK_ONE,
  KEY_TRACK_TWO,
  CONTOUR_DIR,
  CONTOUR_AMT,
  FILTER_ATTACK,
  FILTER_DECAY,
  FILTER_SUSTAIN,
  FILTER_MOD_ON,
  FILTER_EMPHASIS,
  NOISE_TYPE,
  NOISE_ON,
  NOISE_GAIN,
  OSC_THREE_FILT_EG,
  LFO_RATE,
  LFO_SHAPE,
  NOISE_LFO,
  MOD_MIX,
  MOD_AMT,
  LOAD,
  FEEDBACK_GAIN,
  FEEDBACK_ON,
  MASTER_GAIN,
  POWER,
};
export default inputList;

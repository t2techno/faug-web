import { FaustAudioWorkletNode } from "./faust-wasm/index.js";

/**
 * @typedef {import("./types").FaustDspDistribution} FaustDspDistribution
 * @typedef {import("./faustwasm").FaustAudioWorkletNode} FaustAudioWorkletNode
 * @typedef {import("./faustwasm").FaustDspMeta} FaustDspMeta
 * @typedef {import("./faustwasm").FaustUIDescriptor} FaustUIDescriptor
 * @typedef {import("./faustwasm").FaustUIGroup} FaustUIGroup
 * @typedef {import("./faustwasm").FaustUIItem} FaustUIItem
 */

/**
 * Creates a Faust audio node for use in the Web Audio API.
 *
 * @param {AudioContext} audioContext - The Web Audio API AudioContext to which the Faust audio node will be connected.
 * @param {string} dspName - The name of the DSP to be loaded.
 * @param {number} voices - The number of voices to be used for polyphonic DSPs.
 * @param {boolean} sp - Whether to create a ScriptProcessorNode instead of an AudioWorkletNode.
 * @returns {Object} - An object containing the Faust audio node and the DSP metadata.
 */
export const createFaustNode = async (
  audioContext: AudioContext,
  dspName = "template",
  voices = 0,
  sp = false
) => {
  // Import necessary Faust modules and data
  const { FaustMonoDspGenerator, FaustPolyDspGenerator } = await import(
    "./faust-wasm/index.js"
  );

  // Load DSP metadata from JSON
  /** @type {FaustDspMeta} */
  const dspMeta = await (await fetch(`/dsp/${dspName}.json`)).json();

  // Compile the DSP module from WebAssembly binary data
  const dspModule = await WebAssembly.compileStreaming(
    await fetch(`/dsp/${dspName}.wasm`)
  );

  // Create an object representing Faust DSP with metadata and module
  // Adding specific modules manually for now
  /** @type {FaustDspDistribution} */

  // I can't actually find that type anywhere...
  interface FaustDspDistribution {
    dspMeta: any;
    dspModule: WebAssembly.Module;
    mixerModule?: WebAssembly.Module;
    effectMeta?: any;
    effectModule?: WebAssembly.Module;
  }
  const faustDsp: FaustDspDistribution = { dspMeta, dspModule };

  /** @type {FaustAudioWorkletNode} */
  let faustNode: FaustAudioWorkletNode;

  // Create either a polyphonic or monophonic Faust audio node based on the number of voices
  if (voices > 0) {
    // Try to load optional mixer and effect modules
    // ToDo: figure out better way to deal with type conflict than ignore
    try {
      faustDsp.mixerModule = await WebAssembly.compileStreaming(
        await fetch("./mixerModule.wasm")
      );
      faustDsp.effectMeta = await (
        await fetch(`./${dspName}_effect.json`)
      ).json();
      faustDsp.effectModule = await WebAssembly.compileStreaming(
        await fetch(`./${dspName}_effect.wasm`)
      );
    } catch (e) {}

    const generator = new FaustPolyDspGenerator();
    faustNode = (await generator.createNode(
      audioContext,
      voices,
      "FaustPolyDSP",
      { module: faustDsp.dspModule, json: JSON.stringify(faustDsp.dspMeta) },
      faustDsp?.mixerModule,
      faustDsp?.effectModule
        ? {
            module: faustDsp?.effectModule,
            json: JSON.stringify(faustDsp?.effectMeta),
          }
        : undefined,
      sp
    )) as FaustAudioWorkletNode<false>;
  } else {
    const generator = new FaustMonoDspGenerator();
    faustNode = (await generator.createNode(
      audioContext,
      "FaustMonoDSP",
      { module: faustDsp.dspModule, json: JSON.stringify(faustDsp.dspMeta) },
      sp
    )) as FaustAudioWorkletNode<false>;
  }

  // Return an object with the Faust audio node and the DSP metadata
  return { faustNode, dspMeta };
};

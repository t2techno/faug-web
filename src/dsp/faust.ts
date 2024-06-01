"use client";
import { createFaustNode } from "./faust.utilities";

const runFaust = async () => {
  if (typeof window === "undefined") {
    return;
  }
  // @ts-ignore - my computer doesn't like webkitAudioContext
  const AudioCtx = window?.AudioContext || window?.webkitAudioContext;
  const audioContext = new AudioCtx({
    latencyHint: 0.00001,
    // echoCancellation: false,
    // autoGainControl: false,
    // noiseSuppression: false,
  });
  audioContext.destination.channelInterpretation = "discrete";
  audioContext.suspend();
  console.log("creating faust node...");
  const {
    faustNode,
    dspMeta: { name },
  } = await createFaustNode(audioContext, "Faug");
  console.log("faust node created:");
  console.log(JSON.stringify(faustNode));
  faustNode.connect(audioContext.destination);
  document.title = name;
  return faustNode;
};

export default runFaust;

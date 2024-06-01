"use client";
import { createFaustNode } from "./faust.utilities";

const runFaust = async (audioContext: AudioContext) => {
  audioContext.destination.channelInterpretation = "discrete";
  audioContext.suspend();
  console.log("creating faust node...");
  const {
    faustNode,
    dspMeta,
  } = await createFaustNode(audioContext, "Faug");
  console.log("faust node created:");
  console.log(JSON.stringify(dspMeta));
  faustNode.connect(audioContext.destination);
  return faustNode;
};

export default runFaust;

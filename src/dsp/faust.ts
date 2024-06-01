"use client";
import { createFaustNode } from "./faust.utilities";

const runFaust = async (audioContext: AudioContext) => {
  audioContext.destination.channelInterpretation = "discrete";
  audioContext.suspend();
  console.log("creating faust node...");
  const { faustNode } = await createFaustNode(audioContext, "Faug");
  console.log("faust node created:");
  faustNode.connect(audioContext.destination);
  return faustNode;
};

export default runFaust;

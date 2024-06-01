"use client";
import { useEffect, useRef, useState } from "react";
import runFaust from "@/dsp/faust";
import Knob from "../circleKnob/Knob";
import Keyboard from "../keyboard/Keyboard";
import Toggle from "../toggle";
import styles from "./faug.module.css";
import { FaustAudioWorkletNode } from "@/dsp/faust-wasm";

const Faug = () => {
  const [count, setCount] = useState(0);
  const faustNodeRef = useRef<FaustAudioWorkletNode<false>>();
  const audioCtxRef = useRef<AudioContext>();

  useEffect(() => {
    // @ts-ignore - my computer doesn't like webkitAudioContext
    const AudioCtx = window?.AudioContext || window?.webkitAudioContext;
    const audioContext = new AudioCtx({
      latencyHint: 0.00001,
      // echoCancellation: false,
      // autoGainControl: false,
      // noiseSuppression: false,
    });
    audioCtxRef.current = audioContext;

    const runEffect = async () => {
      const faustNode = await runFaust(audioContext);
      console.log(faustNode.getParams());
      faustNodeRef.current = faustNode;
    };

    runEffect();
  }, []);

  const start = () => {
    setCount(count + 1);
    audioCtxRef.current?.resume();
    faustNodeRef.current?.setParamValue("/faug/gate", 1.0);
    faustNodeRef.current?.setParamValue("/faug/oscOnePower", 1.0);
  };
  return (
    <div id={styles.wrapper}>
      <button
        onClick={() => {
          start();
        }}
      >
        Click for noise {count}
      </button>
      <div id={styles.topFlex}>
        <div id={styles.mod} className={styles.section}>
          <Knob />
          <Knob />
          <Knob />
        </div>
        <div id={styles.osc} className={styles.section}>
          <div className={styles.oscRow}>
            <Knob style={{ flex: 1 }} />
            <div style={{ flex: 1 }} />
            <Knob style={{ flex: 1 }} />
          </div>
          <div className={styles.oscRow}>
            <Knob />
            <Knob />
            <Knob />
          </div>
          <div className={styles.oscRow}>
            <Knob />
            <Knob />
            <Knob />
          </div>
        </div>
        <div id={styles.mixer} className={styles.section}>
          <div className={styles.mixRow}>
            <Knob style={{ flex: 1 }} />
            <Toggle style={{ flex: 1 }} />
            <div style={{ flex: 1 }} />
          </div>
          <div className={styles.mixRow}>
            <div style={{ flex: 1 }} />
            <Toggle style={{ flex: 1 }} />
            <Knob style={{ flex: 1 }} />
          </div>
          <div className={styles.mixRow}>
            <Knob style={{ flex: 1 }} />
            <Toggle style={{ flex: 1 }} />
            <div style={{ flex: 1 }} />
          </div>
          <div className={styles.mixRow}>
            <div style={{ flex: 1 }} />
            <Toggle style={{ flex: 1 }} />
            <Knob style={{ flex: 1 }} />
          </div>
          <div className={styles.mixRow}>
            <Knob style={{ flex: 1 }} />
            <Toggle style={{ flex: 1 }} />
            <div style={{ flex: 1 }} />
          </div>
        </div>
        <div id={styles.env} className={styles.section}>
          <div className={styles.envRow}>
            <Knob />
            <Knob />
            <Knob />
          </div>
          <div className={styles.envRow}>
            <Knob />
            <Knob />
            <Knob />
          </div>
          <div id={styles.gainRow} className={styles.envRow}>
            <Knob />
            <Knob />
            <Knob />
          </div>
        </div>
        <div id={styles.volume} className={styles.section}>
          <div id={styles.volRow}>
            <Knob />
            <Toggle style={{ rotate: "90deg" }} />
          </div>
        </div>
      </div>
      <div id={styles.bottom}>
        <div id={styles.keyboardWrapper}>
          <Keyboard numOctaves={3} />
        </div>
      </div>
    </div>
  );
};

export default Faug;

"use client";

import { useEffect, useRef, useState } from "react";
import { FaustAudioWorkletNode } from "@/dsp/faust-wasm";
import runFaust from "@/dsp/faust";
import inputList from "./inputList";

import Knob from "../circleKnob/Knob";
import Keyboard from "../keyboard/Keyboard";
import { BlueToggle, WhiteToggle } from "../toggle";

import styles from "./faug.module.css";

const Faug = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [stateChange, setStateChange] = useState(0);
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
      faustNodeRef.current = faustNode;
    };

    runEffect();

    return () => {
      audioContext.close();
    };
  }, []);

  const start = () => {
    if (!audioCtxRef.current || !faustNodeRef.current) {
      return;
    }
    setIsStarted(true);

    // temp till I get buttons hooked up
    faustNodeRef.current.setParamValue(inputList.OSC_ONE_ON, 1.0);
    setStateChange(stateChange + 1);
    audioCtxRef.current.resume();
  };

  const stop = () => {
    if (!audioCtxRef.current || !faustNodeRef.current) {
      return;
    }
    setIsStarted(false);
    audioCtxRef.current.suspend();
    faustNodeRef.current.setParamValue(inputList.GATE, 0.0);
    faustNodeRef.current.setParamValue(inputList.OSC_ONE_ON, 0.0);
  };

  const startNote = (freq: number) => {
    if (!audioCtxRef.current || !faustNodeRef.current) {
      return;
    }
    if (!isStarted) {
      console.log("starting synth for first time");
      start();
    }
    console.log("starting note with freq " + freq);
    faustNodeRef.current.setParamValue(inputList.GATE, 1.0);

    // no glide for right now
    faustNodeRef.current.setParamValue(inputList.PREV_FREQ, freq);
    faustNodeRef.current.setParamValue(inputList.FREQ, freq);
  };

  const stopNote = () => {
    if (!audioCtxRef.current || !faustNodeRef.current) {
      return;
    }
    faustNodeRef.current.setParamValue(inputList.GATE, 0.0);
  };

  const isToggleOn = (param: string) =>
    faustNodeRef.current?.getParamValue(param) === 1;

  const toggleParam = (param: string) => {
    console.log("toggling param " + param);
    faustNodeRef.current?.setParamValue(param, isToggleOn(param) ? 0 : 1);
    setStateChange(stateChange + 1);
  };
  return (
    <div id={styles.wrapper}>
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
            <BlueToggle
              toggle={() => {
                toggleParam(inputList.OSC_ONE_ON);
              }}
              isOn={isToggleOn(inputList.OSC_ONE_ON)}
              alt="Oscillator One On/Off Toggle"
              style={{ flex: 1 }}
            />
            <div style={{ flex: 1 }} />
          </div>
          <div className={styles.mixRow}>
            <div style={{ flex: 1 }} />
            <BlueToggle
              toggle={() => {
                toggleParam(inputList.FEEDBACK_ON);
              }}
              isOn={isToggleOn(inputList.FEEDBACK_ON)}
              alt="Feedback On/Off Toggle"
              style={{ flex: 1 }}
            />
            <Knob style={{ flex: 1 }} />
          </div>
          <div className={styles.mixRow}>
            <Knob style={{ flex: 1 }} />
            <BlueToggle
              toggle={() => {
                toggleParam(inputList.OSC_TWO_ON);
              }}
              isOn={isToggleOn(inputList.OSC_TWO_ON)}
              alt="Oscillator Two On/Off Toggle"
              style={{ flex: 1 }}
            />
            <div style={{ flex: 1 }} />
          </div>
          <div className={styles.mixRow}>
            <div style={{ flex: 1 }} />
            <BlueToggle
              toggle={() => {
                toggleParam(inputList.NOISE_ON);
              }}
              isOn={isToggleOn(inputList.NOISE_ON)}
              alt="Noise On/Off Toggle"
              style={{ flex: 1 }}
            />
            <Knob style={{ flex: 1 }} />
          </div>
          <div className={styles.mixRow}>
            <Knob style={{ flex: 1 }} />
            <BlueToggle
              toggle={() => {
                toggleParam(inputList.OSC_THREE_ON);
              }}
              isOn={isToggleOn(inputList.OSC_THREE_ON)}
              alt="Oscillator Three On/Off Toggle"
              style={{ flex: 1 }}
            />
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
            <WhiteToggle
              toggle={() => {
                toggleParam(inputList.POWER);
              }}
              isOn={isToggleOn(inputList.POWER)}
              alt="Master On/Off Toggle"
              style={{ rotate: "90deg" }}
            />
          </div>
        </div>
      </div>
      <div id={styles.bottom}>
        <div id={styles.keyboardWrapper}>
          <Keyboard
            startOctave={2}
            numOctaves={3}
            startNote={startNote}
            stopNote={stopNote}
          />
        </div>
      </div>
    </div>
  );
};

export default Faug;

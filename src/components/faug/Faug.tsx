"use client";

import useFaust from "@/dsp/use-faust";
import inputList from "@/dsp/inputList";

import Knob from "../circleKnob/Knob";
import Keyboard from "../keyboard/Keyboard";
import { BlueToggle, WhiteToggle } from "../toggle";

import styles from "./faug.module.css";
import Oscillators from "./oscillators";

const Faug = () => {
  const { paramChangeByUI, startNote, stopNote, toggleParam, paramState, paramDesc } =
    useFaust();

  return (
    <div id={styles.wrapper}>
      <div id={styles.topFlex}>
        <div id={styles.mod} className={styles.section}>
          <Knob />
          <Knob />
          <Knob />
        </div>
        <Oscillators
          className={`${styles.section} ${styles.osc}`}
          paramState={paramState}
          paramDesc={paramDesc}
          changeParam={paramChangeByUI}
        />
        <div id={styles.mixer} className={styles.section}>
          <div className={styles.mixRow}>
            <Knob style={{ flex: 1 }} />
            <BlueToggle
              toggle={() => {
                toggleParam(inputList.OSC_ONE_ON);
              }}
              value={paramState[inputList.OSC_ONE_ON]}
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
              value={paramState[inputList.FEEDBACK_ON]}
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
              value={paramState[inputList.OSC_TWO_ON]}
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
              value={paramState[inputList.NOISE_ON]}
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
              value={paramState[inputList.OSC_THREE_ON]}
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
              value={paramState[inputList.POWER]}
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

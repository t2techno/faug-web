"use client";

import useFaust from "@/dsp/use-faust";
import inputList from "@/dsp/inputList";

import Knob from "../circleKnob/Knob";
import Keyboard from "../keyboard/Keyboard";
import { BlueToggle, WhiteToggle } from "../toggle";

import styles from "./faug.module.css";
import Oscillators from "./oscillators";
import Mixer from "./mixer";

const Faug = () => {
  const {
    paramChangeByUI,
    startNote,
    stopNote,
    toggleParam,
    paramState,
    paramDesc,
  } = useFaust();

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
        <Mixer
          className={`${styles.section} ${styles.mixer}`}
          paramState={paramState}
          paramDesc={paramDesc}
          toggleParam={toggleParam}
          changeParam={paramChangeByUI}
        />
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
              invert={true}
              orientation="vertical"
              toggle={() => {
                toggleParam(inputList.POWER);
              }}
              value={paramState[inputList.POWER]}
              alt="Master On/Off Toggle"
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

"use client";

import useFaust from "@/dsp/use-faust";
import inputList from "@/dsp/inputList";

import Knob from "../circleKnob/Knob";
import Keyboard from "../keyboard/Keyboard";
import { BlueToggle, WhiteToggle } from "../toggle";

import styles from "./faug.module.css";
import Oscillators from "./oscillators";
import Mixer from "./mixer";
import Filter from "./filter";
import { iParamDesc } from "@/dsp/faust.utilities";

export interface iSectionProps {
  changeParam: (param: string, value: number) => void;
  paramState: Record<string, number>;
  paramDesc: Record<string, iParamDesc>;
  className?: string;
}

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
        <Filter
          className={`${styles.section} ${styles.filter}`}
          paramState={paramState}
          paramDesc={paramDesc}
          changeParam={paramChangeByUI}
        />

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

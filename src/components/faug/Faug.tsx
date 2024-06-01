"use client";
import { useEffect, useRef } from "react";
import runFaust from "@/dsp/faust";
import Knob from "../circleKnob/Knob";
import Keyboard from "../keyboard/Keyboard";
import Toggle from "../toggle";
import styles from "./faug.module.css";
import useFaust from "@/dsp/faust-ui/use-faust";

const Faug = () => {
  const faustNodeRef = useRef<AudioWorkletNode>();
  useEffect(() => {
    const runEffect = async () => {
      const faustNode = await runFaust();
      faustNodeRef.current = faustNode;
    };

    runEffect();
  }, []);

  const { register, paramChangeByDSP } = useFaust();
  let gainParam: any;
  if (faustNodeRef.current) {
    console.log("faust node params");
    console.log(faustNodeRef.current.parameters);
    gainParam = faustNodeRef.current.parameters.get("/faug/gain");
  }
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

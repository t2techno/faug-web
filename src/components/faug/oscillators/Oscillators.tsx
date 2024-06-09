import styles from "./oscillators.module.css";
import Knob from "@/components/circleKnob/Knob";
import ActualKnob from "@/components/knob/Knob";
import inputList from "@/dsp/inputList";

interface iOscProps {
  changeParam: (param: string, value: number) => void;
  paramState: Record<string, number>;
  className?: string;
}

const Oscillators: React.FC<iOscProps> = ({
  paramState,
  changeParam,
  className,
}) => {
  return (
    <div id={styles.osc} className={className}>
      <div className={styles.oscRow}>
        <ActualKnob
          className="flex-one"
          value={paramState[inputList.OSC_RANGE_ONE]}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_ONE_RANGE, value);
          }}
          controlDirection={"vertical"}
        />
        <div className="flex-one" />
        <ActualKnob
          className="flex-one"
          value={paramState[inputList.OSC_WAVE_ONE]}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_WAVE_ONE, value);
          }}
          controlDirection={"vertical"}
        />
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
  );
};

export default Oscillators;

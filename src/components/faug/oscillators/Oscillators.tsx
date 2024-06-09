import styles from "./oscillators.module.css";
import Knob from "@/components/circleKnob/Knob";
import ActualKnob from "@/components/knob/Knob";
import { iParamDesc } from "@/dsp/faust.utilities";
import inputList from "@/dsp/inputList";

interface iOscProps {
  changeParam: (param: string, value: number) => void;
  paramState: Record<string, number>;
  paramDesc: Record<string, iParamDesc>;
  className?: string;
}

const Oscillators: React.FC<iOscProps> = ({
  paramState,
  paramDesc,
  changeParam,
  className,
}) => {
  return (
    <div id={styles.osc} className={className}>
      <div className={styles.oscRow}>
        <ActualKnob
          className="flex-one"
          value={paramState[inputList.OSC_RANGE_ONE] ?? 0.0}
          max={paramDesc[inputList.OSC_RANGE_ONE]?.max}
          min={paramDesc[inputList.OSC_RANGE_ONE]?.min}
          step={paramDesc[inputList.OSC_RANGE_ONE]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_RANGE_ONE, value);
          }}
          controlDirection={"vertical"}
        />
        <div className="flex-one" />
        <ActualKnob
          className="flex-one"
          value={paramState[inputList.OSC_WAVE_ONE] ?? 0.0}
          max={paramDesc[inputList.OSC_WAVE_ONE]?.max}
          min={paramDesc[inputList.OSC_WAVE_ONE]?.min}
          step={paramDesc[inputList.OSC_WAVE_ONE]?.step}
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

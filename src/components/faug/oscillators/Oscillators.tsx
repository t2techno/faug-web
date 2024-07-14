import styles from "./oscillators.module.css";
import Knob from "@/components/knob/Knob";
import inputList from "@/dsp/inputList";
import { iSectionProps } from "../Faug";

const Oscillators: React.FC<iSectionProps> = ({
  paramState,
  paramDesc,
  changeParam,
  className,
}) => {
  return (
    <div className={className}>
      <div className={styles.oscRow}>
        <Knob
          className="flex-one"
          label="Range"
          value={paramState[inputList.OSC_RANGE_ONE] ?? 0.0}
          max={paramDesc[inputList.OSC_RANGE_ONE]?.max}
          min={paramDesc[inputList.OSC_RANGE_ONE]?.min}
          step={paramDesc[inputList.OSC_RANGE_ONE]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_RANGE_ONE, value);
          }}
        />
        <div className={`${styles.empty} flex-one`}>
          <h4>Osc.One</h4>
          <h4>Frequency</h4>
        </div>
        <Knob
          label="Wave"
          className="flex-one"
          value={paramState[inputList.OSC_WAVE_ONE] ?? 0.0}
          max={paramDesc[inputList.OSC_WAVE_ONE]?.max}
          min={paramDesc[inputList.OSC_WAVE_ONE]?.min}
          step={paramDesc[inputList.OSC_WAVE_ONE]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_WAVE_ONE, value);
          }}
        />
      </div>
      <div className={styles.oscRow}>
        <Knob
          className="flex-one"
          value={paramState[inputList.OSC_RANGE_TWO] ?? 0.0}
          max={paramDesc[inputList.OSC_RANGE_TWO]?.max}
          min={paramDesc[inputList.OSC_RANGE_TWO]?.min}
          step={paramDesc[inputList.OSC_RANGE_TWO]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_RANGE_TWO, value);
          }}
        />
        <Knob
          className="flex-one"
          label="Osc.Two"
          centerZero={true}
          value={paramState[inputList.OSC_DETUNE_TWO] ?? 0.0}
          max={paramDesc[inputList.OSC_DETUNE_TWO]?.max}
          min={paramDesc[inputList.OSC_DETUNE_TWO]?.min}
          step={paramDesc[inputList.OSC_DETUNE_TWO]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_DETUNE_TWO, value);
          }}
        />
        <Knob
          className="flex-one"
          value={paramState[inputList.OSC_WAVE_TWO] ?? 0.0}
          max={paramDesc[inputList.OSC_WAVE_TWO]?.max}
          min={paramDesc[inputList.OSC_WAVE_TWO]?.min}
          step={paramDesc[inputList.OSC_WAVE_TWO]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_WAVE_TWO, value);
          }}
        />
      </div>
      <div className={styles.oscRow}>
        <Knob
          className="flex-one"
          value={paramState[inputList.OSC_RANGE_THREE] ?? 0.0}
          max={paramDesc[inputList.OSC_RANGE_THREE]?.max}
          min={paramDesc[inputList.OSC_RANGE_THREE]?.min}
          step={paramDesc[inputList.OSC_RANGE_THREE]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_RANGE_THREE, value);
          }}
        />
        <Knob
          className="flex-one"
          label="Osc.Three"
          centerZero={true}
          value={paramState[inputList.OSC_DETUNE_THREE] ?? 0.0}
          max={paramDesc[inputList.OSC_DETUNE_THREE]?.max}
          min={paramDesc[inputList.OSC_DETUNE_THREE]?.min}
          step={paramDesc[inputList.OSC_DETUNE_THREE]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_DETUNE_THREE, value);
          }}
        />
        <Knob
          className="flex-one"
          value={paramState[inputList.OSC_WAVE_THREE] ?? 0.0}
          max={paramDesc[inputList.OSC_WAVE_THREE]?.max}
          min={paramDesc[inputList.OSC_WAVE_THREE]?.min}
          step={paramDesc[inputList.OSC_WAVE_THREE]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_DETUNE_THREE, value);
          }}
        />
      </div>
    </div>
  );
};

export default Oscillators;

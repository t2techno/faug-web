import styles from "./mixer.module.css";
import inputList from "@/dsp/inputList";
import Knob from "@/components/knob/Knob";
import { BlueToggle } from "@/components/toggle";
import { iSectionProps } from "../Faug";

type MixerProps = iSectionProps & { toggleParam: (param: string) => void };

const Mixer: React.FC<MixerProps> = ({
  className,
  paramState,
  paramDesc,
  changeParam,
  toggleParam,
}) => {
  return (
    <div className={className}>
      <div className={styles.mixRow}>
        <Knob
          className="flex-one"
          label="Volume"
          value={paramState[inputList.OSC_ONE_GAIN] ?? 0.0}
          max={paramDesc[inputList.OSC_ONE_GAIN]?.max}
          min={paramDesc[inputList.OSC_ONE_GAIN]?.min}
          step={paramDesc[inputList.OSC_ONE_GAIN]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_ONE_GAIN, value);
          }}
        />
        <BlueToggle
          toggle={() => {
            toggleParam(inputList.OSC_ONE_ON);
          }}
          className="flex-one"
          value={paramState[inputList.OSC_ONE_ON]}
          alt="Oscillator One On/Off Toggle"
        />
        <div style={{ flex: 1 }} />
      </div>
      <div className={styles.mixRow}>
        <div style={{ flex: 1 }} />
        <BlueToggle
          toggle={() => {
            toggleParam(inputList.FEEDBACK_ON);
          }}
          className="flex-one"
          value={paramState[inputList.FEEDBACK_ON]}
          alt="Feedback On/Off Toggle"
        />
        <Knob
          className="flex-one"
          label="Feedback"
          value={paramState[inputList.FEEDBACK_GAIN] ?? 0.0}
          max={paramDesc[inputList.FEEDBACK_GAIN]?.max}
          min={paramDesc[inputList.FEEDBACK_GAIN]?.min}
          step={paramDesc[inputList.FEEDBACK_GAIN]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.FEEDBACK_GAIN, value);
          }}
        />
      </div>
      <div className={styles.mixRow}>
        <Knob
          className="flex-one"
          label="Volume"
          value={paramState[inputList.OSC_TWO_GAIN] ?? 0.0}
          max={paramDesc[inputList.OSC_TWO_GAIN]?.max}
          min={paramDesc[inputList.OSC_TWO_GAIN]?.min}
          step={paramDesc[inputList.OSC_TWO_GAIN]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_TWO_GAIN, value);
          }}
        />
        <BlueToggle
          className="flex-one"
          toggle={() => {
            toggleParam(inputList.OSC_TWO_ON);
          }}
          value={paramState[inputList.OSC_TWO_ON]}
          alt="Oscillator Two On/Off Toggle"
        />
        <div style={{ flex: 1 }} />
      </div>
      <div className={styles.mixRow}>
        <div style={{ flex: 1 }} />
        <BlueToggle
          className="flex-one"
          toggle={() => {
            toggleParam(inputList.NOISE_ON);
          }}
          value={paramState[inputList.NOISE_ON]}
          alt="Noise On/Off Toggle"
        />
        <Knob
          className="flex-one"
          label="Noise"
          value={paramState[inputList.NOISE_GAIN] ?? 0.0}
          max={paramDesc[inputList.NOISE_GAIN]?.max}
          min={paramDesc[inputList.NOISE_GAIN]?.min}
          step={paramDesc[inputList.NOISE_GAIN]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.NOISE_GAIN, value);
          }}
        />
      </div>
      <div className={styles.mixRow}>
        <Knob
          className="flex-one"
          label="Volume"
          value={paramState[inputList.OSC_THREE_GAIN] ?? 0.0}
          max={paramDesc[inputList.OSC_THREE_GAIN]?.max}
          min={paramDesc[inputList.OSC_THREE_GAIN]?.min}
          step={paramDesc[inputList.OSC_THREE_GAIN]?.step}
          handleChange={(value: number) => {
            changeParam(inputList.OSC_THREE_GAIN, value);
          }}
        />
        <BlueToggle
          toggle={() => {
            toggleParam(inputList.OSC_THREE_ON);
          }}
          className="flex-one"
          value={paramState[inputList.OSC_THREE_ON]}
          alt="Oscillator Three On/Off Toggle"
        />
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
};

export default Mixer;

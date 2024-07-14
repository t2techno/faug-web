import styles from "./filter.module.css";
import { iSectionProps } from "../Faug";
import Knob from "@/components/knob/Knob";
import inputList from "@/dsp/inputList";

interface iFilterKnob {
  label: string;
  inputParam: string;
}

const ParamRows: Array<Array<iFilterKnob>> = [
  [
    { label: "Cutoff Freq", inputParam: inputList.CUTOFF },
    { label: "Emphasis", inputParam: inputList.FILTER_EMPHASIS },
    { label: "Contour Amt", inputParam: inputList.CONTOUR_AMT },
  ],
  [
    { label: "Attack", inputParam: inputList.FILTER_ATTACK },
    { label: "Decay", inputParam: inputList.FILTER_DECAY },
    { label: "Sustain", inputParam: inputList.FILTER_SUSTAIN },
  ],
  [
    { label: "Attack", inputParam: inputList.ATTACK },
    { label: "Decay", inputParam: inputList.DECAY },
    { label: "Sustain", inputParam: inputList.SUSTAIN },
  ],
];

const Filter: React.FC<iSectionProps> = ({
  className,
  paramState,
  paramDesc,
  changeParam,
}) => {
  return (
    <div className={className}>
      {ParamRows.map((row, row_idx) => (
        <div key={`filter_row_${row_idx}`} className={styles.envRow}>
          {row.map((knob, knob_idx) => (
            <Knob
              key={`filter_row_${row_idx}_knob_${knob_idx}`}
              className="flex-one"
              label={knob.label}
              value={paramState[knob.inputParam] ?? 0.0}
              max={paramDesc[knob.inputParam]?.max}
              min={paramDesc[knob.inputParam]?.min}
              step={paramDesc[knob.inputParam]?.step}
              handleChange={(value: number) => {
                changeParam(knob.inputParam, value);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filter;

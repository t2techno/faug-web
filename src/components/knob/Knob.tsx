import styles from "./knob.module.css";
import KnobUi from "./KnobUi";
import * as Slider from "@radix-ui/react-slider";

export interface iOptionalKnobProps {
  controlDirection?: "horizontal" | "vertical";
  centerZero?: boolean;
  label?: string;
  valueColor?: string;
  className?: string;
}

export type KnobProps = iOptionalKnobProps & {
  value: number;
  max: number;
  min: number;
  step: number;
  handleChange: (value: number) => void;
};

const Knob: React.FC<KnobProps> = ({
  value,
  max,
  min,
  step,
  handleChange,
  className,
  label = "",
  centerZero = false,
  controlDirection = "vertical",
  valueColor = "var(--primary-light)",
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <h4 className={styles.label}>{label}</h4>
      <Slider.Root
        className={styles.knobSlider}
        orientation={controlDirection}
        value={[value]}
        max={max ?? 1.0}
        min={min ?? 0.0}
        step={step}
        onValueChange={(value: number[]) => {
          handleChange(value[0]);
        }}
      >
        <KnobUi
          centerZero={centerZero}
          value={value / max}
          valueColor={valueColor}
        />
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb aria-label="Volume" />
      </Slider.Root>
    </div>
  );
};

export default Knob;

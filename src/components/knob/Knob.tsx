import { CSSProperties } from "react";
import KnobUi from "./KnobUi";
import * as Slider from "@radix-ui/react-slider";

interface KnobProps {
  value: number;
  max: number;
  min: number;
  step: number;
  handleChange: (value: number) => void;
  controlDirection: "horizontal" | "vertical";
  valueColor?: string;
  className?: string;
}

const WrapperStyles: CSSProperties = {
  color: "black",
  width: "100%",
  height: "100%",
  minWidth: "75px",
  minHeight: "75px",
};

const Knob: React.FC<KnobProps> = ({
  value,
  max,
  min,
  step,
  handleChange,
  controlDirection,
  className,
  valueColor = "var(--primary-light)",
}) => {
  return (
    <div style={WrapperStyles} className={className}>
      <Slider.Root
        orientation={controlDirection}
        value={[value]}
        max={max ?? 1.0}
        min={min ?? 0.0}
        step={step}
        onValueChange={(value: number[]) => {
          handleChange(value[0]);
        }}
      >
        <KnobUi value={value} valueColor={valueColor} />
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb aria-label="Volume" />
      </Slider.Root>
    </div>
  );
};
export default Knob;

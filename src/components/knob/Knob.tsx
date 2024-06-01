import { CSSProperties } from "react";
import KnobUi from "./KnobUi";
import * as Slider from "@radix-ui/react-slider";

interface KnobProps {
  value: number;
  handleChange: (value: number) => void;
  controlDirection: "horizontal" | "vertical";
  valueColor?: string;
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
  handleChange,
  controlDirection,
  valueColor = "var(--primary-light)",
}) => {
  return (
    <div style={WrapperStyles}>
      <Slider.Root
        orientation={controlDirection}
        value={[value * 100]}
        max={100}
        step={1}
        onValueChange={(value: number[]) => {
          handleChange(value[0] / 100);
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

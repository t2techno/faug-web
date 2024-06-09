import { useEffect, useState } from "react";

import { volumeArc, getAngle, getOriginAngle, Point } from "../knob.utilities";
import KnobUi from "../KnobUi";
import styled from "styled-components";
import * as Slider from "@radix-ui/react-slider";

import { useMousePosition } from "./useMousePosition";

interface KnobProps {
  value: number;
  handleChange: (value: number) => void;
  controlDirection: "horizontal" | "vertical";
}

const AngleKnob: React.FC<KnobProps> = ({
  value,
  handleChange,
  controlDirection,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [clickStart, setClickStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [angle, setAngle] = useState(0);
  const mousePosition = useMousePosition();

  const pointerDown = () => {
    setIsActive(true);
    setClickStart({ x: mousePosition.x, y: mousePosition.y });
  };

  const pointerUp = (e: PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(false);
    setClickStart({ x: 0, y: 0 });
  };

  // if(isActive){
  //   window.addEventListener("pointerup", pointerUp);
  // } else {
  //   window.removeEventListener("pointerup", pointerUp)
  // }

  useEffect(() => {
    if (isActive) {
      const newPosition = {
        x: mousePosition.x - clickStart.x,
        y: clickStart.y - mousePosition.y,
      };
      const newAngle = getOriginAngle(newPosition);
      setAngle(newAngle);
      handleChange(newAngle / (2 * Math.PI));
    }
  }, [mousePosition, isActive]);

  return (
    <Wrapper>
      <Root
        orientation={controlDirection}
        value={[value * 100]}
        max={100}
        step={1}
        onValueChange={(value: number[]) => {
          handleChange(value[0] / 100);
        }}
      >
        <KnobUi value={value} valueColor={"green"} />
        <Track>
          <Range />
        </Track>
        <Thumb aria-label="Volume" />
      </Root>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: black;
`;

const Root = styled(Slider.Root)``;

const Track = styled(Slider.Track)``;

const Range = styled(Slider.Range)``;

const Thumb = styled(Slider.Thumb)`
  /* display: block;
  height: 5px;
  width: 5px; */
`;

const Handle = styled.circle``;

const SvgPath = styled.path`
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const VolumeArc = styled(SvgPath)`
  stroke-linejoin: var(--line-style);
  stroke-linecap: var(--line-style);
`;

const VolumeTrack = styled(SvgPath)``;

export default AngleKnob;

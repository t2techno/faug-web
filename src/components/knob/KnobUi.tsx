import { volumeArc } from "./knobMethods";
import styled from "styled-components";

const KnobUi: React.FC<{value: number, valueColor: string}> = ({value, valueColor}) => {

    return(
      <Wrapper draggable="false">
        <SvgWrapper viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
          <Background cx="75" cy="75" r="50" stroke="white"/>
          <Handle cx="50" cy="100" r="5" fill="white" transform={`rotate(${value*270}, 75,75)`}/>
          <VolumeTrack fill="transparent" stroke="black" strokeWidth="6px" d={volumeArc(75, 72, 1)}/>
          <VolumeArc fill="transparent" stroke={valueColor} strokeWidth="3px" d={volumeArc(75, 72, value)} 
            style={{["--line-style" as any]: (value == 0) ? "revert" : "round"}}/>
        </SvgWrapper>
      </Wrapper>
    );
} 

const Wrapper = styled.div`

`;
const SvgWrapper = styled.svg``;

const Background = styled.circle`

`;

const Handle = styled.circle``;

const SvgPath = styled.path`
  stroke-linejoin:round;
  stroke-linecap:round;
`;

const VolumeArc = styled(SvgPath)`
  stroke-linejoin:var(--line-style);
  stroke-linecap:var(--line-style);
`;

const VolumeTrack = styled(SvgPath)``;

export default KnobUi;
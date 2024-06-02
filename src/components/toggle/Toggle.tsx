import { CSSProperties } from "react";
import styles from "./toggle.module.css";
import Image from "next/image";

type ToggleType = "blue" | "brown" | "orange" | "white";

interface iToggleProps {
  style: CSSProperties;
  className?: string;
  type: ToggleType;
  alt: string;
  isOn: boolean;
  toggle: () => void;
}
const Toggle: React.FC<iToggleProps> = ({ type, style, alt, isOn, toggle }) => {
  return (
    <div className={styles.imageWrapper} style={style}>
      <Image
        onClick={() => toggle()}
        draggable={false}
        src={`/toggles/${type}Toggle.png`}
        alt={alt}
        width={600}
        height={275}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          rotate: isOn ? "180deg" : " 0deg",
        }}
      />
    </div>
  );
};

interface iTypedToggleProps {
  style: CSSProperties;
  alt: string;
  isOn: boolean;
  toggle: () => void;
}

export const BlueToggle: React.FC<iTypedToggleProps> = (props) => {
  return <Toggle type="blue" {...props} />;
};

export const BrownToggle: React.FC<iTypedToggleProps> = (props) => {
  return <Toggle type="brown" {...props} />;
};

export const OrangeToggle: React.FC<iTypedToggleProps> = (props) => {
  return <Toggle type="orange" {...props} />;
};

export const WhiteToggle: React.FC<iTypedToggleProps> = (props) => {
  return <Toggle type="white" {...props} />;
};

export default Toggle;

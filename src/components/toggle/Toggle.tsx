import { CSSProperties, forwardRef } from "react";
import styles from "./toggle.module.css";
import Image from "next/image";

type ToggleType = "blue" | "brown" | "orange" | "white";

interface iToggleProps {
  style: CSSProperties;
  type: ToggleType;
  alt: string;
  value: number;
  toggle: () => void;
}
const Toggle: React.FC<iToggleProps> = ({
  type,
  style,
  alt,
  value,
  toggle,
}) => {
  const isOn = value === 1 ? true : false;
  console.log("isOn: " + isOn);
  return (
    <div className={styles.imageWrapper} style={style}>
      <Image
        onClick={(e) => {
          console.log("click in toggle");
          e.preventDefault();
          toggle();
        }}
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
  value: number;
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

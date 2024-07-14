import styles from "./toggle.module.css";
import Image from "next/image";

type ToggleType = "blue" | "brown" | "orange" | "white";

type ToggleProps = iTypedToggleProps & {
  type: ToggleType;
};

const Toggle: React.FC<ToggleProps> = ({
  type,
  className: classNameIn,
  alt,
  value,
  toggle,
  invert = false,
  orientation = "horizontal",
}) => {
  let isOn;
  if (invert) {
    isOn = value === 1 ? false : true;
  } else {
    isOn = value === 1 ? true : false;
  }
  return (
    <div
      className={`${styles.imageWrapper} ${
        orientation === "vertical" ? styles.vertical : styles.horizontal
      } ${classNameIn}`}
    >
      <div
        style={{ opacity: isOn ? 1.0 : 0.0 }}
        className={`${styles[type]} ${styles.glow}`}
      />
      <Image
        onClick={(e) => {
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
  alt: string;
  value: number;
  toggle: () => void;
  className?: string;
  invert?: boolean;
  orientation?: "vertical" | "horizontal";
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

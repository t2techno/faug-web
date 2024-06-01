import { CSSProperties } from "react";

const BaseCircle = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" />
  </svg>
);

const Knob: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  if (!style) {
    return <BaseCircle />;
  }

  return (
    <div style={style}>
      <BaseCircle />
    </div>
  );
};

export default Knob;

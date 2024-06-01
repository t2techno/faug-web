import { CSSProperties } from "react";

const BaseRect = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="50" x="10" y="25" rx="20" ry="20" fill="blue" />
  </svg>
);
const Toggle: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  if (!style) {
    return <BaseRect />;
  }

  return (
    <div style={style}>
      <BaseRect />
    </div>
  );
};

export default Toggle;

import * as React from "react";

function SvgPlayDisabled(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M16.45 13.62L19 12 8 5v.17zM2.81 2.81L1.39 4.22 8 10.83V19l4.99-3.18 6.79 6.79 1.41-1.42z" />
    </svg>
  );
}

export default SvgPlayDisabled;

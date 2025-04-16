import * as React from "react";
const SvgDiscount = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12.79 21 3 11.21v2.83l9.79 9.79 9.04-9.04-1.42-1.41z"
      fill="currentColor"
    />
    <path
      d="m3 9.04 9.79 9.79 9.04-9.04L12.04 0H3v9.04zM7.25 3a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"
      fill="currentColor"
    />
  </svg>
);
export default SvgDiscount;

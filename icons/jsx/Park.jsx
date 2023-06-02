import * as React from "react";
function SvgPark(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21z"
        fill="currentColor"
      />
    </svg>
  );
}
export default SvgPark;

import * as React from "react";

function SvgDragHandle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      {...props}
    >
      <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
    </svg>
  );
}

export default SvgDragHandle;

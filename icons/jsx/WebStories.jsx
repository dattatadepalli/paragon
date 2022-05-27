import * as React from "react";

function SvgWebStories(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M17 4h2v16h-2V4zM2 2v20h13V2H2zm19 16h1.5V6H21v12z" />
    </svg>
  );
}

export default SvgWebStories;

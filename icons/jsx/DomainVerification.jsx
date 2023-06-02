import * as React from "react";
function SvgDomainVerification(props) {
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
        d="M16.6 10.88l-1.42-1.42-4.24 4.25-2.12-2.13L7.4 13l3.54 3.54z"
        fill="currentColor"
      />
      <path d="M3 4v16h18V4H3zm16 14H5V8h14v10z" fill="currentColor" />
    </svg>
  );
}
export default SvgDomainVerification;

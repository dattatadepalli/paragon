import * as React from "react";

function SvgAddBusiness(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M15 17h2v-3h1v-2l-1-5H2l-1 5v2h1v6h9v-6h4v3zm-6 1H4v-4h5v4zM2 4h15v2H2z" />
      <path d="M20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2z" />
    </svg>
  );
}

export default SvgAddBusiness;

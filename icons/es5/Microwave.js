function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from "react";

function SvgMicrowave(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6.8 10.61L5.37 9.19C5.73 8.79 6.59 8 7.75 8c.8 0 1.39.39 1.81.67.31.21.51.33.69.33.37 0 .8-.41.95-.61l1.42 1.42c-.36.4-1.22 1.19-2.37 1.19-.79 0-1.37-.38-1.79-.66-.33-.22-.52-.34-.71-.34-.37 0-.8.41-.95.61zM7.75 15c.19 0 .38.12.71.34.42.28 1 .66 1.79.66 1.16 0 2.01-.79 2.37-1.19l-1.42-1.42c-.15.2-.59.61-.95.61-.18 0-.38-.12-.69-.33-.42-.28-1.01-.67-1.81-.67-1.16 0-2.02.79-2.38 1.19l1.42 1.42c.16-.2.59-.61.96-.61zM22 4v16H2V4h20zm-8 2H4v12h10V6zm5 10c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zm0-4c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zm0-5h-2v2h2V7z"
  }));
}

export default SvgMicrowave;
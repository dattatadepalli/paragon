function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from "react";

function SvgSick(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M21 9c-1.1 0-2-.9-2-2s2-4 2-4 2 2.9 2 4-.9 2-2 2zm-3.5-2c0-.73.41-1.71.92-2.66A9.965 9.965 0 0011.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12c0-.55-.06-1.09-.14-1.62a3.5 3.5 0 01-.86.12c-1.93 0-3.5-1.57-3.5-3.5zm-1.88.38l1.06 1.06-1.06 1.06 1.06 1.06-1.06 1.06L13.5 9.5l2.12-2.12zm-8.3 1.06l1.06-1.06L10.5 9.5l-2.12 2.12-1.06-1.06L8.38 9.5 7.32 8.44zM15.44 17c-.69-1.19-1.97-2-3.44-2s-2.75.81-3.44 2H6.88c.3-.76.76-1.43 1.34-1.99L5.24 13.3c-.45.26-1.01.28-1.49 0a1.501 1.501 0 011.5-2.6c.48.28.74.78.74 1.29l3.58 2.07c.73-.36 1.55-.56 2.43-.56 2.33 0 4.32 1.45 5.12 3.5h-1.68z"
  }));
}

export default SvgSick;
import React from "react";
import StyleContext from "isomorphic-style-loader/StyleContext";

import ReactDOM from "react-dom";

import App from "./app";

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

ReactDOM.hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <App />
  </StyleContext.Provider>,
  document.getElementById("root")
);

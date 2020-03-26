import React from "react";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { Provider } from "react-redux";
import configureStore from "./reducer/configureStore";

import ReactDOM from "react-dom";

import App from "./app";

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};
const state = window.__STATE__;
delete window.__STATE__;
const store = configureStore(state);

ReactDOM.hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <Provider store={store}>
      <App />
    </Provider>
  </StyleContext.Provider>,
  document.getElementById("root")
);

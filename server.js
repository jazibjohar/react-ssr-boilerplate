import "core-js/stable";
import "regenerator-runtime/runtime";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import bodyParser from "body-parser";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { Provider } from "react-redux";
import configureStore from "./src/reducer/configureStore";
const app = express();
app.use(bodyParser.json());
app.use(express.static("build/public"));

const PORT = process.env.PORT || 3010;

import App from "./src/app";

const reducers = () => {};

app.get("*", (req, res) => {
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) =>
    styles.forEach(style => css.add(style._getCss()));
  const store = configureStore(reducers);

  const content = ReactDOMServer.renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <App />
      </Provider>
    </StyleContext.Provider>
  );
  const preloadedState = store.getState();
  const html = `
  <html>
  <head>
  <script>
     window.__STATE__ = ${JSON.stringify(preloadedState)}
  </script>
  <style>${[...css].join("")}</style>
  </head>
  <body>
  <div id="root">
    ${content}
  </div>
  <script src="client_bundle.js"></script>
  </body>
  </html>
  `;
  res.send(html);
});
app.listen(PORT, () => {
  console.log("App Started");
});

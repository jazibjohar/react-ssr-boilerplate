// import "babel-polyfill";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import bodyParser from "body-parser";
import StyleContext from "isomorphic-style-loader/StyleContext";

const app = express();
app.use(bodyParser.json());
app.use(express.static("build/public"));

const PORT = process.env.PORT || 3010;

import App from "./src/app";

app.get("*", (req, res) => {
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) =>
    styles.forEach(style => css.add(style._getCss()));

  const content = ReactDOMServer.renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  );
  const html = `
  <html>
  <head>
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

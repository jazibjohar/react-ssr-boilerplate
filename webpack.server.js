const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const autoprefixer = require("autoprefixer");

module.exports = {
  target: "node",
  entry: "./server.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/build"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
        options: {
          presets: [
            "@babel/preset-react",
            [
              "@babel/env",
              {
                targets: { browsers: ["last 2 versions"] }
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: "postcss",
              plugins: () => [
                require("postcss-import"),
                require("postcss-flexbugs-fixes"),
                require("postcss-custom-media"),
                require("postcss-mixins"),
                require("postcss-nested"),
                require("postcss-simple-vars"),
                require("postcss-sass-color-functions"),
                require("postcss-calc"),
                autoprefixer({
                  flexbox: "no-2009"
                })
              ]
            }
          }
        ]
      }
    ]
  },
  externals: [webpackNodeExternals()]
};

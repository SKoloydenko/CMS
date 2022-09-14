const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./server.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  mode: "production",
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};

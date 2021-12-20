const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
module.exports = {
  entry: "./dist/index.js",
  target: "node",
  mode: "production",
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
    alias: {
      graphql$: path.resolve(__dirname, "../../node_modules/graphql/index.js"),
    },
  },
  plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "index.js",
  },
};

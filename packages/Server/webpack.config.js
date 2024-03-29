const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const Terser = require("terser-webpack-plugin");

console.log(path.resolve(__dirname, "./node_modules/graphql/index.js"))
module.exports = {
  entry: "./dist/index.js",
  target: "node",
  mode: "production",
  externalsPresets: { node: true },
  externals: [],
  optimization: {
    minimize: true,
    minimizer: [new Terser({ terserOptions: { keep_classnames: true } })],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
     alias: {
       graphql$: path.resolve(__dirname, "./node_modules/graphql/index.js"),
     },
  },
  plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "index.js",
  },
};

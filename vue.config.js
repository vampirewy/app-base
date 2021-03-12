const webpack = require("webpack");
const APP_NAME = require("./package.json").name;
const PORT = require("./package.json").devPort;

const PROXY = {
  "^/module-html": {
    target: "http://localhost:9001/"
  },
  "^/module-css": {
    target: "http://localhost:9002/"
  }
};

module.exports = {
  outputDir: APP_NAME,
  publicPath: "/",

  productionSourceMap: false,

  configureWebpack: {
    externals: {
      vue: "Vue"
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env.VUE_APP_NAME": JSON.stringify(APP_NAME)
      })
    ]
  },

  devServer: {
    port: PORT,
    proxy: PROXY
  }
};

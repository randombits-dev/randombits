const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DefinePlugin = require('webpack/lib/DefinePlugin');

require('dotenv').config({path: '.env.local'});
const prodConfig = require('./webpack.config');
const deps = require("./package.json").dependencies;
const remoteVars = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.indexOf('RANDOMBITS_REMOTE') === 0));

module.exports = {
  ...prodConfig,
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3000/'
  },
  optimization: {
    minimize: false
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      shared: {
        ...deps,
        'preact': {
          singleton: true,
          requiredVersion: deps.preact
        },
        'preact/hooks': {
          singleton: true,
          requiredVersion: deps.preact
        }
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Random Bits',
      template: "./src/index.html"
    }),
    new DefinePlugin({
      'RANDOMBITS_CONFIG': JSON.stringify(remoteVars)
    })
  ]
};

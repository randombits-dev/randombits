const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DefinePlugin = require('webpack/lib/DefinePlugin');

require('dotenv').config();
const deps = require("./package.json").dependencies;
const remoteVars = Object.fromEntries(
  Object.entries(process.env).filter(([key, value]) => key.indexOf('RANDOMBITS_REMOTE') === 0));

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      'src'
    ],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: "preact/compat",
      'react-dom': "preact/compat"
    }
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
    }),
  ]
};

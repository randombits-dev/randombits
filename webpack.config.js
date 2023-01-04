const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DefinePlugin = require('webpack/lib/DefinePlugin');

require('dotenv').config();
const deps = require("./package.json").dependencies;
const remoteVars = Object.fromEntries(
  Object.entries(process.env).filter(([key, value]) => key.indexOf('RANDOMBITS_REMOTE') === 0));

module.exports = {
  output: {
    publicPath: 'http://localhost:8080/'
  },
  optimization: {
    minimize: false
  },
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
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {},
      shared: {
        ...deps,
        'preact': {
          singleton: true
        },
        'preact/hooks': {
          singleton: true
        }
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: "./public/index.html"
    }),
    new DefinePlugin({
      'RANDOMBITS_CONFIG': JSON.stringify(remoteVars)
    }),
  ],
};

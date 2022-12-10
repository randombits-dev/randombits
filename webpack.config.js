const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },
  optimization: {
    minimize: false
  },
  // entry: {
  //   app: './src/index.tsx'
  // },
  // target: 'web',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: '[name].js'
  // },
  // optimization: {
  //   minimize: true,
  //   splitChunks: {
  //     // always create vendor.js
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'initial',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ]
    // rules: [
    //   {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    //   },
    // ],
    // rules: [
    //   {
    //     test: /\.(tsx|js)$/,
    //     include: path.resolve(__dirname, 'src'),
    //     exclude: /node_modules/,
    //     use: [{
    //       loader: 'babel-loader',
    //       options: {
    //         presets: [
    //           ['@babel/preset-env', {
    //             "targets": "defaults"
    //           }],
    //           '@babel/preset-react'
    //         ]
    //       }
    //     }]
    //   }
    // ]
  },
  resolve: {
    modules: [
      'node_modules',
      'src'
    ],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime"
    },
  },
  devServer: {
    port: 8080,
    hot: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        blog: 'blog@http://localhost:8081/remoteEntry.js'
      },
      exposes: {},
      shared: {
        ...deps,
        preact: {
          singleton: true,
          requiredVersion: deps.preact
        }
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
};

require('dotenv').config();
const path = require('path');
const { DefinePlugin } = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  target: 'webworker',
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  resolve: {
    fallback: {
      fs: false,
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new DefinePlugin({
      BOT_TOKEN: JSON.stringify(process.env.BOT_TOKEN || ''),
      SECRET_PATH: JSON.stringify(process.env.SECRET_PATH || ''),
    }),
  ],
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
};

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',               // important for Node.js
  entry: './src/server.ts',
  mode: process.env.NODE_ENV || 'development',          // switch to 'production' for prod build
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // resolve these extensions
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
};
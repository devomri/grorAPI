const path = require('path');
const fs = require('fs');
const CleanPlugin = require('clean-webpack-plugin');

var nodeModules = fs.readdirSync('node_modules').filter((x) => ['.bin'].indexOf(x) === -1)
  .reduce(function(nodeModules, mod) {
    nodeModules[mod] = 'commonjs ' + mod;
    return nodeModules;
  }, {});

module.exports = {
  entry: './src',
  target: 'node',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel?presets[]=es2015',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanPlugin(['dist'])
  ],
  externals: nodeModules
};

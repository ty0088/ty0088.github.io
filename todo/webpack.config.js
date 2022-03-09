const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    listLogic: './src/listLogic.js',
    domLogic: './src/domLogic.js',
    filterLogic: './src/filterLogic.js'
  },
  devtool: 'inline-source-map',
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Output Management',
  //     title: 'Development',
  //   }),
  // ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
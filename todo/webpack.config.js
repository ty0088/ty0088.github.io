const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    listLogic: './src/listLogic.js',
    controllerLogic: './src/controllerLogic.js',
    filterLogic: './src/filterLogic.js',
    contentLogic: './src/contentLogic.js',
    listenerLogic: './src/listenerLogic.js'
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
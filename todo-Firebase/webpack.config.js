const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    listLogic: './src/listLogic.js',
    controllerLogic: './src/controllerLogic.js',
    filterLogic: './src/filterLogic.js',
    contentLogic: './src/contentLogic.js',
    listenerLogic: './src/listenerLogic.js',
    fireBaseLogic:'./src/fireBaseLogic.js'
  },
  devtool: false,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};
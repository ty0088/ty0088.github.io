const { Hmac } = require('crypto');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js',
        ship: './src/ship.js',
        player: './src/player.js',
        gameBoard: './src/gameBoard.js',
        DOM: './src/DOM.js'
    },
    devtool: 'inline-source-map',
    output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    },
};
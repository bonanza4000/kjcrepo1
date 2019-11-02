const path = require('path');

module.exports = {
  entry: './js/main.js',
  entry: './js/example-work.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'kjcwebsite_webpack_bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    }]
  }
}

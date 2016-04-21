var path = require('path');

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
};
var config = {
  entry: {
    app: [PATHS.app + "/main.js"]
  },
  output: {
    path: PATHS.build + "/js" ,
    filename: "bundle.js",
  },

  devServer: {
    inline: true,
    port: 2092
  },

  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        exclude: /node_modules/,
        loader: ["babel-loader"],
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}

module.exports = config;

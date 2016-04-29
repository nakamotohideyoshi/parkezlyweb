var path = require('path');

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
};
var config = {
  entry: {
    app: [PATHS.app + "/js/main.js"]
  },
  output: {
    path: PATHS.app + "/assets/" ,
    filename: "bundle.js",
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: PATHS.app,
    port: 2092
  },

  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        loader: ["babel-loader"],
        include: PATHS.app,
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.app
      }, {
        test: /\.woff(2)?$/,
        loader: "url-loader?name=/fonts/['name'].[ext]&limit=10000&minetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg|png|gif)$/,
        loader: "file-loader?name=/images/[sha512:hash:base64:10].[ext]"
      }
    ]
  }
}

module.exports = config;

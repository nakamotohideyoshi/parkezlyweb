var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
};
var config = {
  entry: {
    app: [PATHS.app + "/main.js"]
  },
  output: {
    path: PATHS.build + "/assets" ,
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
        loader: ["babel-loader"],
        include: PATHS.app,
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        include: PATHS.app
      }, {
        test: /\.woff(2)?$/,
        loader: "url-loader?name=/fonts/['name'].[ext]&limit=10000&minetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg|png|gif)$/,
        loader: "file-loader?name=/images/[sha512:hash:base64:10].[ext]"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css")
  ]
}

module.exports = config;

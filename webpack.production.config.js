'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'app/js/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
       {
      test: /\.js(x|)?$/,
        loader: ["babel-loader"],
        include: path.resolve(__dirname, 'app/'),
        query: {
          presets: ['es2015', 'react']
        }
      },{
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: path.resolve(__dirname, 'app/')
      },{
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.resolve(__dirname, 'app/')
      },{
        test: /\.json?$/,
        loader: 'json'
      },{ test: /\.(jpe?g|png|gif|svg)$/, 
        loader: 'url', 
        query: {limit: 10240} 
      },{
        test: /\.woff(2)?$/,
        loader: "url-loader?name=/fonts/['name'].[ext]&limit=10000&minetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg|png|gif)$/,
        loader: "file-loader?name=/images/[sha512:hash:base64:10].[ext]"
      }
    ]
  }
};

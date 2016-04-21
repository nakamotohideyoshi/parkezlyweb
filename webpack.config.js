var config = {
  entry: "./app/main",

  output: {
    path: __dirname + "/dist/js",
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
      }, {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      }
    ]
  }
}

module.exports = config;
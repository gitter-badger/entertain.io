var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
  entry: {
    app: path.resolve('src/app')
  },
  output: {
    path: path.resolve('dist'),
    filename: 'assets/app.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("assets/app.css"),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
      inject: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass?sourceMap")
      },{
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.resolve('src/app')
      }
    ]
  }
};

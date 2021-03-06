var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve('src/app')
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'assets/app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("assets/app.css"),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
      inject: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [{
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },{
        test: /\.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader?stage=0'],
        include: path.resolve('src/app')
      }, {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: "file-loader"
      }
    ]
  }
};

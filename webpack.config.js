var Path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    path: Path.join(__dirname, './build'),
    filename: 'index.[hash:8].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      loader: 'source-map-loader'
    }, {
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.woff2$/,
      loader: 'url-loader?limit=65535'
    }]
  },
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    minify: {collapseWhitespace: true}
  })]
}

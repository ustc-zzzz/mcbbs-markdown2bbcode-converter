var path = require('path')

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './build'),
    filename: 'index.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader?presets[]=react&presets[]=stage-2'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.woff2$/,
      loader: 'url-loader?limit=65535'
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'MCBBS Markdown To BBCode Converter',
    minify: {collapseWhitespace: true}
  })]
}

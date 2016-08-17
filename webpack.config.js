// In webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: [
    './app/index.js'
  ],
  output: {
  	path: __dirname,
  	filename: 'index_bundle.js'
  },
  module: {
  	loaders: [
  		{
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
      }
  	]
  },
  plugins: [
  	HtmlWebpackPluginConfig,
  	new webpack.ProvidePlugin({
            "React": "react"}),
    new webpack.ProvidePlugin({
        "ReactDOM": "react-dom"}),
    new webpack.ProvidePlugin({
        "axios": "axios"})
  ]
}
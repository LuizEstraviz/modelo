// In webpack.config.js
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],
  output: {
  	path: __dirname,
  	filename: 'index_bundle.js'
  },
  module: {
  	loaders: [
  		{
        test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']
      }
  	]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  	HtmlWebpackPluginConfig,
  	new webpack.ProvidePlugin({
            "React": "react"}),
    new webpack.ProvidePlugin({
        "ReactDOM": "react-dom"}),
    new webpack.ProvidePlugin({
        "axios": "axios"})
  ]
}
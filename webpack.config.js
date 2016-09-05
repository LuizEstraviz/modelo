// In webpack.config.js
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
  	path: __dirname + '/dist',
  	filename: 'index_bundle.js'
  },
  module: {
  	loaders: [
  		{
        test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
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
        "axios": "axios"}),
    new webpack.ProvidePlugin({
        "classNames": "classnames"}),
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('DEBUG')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
  ]
}
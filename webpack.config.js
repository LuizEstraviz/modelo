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
	devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'eval',
	entry: [
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
          'file?name=[path][name].[ext]'
        ]
      },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        include: path.join(__dirname, 'app/styles')
      },
  	]
  },
  plugins: [
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
      },
      'servUrl': JSON.stringify(process.env.NODE_ENV ? 'php/src/Services/' : 'http://apoema.esalq.usp.br/~getlidar/php/src/Services/')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
  ]
}

if (process.env.NODE_ENV !== 'production') {
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
  var a = ['webpack-dev-server/client?http://localhost:8080','webpack/hot/only-dev-server'];
  module.exports.entry = a.concat(module.exports.entry);
}

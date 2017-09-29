module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'biq-ios-overscroll.js',
		path: __dirname + '/dist/'
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader?presets[]=es2015'
		}]
	},
	devtool: 'source-map'

};

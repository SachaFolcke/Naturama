const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'app.bundle.js',
	},
	target: ['web', 'es5'],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(gif|svg|jpg|png)$/,
				loader: 'file-loader',
			},
		],
	},
	devtool: 'source-map',
};

/*
Commandes npm supplémentaire
npm install file-loader --save-dev
*/

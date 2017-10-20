const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
    new HtmlWebpackPlugin({template: 'src/three/index.html'}),
    new webpack.ProvidePlugin({
    		THREE: 'three',
    	}),
    ];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new UglifyJSPlugin());
}

module.exports = {
    entry: './src/three/index.js',
    devtool: "eval-source-map",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins,
    devServer: {
        // host: '0.0.0.0',
        port: 1337,
    }
};

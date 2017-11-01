var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './demo/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot-loader/webpack', 'babel-loader'],
            include: path.join(__dirname, 'demo')
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
        }, {
            test: /\.less$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }]
    }
};

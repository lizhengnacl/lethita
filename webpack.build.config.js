const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const {
    resolve, join
} = require('path');

function getDirectories (srcpath) {
    return fs.readdirSync(srcpath)
        .filter(file => fs.statSync(join(srcpath, file)).isDirectory())
}

let entry = {};
getDirectories('./src').forEach(item => {
    if(item === 'style'){
        entry[`${item}/index.scss`] = `./src/style/index.scss`;
    }else{
        entry[`${item}/style/index.scss`] = `./src/${item}/style/index.scss`;
    }
});

module.exports = {
    entry: entry,
    output: {
        filename: '[name]',
        sourceMapFilename: '[file].map',
        path: resolve(__dirname, 'lib'),
        publicPath: '/lib'
    },
    // devtool: 'cheap-module-source-map',

    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            }, {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/i,
                use: ['url-loader']
            }
        ]
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        }
    ],
    plugins: [
        new ExtractTextPlugin({
            filename: '[name]',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};

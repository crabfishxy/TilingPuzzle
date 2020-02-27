const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');


const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

const config = {
    entry: {
        'main': path.resolve(SRC_PATH, 'main'),
    },
    output: {
        path: DIST_PATH,
        filename: 'scripts.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [SRC_PATH]
        }]
    },
    resolve: {
        modules: [
            'node_modules',
            'src'
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
}

module.exports = config
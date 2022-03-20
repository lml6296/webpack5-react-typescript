const path = require('path');
const { merge } = require('webpack-merge');
const commom = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(commom, {
    mode: 'production',
    optimization: {
        minimizer: [
            // 生产环境下压缩抽离出来的css
            new CssMinimizerPlugin(),
        ]
    },
    plugins: [

        // 生产环境抽离CSS,将CSS提取到单独的文件中，为每个包含CSS的JS文件创建一个CSS文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contenthash].css', // 输出的每个css文件的名称
            chunkFilename: '[id].[hash].css', // 非入口的chunk文件名称

        }),
        // 生产环境压缩js，webpack5已经内置，但是还可以做额外配置
        // new TerserWebpackPlugin(),
        // 生产环境压缩css
        // new OptimizeCssAssetsWebpackPlugin({
        // }),
        // 生产环境去除无用代码
        // new PurgecssWebpackPlugin(),
        // tree-shaking会将通过ES6语法引入的未使用的代码去除，生产环境自动开启，"modules": false
    ]
})
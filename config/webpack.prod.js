const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    // 手动配置优化
    optimization: {
        // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。默认为true
        minimize: true,
        // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。
        minimizer: [
            // 生产环境下压缩抽离出来的css
            new CssMinimizerPlugin(),
            // webpack5已经内置,无需安装，直接引用就可以。
            new TerserWebpackPlugin(),
        ],
        // 提取公共代码
        splitChunks: {
            // chunks表示选择哪些chunk进行分割
            // all: 同步和异步引入的模块都单独分割成一个chunk
            // async: 优化异步模块的复用性。
            // 1、对于共用异步模块，单独分割到一个新的chunk中，
            // 2、对于不是共用的异步模块，单独分割成一个新chunk，
            // 3、对于非异步模块，保留在之前的chunk中。
            // initial: 优化非异步模块的复用性。
            // 1、对于异步模块，单独放入新的chunk中
            // 2、对于共用的非异步模块，单独放入新的chunk中
            // 3、对于不是共用的非异步模块，单独放入新的chunk中（如果新的chunk size不够依然会保留在之前的chunk中）
            chunks: 'all',
            // 提取chunk的最小体积，以bytes为单位
            minSize: 20000,
            // 要提取的chunk最少被引用次数
            minNumber: 1,
            // 缓存组，默认有两个缓存组：defaultVendors和default,其中的每一项缓存组都可以继承/覆盖之前提到的splitChunks参数值（minSize等），除此之外，还提供了三个配置：test,priority,reuseExistingChunk
            cacheGroups: {
                defaultVendors: {
                    // 匹配node_modules文件夹下的第三方模块都会被拆分成一个chunk
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: -10,
                },
                // 将至少有两个chunk引入的模块进行拆分，权重小于defaultVendors 
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    },
    plugins: [
        // 生产环境抽离CSS,将CSS提取到单独的文件中，为每个包含CSS的JS文件创建一个CSS文件,下面的插件是基于webpack5构建的
        new MiniCssExtractPlugin({
            // 输出的每个css文件的名称
            filename: 'css/main.[contenthash].css', 
            // 非入口的chunk文件名称
            chunkFilename: '[id].[hash].css', 
        }),
        // 生产环境去除无用代码
        // new PurgecssWebpackPlugin(),
        // tree-shaking会将通过ES6语法引入的未使用的代码去除，生产环境自动开启，"modules": false
    ]
})
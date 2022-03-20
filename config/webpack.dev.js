const path = require('path');
const { merge } = require('webpack-merge');
const commom = require('./webpack.common.js');
const webpack = require('webpack'); // 启用模块热替换
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');


module.exports = merge(commom, {
    mode: 'development',
    stats: 'error-only',
    devServer: {
        static: './dist',
        hot: true,
        host: 'localhost',
        port: 9000,
        open: true,
        proxy: {
            // 例如：对/api/user的请求会被代理到http://localhost:3000/user上
            './api': 'http://localhost:9000'
        },
    },
    devtool: 'source-map',
    plugins: [
        // 模块热替换
        new webpack.HotModuleReplacementPlugin(),
        // 加快二次编译速度
        // 使用SpeedMeasureWebpackPlugin,解决升级到webpack5使用HardSourceWebpackPlugin出现“tap”的问题
        new SpeedMeasureWebpackPlugin(),

    ]
})
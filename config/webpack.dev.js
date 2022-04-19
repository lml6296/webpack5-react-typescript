const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack'); // 启用模块热替换
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');


module.exports = merge(common, {
    mode: 'development',
    stats: 'error-only',
    devServer: {
        // 在开发环境中，一些静态资源（例如图标等资源）可以不打包进来，直接在通过static配置的目录下寻找，但是生产环境依然需要将这些静态资源打包部署到服务器上
        static: '../src/assets',
        compress: true, // 启用gzip压缩
        hot: true, // 开启HMR
        host: 'localhost', // 
        port: 9000, // 运行在哪个端口上
        open: true, // 自动打开浏览器
        proxy: {
            // 例如：对/api/user的请求会被代理到http://localhost:3000/user上
            './api': 'http://localhost:3000'
        },
    },
    // SourceMap 就是一个储存着代码位置信息的文件，转换后的代码的每一个位置，所对应的转换前的位置。
    // eval-source-map是开发环境中最常用的
    devtool: 'eval-source-map',
    plugins: [
        // 模块热替换
        new webpack.HotModuleReplacementPlugin(),
        // 加快二次编译速度
        // 使用SpeedMeasureWebpackPlugin,解决升级到webpack5使用HardSourceWebpackPlugin出现“tap”的问题
        new SpeedMeasureWebpackPlugin(),

    ]
})
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');

const isDev = process.env.NODE_ENV === 'development';
const PROJECT_PATH = path.resolve(__dirname, '../'); // 项目的根目录

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.tsx'),
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true, // 自动清理旧文件
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'], // import的时候可以省略后缀名
    },
    optimization: {
        // 抽离公共代码
        splitChunks: {
           chunks: 'all', // 表示选择哪些chunk进行优化
        },
        minimizer: [
            // 生产环境下压缩抽离出来的css
            new CssMinimizerPlugin(),
        ]
    },
    module: {
        rules: [
            // 支持css
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // 想要生成 source map，则需将 style-loader 之前执行 loader 的 sourceMap 选项设置为true。
                            sourceMap: isDev,
                        }
                    }, 
                    'postcss-loader',
                ],
            },
            // 支持图片,webpack5内置Asset Modules
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // 加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // 加载数据
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            // 支持react
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            // 支持typescript
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // 配置babel
            {
                // test: /\.m?js$/,
                test: /\.(tsx?|js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 防止babel将任何模块类型都转译成CommonJS类型，导致tree-shaking失效问题
                                "modules": false
                            }
                        ],
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                    ],
                    plugins: ['@babel/plugin-transform-runtime'],
                    cacheDirectory: true,
                  }
                }
              }
        ]
    },
    plugins: [
        // 自动生成一个html5文件，在body中使用script标签引入所有webpack生成的bundle
        new HtmlWebpackPlugin({
            title: '管理输出',
        }),
        // 编译打包时进行typescript类型检查
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
        // 显示编译进度
        new WebpackBar({
            name: isDev ? '正在启动' : '正在打包',
            color: '#fa8c16',
        }),      
    ]
}
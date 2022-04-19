const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');

const isDev = process.env.NODE_ENV === 'development';
const PROJECT_PATH = path.resolve(__dirname, '../'); // 项目的根目录

module.exports = {
    // 表示以哪个文件入口为起点，开始打包，进入肉蔻起点后，webpack会找出有哪些模块和库是入口文件（直接和间接）依赖的
    entry: {
        app: path.resolve(__dirname, '../src/index.js'),
    },
    // 输出webpack创建的bundle
    output: {
        // 输出的文件夹
        path: path.resolve(__dirname, '../dist'),
        // 输出的文件名
        filename: 'js/[name].[hash:8].js',
        // 自动清理旧文件
        clean: true,
    },
    // 其他配置 - 解析模块的规则
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'], // import的时候可以省略后缀名
    },
    // 防止将某些import的包（例如从CDN引入的不需要改动的JQuery库）打包到bundle中，而是在运行时再从外部去获取这些扩展依赖
    externals: {
        jquery: 'jQuery',
    },
    // 用于配置loader，对源代码进行转换
    module: {
        rules: [
            // 支持css
            {
                test: /\.css$/i,
                exclude: '/node_modules',
                use: [
                    {
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    }, 
                    {
                        loader: 'css-loader',
                        options: {
                            // 想要生成 source map，则需将 style-loader 之前执行 loader 的 sourceMap 选项设置为true。
                            sourceMap: isDev,
                            // CSS Module设置CSS样式隔离,modules为object时
                            modules: {
                                // 生成的css文件名
                                localIdentName: isDev ? '[path][name]_[local]' : '[hash:base64]',
                            },
                            // 表示通过@import引入的资源在被css-loader处理之前会被css-loader之前的一个loader先进行处理，这里表示postcss-loader
                            importLoaders: 1
                        }
                    }, 
                    {
                        
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    // postcss-preset-env 包含 autoprefixer
                                    'postcss-preset-env',
                                ],
                            },
                        },
                    }
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
    // 解决loader无法实现的其他事情
    plugins: [
        // 自动生成一个html5文件，在body中使用script标签引入所有webpack生成的bundle
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './src/index.html'), // 本地模板文件的地址
            filename: 'index.html', // 输出文件的文件名称，html文件目录是相对于webpackConfig.output.path路径而言的
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
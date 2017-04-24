var path = require('path');
var webpack = require('webpack');
var chalk = require('chalk');
var webpackDevServer = require("webpack-dev-server");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var vue = require('vue-loader');
var configs = require('../config/index.js')

//设置运行环境和配置
var configKey = "build";
var config = configKey == 'build' ? configs.build : configs.dev;
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: {
        app: config.main_path
    },
    output: {
        path: config.dist_path,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? __dirname + '/dist' : 'dist',
        //异步加载文件的命名规则
        chunkFilename: '[id].build.js?[chunkhash]'
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // postcss: [require('autoprefixer')()],
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: [{ loader: "css-loader", options: { minimize: false, sourceMap: false } }],
                            fallback: 'vue-style-loader'
                        }),
                        scss: ExtractTextPlugin.extract({
                            use: [
                                { loader: "css-loader", options: { minimize: false, sourceMap: false } },
                                { loader: "sass-loader", options: { sourceMap: false } }
                            ],
                            fallback: 'vue-style-loader'
                        }),
                        sass: ExtractTextPlugin.extract({
                            use: [
                                { loader: "css-loader", options: { minimize: false, sourceMap: false } },
                                { loader: "sass-loader", options: { sourceMap: false, indentedSyntax: true } }
                            ],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', use: [
                        { loader: "css-loader", options: { minimize: false, sourceMap: false } },
                        { loader: "sass-loader", options: { sourceMap: false } }
                    ]
                })
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', use: [
                        { loader: "css-loader", options: { minimize: false, sourceMap: false } },
                        { loader: "sass-loader", options: { sourceMap: false, indentedSyntax: true } }
                    ]
                })
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            }
        ]
    },
    devServer: {
        contentBase: './',
        historyApiFallback: true,
        hot: true,
        inline: true,
        // progress: true,
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE.ENV': "production"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        //将样式统一发布到style.css中
        new ExtractTextPlugin(
            {
                filename: 'smoDock.css',
                allChunks: true
            }
        ),

    ]
};


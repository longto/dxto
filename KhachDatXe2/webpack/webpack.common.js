const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ROOT = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(ROOT, '../dist');
const JS_DIR = path.resolve(ROOT, 'js');
const CSS_DIR = path.resolve(ROOT, 'css');

module.exports = {
    context: ROOT,
    target: 'web',
    entry: {
        app : [
            'babel-polyfill',
            'whatwg-fetch',
            path.resolve(JS_DIR, 'index.js'),
        ],
        css: [
            path.resolve(CSS_DIR, 'site.scss'),
        ]
    },
    output: {
        path: BUILD_DIR,
        publicPath: '/dist/',
        filename: '[name].js',
    },
    devtool: 'source-map',
    module : {
        rules : [
            {
                test : /\.js(x?)$/,
                include : JS_DIR,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 3,
                                sourceMap: true,
                                inline: false,
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts',
                        publicPath: '../fonts'
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)/i,
                loader: 'file-loader',
                exclude: /(\/fonts)/,
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images',
                    publicPath: '../images'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(BUILD_DIR, { root: path.resolve(ROOT, '../') }),
        new ExtractTextPlugin('css/app.min.css'),
        new CopyWebpackPlugin([
            { from: 'images', to: path.resolve(BUILD_DIR, 'images') }
        ]),
        /*new HtmlWebpackPlugin({
            excludeAssets: [/css/],
            filename: '../Views/Shared/_Script.cshtml',
            template: './webpack/template/empty.html'
        }),
        new HtmlWebpackExcludeAssetsPlugin(),*/
        // new BundleAnalyzerPlugin(),
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    }
};
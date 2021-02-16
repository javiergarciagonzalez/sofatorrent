const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('sass');

const outputDirectory = 'public/dist';

const isProduction = process.env.ENV === 'production';

module.exports = {
    entry: {
        client: [path.resolve(__dirname, 'src/index.jsx')]
    },
    mode: isProduction ? 'production' : 'development',
    target: 'web',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: '[name].bundle.js'
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [/src/],
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                            sassOptions: {
                                sourceMap: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader?limit=100000'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            https: false,
            http: false
        },
        alias: {
            path: 'path-browserify'
        }
    },
    devServer: {
        port: 3000,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: '../public/index.html',
            favicon: '../public/favicon.ico'
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    ]
};

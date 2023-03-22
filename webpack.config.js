const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? false : false;

module.exports = {
    mode,
    target,
    devtool,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output:{
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name].js',
        assetModuleFilename: 'assets/[name][ext]' //сохранение оттдельных файлов

    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module:{
        rules:[{
            test: /\.html$/i,
            loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    //devMode ? MiniCssExtractPlugin.loader : "style-loader",
                    devMode ?  "style-loader": MiniCssExtractPlugin.loader,
                    "css-loader"
                    ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
            },
            {
                test: /\.(jpe?g|png webp|gif |svs) $/i,
                use:  [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                              progressive: false,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                              enabled: true,
                            },
                            pngquant: {
                              quality: [0.65, 0.90],
                              speed: 4
                            },
                            gifsicle: {
                              interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                              quality: 75
                            }
                        }
                    }
                ],
                type: 'asset/resource',
            },
        
        ],
    },
};
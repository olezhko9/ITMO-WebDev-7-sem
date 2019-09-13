const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
}

module.exports = {
    entry: [
        PATHS.source + '/js/main.js',
        PATHS.source + '/style.sass'
    ],
    output: {
        path: PATHS.build,
        filename: "[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.source + '/index.pug'
        }),
        new ExtractTextPlugin({
            filename: './css/[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    }
}

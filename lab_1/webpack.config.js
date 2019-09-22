const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const webpack = require('webpack')

const extractSass = new ExtractTextPlugin({
  filename: "css/style.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    javascript: "./src/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: "sass-loader",
            }
          ],
          publicPath: '../',
          fallback: "style-loader"
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images"
        }
      },
      {
        test: /\.pug/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'src/views/index.pug',

    }),
    new HtmlWebpackPugPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: '[name].[hash].js',
  },
  entry: {
    index: './src/js/mainPage/main.js',
    gallery: './src/js/galleryPage/galleryMain.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/gallery.html',
      inject: true,
      chunks: ['gallery'],
      filename: 'gallery.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 100000, esModule: false },
          },
        ],
      },
    ],
  },
};

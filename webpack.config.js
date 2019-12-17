/* eslint-disable linebreak-style */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const commonConfig = merge([
  {
    entry: {
      index: './src/js/main.js',
      gallery: './src/js/gallery.js',
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
  },
]);

const productionConfig = merge([
  parts.extractCSS({
    use: 'css-loader',
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.extractCSS({
    use: 'css-loader',
  }),
]);

module.exports = (mode) => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    stats: 'errors-only',
    open: true,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

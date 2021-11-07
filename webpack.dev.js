const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: {
          directory: path.join(__dirname, 'public'),
      },
      watchFiles: ['src/**/*.tsx', 'src/**/*.scss'],
      compress: true,
      hot: true,
      open: true,
      port: 3000,
      historyApiFallback: true,
    }
});
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const {
  env: { WATCH, LIVERELOAD_PORT, URL },
} = process;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new LiveReloadPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production',
      'process.env.WATCH': WATCH,
      'process.env.LIVERELOAD_PORT': LIVERELOAD_PORT,
      'process.env.URL': URL,
    }),
  ],
});

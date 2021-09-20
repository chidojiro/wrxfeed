const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// eslint-disable-next-line import/extensions
const common = require('./webpack.common.js');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    devtool: 'hidden-source-map',
    output: {
      filename: '[chunkhash].js',
      publicPath: '/',
      sourceMapFilename: '[file].map',
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
      // Extract css from the bundle into a separate file.
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[hash].css',
        chunkFilename: '[id].[hash].css',
      }),
    ],
  });
};

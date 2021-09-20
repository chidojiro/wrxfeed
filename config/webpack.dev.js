const { merge } = require('webpack-merge');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line import/extensions
const common = require('./webpack.common.js');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      open: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 3001,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
        },
      },
    },
    plugins: [
      // follow build performance best practice
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        },
        logger: {
          infrastructure: 'silent',
          issues: 'console',
          // errors will not be reported to Webpack Dev Server
          devServer: false,
        },
      }),
      new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: true }),
    ],
  });
};

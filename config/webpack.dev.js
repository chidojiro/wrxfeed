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
      host: 'localhost',
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://staging-api.gravitylabs.co',
        },
      },
    },
    plugins: [
      // follow build performance best practice
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          build: true,
          memoryLimit: 16000,
      },
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

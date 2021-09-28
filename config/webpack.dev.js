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
          target: 'http://wrx-test-162708929.us-east-2.elb.amazonaws.com',
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

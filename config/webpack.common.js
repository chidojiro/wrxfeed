const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return {
    entry: path.resolve('src/index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve('dist'),
      publicPath: '/',
      clean: true,
      // performance best practice
      pathinfo: false,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve('src'),
        '@api': path.resolve('src/api'),
        '@common': path.resolve('src/common'),
        '@error': path.resolve('src/error'),
        '@identity': path.resolve('src/identity'),
        '@auth': path.resolve('src/auth'),
        '@home': path.resolve('src/home'),
        '@main': path.resolve('src/main'),
      },
    },
    plugins: [
      // Automatically generate an HTML5 file for you that includes all your webpack bundles
      new HtmlWebpackPlugin({
        title: 'WrxFeed',
        favicon: path.resolve('public/favicon.svg'),
        template: path.resolve('public/index.html'),
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve('public/robots.txt'), to: 'robots.txt' },
          // Netlify setting
          { from: path.resolve('public/netlify.toml'), to: 'netlify.toml' },
        ],
      }),
      // Create global constants which can be configured at compile time
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
      }),

      new WebpackPwaManifest({
        name: 'WrxFeed',
        short_name: 'WrxFeed',
        orientation: 'portrait',
        display: 'standalone',
        start_url: '.',
        description: 'WrxFeed fintech',
        background_color: '#0F0D15',
        theme_color: '#ffffff',
        icons: [
          {
            src: path.resolve('public/favicon.svg'),
            sizes: [96, 128, 256, 512], // multiple sizes
          },
          {
            src: path.resolve('public/favicon.svg'),
            size: '512x512',
            purpose: 'maskable',
          },
        ],
      }),
    ],
    module: {
      rules: [
        // load image, font
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        // load font
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        // load typescript file
        {
          test: /\.ts(x?)$/,
          include: path.resolve('src'),
          exclude: /\.stories\./,
          // enable transpileOnly for build performance best practice
          use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          test: /\.js$/,
          include: path.resolve('src'),
          enforce: 'pre',
          loader: 'source-map-loader',
        },
        // load css file
        {
          test: /\.css$/,
          use: [
            // extract CSS into separate files
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
};

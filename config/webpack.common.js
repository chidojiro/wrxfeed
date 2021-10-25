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
        '@src': path.resolve('src'),
        '@assets': path.resolve('src/assets'),
        '@api': path.resolve('src/api'),
        '@common': path.resolve('src/common'),
        '@error': path.resolve('src/error'),
        '@identity': path.resolve('src/identity'),
        '@auth': path.resolve('src/auth'),
        '@main': path.resolve('src/main'),
      },
    },
    plugins: [
      // Automatically generate an HTML5 file for you that includes all your webpack bundles
      new HtmlWebpackPlugin({
        title: 'Gravity',
        hash: false,
        favicon: path.resolve('public/favicon.svg'),
        template: path.resolve('public/index.html'),
        inject: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
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
        name: 'Gravity',
        short_name: 'Gravity',
        orientation: 'portrait',
        display: 'standalone',
        start_url: '.',
        description: 'Gravity',
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
          test: /\.(png|jpg|jpeg|gif)$/i,
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
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            }
          ],
        },
        {
          test: /\.svg$/i,
          // issuer section restricts svg as component only to
          // svgs imported from js / ts files.
          //
          // This allows configuring other behavior for
          // svgs imported from other file types (such as .css)
          issuer: { and: [/\.(js|ts|md)x?$/] },
          use: ['@svgr/webpack', 'url-loader'],
        },
      ],
    },
  };
};

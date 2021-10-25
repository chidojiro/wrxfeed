const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-postcss'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@error': path.resolve(__dirname, 'src/error'),
      '@identity': path.resolve(__dirname, 'src/identity'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@main': path.resolve(__dirname, 'src/main'),
    };
    return config;
  },
};

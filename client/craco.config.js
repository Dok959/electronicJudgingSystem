const path = require('path');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [new VanillaExtractPlugin()],
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    css: {
      loaderOptions: {
        url: false,
      },
    },
  },
};

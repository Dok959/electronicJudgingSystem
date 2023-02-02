const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [new VanillaExtractPlugin()],
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

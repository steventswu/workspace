const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    src: path.resolve(__dirname, 'src/'),
    components: path.resolve(__dirname, 'src/components/'),
    assets: path.resolve(__dirname, 'src/assets/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: false,
  publicPath: '/',
  hash: true,
  proxy: {
    '/data': {
      target: 'http://coinhub.capital/cob/api',
      changeOrigin: true,
      pathRewrite: { '^/data': '' },
    },
  },
  define: {
    'process.env.TWITTER_SECRET': process.env.TWITTER_SECRET,
    'process.env.CAPP01': process.env.CAPP01,
    'process.env.ETHERSCAN_HOST': process.env.ETHERSCAN_HOST,
    'process.env.NETWORK_ID': process.env.NETWORK_ID,
    'process.env.GA': process.env.GA,
  },
};

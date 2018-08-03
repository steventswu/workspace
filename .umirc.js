const path = require('path');

export default {
  exportStatic: true,
  plugins: [
    'umi-plugin-dva',
    [
      'umi-plugin-routes',
      {
        exclude: [/sections/],
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://cap-stage.tixguru.co',
      changeOrigin: true,
    },
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
  alias: {
    src: path.resolve(__dirname, 'src/'),
    components: path.resolve(__dirname, 'src/components/'),
    assets: path.resolve(__dirname, 'src/assets/'),
  },
  pages: {
    '/buy': { Route: './src/routes/PrivateRoute.js' },
    '/buy/:id': { Route: './src/routes/PrivateRoute.js' },
    '/portfolio': { Route: './src/routes/PrivateRoute.js' },
    '/profile': { Route: './src/routes/PrivateRoute.js' },
    '/redeem': { Route: './src/routes/PrivateRoute.js' },
    '/transactions': { Route: './src/routes/PrivateRoute.js' },
  },
  theme: {
    '@primary-color': '#1890ff',
    '@primary-1': 'rgba(255, 255, 255, 0.2)',
    '@primary-2': '#66ccff',
    '@primary-3': '#91d5ff',
    '@primary-4': '#91d5ff',
    '@text-color': '#fff',
    '@text-color-secondary': '#fff',
    '@text-color-dark': 'fade(#000, 65%)',
    '@text-color-secondary-dark': 'fade(#000, 45%)',
    '@heading-color': 'fade(#fff, 100%)',
    '@heading-color-dark': 'fade(#000, 85%)',
    '@btn-primary-bg': '#1890ff',
    '@background-color-base': 'rgba(127, 196, 253, 0.2)',
    '@component-background': '#001e46',
    '@background-color-light': '#11142d',
    '@input-bg': '#001e46',
    '@btn-default-bg': 'transparent',
    '@slider-rail-background-color-hover': 'rgba(127, 196, 253, 0.2)',
    '@card-actions-background': '#f5f8fa',
    '@link-color': '#fff',
    '@link-hover-color': '#66ccff',
    '@link-active-color': '#66ccff',
    '@disabled-color': 'fade(#fff, 35%)',
    '@disabled-color-dark': 'fade(#000, 25%)',
    '@disabled-bg': 'rgba(155, 155, 155, 0.5)',
    '@font-family':
      'Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
};

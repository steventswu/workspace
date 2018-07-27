import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';

let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;

let routes = [
  {
    path: '/',
    component: require('../../layouts/index.js').default,
    routes: [
      {
        path: '/404',
        exact: true,
        component: require('../404.js').default,
      },
      {
        path: '/buy',
        exact: false,
        component: require('../buy/_layout.js').default,
        routes: [
          {
            path: '/buy',
            exact: true,
            component: require('../buy/index.js').default,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/Shawn/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                {
                  pagesPath: 'src/pages',
                  routes:
                    '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy","exact":true,"component":"./src/pages/buy/index.js"}]},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]},{"path":"/home/HomePage","exact":true,"component":"./src/pages/home/HomePage.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/performance/inex","exact":true,"component":"./src/pages/performance/inex.js"},{"path":"/user","exact":false,"component":"./src/pages/user/_layout.js","routes":[{"path":"/user","exact":true,"component":"./src/pages/user/index.js"}]}]}]',
                }
              ),
          },
        ],
      },
      {
        path: '/exception',
        exact: false,
        component: require('../exception/_layout.js').default,
        routes: [
          {
            path: '/exception/403',
            exact: true,
            component: require('../exception/403.js').default,
          },
          {
            path: '/exception/404',
            exact: true,
            component: require('../exception/404.js').default,
          },
          {
            path: '/exception/500',
            exact: true,
            component: require('../exception/500.js').default,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/Shawn/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                {
                  pagesPath: 'src/pages',
                  routes:
                    '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy","exact":true,"component":"./src/pages/buy/index.js"}]},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]},{"path":"/home/HomePage","exact":true,"component":"./src/pages/home/HomePage.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/performance/inex","exact":true,"component":"./src/pages/performance/inex.js"},{"path":"/user","exact":false,"component":"./src/pages/user/_layout.js","routes":[{"path":"/user","exact":true,"component":"./src/pages/user/index.js"}]}]}]',
                }
              ),
          },
        ],
      },
      {
        path: '/home/HomePage',
        exact: true,
        component: require('../home/HomePage.js').default,
      },
      {
        path: '/',
        exact: true,
        component: require('../index.js').default,
      },
      {
        path: '/performance/inex',
        exact: true,
        component: require('../performance/inex.js').default,
      },
      {
        path: '/user',
        exact: false,
        component: require('../user/_layout.js').default,
        routes: [
          {
            path: '/user',
            exact: true,
            component: require('../user/index.js').default,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/Shawn/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                {
                  pagesPath: 'src/pages',
                  routes:
                    '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy","exact":true,"component":"./src/pages/buy/index.js"}]},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]},{"path":"/home/HomePage","exact":true,"component":"./src/pages/home/HomePage.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/performance/inex","exact":true,"component":"./src/pages/performance/inex.js"},{"path":"/user","exact":false,"component":"./src/pages/user/_layout.js","routes":[{"path":"/user","exact":true,"component":"./src/pages/user/index.js"}]}]}]',
                }
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/Shawn/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            {
              pagesPath: 'src/pages',
              routes:
                '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy","exact":true,"component":"./src/pages/buy/index.js"}]},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]},{"path":"/home/HomePage","exact":true,"component":"./src/pages/home/HomePage.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/performance/inex","exact":true,"component":"./src/pages/performance/inex.js"},{"path":"/user","exact":false,"component":"./src/pages/user/_layout.js","routes":[{"path":"/user","exact":true,"component":"./src/pages/user/index.js"}]}]}]',
            }
          ),
      },
    ],
  },
];

export default function() {
  return (
    <Router history={window.g_history}>
      <Route render={({ location }) => renderRoutes(routes, {}, { location })} />
    </Router>
  );
}

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
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/exception",
        "exact": false,
        "component": require('../exception/_layout.js').default,
        "routes": [
          {
            "path": "/exception/403",
            "exact": true,
            "component": require('../exception/403.js').default
          },
          {
            "path": "/exception/404",
            "exact": true,
            "component": require('../exception/404.js').default
          },
          {
            "path": "/exception/500",
            "exact": true,
            "component": require('../exception/500.js').default
          },
          {
            "component": () => React.createElement(require('/Users/shangyo/work/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy/1","exact":true,"component":"./src/pages/buy/1.js"},{"path":"/buy/2","exact":true,"component":"./src/pages/buy/2.js"},{"path":"/buy/3","exact":true,"component":"./src/pages/buy/3.js"},{"path":"/buy/Contract","exact":true,"component":"./src/pages/buy/Contract.js"}],"Route":"./src/routes/PrivateRoute.js"},{"path":"/home","exact":true,"component":"./src/pages/home/index.js"},{"path":"/home/sections/1.main","exact":true,"component":"./src/pages/home/sections/1.main.js"},{"path":"/home/sections/3.product","exact":true,"component":"./src/pages/home/sections/3.product.js"},{"path":"/home/sections/2.features","exact":true,"component":"./src/pages/home/sections/2.features.js"},{"path":"/user/login","exact":true,"component":"./src/pages/user/login.js"},{"path":"/home/sections/6.action","exact":true,"component":"./src/pages/home/sections/6.action.js"},{"path":"/home/sections","exact":true,"component":"./src/pages/home/sections/index.js"},{"path":"/home/sections/4.team","exact":true,"component":"./src/pages/home/sections/4.team.js"},{"path":"/home/Home","exact":true,"component":"./src/pages/home/Home.js"},{"path":"/performance","exact":true,"component":"./src/pages/performance/index.js"},{"path":"/user","exact":true,"component":"./src/pages/user/index.js"},{"path":"/home/sections/5.news","exact":true,"component":"./src/pages/home/sections/5.news.js"}]}]' })
          }
        ]
      },
      {
        "path": "/buy",
        "exact": false,
        "component": require('../buy/_layout.js').default,
        "routes": [
          {
            "path": "/buy/1",
            "exact": true,
            "component": require('../buy/1.js').default
          },
          {
            "path": "/buy/2",
            "exact": true,
            "component": require('../buy/2.js').default
          },
          {
            "path": "/buy/3",
            "exact": true,
            "component": require('../buy/3.js').default
          },
          {
            "path": "/buy/Contract",
            "exact": true,
            "component": require('../buy/Contract.js').default
          },
          {
            "component": () => React.createElement(require('/Users/shangyo/work/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy/1","exact":true,"component":"./src/pages/buy/1.js"},{"path":"/buy/2","exact":true,"component":"./src/pages/buy/2.js"},{"path":"/buy/3","exact":true,"component":"./src/pages/buy/3.js"},{"path":"/buy/Contract","exact":true,"component":"./src/pages/buy/Contract.js"}],"Route":"./src/routes/PrivateRoute.js"},{"path":"/home","exact":true,"component":"./src/pages/home/index.js"},{"path":"/home/sections/1.main","exact":true,"component":"./src/pages/home/sections/1.main.js"},{"path":"/home/sections/3.product","exact":true,"component":"./src/pages/home/sections/3.product.js"},{"path":"/home/sections/2.features","exact":true,"component":"./src/pages/home/sections/2.features.js"},{"path":"/user/login","exact":true,"component":"./src/pages/user/login.js"},{"path":"/home/sections/6.action","exact":true,"component":"./src/pages/home/sections/6.action.js"},{"path":"/home/sections","exact":true,"component":"./src/pages/home/sections/index.js"},{"path":"/home/sections/4.team","exact":true,"component":"./src/pages/home/sections/4.team.js"},{"path":"/home/Home","exact":true,"component":"./src/pages/home/Home.js"},{"path":"/performance","exact":true,"component":"./src/pages/performance/index.js"},{"path":"/user","exact":true,"component":"./src/pages/user/index.js"},{"path":"/home/sections/5.news","exact":true,"component":"./src/pages/home/sections/5.news.js"}]}]' })
          }
        ],
        "Route": require('/Users/shangyo/work/tixguru/cap-performance/src/routes/PrivateRoute.js').default
      },
      {
        "path": "/home",
        "exact": true,
        "component": require('../home/index.js').default
      },
      {
        "path": "/home/sections/1.main",
        "exact": true,
        "component": require('../home/sections/1.main.js').default
      },
      {
        "path": "/home/sections/3.product",
        "exact": true,
        "component": require('../home/sections/3.product.js').default
      },
      {
        "path": "/home/sections/2.features",
        "exact": true,
        "component": require('../home/sections/2.features.js').default
      },
      {
        "path": "/user/login",
        "exact": true,
        "component": require('../user/login.js').default
      },
      {
        "path": "/home/sections/6.action",
        "exact": true,
        "component": require('../home/sections/6.action.js').default
      },
      {
        "path": "/home/sections",
        "exact": true,
        "component": require('../home/sections/index.js').default
      },
      {
        "path": "/home/sections/4.team",
        "exact": true,
        "component": require('../home/sections/4.team.js').default
      },
      {
        "path": "/home/Home",
        "exact": true,
        "component": require('../home/Home.js').default
      },
      {
        "path": "/performance",
        "exact": true,
        "component": require('../performance/index.js').default
      },
      {
        "path": "/user",
        "exact": true,
        "component": require('../user/index.js').default
      },
      {
        "path": "/home/sections/5.news",
        "exact": true,
        "component": require('../home/sections/5.news.js').default
      },
      {
        "component": () => React.createElement(require('/Users/shangyo/work/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy/1","exact":true,"component":"./src/pages/buy/1.js"},{"path":"/buy/2","exact":true,"component":"./src/pages/buy/2.js"},{"path":"/buy/3","exact":true,"component":"./src/pages/buy/3.js"},{"path":"/buy/Contract","exact":true,"component":"./src/pages/buy/Contract.js"}],"Route":"./src/routes/PrivateRoute.js"},{"path":"/home","exact":true,"component":"./src/pages/home/index.js"},{"path":"/home/sections/1.main","exact":true,"component":"./src/pages/home/sections/1.main.js"},{"path":"/home/sections/3.product","exact":true,"component":"./src/pages/home/sections/3.product.js"},{"path":"/home/sections/2.features","exact":true,"component":"./src/pages/home/sections/2.features.js"},{"path":"/user/login","exact":true,"component":"./src/pages/user/login.js"},{"path":"/home/sections/6.action","exact":true,"component":"./src/pages/home/sections/6.action.js"},{"path":"/home/sections","exact":true,"component":"./src/pages/home/sections/index.js"},{"path":"/home/sections/4.team","exact":true,"component":"./src/pages/home/sections/4.team.js"},{"path":"/home/Home","exact":true,"component":"./src/pages/home/Home.js"},{"path":"/performance","exact":true,"component":"./src/pages/performance/index.js"},{"path":"/user","exact":true,"component":"./src/pages/user/index.js"},{"path":"/home/sections/5.news","exact":true,"component":"./src/pages/home/sections/5.news.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}

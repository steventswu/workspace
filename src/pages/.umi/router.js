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
        "path": "/portfolio",
        "exact": true,
        "component": require('../portfolio.js').default
      },
      {
        "path": "/profile",
        "exact": true,
        "component": require('../profile.js').default
      },
      {
        "path": "/redeem",
        "exact": true,
        "component": require('../redeem.js').default
      },
      {
        "path": "/transactions",
        "exact": true,
        "component": require('../transactions.js').default
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
            "component": () => React.createElement(require('/Users/Shawn/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/portfolio","exact":true,"component":"./src/pages/portfolio.js"},{"path":"/profile","exact":true,"component":"./src/pages/profile.js"},{"path":"/redeem","exact":true,"component":"./src/pages/redeem.js"},{"path":"/transactions","exact":true,"component":"./src/pages/transactions.js"},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy/1","exact":true,"component":"./src/pages/buy/1.js"},{"path":"/buy/2","exact":true,"component":"./src/pages/buy/2.js"},{"path":"/buy/3","exact":true,"component":"./src/pages/buy/3.js"}],"Route":"./src/routes/PrivateRoute.js"},{"path":"/home/sections","exact":true,"component":"./src/pages/home/sections/index.js"},{"path":"/home/sections/4.team","exact":true,"component":"./src/pages/home/sections/4.team.js"},{"path":"/user/result","exact":true,"component":"./src/pages/user/result.js"},{"path":"/home/sections/1.main","exact":true,"component":"./src/pages/home/sections/1.main.js"},{"path":"/home","exact":true,"component":"./src/pages/home/index.js"},{"path":"/home/sections/3.product","exact":true,"component":"./src/pages/home/sections/3.product.js"},{"path":"/home/sections/2.features","exact":true,"component":"./src/pages/home/sections/2.features.js"},{"path":"/home/sections/5.news","exact":true,"component":"./src/pages/home/sections/5.news.js"},{"path":"/home/sections/6.action","exact":true,"component":"./src/pages/home/sections/6.action.js"},{"path":"/user/change-password","exact":true,"component":"./src/pages/user/change-password.js"},{"path":"/user/confirm","exact":true,"component":"./src/pages/user/confirm.js"},{"path":"/user/forgot-password","exact":true,"component":"./src/pages/user/forgot-password.js"},{"path":"/user/login","exact":true,"component":"./src/pages/user/login.js"},{"path":"/user/register","exact":true,"component":"./src/pages/user/register.js"},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]}]}]' })
          }
        ],
        "Route": require('/Users/Shawn/tixguru/cap-performance/src/routes/PrivateRoute.js').default
      },
      {
        "path": "/user/result",
        "exact": true,
        "component": require('../user/result.js').default
      },
      {
        "path": "/home",
        "exact": true,
        "component": require('../home/index.js').default
      },
      {
        "path": "/user/change-password",
        "exact": true,
        "component": require('../user/change-password.js').default
      },
      {
        "path": "/user/confirm",
        "exact": true,
        "component": require('../user/confirm.js').default
      },
      {
        "path": "/user/forgot-password",
        "exact": true,
        "component": require('../user/forgot-password.js').default
      },
      {
        "path": "/user/login",
        "exact": true,
        "component": require('../user/login.js').default
      },
      {
        "path": "/user/register",
        "exact": true,
        "component": require('../user/register.js').default
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
            "component": () => React.createElement(require('/Users/Shawn/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/portfolio","exact":true,"component":"./src/pages/portfolio.js"},{"path":"/profile","exact":true,"component":"./src/pages/profile.js"},{"path":"/redeem","exact":true,"component":"./src/pages/redeem.js"},{"path":"/transactions","exact":true,"component":"./src/pages/transactions.js"},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy/1","exact":true,"component":"./src/pages/buy/1.js"},{"path":"/buy/2","exact":true,"component":"./src/pages/buy/2.js"},{"path":"/buy/3","exact":true,"component":"./src/pages/buy/3.js"}],"Route":"./src/routes/PrivateRoute.js"},{"path":"/home/sections","exact":true,"component":"./src/pages/home/sections/index.js"},{"path":"/home/sections/4.team","exact":true,"component":"./src/pages/home/sections/4.team.js"},{"path":"/user/result","exact":true,"component":"./src/pages/user/result.js"},{"path":"/home/sections/1.main","exact":true,"component":"./src/pages/home/sections/1.main.js"},{"path":"/home","exact":true,"component":"./src/pages/home/index.js"},{"path":"/home/sections/3.product","exact":true,"component":"./src/pages/home/sections/3.product.js"},{"path":"/home/sections/2.features","exact":true,"component":"./src/pages/home/sections/2.features.js"},{"path":"/home/sections/5.news","exact":true,"component":"./src/pages/home/sections/5.news.js"},{"path":"/home/sections/6.action","exact":true,"component":"./src/pages/home/sections/6.action.js"},{"path":"/user/change-password","exact":true,"component":"./src/pages/user/change-password.js"},{"path":"/user/confirm","exact":true,"component":"./src/pages/user/confirm.js"},{"path":"/user/forgot-password","exact":true,"component":"./src/pages/user/forgot-password.js"},{"path":"/user/login","exact":true,"component":"./src/pages/user/login.js"},{"path":"/user/register","exact":true,"component":"./src/pages/user/register.js"},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]}]}]' })
          }
        ]
      },
      {
        "component": () => React.createElement(require('/Users/Shawn/tixguru/cap-performance/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/portfolio","exact":true,"component":"./src/pages/portfolio.js"},{"path":"/profile","exact":true,"component":"./src/pages/profile.js"},{"path":"/redeem","exact":true,"component":"./src/pages/redeem.js"},{"path":"/transactions","exact":true,"component":"./src/pages/transactions.js"},{"path":"/buy","exact":false,"component":"./src/pages/buy/_layout.js","routes":[{"path":"/buy/1","exact":true,"component":"./src/pages/buy/1.js"},{"path":"/buy/2","exact":true,"component":"./src/pages/buy/2.js"},{"path":"/buy/3","exact":true,"component":"./src/pages/buy/3.js"}],"Route":"./src/routes/PrivateRoute.js"},{"path":"/home/sections","exact":true,"component":"./src/pages/home/sections/index.js"},{"path":"/home/sections/4.team","exact":true,"component":"./src/pages/home/sections/4.team.js"},{"path":"/user/result","exact":true,"component":"./src/pages/user/result.js"},{"path":"/home/sections/1.main","exact":true,"component":"./src/pages/home/sections/1.main.js"},{"path":"/home","exact":true,"component":"./src/pages/home/index.js"},{"path":"/home/sections/3.product","exact":true,"component":"./src/pages/home/sections/3.product.js"},{"path":"/home/sections/2.features","exact":true,"component":"./src/pages/home/sections/2.features.js"},{"path":"/home/sections/5.news","exact":true,"component":"./src/pages/home/sections/5.news.js"},{"path":"/home/sections/6.action","exact":true,"component":"./src/pages/home/sections/6.action.js"},{"path":"/user/change-password","exact":true,"component":"./src/pages/user/change-password.js"},{"path":"/user/confirm","exact":true,"component":"./src/pages/user/confirm.js"},{"path":"/user/forgot-password","exact":true,"component":"./src/pages/user/forgot-password.js"},{"path":"/user/login","exact":true,"component":"./src/pages/user/login.js"},{"path":"/user/register","exact":true,"component":"./src/pages/user/register.js"},{"path":"/exception","exact":false,"component":"./src/pages/exception/_layout.js","routes":[{"path":"/exception/403","exact":true,"component":"./src/pages/exception/403.js"},{"path":"/exception/404","exact":true,"component":"./src/pages/exception/404.js"},{"path":"/exception/500","exact":true,"component":"./src/pages/exception/500.js"}]}]}]' })
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

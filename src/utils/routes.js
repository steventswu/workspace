import { createElement } from 'react';
import dynamic from 'dva/dynamic';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

export const getRouterData = app => ({
  '/': {
    component: dynamicWrapper(app, ['auth', 'user', 'login'], () =>
      import('src/layouts/AppLayout')
    ),
  },
  '/home': {
    component: dynamicWrapper(app, ['auth', 'user', 'login'], () =>
      import('src/routes/Home/HomePage')
    ),
  },
  '/performance': {
    component: dynamicWrapper(app, ['performance'], () =>
      import('src/routes/Performance/BasicPerformance')
    ),
    name: 'Performance',
    isPublic: true,
  },
  '/buy': {
    component: dynamicWrapper(app, [], () => import('src/layouts/BuyTokenLayout')),
    isProtected: true,
  },
  '/buy/1': {
    component: dynamicWrapper(app, ['token'], () => import('src/routes/Buy/Step1')),
    name: 'Accept Terms',
    isProtected: true,
  },
  '/buy/2': {
    component: dynamicWrapper(app, ['token'], () => import('src/routes/Buy/Step2')),
    name: 'Place Order',
    isProtected: true,
  },
  '/buy/3': {
    component: dynamicWrapper(app, ['token'], () => import('src/routes/Buy/Step3')),
    name: 'Buy CAP',
    isProtected: true,
  },
  '/profile': {
    component: dynamicWrapper(app, ['auth', 'profile'], () =>
      import('src/routes/Profile/UserProfile')
    ),
    name: 'Profile',
    isProtected: true,
  },
  '/portfolio': {
    component: dynamicWrapper(app, ['profile'], () => import('src/routes/Profile/UserPortfolio')),
    name: 'Portfolio',
    isProtected: true,
  },
  '/transactions': {
    component: dynamicWrapper(app, ['profile'], () =>
      import('src/routes/Profile/TransactionHistory')
    ),
    name: 'Transaction History',
    isProtected: true,
  },
  '/redeem': {
    component: dynamicWrapper(app, ['user', 'profile'], () => import('src/routes/Profile/Redeem')),
    name: 'Redeem',
    isProtected: true,
  },
  '/profile/wallet': {
    component: dynamicWrapper(app, ['profile'], () =>
      import('../routes/Profile/WalletVerification')
    ),
    name: 'Wallet Verification',
    isProtected: true,
  },
  '/profile/verification': {
    component: dynamicWrapper(app, ['profile'], () =>
      import('src/routes/Profile/IdentityVerification')
    ),
    name: 'Identity Verification',
    isProtected: true,
  },
  '/user': {
    component: dynamicWrapper(app, [], () => import('src/layouts/UserLayout')),
  },
  '/user/login': {
    component: dynamicWrapper(app, ['login'], () => import('src/routes/User/Login')),
  },
  '/user/register': {
    component: dynamicWrapper(app, ['user'], () => import('src/routes/User/Register')),
  },
  '/user/forgot-password': {
    component: dynamicWrapper(app, ['user'], () => import('../routes/User/ForgotPassword')),
  },
  '/user/change-password': {
    component: dynamicWrapper(app, ['user'], () => import('../routes/User/ChangePassword')),
  },
  '/user/result': {
    component: dynamicWrapper(app, [], () => import('src/routes/User/LoginResult')),
  },
  '/user/confirm': {
    component: dynamicWrapper(app, ['user'], () => import('src/routes/User/RegisterConfirm')),
  },
});

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
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/AppLayout')),
  },
  '/home': {
    component: dynamicWrapper(app, [], () => import('../routes/Home/HomePage')),
  },
  '/performance': {
    component: dynamicWrapper(app, ['performance'], () =>
      import('../routes/Performance/BasicPerformance')
    ),
    name: 'Performance',
    isPublic: true,
  },
  '/buy': {
    component: dynamicWrapper(app, [], () => import('../layouts/TokenLayout')),
    isProtected: true,
  },
  '/buy/1': {
    component: dynamicWrapper(app, ['token'], () => import('../routes/Token/Step1')),
    name: 'Accept Terms',
    isProtected: true,
  },
  '/buy/2': {
    component: dynamicWrapper(app, ['token'], () => import('../routes/Token/Step2')),
    name: 'Place Order',
    isProtected: true,
  },
  '/buy/3': {
    component: dynamicWrapper(app, ['token'], () => import('../routes/Token/Step3')),
    name: 'Buy CAP',
    isProtected: true,
  },
  '/profile': {
    component: dynamicWrapper(app, ['user'], () => import('../layouts/ProfileLayout')),
    isProtected: true,
  },
  '/profile/home': {
    component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/UserProfile')),
    name: 'Profile',
    isProtected: true,
  },
  '/profile/redeem': {
    component: dynamicWrapper(app, [], () => import('../routes/Profile/Redeem')),
    name: 'Redeem',
    isProtected: true,
  },
  '/exception/403': {
    component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
  },
  '/exception/404': {
    component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
  },
  '/exception/500': {
    component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
  },
  '/user': {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
  },
  '/user/login': {
    component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
  },
  '/user/register': {
    component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
  },
  '/user/register-result': {
    component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
  },
  '/user/confirm': {
    component: dynamicWrapper(app, [], () => import('../routes/User/RegisterConfirm')),
  },
});

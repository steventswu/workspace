import React from 'react';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';
import Exception from './routes/Exception';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

const Loading = <Spin size="large" className={styles.globalSpin} />;
dynamic.setDefaultLoadingComponent(() => Loading);

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const AppLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" component={routerData['/user'].component} />
          <Route path="/performance" render={props => <AppLayout {...props} />} />
          <AuthorizedRoute
            path="/buy"
            render={props => <AppLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
          <AuthorizedRoute
            path="/profile"
            render={props => <AppLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
          <Route exact path="/exception/403" render={Exception.Unauthorized} />
          <Route exact path="/exception/404" render={Exception.NotFound} />
          <Route exact path="/exception/500" render={Exception.InternalError} />
          <Route path="/home" component={routerData['/home'].component} />
          <Redirect to="/home" />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;

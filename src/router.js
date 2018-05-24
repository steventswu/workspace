import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
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
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" component={routerData['/user'].component} />
          <Route path="/performance" render={props => <BasicLayout {...props} />} />
          <AuthorizedRoute
            path="/buy"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
          <AuthorizedRoute
            path="/profile"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
          <Route exact path="/exception/403" render={Exception.Unauthorized} />
          <Route exact path="/exception/404" render={Exception.NotFound} />
          <Route exact path="/exception/500" render={Exception.InternalError} />
          <Route component={routerData['/home'].component} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;

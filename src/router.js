import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './utils/routes';
import styles from './index.less';
import Exception from './routes/Exception';

const { ConnectedRouter } = routerRedux;

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
          <Route exact path="/exception/403" render={Exception.Unauthorized} />
          <Route exact path="/exception/404" render={Exception.NotFound} />
          <Route exact path="/exception/500" render={Exception.InternalError} />
          <Route path="/:app" render={props => <AppLayout {...props} />} />
          <Route path="/" component={routerData['/home'].component} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;

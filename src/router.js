import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import locale from 'antd/lib/locale-provider/default';
import dynamic from 'dva/dynamic';
import { I18nextProvider } from 'react-i18next';
import { getRouterData } from './utils/routes';
import styles from './index.less';
import Exception from './routes/Exception';
import i18n from './i18n';

const { ConnectedRouter } = routerRedux;

const Loading = <Spin size="large" className={styles.globalSpin} />;
dynamic.setDefaultLoadingComponent(() => Loading);

export default function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const AppLayout = routerData['/'].component;

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleProvider locale={locale}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/user" component={routerData['/user'].component} />
            <Route exact path="/exception/403" component={Exception.Unauthorized} />
            <Route exact path="/exception/404" component={Exception.NotFound} />
            <Route exact path="/exception/500" component={Exception.InternalError} />
            <Route path="/:app" render={props => <AppLayout {...props} />} />
            <Route path="/" component={routerData['/home'].component} />
          </Switch>
        </ConnectedRouter>
      </LocaleProvider>
    </I18nextProvider>
  );
}

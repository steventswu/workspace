import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Card, Steps } from 'antd';
import NotFound from 'src/routes/Exception/404';
import { getRoutes } from 'src/utils/utils';
import styles from './style.less';

const { Step } = Steps;

export default class Token extends React.PureComponent {
  getCurrentStep = () => {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case '1':
        return 0;
      case '2':
        return 1;
      case '3':
        return 2;
      default:
        return 0;
    }
  };

  render() {
    const { match, routerData } = this.props;
    return (
      <Card className={styles.container} bordered={false}>
        <React.Fragment>
          <Steps current={this.getCurrentStep()} className={styles.steps}>
            <Step title="Accept Terms" />
            <Step title="Place Orders" />
            <Step title="Buy CAP Tokens" />
          </Steps>
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
            <Redirect exact from="/app/token" to="/app/token/1" />
            <Route render={NotFound} />
          </Switch>
        </React.Fragment>
      </Card>
    );
  }
}

import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Card, Steps } from 'antd';
import NotFound from 'src/routes/Exception/404';
import styles from './TokenLayout.less';

const { Step } = Steps;

export const ROUTE = {
  ROOT: '/buy',
  STEP1: '/buy/1',
  STEP2: '/buy/2',
  STEP3: '/buy/3',
};

export default class TokenLayout extends React.PureComponent {
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
    const { component } = this.props.routerData[this.props.location.pathname] || {};
    return (
      <Card className={styles.container} bordered={false}>
        <React.Fragment>
          {component && (
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="Accept Terms" />
              <Step title="Place Orders" />
              <Step title="Buy CAP" />
            </Steps>
          )}
          <Switch>
            <Redirect exact from={ROUTE.ROOT} to={ROUTE.STEP1} />
            {component ? <Route component={component} /> : <Route render={NotFound} />}
          </Switch>
        </React.Fragment>
      </Card>
    );
  }
}

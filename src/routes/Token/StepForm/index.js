import React, { PureComponent, Fragment } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from '../style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
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
  }
  render() {
    const { match, routerData } = this.props;
    return (
      <Card bordered={false}>
        <Fragment>
          <Steps current={this.getCurrentStep()} className={styles.steps}>
            <Step title="填写转账信息" />
            <Step title="确认转账信息" />
            <Step title="完成" />
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
        </Fragment>
      </Card>
    );
  }
}

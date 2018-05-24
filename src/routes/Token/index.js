import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Card, Steps } from 'antd';
import NotFound from 'src/routes/Exception/404';
import styles from './style.less';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { STEP, ROOT } from './routes';

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
    return (
      <Card className={styles.container} bordered={false}>
        <React.Fragment>
          <Steps current={this.getCurrentStep()} className={styles.steps}>
            <Step title="Accept Terms" />
            <Step title="Place Orders" />
            <Step title="Buy CAP" />
          </Steps>
          <Switch>
            <Route exact path={STEP[1]} component={Step1} />
            <Route exact path={STEP[2]} component={Step2} />
            <Route exact path={STEP[3]} component={Step3} />
            <Redirect exact from={ROOT} to={STEP[1]} />
            <Route render={NotFound} />
          </Switch>
        </React.Fragment>
      </Card>
    );
  }
}

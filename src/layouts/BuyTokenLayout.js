import React from 'react';
import { Redirect } from 'dva/router';
import { Card, Steps } from 'antd';
import styles from './BuyTokenLayout.less';
import { BUY } from '../routes';

const { Step } = Steps;

export const ROUTE = {
  ROOT: BUY,
  STEP1: `${BUY}/1`,
  STEP2: `${BUY}/2`,
  STEP3: `${BUY}/3`,
};

export default function BuyTokenLayout({ children, location }) {
  if (location.pathname === ROUTE.ROOT) {
    return <Redirect from={ROUTE.ROOT} to={ROUTE.STEP1} />;
  }
  const [, step] = location.pathname.match(/\/.*\/(.*)/);
  const current = step - 1;
  return (
    <Card className={styles.container} bordered={false}>
      <React.Fragment>
        <Steps current={current} className={styles.steps}>
          <Step title="Accept Terms" />
          <Step title="Place Orders" />
          <Step title="Buy CAP" />
        </Steps>
        {children}
      </React.Fragment>
    </Card>
  );
}

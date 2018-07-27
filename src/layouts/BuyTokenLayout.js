import React from 'react';
import { Redirect } from 'dva/router';
import { Card, Steps } from 'antd';
import styles from './BuyTokenLayout.less';

const { Step } = Steps;

export const ROUTE = {
  ROOT: '/buy',
  STEP1: '/buy/1',
  STEP2: '/buy/2',
  STEP3: '/buy/3',
};

export default function BuyTokenLayout({ step, children }) {
  return (
    <Card className={styles.container} bordered={false}>
      <React.Fragment>
        <Steps current={step} className={styles.steps}>
          <Step title="Accept Terms" />
          <Step title="Place Orders" />
          <Step title="Buy CAP" />
        </Steps>
        {children || <Redirect from={ROUTE.ROOT} to={ROUTE.STEP1} />}
      </React.Fragment>
    </Card>
  );
}

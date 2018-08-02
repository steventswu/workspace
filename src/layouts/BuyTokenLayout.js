import React from 'react';
import { Redirect } from 'dva/router';
import { Steps } from 'antd';
import styles from './BuyTokenLayout.less';
import { BUY } from '../routes';
import { I18n } from 'react-i18next';

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
    <div className={styles.container}>
      <I18n ns={['buy']}>
        {t => (
          <Steps current={current} className={styles.steps}>
            <Step title={t('accept_terms')} />
            <Step title={t('place_orders')} />
            <Step title={t('complete_purchase')} />
          </Steps>
        )}
      </I18n>
      {children}
    </div>
  );
}

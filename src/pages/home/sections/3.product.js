import React from 'react';
import { Row, Button, Card } from 'antd';
import router from 'umi/router';

import styles from './3.product.less';

const toLogin = () => router.push('/user/login');

export default () => (
  <Row type="flex" className={[styles.centered, styles.row, styles.darkWrapper].join(' ')}>
    <Card className={styles.card} title="CAPP-13BTC" />
    <Button style={{ height: 62, marginTop: 24 }} type="primary" onClick={toLogin}>
      Get Started
    </Button>
  </Row>
);

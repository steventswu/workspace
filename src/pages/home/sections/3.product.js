import React from 'react';
import { Row, Button, Card } from 'antd';

import styles from './3.product.less';

export default ({ onAction }) => (
  <Row type="flex" className={[styles.centered, styles.row, styles.darkWrapper].join(' ')}>
    <Card className={styles.card} title="CAPP-13BTC" />
    <Button style={{ height: 62, marginTop: 24 }} type="primary" onClick={onAction}>
      Get Started
    </Button>
  </Row>
);

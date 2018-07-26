import React from 'react';
import { Row, Button, Card } from 'antd';

import styles from './3.product.less';

export default () => (
  <Row type="flex" className={[styles.centered, styles.row].join(' ')}>
    <Card className={styles.card} title="CAPP-13BTC" />
    <Button type="primary" style={{ marginTop: 24 }}>
      Get Started
    </Button>
  </Row>
);

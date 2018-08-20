import React from 'react';
import { Row, Col as Column, Button, Card } from 'antd';
import * as homeAssets from 'src/assets/home';

import styles from './3.product.less';

export default ({ onAction }) => (
  <Row type="flex" className={[styles.centered, styles.row, styles.darkWrapper].join(' ')}>
    <Row type="flex" className={styles.cardContainer}>
      <img className={styles.blockcastIndexFund} src={homeAssets.blockcastIndexFund} alt="" />
      <img className={styles.micaIndexFund} src={homeAssets.micaIndexFund} alt="" />
    </Row>
    <Button style={{ height: 62, marginTop: 24 }} type="primary" onClick={onAction}>
      Get Started
    </Button>
  </Row>
);

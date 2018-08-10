import React from 'react';
import { Row, Button, Card } from 'antd';
import * as homeAssets from 'src/assets/home';

import styles from './3.product.less';

export default ({ onAction }) => (
  <Row type="flex" className={[styles.centered, styles.row, styles.darkWrapper].join(' ')}>
    <img className={styles.card} src={homeAssets.sectionCard} alt="" />
    <Button style={{ height: 62, marginTop: 24 }} type="primary" onClick={onAction}>
      Get Started
    </Button>
  </Row>
);

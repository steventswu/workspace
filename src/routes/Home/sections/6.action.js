import React from 'react';
import { Row, Button } from 'antd';

import styles from './6.action.less';

export default () => (
  <Row type="flex" className={[styles.centered, styles.row].join(' ')}>
    <h2>Join to the crypto finance future</h2>
    <Button type="primary">Get Started</Button>
  </Row>
);

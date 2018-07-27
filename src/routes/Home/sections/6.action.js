import React from 'react';
import { Row, Col as Column, Button } from 'antd';

import Image from 'src/assets/home/bg_photo_crypto.png';

import styles from './6.action.less';

export default () => (
  <Row type="flex" className={styles.darkWrapper}>
    <Column xs={24} lg={{ span: 8, push: 4 }} className={styles.container}>
      <div className={styles.action}>
        <h3>Join to the crypto finance future</h3>
        <Button style={{ height: 62 }} type="primary">
          Get Started
        </Button>
      </div>
    </Column>
    <Column xs={0} lg={{ span: 12, push: 4 }}>
      <img src={Image} alt="" className={styles.photo} />
    </Column>
  </Row>
);

import React from 'react';
import { Row, Col as Column, Button } from 'antd';
import Image from 'src/assets/home/bg_photo_crypto.png';

import styles from './6.action.less';

export default ({ onAction }) => (
  <Row type="flex" className={styles.darkWrapper}>
    <Column xs={24} lg={{ span: 8, push: 4 }} className={styles.container}>
      <div className={styles.action}>
        <h2>
          CAP breaks the entry barrier for crypto investors, helping them to hold market in just one
          click
        </h2>
        <h3>by Charlene Hong,</h3>
        <h3 style={{ lineHeight: 0, marginBottom: 20 }}>former Yahoo Taiwan Managing Director</h3>
        <Button style={{ height: 62 }} type="primary" onClick={onAction}>
          Get Started
        </Button>
      </div>
    </Column>
    <Column xs={0} lg={{ span: 12, push: 4 }}>
      <img src={Image} alt="" className={styles.photo} />
    </Column>
  </Row>
);

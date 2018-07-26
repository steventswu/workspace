import React from 'react';
import { Row, Col as Column } from 'antd';
import * as homeAssets from 'src/assets/home';

import styles from './2.features.less';

const content = {
  withdraw_anytime: {
    title: 'Withdraw anytime',
    content: 'No broker fee, no exit fee and full control over your investment on CAP',
  },
  zero_entry_barrier: {
    title: '0 Entry barrier',
    content: 'Hold a CAP token instead of 10+ coins, CAP token represents 85% of the market',
  },
  better_performing: {
    title: 'Better Performing',
    content: 'Maximize your profit with cutting-edge AI technology',
  },
};

export default () => (
  <Row className={styles.row}>
    <Column xs={0} md={24} className={styles.odd}>
      <Column span={6}>
        <img style={{ width: '100%' }} src={homeAssets.withdrawGif} alt="" />
      </Column>
      <Column span={8} push={4} className={styles.desc}>
        <div>
          <h3>{content.withdraw_anytime.title}</h3>
          <p>{content.withdraw_anytime.content}</p>
        </div>
      </Column>
    </Column>
    <Column xs={0} md={24} className={styles.even}>
      <Column span={6}>
        <img style={{ width: '100%' }} src={homeAssets.barrierGif} alt="" />
      </Column>
      <Column span={8} push={2} className={styles.desc}>
        <div>
          <h3>{content.zero_entry_barrier.title}</h3>
          <p>{content.zero_entry_barrier.content}</p>
        </div>
      </Column>
    </Column>
    <Column xs={0} md={24} className={styles.odd}>
      <Column span={6}>
        <img style={{ width: '100%' }} src={homeAssets.performingGif} alt="" />
      </Column>
      <Column span={8} push={4} className={styles.desc}>
        <div>
          <h3>{content.better_performing.title}</h3>
          <p>{content.better_performing.content}</p>
        </div>
      </Column>
    </Column>
    <Column xs={24} md={0}>
      <div>
        <h3>{content.withdraw_anytime.title}</h3>
        <p>{content.withdraw_anytime.content}</p>
      </div>
    </Column>
  </Row>
);

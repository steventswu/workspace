import React from 'react';
import { Row, Col as Column, Carousel } from 'antd';
import * as homeAssets from 'src/assets/home';

import styles from './2.features.less';

const content = {
  withdraw_anytime: {
    title: 'Withdraw Anytime',
    content: 'No broker fee, no exit fee and full control over your investment on CAP',
  },
  zero_entry_barrier: {
    title: '0 Entry Barrier',
    content: 'Hold a CAP token instead of 10+ coins, CAP token represents 85% of the market',
  },
  better_performing: {
    title: 'Better Performing',
    content: 'Maximize your profit with cutting-edge AI technology',
  },
};

export default () => (
  <Row className={[styles.row, styles.container].join(' ')}>
    <Column xs={0} md={24}>
      <Row type="flex" className={styles.odd}>
        <Column span={6}>
          <img
            className={styles.gifShadow}
            src={homeAssets.withdrawGif}
            // srcSet={`${homeAssets.withdraw['2x']} 2x, ${homeAssets.withdraw['3x']} 3x`}
            alt=""
          />
        </Column>
        <Column span={8} push={4} className={styles.desc}>
          <div>
            <h3>{content.withdraw_anytime.title}</h3>
            <p>{content.withdraw_anytime.content}</p>
          </div>
        </Column>
      </Row>
    </Column>
    <Column xs={0} md={24}>
      <Row type="flex" className={styles.even}>
        <Column span={6}>
          <img
            className={styles.gifShadow}
            src={homeAssets.barrierGif}
            // srcSet={`${homeAssets.barrier['2x']} 2x, ${homeAssets.barrier['3x']} 3x`}
            alt=""
          />
        </Column>
        <Column span={8} push={2} className={styles.desc}>
          <div>
            <h3>{content.zero_entry_barrier.title}</h3>
            <p>{content.zero_entry_barrier.content}</p>
          </div>
        </Column>
      </Row>
    </Column>
    <Column xs={0} md={24}>
      <Row type="flex" className={styles.odd}>
        <Column span={6}>
          <img
            className={styles.gifShadow}
            src={homeAssets.performingGif}
            // srcSet={`${homeAssets.performing['2x']} 2x, ${homeAssets.performing['3x']} 3x`}
            alt=""
          />
        </Column>
        <Column span={8} push={4} className={styles.desc}>
          <div>
            <h3>{content.better_performing.title}</h3>
            <p>{content.better_performing.content}</p>
          </div>
        </Column>
      </Row>
    </Column>
    <Column xs={24} md={0}>
      <Carousel className={styles.carousel}>
        <div className={styles.desc}>
          <img
            className={styles.carouselMobile}
            src={homeAssets.withdrawGif}
            // srcSet={`${homeAssets.withdraw['2x']} 2x, ${homeAssets.withdraw['3x']} 3x`}
            alt=""
          />
          <h3>{content.withdraw_anytime.title}</h3>
          <p>{content.withdraw_anytime.content}</p>
        </div>
        <div className={styles.desc}>
          <img
            className={styles.carouselMobile}
            src={homeAssets.barrierGif}
            // srcSet={`${homeAssets.barrier['2x']} 2x, ${homeAssets.barrier['3x']} 3x`}
            alt=""
          />
          <h3>{content.zero_entry_barrier.title}</h3>
          <p>{content.zero_entry_barrier.content}</p>
        </div>
        <div className={styles.desc}>
          <img
            className={styles.carouselMobile}
            src={homeAssets.performingGif}
            // srcSet={`${homeAssets.performing['2x']} 2x, ${homeAssets.performing['3x']} 3x`}
            alt=""
          />
          <h3>{content.better_performing.title}</h3>
          <p>{content.better_performing.content}</p>
        </div>
      </Carousel>
    </Column>
  </Row>
);

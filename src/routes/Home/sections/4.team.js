import React from 'react';
import { Row, Col as Column, Carousel } from 'antd';
import * as homeAssets from 'src/assets/home';

import styles from './4.team.less';

const Team = {
  Chris: (
    <div className={[styles.flexCentered, styles.carousel_item].join(' ')}>
      <img
        src={homeAssets.chris['1x']}
        srcSet={`${homeAssets.chris['2x']} 2x, ${homeAssets.chris['3x']} 3x`}
        alt="Chris"
      />
      <h3 style={{ marginBottom: 0, marginTop: 20 }}>Chris</h3>
      <p>Founder</p>
    </div>
  ),
  Constance: (
    <div className={[styles.flexCentered, styles.carousel_item].join(' ')}>
      <img
        src={homeAssets.constance['1x']}
        srcSet={`${homeAssets.constance['2x']} 2x, ${homeAssets.constance['3x']} 3x`}
        alt="Constance"
      />
      <h3 style={{ marginBottom: 0, marginTop: 20 }}>Constance</h3>
      <p>CMO, Partner</p>
    </div>
  ),
  Darren: (
    <div className={[styles.flexCentered, styles.carousel_item].join(' ')}>
      <img
        src={homeAssets.darren['1x']}
        srcSet={`${homeAssets.darren['2x']} 2x, ${homeAssets.darren['3x']} 3x`}
        alt="Darren"
      />
      <h3 style={{ marginBottom: 0, marginTop: 20 }}>Darren</h3>
      <p>CSO, Partner</p>
    </div>
  ),
  CP: (
    <div className={[styles.flexCentered, styles.carousel_item].join(' ')}>
      <img
        src={homeAssets.cp['1x']}
        srcSet={`${homeAssets.cp['2x']} 2x, ${homeAssets.cp['3x']} 3x`}
        alt="CP"
      />
      <h3 style={{ marginBottom: 0, marginTop: 20 }}>CP</h3>
      <p>CTO, Partner</p>
    </div>
  ),
};

export default () => (
  <Row
    type="flex"
    className={[styles.centered, styles.row].join(' ')}
    style={{ marginBottom: 24, paddingTop: 48, paddingBottom: 48 }}
  >
    <h2 className={styles.title}>Team</h2>
    <Column xs={0} lg={24}>
      <Column lg={12} xl={6}>
        {Team.Chris}
      </Column>
      <Column lg={12} xl={6}>
        {Team.Constance}
      </Column>
      <Column lg={12} xl={6}>
        {Team.Darren}
      </Column>
      <Column lg={12} xl={6}>
        {Team.CP}
      </Column>
    </Column>
    <Column xs={24} lg={0}>
      <Carousel>
        {Team.Chris}
        {Team.Constance}
        {Team.Darren}
        {Team.CP}
      </Carousel>
    </Column>
  </Row>
);

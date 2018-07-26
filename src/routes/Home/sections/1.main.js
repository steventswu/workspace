import React from 'react';
import { Row, Col as Column, Slider, Button } from 'antd';
import styles from './1.main.less';

// prettier-ignore
const content = {
  title: 'CAP',
  subtitle: 'Crypto Asset Platform ("CAP")',
  desc: 'Trade with confidence on the world\'s leading crypto asset platform',
  footer: 'Join with fund managers on managing investment portfolios of cryptocurrencies',
  quote: {
    content: '"CAP breaks the entry barrier for crypto investors, helping them to hold market in just one click."',
    source: 'by Charlene Hong, former Yahoo Taiwan Managing Director',
  },
};

export default () => (
  <main className={styles.main}>
    <Row className={styles.intro} gutter={48}>
      <Column xs={24} md={{ span: 10, push: 1 }} style={{ marginBottom: 24 }}>
        <div className={styles.title_container}>
          <h1>{content.title}</h1>
          <p>{content.subtitle}</p>
          <p>{content.desc}</p>
          {content.footer}
        </div>
      </Column>
      <Column xs={24} md={14} style={{ marginBottom: 24 }}>
        <div className={styles.investment_container}>
          <h2>Investing Amount</h2>
          <Slider tipFormatter={null} />
          <p>1,000 CAP</p>
          <p>CAP 1:1 ETH</p>
          <h2>Tenor</h2>
          <Slider range marks={{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 }} min={1} max={7} />
          <p>Month</p>
          <Row gutter={8} className={styles.return_container}>
            <Column span={7} push={4}>
              <div>257%</div>
              <div className={styles.label}>Return</div>
            </Column>
            <Column span={2} push={4}>
              =
            </Column>
            <Column span={10} push={4}>
              <div>200 ETH</div>
              <div className={styles.label}>Earn</div>
            </Column>
          </Row>
        </div>
      </Column>
    </Row>
    <Row className={styles.start}>
      <Column span={8} push={8} pull={8}>
        <Button type="primary">Get Started</Button>
      </Column>
    </Row>
  </main>
);

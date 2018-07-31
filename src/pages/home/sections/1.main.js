import React from 'react';
import { Row, Col as Column, Slider, Button } from 'antd';
import ImageSet from 'src/components/ImageSet';
import { eth } from 'src/assets/home';
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


export default ({ onAction }) => (
  <main className={styles.main}>
    <Row className={styles.intro} gutter={48}>
      <Column xs={24} lg={{ span: 10 }} style={{ marginBottom: 24 }}>
        <div className={styles.title_container}>
          <h1>{content.title}</h1>
          <p>{content.subtitle}</p>
          <p>{content.desc}</p>
          {content.footer}
        </div>
      </Column>
      <Column xs={24} lg={{ span: 13, push: 1 }} style={{ marginBottom: 24 }}>
        <span className={styles.investment_container}>
          <h2>Investing Amount</h2>
          <Slider tipFormatter={null} />
          <p>1,000 CAP</p>
          <h2>Tenor</h2>
          <Slider tipFormatter={null} range />
          <p>2017/6/15 ~ 2018/5/1</p>
          <Row gutter={8} className={styles.return_container}>
            <Column xs={{ span: 3 }} xl={{ span: 2 }}>
              =
            </Column>
            <Column xs={{ span: 21 }} xl={{ span: 6 }}>
              <div>
                20%
                <span className={styles.label}>Return</span>
              </div>
            </Column>
            <Column xs={{ span: 21, push: 3 }} xl={{ span: 14 }}>
              <div>
                200
                <ImageSet {...eth} alt="ETH" style={{ margin: 5 }} />
                <span className={styles.label}>Earn</span>
              </div>
            </Column>
          </Row>
        </span>
      </Column>
    </Row>
    <Row className={styles.start}>
      <Column xs={{ span: 20, push: 2, pull: 2 }} lg={{ span: 9, push: 7, pull: 7 }}>
        <Button style={{ height: 62 }} type="primary" onClick={onAction}>
          Get Started
        </Button>
      </Column>
    </Row>
  </main>
);

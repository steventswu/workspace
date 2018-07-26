import React from 'react';
import { Row, Carousel } from 'antd';

import styles from './5.news.less';

export default () => (
  <Row className={styles.row}>
    <Carousel className={styles.newsContainer}>
      <div className={styles.news}>
        <p>"7 hottest Fintech Startups in Taiwan"</p>
        by Fintech New Hong Kong
      </div>
      <div className={styles.news}>
        <p>
          "The quant trading model is able to eliminate human judgment. It also comprehends
          information to forecast market movements and captures opportunities quickly." Tixguru
          founder and CEO Chris Liu siad.
        </p>
        by The EDGE MARKETS
      </div>
      <div className={styles.news}>
        <p>
          “もう一つの AI ユーザであるシンガポール拠点のスタートアップ Tixguru
          は、金融機関向けのクオンツトレーディング推奨機能に特化している。COO の James Ong
          氏によれば、同社のロボットアドバイザーは、この業界での十年以上の経験に基づいて生まれたものだそうだ。”
        </p>
        by THE BRIDG
      </div>
    </Carousel>
  </Row>
);

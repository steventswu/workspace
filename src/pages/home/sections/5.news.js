import React from 'react';
import { Row, Carousel } from 'antd';

import ImageSet from 'src/components/ImageSet';
import * as homeAssets from 'src/assets/home';

import styles from './5.news.less';

export default () => (
  <Row className={styles.row}>
    <Carousel className={styles.newsContainer}>
      <div className={styles.news}>
        <ImageSet {...homeAssets.colon} alt="" />
        <p style={{ paddingTop: 30 }}>"7 hottest Fintech Startups in Taiwan"</p>
        by Fintech New Hong Kong
        <a
          href="http://fintechnews.hk/5259/taiwan/hottest-fintech-startups-in-taiwan/"
          target="_blank"
        >
          <ImageSet {...homeAssets.logo.finTechHK} alt="" />
        </a>
      </div>
      <div className={styles.news}>
        <ImageSet {...homeAssets.colon} alt="" />
        <p>
          "The quant trading model is able to eliminate human judgment. It also comprehends
          information to forecast market movements and captures opportunities quickly." Tixguru
          founder and CEO Chris Liu siad.
        </p>
        by The EDGE MARKETS
        <a
          href="http://www.theedgemarkets.com/article/fintech-liberalising-quant-trading-retail-investors"
          target="_blank"
        >
          <ImageSet {...homeAssets.logo.edgeMarket} alt="" />
        </a>
      </div>
      <div className={styles.news}>
        <ImageSet {...homeAssets.colon} alt="" />
        <p>
          “もう一つの AI ユーザであるシンガポール拠点のスタートアップ Tixguru
          は、金融機関向けのクオンツトレーディング推奨機能に特化している。COO の James Ong
          氏によれば、同社のロボットアドバイザーは、この業界での十年以上の経験に基づいて生まれたものだそうだ。”
        </p>
        by THE BRIDGE
        <a
          href="http://thebridge.jp/2017/08/startupbootcamp-fintech-2017-demoday-in-tokyo"
          target="_blank"
        >
          <ImageSet {...homeAssets.logo.theBridge} alt="" />
        </a>
      </div>
    </Carousel>
  </Row>
);

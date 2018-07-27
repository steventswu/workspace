import React from 'react';
import { Layout, Row, Col as Column, Button } from 'antd';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import GlobalHeader from 'src/components/GlobalHeader';
import DocumentTitle from 'react-document-title';

import PortfolioCard from 'src/components/PortfolioCard';
import AppFooter from 'src/components/AppFooter';
import aboutLogo from 'src/assets/aboutLogo.svg';
import logo from 'src/assets/logo.svg';
import layoutStyles from 'src/layouts/common.less';
import { DATA, CAPP01, CAPM01, CAPI01 } from 'src/utils/contract';

import styles from './HomePage.less';

const Home = ({
  t,
  isLoading,
  currentUser,
  onClickLogout,
  onClickLogin,
  onSelectCard,
  onClickDetails,
  selectedCard,
}) => (
  <DocumentTitle title="CAP, Cryptocurrency Assets Portfolio - The first Crypto index fund | Tixguru">
    <Layout className={styles.layout}>
      <section className={classNames(styles.section, styles.main)}>
        <Layout className={layoutStyles.container}>
          <Layout.Header>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              onClickLogout={onClickLogout}
              onClickLogin={onClickLogin}
              isLoading={isLoading}
            />
          </Layout.Header>
          <Layout.Content className={styles.content}>
            <Row type="flex" justify="start" align="middle">
              <Column offset={1}>
                <h1>{t('title')}</h1>
                <div className={styles.mainInfo}>
                  <h2>{t('subtitle')}</h2>
                  {/* <div>
                      <span className={styles.integer}>
                        217<span className={styles.float}>.43</span>
                      </span>
                      <div className={styles.status}>&#9650; 0.30%</div>
                    </div> */}
                </div>
              </Column>
            </Row>
          </Layout.Content>
        </Layout>
      </section>
      <section className={styles.section}>
        <Row
          className={classNames(layoutStyles.container, styles.about)}
          type="flex"
          justify="center"
          align="middle"
        >
          <Column span={6}>
            <img className={styles.aboutLogo} src={aboutLogo} alt="" />
          </Column>
          <Column className={styles.aboutInfo} span={12}>
            <h3>{t('about')}</h3>
            <ul>
              {t('about_content', { returnObjects: true }).map((content, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i}>{content}</li>
              ))}
            </ul>
          </Column>
        </Row>
      </section>
      <section
        style={{ marginBottom: 100 }}
        className={classNames(styles.section, layoutStyles.container)}
      >
        <Row>
          <Column className={styles.portfolioColumn} span={8}>
            <PortfolioCard
              data={DATA[CAPM01]}
              selected={selectedCard === DATA[CAPM01].key}
              onSelect={onSelectCard}
              inactive
            />
            <Button
              className={classNames(styles.action)}
              // type="primary"
              size="large"
              disabled
              // onClick={this.handleClick(DATA[CAPM01])}
            >
              {t('coming_soon')}
            </Button>
          </Column>
          <Column className={styles.portfolioColumn} span={8}>
            <PortfolioCard
              data={DATA[CAPP01]}
              selected={selectedCard === DATA[CAPP01].key}
              onSelect={onSelectCard}
            />
            <Button
              className={classNames(styles.action)}
              type="primary"
              size="large"
              onClick={onClickDetails(DATA[CAPP01])}
            >
              {t('more_details')}
            </Button>
          </Column>
          <Column className={styles.portfolioColumn} span={8}>
            <PortfolioCard
              data={DATA[CAPI01]}
              selected={selectedCard === DATA[CAPI01].key}
              onSelect={onSelectCard}
              inactive
            />
            <Button
              className={classNames(styles.action)}
              // type="primary"
              size="large"
              disabled
              // onClick={this.handleClick(DATA[CAPI01])}
            >
              {t('coming_soon')}
            </Button>
          </Column>
        </Row>
      </section>
      <Layout.Footer>
        <AppFooter />
      </Layout.Footer>
    </Layout>
  </DocumentTitle>
);

export default translate('home')(Home);

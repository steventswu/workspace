import React from 'react';
import { Layout, Row, Col as Column, Button } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import GlobalHeader from 'src/components/GlobalHeader';
import DocumentTitle from 'react-document-title';

import PortfolioCard from 'src/components/PortfolioCard';
import AppFooter from 'src/components/AppFooter';
import aboutLogo from 'src/assets/aboutLogo.svg';
import logo from 'src/assets/logo.svg';
import layoutStyles from 'src/layouts/common.less';
import { DATA, CAPP01, CAPM01, CAPI01 } from 'src/utils/contract';
import { translate } from 'react-i18next';

import styles from './HomePage.less';

@connect(({ user, loading }) => ({
  currentUser: user.email,
  isLoading: loading.models.auth,
}))
@translate('home')
export default class HomePage extends React.Component {
  state = {
    selected: null,
  };

  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.dispatch({ type: 'auth/fetchMember' });
    }
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  handleLogin = () => {
    this.props.dispatch(routerRedux.push('/user/login'));
  };

  handleSelect = selected => {
    if (this.state.selected === selected) return this.setState({ selected: null });
    this.setState({ selected });
  };

  handleClick = id => () => {
    this.props.dispatch(routerRedux.push({ pathname: '/performance', state: { id } }));
  };

  render() {
    const { t } = this.props;
    return (
      <DocumentTitle title="CAP, Cryptocurrency Assets Portfolio - The first Crypto index fund | Tixguru">
        <Layout className={styles.layout}>
          <section className={classNames(styles.section, styles.main)}>
            <Layout className={layoutStyles.container}>
              <Layout.Header>
                <GlobalHeader
                  logo={logo}
                  currentUser={this.props.currentUser}
                  onClickLogout={this.handleLogout}
                  onClickLogin={this.handleLogin}
                  isLoading={this.props.isLoading}
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
                  selected={this.state.selected === DATA[CAPM01].key}
                  onSelect={this.handleSelect}
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
                  selected={this.state.selected === DATA[CAPP01].key}
                  onSelect={this.handleSelect}
                />
                <Button
                  className={classNames(styles.action)}
                  type="primary"
                  size="large"
                  onClick={this.handleClick(DATA[CAPP01])}
                >
                  {t('more_details')}
                </Button>
              </Column>
              <Column className={styles.portfolioColumn} span={8}>
                <PortfolioCard
                  data={DATA[CAPI01]}
                  selected={this.state.selected === DATA[CAPI01].key}
                  onSelect={this.handleSelect}
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
  }
}

import React from 'react';
import { Layout, Row, Col as Column, Button } from 'antd';
import classNames from 'classnames';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import GlobalHeader from 'src/components/GlobalHeader';
import PortfolioCard from 'src/components/PortfolioCard';
import AppFooter from 'src/components/AppFooter';
import aboutLogo from 'src/assets/aboutLogo.svg';
import logo from 'src/assets/logo.svg';
import layoutStyles from 'src/layouts/common.less';
import { DATA } from 'src/utils/contract';

import styles from './HomePage.less';

@connect(({ user }) => ({
  currentUser: user,
}))
export default class HomePage extends React.Component {
  state = {
    selected: null,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  handleLogin = () => {
    this.props.dispatch(routerRedux.push('/user/login'));
  };

  handleHeaderClick = () => {
    this.props.dispatch(routerRedux.push(this.props.currentUser ? '/profile' : '/user/login'));
  };

  handleSelect = selected => {
    if (this.state.selected === selected) return this.setState({ selected: null });
    this.setState({ selected });
  };

  handleClick = id => () => {
    this.props.dispatch(routerRedux.push({ pathname: '/performance', state: { id } }));
  };

  render() {
    const isSelected = [
      this.state.selected === DATA[0].key,
      this.state.selected === DATA[1].key,
      this.state.selected === DATA[2].key,
    ];
    return (
      <DocumentTitle title="CAP">
        <Layout className={styles.layout}>
          <section className={classNames(styles.section, styles.main)}>
            <Layout className={layoutStyles.container}>
              <Layout.Header>
                <GlobalHeader
                  logo={logo}
                  currentUser={this.props.currentUser}
                  onClick={this.handleHeaderClick}
                />
              </Layout.Header>
              <Layout.Content className={styles.content}>
                <Row type="flex" justify="start" align="middle">
                  <Column offset={1}>
                    <h1>CAP</h1>
                    <div className={styles.mainInfo}>
                      <h2>The First Smart Index Fund</h2>
                      <div>
                        <span className={styles.integer}>
                          217<span className={styles.float}>.43</span>
                        </span>
                        <div className={styles.status}>&#9650; 0.30%</div>
                      </div>
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
                <h3>About CAP Service</h3>
                <ul>
                  <li>
                    Suitable for user who are first time getting to know Digital Asset. Buying CAP
                    can effectively avoid the risk with wide fluctuations.
                  </li>
                  <li>
                    Selecting the cryptocurrencies which perform excellent in the market every two
                    weeks to find the most optimal risk-reward ratio.
                  </li>
                  <li>
                    The platform will update the currency basket from portfolio automatically and
                    use quantitative algorithms to filter out the underperformed cyptocurrencies.
                  </li>
                  <li>
                    Adding trailing Stop-loss system can effectively reduce the risk and lock in the
                    profit.
                  </li>
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
                  data={DATA[0]}
                  selected={isSelected[0]}
                  onSelect={this.handleSelect}
                  inactive
                />
                <Button
                  className={classNames(styles.action)}
                  // type="primary"
                  size="large"
                  disabled
                  // onClick={this.handleClick(DATA[0])}
                >
                  Coming Soon
                </Button>
              </Column>
              <Column className={styles.portfolioColumn} span={8}>
                <PortfolioCard
                  data={DATA[1]}
                  selected={isSelected[1]}
                  onSelect={this.handleSelect}
                />
                <Button
                  className={classNames(styles.action)}
                  type="primary"
                  size="large"
                  onClick={this.handleClick(DATA[1])}
                >
                  More Details
                </Button>
              </Column>
              <Column className={styles.portfolioColumn} span={8}>
                <PortfolioCard
                  data={DATA[2]}
                  selected={isSelected[2]}
                  onSelect={this.handleSelect}
                  inactive
                />
                <Button
                  className={classNames(styles.action)}
                  // type="primary"
                  size="large"
                  disabled
                  // onClick={this.handleClick(DATA[2])}
                >
                  Coming Soon
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

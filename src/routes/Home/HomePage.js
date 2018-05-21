import React from 'react';
import { Layout, Row, Col as Column, Button, Icon } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import GlobalHeader from 'components/GlobalHeader';
import PortfolioCard from 'components/PortfolioCard';
import GlobalFooter from 'components/GlobalFooter';
import aboutLogo from 'assets/aboutLogo.svg';
import logo from 'assets/logo.svg';

import styles from './HomePage.less';
import card from './card.json';

@connect()
export default class HomePage extends React.Component {
  state = {
    selected: null,
  };

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }

  handleLogin = () => {
    this.props.dispatch(routerRedux.push('/user/login'));
  };

  handleSelect = selected => {
    if (this.state.selected === selected) return this.setState({ selected: null });
    this.setState({ selected });
  };

  render() {
    const isSelected = [
      this.state.selected === card.data[0].id,
      this.state.selected === card.data[1].id,
      this.state.selected === card.data[2].id,
    ];
    return (
      <Layout style={{ background: '#fff' }}>
        <section className={classNames(styles.section, styles.main)}>
          <Layout className={styles.container}>
            <Layout.Header>
              <GlobalHeader
                logo={logo}
                currentUser={this.props.currentUser}
                onLogin={this.handleLogin}
              />
            </Layout.Header>
            <Layout.Content className={styles.content}>
              <Row style={{ width: '100%' }} type="flex" justify="start" align="middle">
                <Column offset={2}>
                  <h1>CAP</h1>
                  <h2>The First Smart Index Fund</h2>
                  <div>
                    217.43
                    <div>&#9650; 0.30%</div>
                  </div>
                </Column>
              </Row>
            </Layout.Content>
          </Layout>
        </section>
        <section className={styles.section}>
          <Row
            className={classNames(styles.container, styles.about)}
            type="flex"
            justify="center"
            align="middle"
          >
            <Column span={6}>
              <img className={styles.aboutLogo} src={aboutLogo} alt="" />
            </Column>
            <Column span={12}>
              <h3>About</h3>
              <p>
                量化分析連續漲跌偵測 大跌幅買避險部位 淺力幣 突破偵測套利搬磚 頭部底部確認
                量化濾網進出場機制 獲利上調設定 trailing stop
              </p>
            </Column>
          </Row>
        </section>
        <section className={classNames(styles.section, styles.container)}>
          <Row>
            <Column className={styles.portfolioColumn} span={8}>
              <PortfolioCard
                data={card.data[0]}
                selected={isSelected[0]}
                onSelect={this.handleSelect}
              />
              <Button
                className={classNames(styles.action, { [styles.hidden]: !isSelected[0] })}
                type="primary"
                size="large"
              >
                More Details
              </Button>
            </Column>
            <Column className={styles.portfolioColumn} span={8}>
              <PortfolioCard
                data={card.data[1]}
                selected={isSelected[1]}
                onSelect={this.handleSelect}
              />
              <Button
                className={classNames(styles.action, { [styles.hidden]: !isSelected[1] })}
                type="primary"
                size="large"
              >
                More Details
              </Button>
            </Column>
            <Column className={styles.portfolioColumn} span={8}>
              <PortfolioCard
                data={card.data[2]}
                selected={isSelected[2]}
                onSelect={this.handleSelect}
              />
              <Button
                className={classNames(styles.action, { [styles.hidden]: !isSelected[2] })}
                type="primary"
                size="large"
              >
                More Details
              </Button>
            </Column>
          </Row>
        </section>
        <section className={styles.section} />
        <Layout.Footer>
          <GlobalFooter
            copyright={
              <React.Fragment>
                Copyright <Icon type="copyright" /> 2018 Tixguru
              </React.Fragment>
            }
          />
        </Layout.Footer>
      </Layout>
    );
  }
}

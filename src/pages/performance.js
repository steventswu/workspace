import React, { PureComponent, Fragment } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Tooltip, Icon } from 'antd';
import HighchartsReact from 'react-highcharts/';
import { ChartCard } from 'components/Charts';
// import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import NavTable from 'components/NavTable';
import { translate } from 'react-i18next';
import HoldingsTable from 'components/HoldingsTable';
import { navChartOptions } from 'src/utils/options';
// import idx from 'idx';
// import moment from 'moment';
import styles from './performance.less';
@translate('performance')
@connect(({ performance }) => ({
  performance,
}))
export default class BasicPerformance extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'performance/fetchPerformance',
      // payload: {
      //   type: 'cap01'
      // }
    });
    this.props.dispatch({
      type: 'performance/fetchNavChartData',
    });
    this.props.dispatch({
      type: 'performance/fetchAnalysisData',
    });
    setInterval(() => {
      this.props.dispatch({ type: 'performance/fetchPerformance' });
    }, 5 * 60 * 1000);
  }

  handleRowClick = record => {
    this.props.dispatch({
      type: 'performance/fetchCoinData',
      payload: {
        startDate: '2017-01-01',
        symbol: record.coin.name.toLowerCase(),
      },
    });
  };

  render() {
    const { performance } = this.props;
    const { info } = performance;

    // Set Options for Highstock
    HighchartsReact.Highcharts.setOptions({
      lang: {
        thousandsSep: ',',
      },
    });

    // const priceusd = [];
    // for (let i = 0; i < performance.coin.length; i += 1) {
    //   priceusd.push({
    //     x: moment(new Date(performance.coin[i].priceusd[0])).format('YYYY-MM-DD'),
    //     y: performance.coin[i].priceusd[1],
    //   });
    // }
    const { t } = this.props;
    return (
      <Fragment>
        <section>
          <Title title={t('net_asset_value')} />
          <Row gutter={24}>
            <Col xl={8} style={{ marginBottom: 24 }}>
              <ChartCard
                title={t('nav')}
                action={
                  <Tooltip title={t('eth')}>
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={<span className={styles.nav}>{numeral(info.nav).format('0,0.[0000]')}</span>}
                contentHeight={168}
                style={{ marginBottom: 24 }}
              >
                <Row
                  type="flex"
                  justify="space-between"
                  style={{ flexWrap: 'nowrap', overflow: 'scroll' }}
                >
                  <Col>
                    <NumberInfo
                      title={<span>{t('historical')}</span>}
                      status={info['nav-historical'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-historical'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {numeral(info['nav-historical']).format('0,0.[0000]')}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={parseFloat(info['nav-historical-pct']) < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            parseFloat(info['nav-historical-pct']) < 0
                              ? styles.subtotalDown
                              : styles.subtotalUp
                          }
                        >
                          {numeral(info['nav-historical-pct']).format('0,0.[0000]')}%
                        </span>
                      }
                    />
                  </Col>
                  <Col>
                    <NumberInfo
                      title={<span>{t('hour')}</span>}
                      status={info['nav-hour'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={info['nav-hour'] < 0 ? styles.subtotalDown : styles.subtotalUp}
                        >
                          {numeral(info['nav-hour']).format('0,0.[0000]')}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={parseFloat(info['nav-hour-pct']) < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            parseFloat(info['nav-hour-pct']) < 0
                              ? styles.subtotalDown
                              : styles.subtotalUp
                          }
                        >
                          {numeral(info['nav-hour-pct']).format('0,0.[0000]')}%
                        </span>
                      }
                    />
                  </Col>
                  <Col>
                    <NumberInfo
                      title={<span>{t('day')}</span>}
                      status={info['nav-day'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={info['nav-day'] < 0 ? styles.subtotalDown : styles.subtotalUp}
                        >
                          {numeral(info['nav-day']).format('0,0.[0000]')}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={parseFloat(info['nav-day-pct']) < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            parseFloat(info['nav-day-pct']) < 0
                              ? styles.subtotalDown
                              : styles.subtotalUp
                          }
                        >
                          {numeral(info['nav-day-pct']).format('0,0.[0000]')}%
                        </span>
                      }
                    />
                  </Col>
                  <Col>
                    <NumberInfo
                      title={<span>{t('week')}</span>}
                      status={info['nav-week'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={info['nav-week'] < 0 ? styles.subtotalDown : styles.subtotalUp}
                        >
                          {numeral(info['nav-week']).format('0,0.[0000]')}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={info['nav-week-pct'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-week-pct'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {numeral(info['nav-week-pct']).format('0,0.[0000]')}%
                        </span>
                      }
                    />
                  </Col>
                  <Col>
                    <NumberInfo
                      title={<span>{t('month')}</span>}
                      status={info['nav-month'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-month'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {numeral(info['nav-month']).format('0,0.[0000]')}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={parseFloat(info['nav-month-pct']) < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            parseFloat(info['nav-month-pct']) < 0
                              ? styles.subtotalDown
                              : styles.subtotalUp
                          }
                        >
                          {numeral(info['nav-month-pct']).format('0,0.[0000]')}%
                        </span>
                      }
                    />
                  </Col>
                </Row>
              </ChartCard>
              <ChartCard
                title={t('cap_supply')}
                action={
                  <Tooltip title={t('unit')}>
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={
                  <span className={styles.nav}>
                    {numeral(info['cap-supply']).format('0,0.[0000]')}
                  </span>
                }
                contentHeight={150}
                style={{ marginBottom: 24 }}
              />
              <ChartCard
                title={t('fund_size')}
                action={
                  <Tooltip title={t('eth')}>
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={
                  <span className={styles.nav}>{numeral(info.fundsize).format('0,0.[0000]')}</span>
                }
                contentHeight={150}
              />
            </Col>
            <Col xs={0} xl={16} style={{ marginBottom: 24 }}>
              <ChartCard style={{ width: '100%' }}>
                <HighchartsReact
                  performance={performance}
                  config={navChartOptions(performance)}
                  isPureConfig
                />
                <NavTable performance={performance} />
              </ChartCard>
            </Col>
          </Row>
        </section>
        <section>
          <Row type="flex" justify="space-between" align="middle">
            <Title title={t('table_of_holdings')} />
            <Subtitle title={`${info.ofallmarketcap} ${t('of_all_market_cap')}`} />
          </Row>
          <Row gutter={24}>
            <Col style={{ marginBottom: 24 }}>
              <HoldingsTable performance={performance} onRowClick={this.handleRowClick} />
            </Col>
          </Row>
        </section>
      </Fragment>
    );
  }
}

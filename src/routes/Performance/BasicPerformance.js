import React, { PureComponent, Fragment } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Tooltip, Icon } from 'antd';
import HighchartsReact from 'react-highcharts/';
import { ChartCard, dollar } from 'components/Charts';
// import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import NavTable from 'components/NavTable';
import HoldingsTable from 'components/HoldingsTable';
import { navChartOptions } from './options';
// import idx from 'idx';
// import moment from 'moment';
import styles from './BasicPerformance.less';

const Dollar = ({ children }) => (
  <span
    className={styles.nav}
    dangerouslySetInnerHTML={{ __html: dollar(children) }}
  /> /* eslint-disable-line react/no-danger */
);

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
    // this.props.dispatch({
    //   type: 'performance/fetchCoinData',
    //   payload: {
    //     startDate: '2017-01-01',
    //     symbol: 'bitcoin',
    //   },
    // });
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

    // const priceusd = [];
    // for (let i = 0; i < performance.coin.length; i += 1) {
    //   priceusd.push({
    //     x: moment(new Date(performance.coin[i].priceusd[0])).format('YYYY-MM-DD'),
    //     y: performance.coin[i].priceusd[1],
    //   });
    // }

    return (
      <Fragment>
        <section>
          <Title title="Net Asset Value" />
          <Row gutter={24}>
            <Col xl={8} style={{ marginBottom: 24 }}>
              <ChartCard
                title="NAV"
                action={
                  <Tooltip title="net asset value">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Dollar>{info.nav}</Dollar>}
                contentHeight={168}
                style={{ marginBottom: 24 }}
              >
                <Row type="flex" justify="space-between">
                  <Col>
                    <NumberInfo
                      title={<span>Historical</span>}
                      status={info['nav-historical'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-historical'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {info['nav-historical']}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={info['nav-historical-pct'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-historical-pct'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {info['nav-historical-pct']}
                        </span>
                      }
                    />
                  </Col>
                  <Col>
                    <NumberInfo
                      title={<span>Hour</span>}
                      status={info['nav-hour'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={info['nav-hour'] < 0 ? styles.subtotalDown : styles.subtotalUp}
                        >
                          {info['nav-hour']}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={info['nav-hour-pct'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-hour-pct'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {info['nav-hour-pct']}
                        </span>
                      }
                    />
                  </Col>
                  <Col>
                    <NumberInfo
                      title={<span>Day</span>}
                      status={info['nav-day'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={info['nav-day'] < 0 ? styles.subtotalDown : styles.subtotalUp}
                        >
                          {info['nav-day']}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={info['nav-day-pct'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-day-pct'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {info['nav-day-pct']}
                        </span>
                      }
                    />
                  </Col>
                  <Col>
                    <NumberInfo
                      title={<span>Week</span>}
                      status={info['nav-week'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={info['nav-week'] < 0 ? styles.subtotalDown : styles.subtotalUp}
                        >
                          {info['nav-week']}
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
                          {info['nav-week-pct']}
                        </span>
                      }
                    />
                  </Col>
                  <Col>
                    <NumberInfo
                      title={<span>Month</span>}
                      status={info['nav-month'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-month'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {info['nav-month']}
                        </span>
                      }
                    />
                    <NumberInfo
                      status={info['nav-month-pct'] < 0 ? 'down' : 'up'}
                      subTotal={
                        <span
                          className={
                            info['nav-month-pct'] < 0 ? styles.subtotalDown : styles.subtotalUp
                          }
                        >
                          {info['nav-month-pct']}
                        </span>
                      }
                    />
                  </Col>
                </Row>
              </ChartCard>
              <ChartCard
                title="CAP Supply"
                action={
                  <Tooltip title="unit">
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
                title="Fund Size"
                action={
                  <Tooltip title="USD">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Dollar>{info.fundsize}</Dollar>}
                contentHeight={150}
              />
            </Col>
            <Col xl={16} style={{ marginBottom: 24 }}>
              <ChartCard style={{ width: '100%' }}>
                <HighchartsReact config={navChartOptions} isPureConfig />
                <NavTable />
              </ChartCard>
            </Col>
          </Row>
        </section>
        <section>
          <Row type="flex" justify="space-between" align="middle">
            <Title title="Table of Holdings" />
            <Subtitle title={`${info.ofallmarketcap} Of All Market Cap`} />
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

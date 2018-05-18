import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Tooltip, Icon } from 'antd';
import { ChartCard, dollar } from 'components/Charts';
// import numeral from 'numeral';
// import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';

import Title from 'components/Title';

import styles from './BasicPerformance.less';

const Dollar = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: dollar(children) }}
  /> /* eslint-disable-line react/no-danger */
);

export default class BasicPerformance extends Component {
  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 24 },
    };

    return (
      <Fragment>
        <section className={styles.section}>
          <Title title="Net Asset Value" />
          <div>
            <Row type="flex" justify="start" gutter={4}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="NAV"
                  action={
                    <Tooltip title="net asset value">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total={() => <Dollar>126560</Dollar>}
                  contentHeight={105}
                >
                  <span>
                    <NumberInfo subTitle={<span>Historical</span>} status="up" subTotal={17.1} />
                    <NumberInfo status="down" subTotal={17.1} />
                  </span>
                  {/* <span>
                    <NumberInfo
                      subTitle={<span>Historical</span>}
                      status="up"
                      subTotal={17.1}
                    />
                    <NumberInfo
                      status="down"
                      subTotal={17.1}
                    />
                  </span> */}
                  {/* <Trend flag="up" style={{ marginRight: 16 }}>
                    12%<span className={styles.trendText}></span>
                  </Trend>
                  <Trend flag="down">
                    11%<span className={styles.trendText}></span>
                  </Trend> */}
                </ChartCard>
                {/* <Card style={{ width: '100%', height: '50%', background: '#373E54', color: '#FFF' }}>
                  <div className={styles.navContainer}>
                    <div className={styles.nav}>
                      <div className={styles.navInfoTitle}>NAV <span style={{ fontSize: 18 }}>(net asset value)</span></div>
                      <div id="nav" className={styles.navInfoSubtitle}>$2.73</div>
                    </div>
                    <div className={styles.navHistoricalWrapper}>
                      <h5>Historical&nbsp;</h5>
                      <Trend flag="up" style={{ marginRight: 16 }}>
                        周同比<span className={styles.trendText}>12%</span>
                      </Trend>
                      <Trend flag="down">
                        日环比<span className={styles.trendText}>11%</span>
                      </Trend>
                    </div>
                  </div>
                  <div className={styles.navIndex}>
                    <div className={styles.navIndexWrapper}>
                      <h5>Hour&nbsp;</h5>
                      <h6 id="navIndexHour"></h6>
                      <h6 id="navIndexHourPct"></h6>
                    </div>
                    <div className={styles.navIndexWrapper}>
                      <h5>Day&nbsp;</h5>
                      <h6 id="navIndexDay"></h6>
                      <h6 id="navIndexDayPct"></h6>
                    </div>
                    <div className={styles.navIndexWrapper}>
                      <h5>Week&nbsp;</h5>
                      <h6 id="navIndexWeek"></h6>
                      <h6 id="navIndexWeekPct"></h6>
                    </div>
                    <div className={styles.navIndexWrapper}>
                      <h5>Month&nbsp;</h5>
                      <h6 id="navIndexMonth"></h6>
                      <h6 id="navIndexMonthPct"></h6>
                    </div>
                  </div>
                </Card> */}
                <Card style={{ width: '100%', background: '#373E54', color: '#FFF' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
                <Card style={{ width: '100%', background: '#373E54', color: '#FFF' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col {...topColResponsiveProps} order={3}>
                <Card style={{ width: '100%', background: '#373E54', color: '#FFF' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </Fragment>
    );
  }
}

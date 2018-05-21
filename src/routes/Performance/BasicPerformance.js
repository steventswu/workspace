import React, { Component, Fragment } from 'react';
import { Row, Col, Tooltip, Icon } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartCard, dollar } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import Title from 'components/Title';
import NavTable from 'components/NavTable';
import styles from './BasicPerformance.less';
import { navChartOptions } from './options';

const Dollar = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: dollar(children) }}
  /> /* eslint-disable-line react/no-danger */
);

export default class BasicPerformance extends Component {
  render() {
    return (
      <Fragment>
        <section className={styles.section}>
          <Title title="Net Asset Value" />
          <Row gutter={24}>
            <Col xl={8} style={{ marginBottom: 24 }}>
              <ChartCard
                bordered={false}
                title="NAV"
                action={
                  <Tooltip title="net asset value">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Dollar>2.73</Dollar>}
                contentHeight={130}
                style={{ marginBottom: 24 }}
              >
                <Row type="flex" justify="space-between">
                  <Col>
                    <NumberInfo subTitle={<span>Historical</span>} status="up" subTotal={17.1} />
                    <NumberInfo status="down" subTotal={17.1} />
                  </Col>
                  <Col>
                    <NumberInfo subTitle={<span>Hour</span>} status="up" subTotal={17.1} />
                    <NumberInfo status="down" subTotal={17.1} />
                  </Col>
                  <Col>
                    <NumberInfo subTitle={<span>Day</span>} status="up" subTotal={17.1} />
                    <NumberInfo status="down" subTotal={17.1} />
                  </Col>
                  <Col>
                    <NumberInfo subTitle={<span>Week</span>} status="up" subTotal={17.1} />
                    <NumberInfo status="down" subTotal={17.1} />
                  </Col>
                  <Col>
                    <NumberInfo subTitle={<span>Month</span>} status="up" subTotal={17.1} />
                    <NumberInfo status="down" subTotal={17.1} />
                  </Col>
                </Row>
              </ChartCard>
              <ChartCard
                bordered={false}
                title="CAP Supply"
                action={
                  <Tooltip title="unit">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Dollar>650005</Dollar>}
                contentHeight={150}
                style={{ marginBottom: 24 }}
              />
              <ChartCard
                bordered={false}
                title="Fund Size"
                action={
                  <Tooltip title="USD">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Dollar>5000000</Dollar>}
                contentHeight={150}
              />
            </Col>
            <Col xl={16} style={{ marginBottom: 24 }}>
              <ChartCard bordered={false} style={{ width: '100%' }}>
                <HighchartsReact
                  className={styles.navContainer}
                  highcharts={Highcharts}
                  options={navChartOptions}
                />
                <NavTable />
              </ChartCard>
            </Col>
          </Row>
        </section>
      </Fragment>
    );
  }
}

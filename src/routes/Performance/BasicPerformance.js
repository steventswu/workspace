import React, { Component, Fragment } from 'react';
import { Row, Col, Tooltip, Icon } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartCard, dollar } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import Title from 'components/Title';
import NavTable from 'components/NavTable';
import styles from './BasicPerformance.less';

const Dollar = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: dollar(children) }}
  /> /* eslint-disable-line react/no-danger */
);

// Create HighchartsReact
const options = {
  chart: {
    type: 'areaspline',
  },
  title: null,
  xAxis: {
    type: 'datetime',
    labels: {
      style: {
        color: '#000',
      },
    },
  },
  yAxis: [
    {
      title: {
        text: 'Total Fund Value',
        style: {
          color: '#000',
        },
      },
      gridLineWidth: 0,
      labels: {
        formatter: () => {
          return `${this.value / 1000}k`;
        },
        style: {
          color: '#000',
        },
      },
    },
    {
      title: {
        text: 'Net Asset Value',
        style: {
          color: '#000',
        },
      },
      gridLineWidth: 0,
      labels: {
        formatter: () => {
          return `${this.value / 1000}k`;
        },
        style: {
          color: '#000',
        },
      },
      opposite: true,
    },
  ],
  plotOptions: {
    areaspline: {
      pointStart: Date.UTC(2006, 7, 1),
      pointInterval: 24 * 3600 * 1000,
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
  },
  legend: {
    layout: 'horizontal',
    verticalAlign: 'top',
    align: 'left',
    x: 50,
    floating: true,
    itemStyle: {
      color: '#000',
    },
  },
  series: [
    {
      name: 'Total Fund Value',
      data: [
        1005,
        4618,
        10527,
        24237,
        1256,
        1043,
        2063,
        4618,
        110,
        235,
        369,
        640,
        1005,
        1436,
        2063,
        3057,
        4618,
        6444,
        9822,
        15468,
        20434,
        24126,
        27387,
        29459,
        31056,
        31982,
        32040,
        31233,
        29224,
        27342,
        26662,
        26956,
        27912,
        28999,
        28965,
        27826,
        25579,
        25722,
        24826,
        24605,
        24304,
        23464,
        23708,
        24099,
        24357,
        24237,
        24401,
        24344,
        23586,
        22380,
        21004,
        17287,
        14747,
        13076,
        12555,
        12144,
        11009,
        10950,
        10871,
        10824,
        10577,
        10527,
        10475,
        10421,
        10358,
        10295,
        10104,
      ],
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [[0, '#5EE0FE'], [1, '#085790']],
      },
    },
    {
      name: 'Net Asset Value',
      yAxis: 1,
      data: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        25,
        50,
        120,
        150,
        200,
        426,
        660,
        869,
        1060,
        1605,
        2471,
        3322,
        4238,
        5221,
        6129,
        7089,
        8339,
        9399,
        10538,
        11643,
        13092,
        14478,
        15915,
        17385,
        19055,
        21205,
        23044,
        25393,
        27935,
        30062,
        32049,
        33952,
        35804,
        37431,
        39197,
        45000,
        44324,
        42123,
        41330,
        39300,
        35000,
        33000,
        31000,
        29000,
        27000,
        25000,
        24000,
        23000,
        22000,
        21000,
        20000,
        19000,
        18000,
        18000,
        17000,
        16000,
      ],
      color: {
        linearGradient: { x1: 1, y1: 1, x2: 0, y2: 1 },
        stops: [[0, '#AD2256'], [1, 'rgb(255, 27, 27)']],
      },
    },
  ],
  exporting: {
    enabled: false,
  },
};

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
                  options={options}
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

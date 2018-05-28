import React from 'react';
import { connect } from 'dva';
import { Table, Modal } from 'antd';
import { dollar } from 'components/Charts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const Dollar = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: dollar(children) }}
  /> /* eslint-disable-line react/no-danger */
);

const columns = [
  {
    title: 'Coin',
    dataIndex: 'coin',
    key: 'coin',
    render: coin => {
      return (
        <div>
          <img
            alt="Coin"
            src={`/color/${coin.label.toLowerCase()}.svg`}
            style={{ width: 25, paddingRight: 5 }}
          />
          <span>{coin.name}</span>
        </div>
      );
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'USD',
    dataIndex: 'usd',
    key: 'usd',
    render: usd => {
      return <Dollar>{usd}</Dollar>;
    },
  },
  {
    title: '%',
    dataIndex: 'percent',
    key: 'percent',
  },
  {
    title: 'Market Cap(M)',
    dataIndex: 'marketcap',
    key: 'marketcap',
    render: usd => {
      return <Dollar>{usd}</Dollar>;
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: usd => {
      return <Dollar>{usd}</Dollar>;
    },
  },
  {
    title: 'Volume(24h)',
    dataIndex: 'value24h',
    key: 'value24h',
    render: usd => {
      return <Dollar>{usd}</Dollar>;
    },
  },
  {
    title: 'Circulating Supply',
    dataIndex: 'circulation',
    key: 'circulation',
  },
  {
    title: 'Change(24h)',
    dataIndex: 'change24h',
    key: 'change24h',
    render: usd => {
      return `${usd}%`;
    },
  },
];

@connect(({ performance }) => ({
  performance,
}))
export default class HoldingsTable extends React.Component {
  state = { visible: false };
  componentDidMount() {
    this.props.dispatch({
      type: 'performance/fetchPerformance',
    });
  }
  showModal = record => {
    this.setState({
      visible: true,
    });
    this.props.dispatch({
      type: 'performance/fetchCoinData',
      payload: {
        startDate: '2017-01-01',
        symbol: record.coin.name.toLowerCase(),
      },
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { performance } = this.props;
    const { symbol, coin } = performance;

    const marketcap = [];
    const pricebtc = [];
    const priceusd = [];
    const volumeusd = [];
    for (let i = 0; i < coin.length; i += 1) {
      marketcap.push(coin[i].marketcap);
      pricebtc.push(coin[i].pricebtc);
      priceusd.push(coin[i].priceusd);
      volumeusd.push(coin[i].volumeusd);
    }

    return (
      <div>
        <Table
          onRow={record => ({
            // 点击行
            onClick: () => this.showModal(record),
          })}
          columns={columns}
          dataSource={symbol}
          pagination={false}
        />
        <Modal
          title={null}
          visible={this.state.visible}
          onOkay={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
          bodyStyle={{ height: 700 }}
          width="80%"
        >
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="stockChart"
            options={{
              chart: {
                zoomType: 'x',
                height: 600,
              },
              rangeSelector: {
                selected: 4,
              },
              yAxis: [
                {
                  title: {
                    text: 'Market Cap',
                    style: {
                      color: '#FFFFFF',
                    },
                  },
                  gridLineWidth: 0,
                  labels: {
                    // eslint-disable-next-line object-shorthand
                    formatter: function() {
                      return `$${this.axis.defaultLabelFormatter.call(this)}`;
                    },
                  },
                  height: '70%',
                  opposite: false,
                },
                {
                  title: {
                    text: 'Price (USD)',
                    color: '#F7931A',
                  },
                  gridLineWidth: 0,
                  labels: {
                    // eslint-disable-next-line object-shorthand
                    formatter: function() {
                      return `$${this.axis.defaultLabelFormatter.call(this)}`;
                    },
                  },
                  height: '70%',
                  opposite: true,
                },
                {
                  title: {
                    text: 'Price (BTC)',
                  },
                  gridLineWidth: 0,
                  labels: {
                    // eslint-disable-next-line object-shorthand
                    formatter: function() {
                      return `${this.value} BTC`;
                    },
                  },
                  height: '70%',
                  opposite: true,
                },
                {
                  title: {
                    text: '24h Vol',
                  },
                  gridLineWidth: 0,
                  labels: {
                    // eslint-disable-next-line object-shorthand
                    formatter: function() {
                      return `$${this.axis.defaultLabelFormatter.call(this)}`;
                    },
                  },
                  top: '75%',
                  height: '25%',
                  offset: 0,
                  lineWidth: 2,
                  opposite: false,
                },
              ],
              tooltip: {
                shared: true,
                split: false,
              },
              series: [
                {
                  name: 'Market Cap',
                  data: marketcap,
                  tooltip: {
                    valueSuffix: ' USD',
                  },
                },
                {
                  name: 'Price (USD)',
                  data: priceusd,
                  yAxis: 1,
                  tooltip: {
                    valueDecimals: 2,
                  },
                  color: '#F7931A',
                },
                {
                  name: 'Price (BTC)',
                  data: pricebtc,
                  yAxis: 2,
                  color: '#90ED7D',
                },
                {
                  name: '24h Vol',
                  data: volumeusd,
                  type: 'column',
                  tooltip: {
                    valueSuffix: ' USD',
                  },
                  yAxis: 3,
                },
              ],
            }}
          />
        </Modal>
      </div>
    );
  }
}

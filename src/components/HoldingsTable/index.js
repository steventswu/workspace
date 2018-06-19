import React from 'react';
import { Table, Modal } from 'antd';
import { dollar } from 'components/Charts';
import numeral from 'numeral';
import HighchartsReact from 'react-highcharts/ReactHighstock';

const Dollar = ({ children }) => (
  <span
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: dollar(children) }}
  />
);

const columns = [
  {
    title: 'Coin',
    dataIndex: 'coin',
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
  },
  {
    title: 'USD',
    dataIndex: 'usd',
    render: usd => {
      return <Dollar>{usd}</Dollar>;
    },
  },
  {
    title: '%',
    dataIndex: 'percent',
  },
  {
    title: 'Market Cap(M)',
    dataIndex: 'marketcap',
    render: usd => {
      return <Dollar>{usd}</Dollar>;
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: usd => {
      return <Dollar>{usd}</Dollar>;
    },
  },
  {
    title: 'Volume(24h)',
    dataIndex: 'value24h',
    render: usd => {
      return <Dollar>{usd}</Dollar>;
    },
  },
  {
    title: 'Circulating Supply',
    dataIndex: 'circulation',
    render: value => {
      return numeral(value).format('0,0.[0000]');
    },
  },
  {
    title: 'Change(24h)',
    dataIndex: 'change24h',
    render: usd => {
      return `${usd}%`;
    },
  },
];

export default class HoldingsTable extends React.PureComponent {
  state = { visible: false };
  showModal = record => {
    this.setState({
      visible: true,
    });
    this.props.onRowClick(record);
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
  componentDidUpdate() {
    const chart = this.chart ? this.chart.getChart() : {};
    chart.reflow = () => {};
  }

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

    // Set Options for Highstock
    HighchartsReact.Highcharts.setOptions({
      lang: {
        thousandsSep: ',',
      },
    });

    return (
      <div>
        <Table
          rowKey={record => record.coin.name}
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
            ref={c => {
              this.chart = c;
            }}
            config={{
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
                    // eslint-disable-next-line object-shorthand, func-names
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
                    // eslint-disable-next-line object-shorthand, func-names
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
                    // eslint-disable-next-line object-shorthand, func-names
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
                    // eslint-disable-next-line object-shorthand, func-names
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
              time: {
                useUTC: false,
              },
            }}
          />
        </Modal>
      </div>
    );
  }
}

import React from 'react';
import { Table, Modal } from 'antd';
import { dollar } from 'components/Charts';
import numeral from 'numeral';
import HighchartsReact from 'react-highcharts/ReactHighstock';
import { translate } from 'react-i18next';

const Dollar = ({ children }) => (
  <span
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: dollar(children) }}
  />
);
@translate('performance')
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
    const { symbol } = performance;

    const marketcap = [];
    const pricebtc = [];
    const priceusd = [];
    const volumeusd = [];
    for (let i = 0; i < this.props.performance.coin.length; i += 1) {
      marketcap.push(this.props.performance.coin[i].marketcap);
      pricebtc.push(this.props.performance.coin[i].pricebtc);
      priceusd.push(this.props.performance.coin[i].priceusd);
      volumeusd.push(this.props.performance.coin[i].volumeusd);
    }

    // Set Options for Highstock
    HighchartsReact.Highcharts.setOptions({
      lang: {
        thousandsSep: ',',
      },
    });
    const { t } = this.props;
    return (
      <div>
        <Table
          rowKey={record => record.coin.name}
          onRow={record => ({
            // 点击行
            onClick: () => this.showModal(record),
          })}
          columns={[
            {
              title: t('coin'),
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
              title: t('amount'),
              dataIndex: 'amount',
            },
            {
              title: t('usd'),
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
              title: t('market_cap'),
              dataIndex: 'marketcap',
              render: usd => {
                return <Dollar>{usd}</Dollar>;
              },
            },
            {
              title: t('price'),
              dataIndex: 'price',
              render: usd => {
                return <Dollar>{usd}</Dollar>;
              },
            },
            {
              title: t('volume'),
              dataIndex: 'value24h',
              render: usd => {
                return <Dollar>{usd}</Dollar>;
              },
            },
            {
              title: t('circulating_supply'),
              dataIndex: 'circulation',
              render: value => {
                return numeral(value).format('0,0.[0000]');
              },
            },
            {
              title: t('change'),
              dataIndex: 'change24h',
              render: usd => {
                return `${usd}%`;
              },
            },
          ]}
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
                    text: t('market_cap'),
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
                    text: t('price_usd'),
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
                    text: t('price_btc'),
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
                    text: t('volume'),
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
                  name: t('market_cap'),
                  data: marketcap,
                  tooltip: {
                    valueSuffix: ' USD',
                  },
                },
                {
                  name: t('price_usd'),
                  data: priceusd,
                  yAxis: 1,
                  tooltip: {
                    valueDecimals: 2,
                  },
                  color: '#F7931A',
                },
                {
                  name: t('price_btc'),
                  data: pricebtc,
                  yAxis: 2,
                  color: '#90ED7D',
                },
                {
                  name: t('volume'),
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

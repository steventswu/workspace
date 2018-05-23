import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

const columns = [
  {
    title: 'Coin',
    dataIndex: 'coin',
    key: 'coin',
    render: coin => {
      return (
        <a href="#">
          <img
            alt="Coin"
            src={`/src/assets/color/${coin.label}.svg`}
            style={{ width: 25, paddingRight: 5 }}
          />
          <span>{coin.name}</span>
        </a>
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
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Volume(24h)',
    dataIndex: 'value24h',
    key: 'value24h',
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
  },
];

@connect(({ performance }) => ({
  performance,
}))
export default class HoldingsTable extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'performance/fetchPerformance',
    });
  }

  render() {
    console.log(this.props.performance.symbol);
    const { performance } = this.props;
    const { symbol } = performance;

    return <Table columns={columns} dataSource={symbol} pagination={false} />;
  }
}

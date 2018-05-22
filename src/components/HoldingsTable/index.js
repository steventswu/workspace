import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Coin',
    dataIndex: 'coin',
    render: text => (
      <a href="#">
        <img alt="Coin" src="/src/assets/transparent/btc.svg" style={{ paddingRight: 5 }} />
        {text}
      </a>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'USD',
    dataIndex: 'usd',
  },
  {
    title: '%',
    dataIndex: 'percent',
  },
  {
    title: 'Market Cap(M)',
    dataIndex: 'marketcap',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Volume(24h)',
    dataIndex: 'volume',
  },
  {
    title: 'Circulating Supply',
    dataIndex: 'circulating',
  },
  {
    title: 'Change(24h)',
    dataIndex: 'change',
  },
];

const data = [
  {
    key: '0',
    coin: 'Bitcoin',
    amount: '80.14',
    usd: '$667,885.96',
    percent: '15.00%',
    marketcap: '$142,076,711,429',
    price: '$8333.99',
    volume: '4,993,060,000',
    circulating: '17,047,862',
    change: '-2.21%',
  },
  {
    key: '1',
    coin: 'Ethereum',
    amount: '80.14',
    usd: '$667,885.96',
    percent: '15.00%',
    marketcap: '$142,076,711,429',
    price: '$8333.99',
    volume: '4,993,060,000',
    circulating: '17,047,862',
    change: '-2.21%',
  },
  {
    key: '2',
    coin: 'Ripple',
    amount: '80.14',
    usd: '$667,885.96',
    percent: '15.00%',
    marketcap: '$142,076,711,429',
    price: '$8333.99',
    volume: '4,993,060,000',
    circulating: '17,047,862',
    change: '-2.21%',
  },
  {
    key: '3',
    coin: 'EOS',
    amount: '80.14',
    usd: '$667,885.96',
    percent: '15.00%',
    marketcap: '$142,076,711,429',
    price: '$8333.99',
    volume: '4,993,060,000',
    circulating: '17,047,862',
    change: '-2.21%',
  },
];

const HoldingsTable = () => <Table columns={columns} dataSource={data} pagination={false} />;

export default HoldingsTable;

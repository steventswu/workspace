import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'R2',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Beta',
    dataIndex: 'beta',
    key: 'beta',
  },
  {
    title: 'Alpha',
    dataIndex: 'alpha',
    key: 'alpha',
  },
  {
    title: '',
    dataIndex: 'sharpe',
    key: 'address',
  },
  {
    title: '',
    dataIndex: 'volatilty',
    key: 'action',
  },
];

const data = [
  {
    key: '1',
    name: 'Bitcoin',
    age: 0.64102,
    beta: '0.82',
    alpha: '0.84',
    sharpe: 'Sharpe ratio (annualized)',
    volatilty: 'Monthly Volatility',
  },
  {
    key: '2',
    name: 'Euro',
    age: 0.00001,
    beta: '-.0.03',
    alpha: '4.18',
    sharpe: '0.87',
    volatilty: '0',
  },
  {
    key: '3',
    name: 'GLD',
    age: 32,
    beta: '0.34',
    alpha: '4.13',
    sharpe: 'Bitcoin Sharepe',
    volatilty: 'Bitcoin Volatility',
  },
  {
    key: '4',
    name: 'SPY',
    age: 32,
    beta: '0.25',
    alpha: '4.04',
    sharpe: '0.8',
    volatilty: '0',
  },
];

const NavTable = () => (
  <Table columns={columns} dataSource={data} pagination={false} size="small" />
);

export default NavTable;

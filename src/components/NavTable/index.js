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
    age: <span style={{ color: '#1890ff' }}>0.64102</span>,
    beta: <span style={{ color: '#1890ff' }}>0.82</span>,
    alpha: <span style={{ color: '#1890ff' }}>0.84</span>,
    sharpe: 'Sharpe ratio (annualized)',
    volatilty: 'Monthly Volatility',
  },
  {
    key: '2',
    name: 'Euro',
    age: <span style={{ color: '#1890ff' }}>0.00001</span>,
    beta: <span style={{ color: '#1890ff' }}>-.0.03</span>,
    alpha: <span style={{ color: '#1890ff' }}>4.18</span>,
    sharpe: <span style={{ color: '#1890ff' }}>0.87</span>,
    volatilty: <span style={{ color: '#1890ff' }}>0</span>,
  },
  {
    key: '3',
    name: 'GLD',
    age: <span style={{ color: '#1890ff' }}>32</span>,
    beta: <span style={{ color: '#1890ff' }}>0.34</span>,
    alpha: <span style={{ color: '#1890ff' }}>4.13</span>,
    sharpe: 'Bitcoin Sharepe',
    volatilty: 'Bitcoin Volatility',
  },
  {
    key: '4',
    name: 'SPY',
    age: <span style={{ color: '#1890ff' }}>32</span>,
    beta: <span style={{ color: '#1890ff' }}>0.25</span>,
    alpha: <span style={{ color: '#1890ff' }}>4.04</span>,
    sharpe: <span style={{ color: '#1890ff' }}>0.8</span>,
    volatilty: <span style={{ color: '#1890ff' }}>0</span>,
  },
];

const NavTable = () => (
  <Table columns={columns} dataSource={data} pagination={false} size="small" />
);

export default NavTable;

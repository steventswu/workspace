import React from 'react';
import { Table } from 'antd';
import idx from 'idx';

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'R2',
    dataIndex: 'r2',
    key: 'r2',
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

export default class NavTable extends React.PureComponent {
  render() {
    const { performance } = this.props;
    const { analysis } = performance;

    const data = [
      {
        key: '1',
        name: <span>{idx(analysis[0], _ => _.label)}</span>,
        r2: <span style={{ color: '#1890ff' }}>{idx(analysis[0], _ => _.r2)}</span>,
        beta: <span style={{ color: '#1890ff' }}>{idx(analysis[0], _ => _.beta)}</span>,
        alpha: <span style={{ color: '#1890ff' }}>{idx(analysis[0], _ => _.alpha)}</span>,
        sharpe: 'Sharpe ratio (annualized)',
        volatilty: 'Monthly Volatility',
      },
      {
        key: '2',
        name: <span>{idx(analysis[1], _ => _.label)}</span>,
        r2: <span style={{ color: '#1890ff' }}>{idx(analysis[1], _ => _.r2)}</span>,
        beta: <span style={{ color: '#1890ff' }}>{idx(analysis[1], _ => _.beta)}</span>,
        alpha: <span style={{ color: '#1890ff' }}>{idx(analysis[1], _ => _.alpha)}</span>,
        sharpe: <span style={{ color: '#1890ff' }}>{idx(analysis[4], _ => _.sharperatio)}</span>,
        volatilty: (
          <span style={{ color: '#1890ff' }}>{idx(analysis[4], _ => _.monthlyvolatility)}</span>
        ),
      },
      {
        key: '3',
        name: <span>{idx(analysis[2], _ => _.label)}</span>,
        r2: <span style={{ color: '#1890ff' }}>{idx(analysis[2], _ => _.r2)}</span>,
        beta: <span style={{ color: '#1890ff' }}>{idx(analysis[2], _ => _.beta)}</span>,
        alpha: <span style={{ color: '#1890ff' }}>{idx(analysis[2], _ => _.alpha)}</span>,
        sharpe: 'Bitcoin Sharpe',
        volatilty: 'Bitcoin Volatility',
      },
      {
        key: '4',
        name: <span>{idx(analysis[3], _ => _.label)}</span>,
        r2: <span style={{ color: '#1890ff' }}>{idx(analysis[3], _ => _.r2)}</span>,
        beta: <span style={{ color: '#1890ff' }}>{idx(analysis[3], _ => _.beta)}</span>,
        alpha: <span style={{ color: '#1890ff' }}>{idx(analysis[3], _ => _.alpha)}</span>,
        sharpe: <span style={{ color: '#1890ff' }}>{idx(analysis[4], _ => _.bitcoinsharpe)}</span>,
        volatilty: (
          <span style={{ color: '#1890ff' }}>{idx(analysis[4], _ => _.yearlyvolatility)}</span>
        ),
      },
    ];
    return <Table columns={columns} dataSource={data} pagination={false} size="small" />;
  }
}

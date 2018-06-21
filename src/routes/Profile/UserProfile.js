import React from 'react';
import { Table, Card } from 'antd';
import { connect } from 'dva';
import ProfileLayout from 'src/layouts/ProfileLayout';
import styles from './UserProfile.less';
import column from './UserProfile.json';

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetch'],
}))
export default class UserProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }

  render() {
    const {
      profile: { transactions, portfolio: { contracts, summary = {} } = {} },
      loading,
      height,
    } = this.props;
    return (
      <ProfileLayout height={height}>
        <h1>Portfolio</h1>
        <Table
          columns={column.portfolio}
          dataSource={contracts}
          loading={loading}
          pagination={false}
          scroll={{ x: 1000 }}
          footer={() => (
            <div className={styles.summary}>
              <Card title="Initial Capital" bordered={false} style={{ width: 202 }}>
                <span>{summary.amount}</span>
              </Card>
              <Card title="Total Equity (ETH)" bordered={false} style={{ width: 200 }}>
                <span>{summary.eth}</span>
              </Card>
              <Card title="Total Equity (USD)" bordered={false} style={{ width: 200 }}>
                <span>{summary.usd}</span>
              </Card>
              <Card title="ROI" bordered={false} style={{ width: 100 }}>
                <span>{summary.roi}</span>
              </Card>
            </div>
          )}
        />
        <h1>Transaction History</h1>
        <Table
          columns={column.transaction.map(columnMapper)}
          dataSource={transactions}
          loading={loading}
        />
      </ProfileLayout>
    );
  }
}

const columnMapper = c =>
  c.key === 'actions'
    ? {
        ...c,
        render: (_, record) => (
          <span>
            <a href={record.url || '#'} target="_blank">
              View in Etherscan
            </a>
          </span>
        ),
      }
    : c;

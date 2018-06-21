import React from 'react';
import { Layout, Icon, Button, Table, Card, Divider } from 'antd';
import { connect } from 'dva';

import styles from './UserProfile.less';
import column from './UserProfile.json';

@connect(({ user, profile, loading }) => ({
  currentUser: user,
  profile,
  loading: loading.effects['profile/fetch'],
}))
export default class UserProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  render() {
    const {
      currentUser: { email, isEmailVerified },
      profile: { transactions, portfolio: { contracts, summary = {} } = {} },
      height,
      loading,
    } = this.props;
    return (
      <Layout style={{ background: 'transparent', minHeight: height }}>
        <Layout.Sider width={300} className={styles.sider}>
          <h1>User Profile</h1>
          <div>
            Email
            <p>{email}</p>
          </div>
          <Button onClick={this.handleLogout}>Logout</Button>
          <Divider />
          <h2>Verifications</h2>
          <div className={styles.verification}>
            <Icon type={isEmailVerified ? 'check-circle-o' : 'exclamation-circle-o'} />
            Email Verification
          </div>
          <Divider />
          <Button style={{ marginBottom: 20 }} onClick={this.handleIdentityVerification}>
            Identity Verification
          </Button>
          <Button style={{ marginBottom: 20 }} onClick={this.handleWalletVerification}>
            Wallet Verification
          </Button>
          <Button style={{ marginBottom: 20 }} onClick={this.handleRedeem}>
            Redeem
          </Button>
        </Layout.Sider>
        <Layout.Content className={styles.content}>
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
        </Layout.Content>
      </Layout>
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

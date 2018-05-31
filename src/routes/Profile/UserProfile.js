import React from 'react';
import { Layout, Icon, Button, Table } from 'antd';
import { connect } from 'dva';

import styles from './UserProfile.less';
import source from './UserProfile.json';

@connect(({ user }) => ({ currentUser: user }))
export default class UserProfile extends React.Component {
  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  render() {
    const { currentUser: { email, isEmailVerified }, height } = this.props;
    return (
      <Layout style={{ background: 'transparent', height }}>
        <Layout.Sider width={300} className={styles.sider}>
          <h1>User Profile</h1>
          <div>
            Email
            <p>{email}</p>
          </div>
          <Button style={{ marginBottom: 20 }} onClick={this.handleLogout}>
            Logout
          </Button>
          <h2>Verifications</h2>
          <div className={styles.verification}>
            <Icon type={isEmailVerified ? 'check-circle-o' : 'exclamation-circle-o'} />
            Email Verification
          </div>
        </Layout.Sider>
        <Layout.Content className={styles.content}>
          <h1>Transaction History</h1>
          <Table columns={source.column.map(columnMapper)} dataSource={source.data} />
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

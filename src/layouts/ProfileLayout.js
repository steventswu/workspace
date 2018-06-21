import React from 'react';
import { Layout, Icon, Button, Divider } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import styles from './ProfileLayout.less';

@connect(({ user }) => ({
  currentUser: user,
}))
export default class ProfileLayout extends React.Component {
  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  handleRedeem = () => {
    this.props.dispatch(routerRedux.push('/profile/redeem'));
  };

  render() {
    const { currentUser: { email, isEmailVerified }, height } = this.props;
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
        <Layout.Content className={styles.content}>{this.props.children}</Layout.Content>
      </Layout>
    );
  }
}

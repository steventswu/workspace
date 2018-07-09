import React from 'react';
import { Layout, Button, Divider, Icon } from 'antd';
import { connect } from 'dva';
import { routerRedux, Switch, Route, Redirect } from 'dva/router';

import { VERIFIED } from 'src/utils/status';
import styles from './ProfileLayout.less';
import { isWhitelist } from '../selectors/profile';

export const ROUTE = {
  ROOT: '/profile',
  HOME: '/profile/home',
  WALLET_VERIFICATION: '/profile/wallet',
  REDEEM: '/profile/redeem',
  VERIFICATION: '/profile/verification',
};

@connect(({ user }) => ({
  currentUser: user,
  isWhitelist: isWhitelist(user.walletAddressMap),
}))
export default class ProfileLayout extends React.Component {
  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  handleWalletVerification = () => {
    this.props.dispatch(routerRedux.push(ROUTE.WALLET_VERIFICATION));
  };

  handleRedeem = () => {
    this.props.dispatch(routerRedux.push(ROUTE.REDEEM));
  };

  handleIdentityVerification = () => {
    this.props.dispatch(routerRedux.push(ROUTE.VERIFICATION));
    this.props.dispatch({ type: 'user/fetchCurrent' });
  };

  render() {
    const { currentUser: { email, isIdentityVerified }, height } = this.props;
    const { component } = this.props.routerData[this.props.location.pathname] || {};
    const isVerified = isIdentityVerified === VERIFIED;
    return (
      <Layout style={{ background: 'transparent', minHeight: height }}>
        <Layout.Sider width={300} className={styles.sider}>
          <h1>User Profile</h1>
          <div>
            Email
            <p>{email}</p>
          </div>
          <Button onClick={this.handleLogout}>Logout</Button>
          {/* <Divider />
          <h2>Verifications</h2>
          <div className={styles.verification}>
            <Icon type={isEmailVerified ? 'check-circle-o' : 'exclamation-circle-o'} />
            Email Verification
          </div> */}
          <Divider />
          <Button style={{ marginBottom: 20 }} onClick={this.handleIdentityVerification}>
            {isIdentityVerified === 'verified' && (
              <Icon
                style={{
                  color: '#52c41a',
                }}
                type="check-circle-o"
              />
            )}
            Identity Verification
          </Button>
          <Button
            disabled={!isVerified}
            style={{ marginBottom: 20 }}
            onClick={this.handleWalletVerification}
          >
            Wallet Verification
          </Button>
          <Button
            disabled={!isVerified || !isWhitelist}
            style={{ marginBottom: 20 }}
            onClick={this.handleRedeem}
          >
            Redeem
          </Button>
        </Layout.Sider>
        <Layout.Content className={styles.content}>
          <Switch>
            <Redirect exact from={ROUTE.ROOT} to={ROUTE.HOME} />
            {component ? <Route component={component} /> : <Redirect to="/exception/404" />}
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

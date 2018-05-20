import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import GlobalHeader from 'components/GlobalHeader';

import logo from '../../assets/logo.svg';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
export default class HomePage extends React.Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }

  handleLogin = () => {
    this.props.dispatch(routerRedux.push('/user/login'));
  };

  render() {
    return (
      <Layout>
        <GlobalHeader
          logo={logo}
          onMenuClick={console.log}
          currentUser={this.props.currentUser}
          onLogin={this.handleLogin}
        />
      </Layout>
    );
  }
}

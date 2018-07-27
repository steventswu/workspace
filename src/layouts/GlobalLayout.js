import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { Route, Switch, Redirect, routerRedux } from 'dva/router';

import DocumentTitle from 'react-document-title';
import GlobalHeader from 'src/components/GlobalHeader';
import AppFooter from 'src/components/AppFooter';
import Container from 'src/components/Container';
import redirect from 'src/utils/redirect';
import session from 'src/utils/session';
import logo from 'src/assets/logo.svg';

import styles from './GlobalLayout.less';

@connect(({ user, loading }) => ({ currentUser: user.email, isLoading: loading.global }))
export default class GlobalLayout extends React.PureComponent {
  componentDidMount() {
    if (!this.props.currentUser && session.exist()) {
      this.props.dispatch({ type: 'auth/fetchMember' });
    }
    redirect.set(this.props.match.url);
  }

  componentDidUpdate() {
    redirect.set(this.props.match.url);
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  handleLogin = () => {
    this.props.dispatch(routerRedux.push('/user/login'));
  };

  renderRoute = () => {
    const { isPublic, isProtected, component: Component } =
      this.props.routerData[this.props.location.pathname] || {};

    if (isPublic) {
      return (
        <Route path={this.props.location.pathname} render={props => <Component {...props} />} />
      );
    }

    if (isProtected) {
      return session.exist() ? (
        <Route path={this.props.location.pathname} render={props => <Component {...props} />} />
      ) : (
        <Redirect to="user/login" />
      );
    }

    return <Redirect to="/exception/404" />;
  };

  render() {
    const { isLoading, currentUser } = this.props;

    return (
      <DocumentTitle title="CAP, Cryptocurrency Assets Portfolio - The first Crypto index fund | Tixguru">
        <Layout>
          <Layout.Header style={{ paddingLeft: 0, paddingRight: 0 }}>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              onClickLogout={this.handleLogout}
              onClickLogin={this.handleLogin}
              isLoading={isLoading}
            />
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route exact path="/" component={this.props.routerData['/home'].component} />
              <Container className={styles.container}>{this.renderRoute()}</Container>
            </Switch>
          </Layout.Content>
          <Layout.Footer>
            <AppFooter />
          </Layout.Footer>
        </Layout>
      </DocumentTitle>
    );
  }
}

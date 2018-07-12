import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { Route, Switch, Redirect, routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import pathToRegexp from 'path-to-regexp';
import redirect from 'src/utils/redirect';
import session from 'src/utils/session';

import AppFooter from '../components/AppFooter';
import GlobalHeader from '../components/GlobalHeader';
import logo from '../assets/logo.svg';

import styles from './AppLayout.less';

const { Content, Footer } = Layout;

@connect(({ user }) => ({
  currentUser: user.email,
}))
export default class AppLayout extends React.PureComponent {
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.dispatch({ type: 'user/fetchCurrent' });
    }
    redirect.set(this.props.match.url);
  }

  componentDidUpdate() {
    redirect.set(this.props.match.url);
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'CAP';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - CAP`;
    }
    return title;
  }

  handleCLick = () => {
    this.props.dispatch(routerRedux.push(this.props.currentUser ? '/profile' : '/user/login'));
  };

  render() {
    const { isPublic, isProtected, component: Component } =
      this.props.routerData[this.props.match.url] || {};
    const height = window.innerHeight - 100;
    const isAuthenticated = isProtected && session.exist();
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Layout className={styles.layout}>
          <Layout.Header>
            <GlobalHeader
              logo={logo}
              onClick={this.handleCLick}
              currentUser={this.props.currentUser}
            />
          </Layout.Header>
          <Content className={styles.content} style={{ padding: '0 24px', minHeight: height }}>
            <Switch>
              {isPublic && (
                <Route
                  path={this.props.match.path}
                  render={props => <Component {...props} height={height} />}
                />
              )}
              {isAuthenticated ? (
                <Route
                  path={this.props.match.path}
                  render={props => <Component {...props} height={height} />}
                />
              ) : (
                <Redirect to="user/login" />
              )}
              <Redirect to="/exception/404" />
            </Switch>
          </Content>
          <Footer style={{ padding: 0 }}>
            <AppFooter />
          </Footer>
        </Layout>
      </DocumentTitle>
    );
  }
}

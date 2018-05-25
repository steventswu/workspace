import React from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'dva';
import { Route, Switch, routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import pathToRegexp from 'path-to-regexp';

import GlobalFooter from '../components/GlobalFooter';
import GlobalHeader from '../components/GlobalHeader';
import NotFound from '../routes/Exception/404';
import logo from '../assets/logo.svg';

import styles from './AppLayout.less';

const { Content, Footer } = Layout;

@connect(({ user }) => ({
  currentUser: user,
}))
export default class AppLayout extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Tixguru';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Tixguru`;
    }
    return title;
  }

  handleCLick = () => {
    this.props.dispatch(routerRedux.push(this.props.currentUser ? '/profile' : '/user/login'));
  };

  render() {
    const matchRoute = this.props.routerData[this.props.match.path];
    const Component = matchRoute.component;
    const height = window.innerHeight - 100;
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
              {matchRoute && (
                <Route
                  path={this.props.match.path}
                  render={props => <Component {...props} height={height} />}
                  exact={this.props.match.isExact}
                />
              )}
              <Route render={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              copyright={
                <React.Fragment>
                  <div style={{ padding: 15 }}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://medium.com/@pr_48521/cap-faq-3c0b5d0d0303"
                    >
                      FAQ
                    </a>
                  </div>
                  Copyright <Icon type="copyright" /> 2018 Tixguru
                </React.Fragment>
              }
            />
          </Footer>
        </Layout>
      </DocumentTitle>
    );
  }
}

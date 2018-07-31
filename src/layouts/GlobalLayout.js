import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import GlobalHeader from 'src/components/GlobalHeader';
import Container from 'src/components/Container';
import AppFooter from 'src/components/AppFooter';
import redirect from 'src/utils/redirect';
import session from 'src/utils/session';
import logo from 'src/assets/logo.svg';
import styles from './GlobalLayout.less';

@connect(({ user, loading }) => ({ currentUser: user.email, isLoading: loading.global }))
export default class GlobalLayout extends React.PureComponent {
  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  refresh = () => {
    if (!this.props.currentUser && session.exist()) {
      this.props.dispatch({ type: 'auth/fetchMember' });
    }
    redirect.set(this.props.match.url);
  };

  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  handleLogin = () => {
    this.props.dispatch(routerRedux.push('/user/login'));
  };

  getContainerStyle = pathname => {
    switch (pathname) {
      case '/user':
        return styles.user;
      default:
        return;
    }
  };

  render() {
    const { isLoading, currentUser, location: { pathname } } = this.props;

    const noContainer = ['/'].includes(pathname);

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
          <Layout.Content className={styles.container}>
            {noContainer ? (
              this.props.children
            ) : (
              <Container className={this.getContainerStyle(pathname)}>
                {this.props.children}
              </Container>
            )}
          </Layout.Content>
          <Layout.Footer>
            <AppFooter />
          </Layout.Footer>
        </Layout>
      </DocumentTitle>
    );
  }
}

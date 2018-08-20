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
import logo from 'src/assets/logo-cap-mica.svg';
import styles from './GlobalLayout.less';
import {
  HOME,
  LOGIN,
  REGISTER,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  REGISTER_RESULT,
  REGISTER_CONFIRM,
  USER_CONFIRM,
  REDIRECT_WHITELIST,
} from '../routes';

@connect(({ user, loading }) => ({
  currentUser: user.email,
  isLoading: loading.models.auth,
}))
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
    if (REDIRECT_WHITELIST.includes(this.props.location.pathname)) {
      redirect.set(this.props.location.pathname);
    }
  };

  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  handleLogin = () => {
    this.props.dispatch(routerRedux.push(LOGIN));
  };

  getContainerStyle = pathname => {
    switch (pathname) {
      default:
        return styles.container;
    }
  };

  render() {
    const { isLoading, currentUser, location: { pathname } } = this.props;

    const noContainer = [
      HOME,
      LOGIN,
      REGISTER,
      FORGOT_PASSWORD,
      CHANGE_PASSWORD,
      REGISTER_RESULT,
      REGISTER_CONFIRM,
      USER_CONFIRM,
    ].includes(pathname);

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
          <Layout.Content className={styles.content}>
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

import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import qs from 'qs';
import isWebView from 'is-webview';
import { Row, Col as Column, Divider, Button, Form, Alert, Spin } from 'antd';
import { translate } from 'react-i18next';
import Login from 'components/Login';
import Container from 'src/components/Container';
import * as loginAssets from 'src/assets/login';
import { REGISTER, FORGOT_PASSWORD } from 'src/routes';

import styles from './login.less';

const facebookAppID = 2098112697085130;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.models.login,
}))
@translate(['user', 'common'])
export default class LoginPage extends Component {
  isBrowser = !isWebView(window.navigator.userAgent);

  componentDidMount() {
    if (this.props.location.search && this.props.location.search.includes('oauth_verifier')) {
      this.props.dispatch({
        type: 'login/twitter',
        payload: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }),
      });
    }
    if (this.props.location.hash && this.props.location.hash.includes('#id_token')) {
      this.props.dispatch({ type: 'login/google' });
    }
    if (this.props.location.hash && this.props.location.hash.includes('#access_token')) {
      this.props.dispatch({
        type: 'login/facebook',
        payload: qs.parse(this.props.location.hash.replace('#', '')),
      });
    }
  }

  handleSubmit = (err, values) => {
    if (err) return;
    this.props.dispatch({
      type: 'login/email',
      payload: values,
    });
  };

  handleRegister = () => {
    this.props.dispatch(routerRedux.push(REGISTER));
  };

  handleGoogleLogin = () => {
    this.props.dispatch({ type: 'login/googleRedirect' });
  };

  handleFacebookLogin = () => {
    const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
    window.location = `https://www.facebook.com/v3.0/dialog/oauth?response_type=token&scope=email&client_id=${facebookAppID}&redirect_uri=${redirectUri}`;
  };

  handleFacebookEmailRequest = () => {
    const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
    window.location = `https://www.facebook.com/v3.0/dialog/oauth?response_type=token&scope=email&client_id=${facebookAppID}&redirect_uri=${redirectUri}&auth_type=rerequest&scope=email`;
  };

  handleTwitterLogin = () => {
    this.props.dispatch({ type: 'login/twitterRedirect' });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon closable />;
  };

  render() {
    const { login, submitting, t } = this.props;
    const showErrorMessage = login.status && login.status !== 'ok' && !submitting;
    return (
      <Container className={styles.loginBackground}>
        <Row gutter={16}>
          <Column
            xs={24}
            lg={{ span: 11, push: 13 }}
            style={{ marginTop: '10%', marginBottom: '10%' }}
          >
            <Form.Item className={styles.main}>
              <Spin spinning={Boolean(submitting)}>
                <Login onSubmit={this.handleSubmit}>
                  {showErrorMessage && login.message && this.renderMessage(login.message)}
                  <Login.UserName
                    name="email"
                    placeholder={t('email.placeholder')}
                    rules={[{ required: true, whitespace: true, message: t('email.required') }]}
                  />
                  <Login.Password
                    name="password"
                    placeholder={t('password.placeholder')}
                    rules={[{ required: true, message: t('password.required') }]}
                  />
                  <Form.Item className={styles.forgot}>
                    <Link style={{ float: 'right' }} to={FORGOT_PASSWORD}>
                      {t('common:forgot_password')}
                    </Link>
                  </Form.Item>
                  <Login.Submit style={{ borderRadius: 20 }}>{t('common:login')}</Login.Submit>
                  <Divider className={styles.divider}>{t('common:or')}</Divider>
                  <Button size="large" className={styles.join} onClick={this.handleRegister}>
                    {t('common:join_now')}
                  </Button>
                  {this.isBrowser && (
                    <Button
                      size="large"
                      className={styles.googleBtn}
                      onClick={this.handleGoogleLogin}
                    >
                      <img alt="Google" src={loginAssets.googleIcon} style={{ float: 'left' }} />
                      <span>{t('common:google')}</span>
                    </Button>
                  )}
                  <Button
                    size="large"
                    className={styles.facebookBtn}
                    onClick={
                      login.status === 'fbError'
                        ? this.handleFacebookEmailRequest
                        : this.handleFacebookLogin
                    }
                  >
                    <img alt="Facebook" src={loginAssets.facebookIcon} style={{ float: 'left' }} />
                    <span>{t('common:facebook')}</span>
                  </Button>
                </Login>
              </Spin>
            </Form.Item>
          </Column>
          <Column xs={0} lg={{ span: 13, pull: 11 }} style={{ marginTop: '12%' }}>
            <Column span={14} offset={3}>
              <div className={styles.welcome}>{t('common:welcome_back')}</div>
            </Column>
          </Column>
        </Row>
      </Container>
    );
  }
}

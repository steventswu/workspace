import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import qs from 'qs';
import isWebView from 'is-webview';
import { Alert, Icon, Spin } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const facebookAppID = 2098112697085130;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.models.login,
}))
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
      type: 'login/login',
      payload: values,
    });
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
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Spin spinning={Boolean(submitting)}>
          <Login onSubmit={this.handleSubmit}>
            {login.status &&
              login.status !== 'ok' &&
              this.renderMessage(login.message || 'Oops! Something went wrong.')}
            <Login.UserName name="email" placeholder="Email" />
            <Login.Password name="password" placeholder="Password" />
            <Login.Submit>Submit</Login.Submit>
            <div className={styles.other}>
              <Icon
                className={styles.icon}
                type="facebook"
                onClick={
                  login.status === 'fbError'
                    ? this.handleFacebookEmailRequest
                    : this.handleFacebookLogin
                }
              />
              {this.isBrowser && (
                <Icon className={styles.icon} type="google" onClick={this.handleGoogleLogin} />
              )}
              {/* <Icon className={styles.icon} type="twitter" onClick={this.handleTwitterLogin} /> */}
              <Link className={styles.register} to="/user/register">
                Register
              </Link>
            </div>
          </Login>
        </Spin>
      </div>
    );
  }
}

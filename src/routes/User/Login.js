import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import qs from 'qs';
import isWebView from 'is-webview';
import { Checkbox, Alert, Icon, Spin } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.models.login,
}))
export default class LoginPage extends Component {
  state = {
    autoLogin: true,
  };

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
    // this.props.dispatch({ type: 'login/facebook' });
    const facebookAppID = 2098112697085130;
    const redirectUri = encodeURIComponent(window.location.href);
    window.location = `https://www.facebook.com/v3.0/dialog/oauth?response_type=token&scope=email&client_id=${facebookAppID}&redirect_uri=${redirectUri}`;
  };

  handleTwitterLogin = () => {
    this.props.dispatch({ type: 'login/twitterRedirect' });
  };

  changeAutoLogin = e => {
    this.setState({ autoLogin: e.target.checked });
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
            {login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('Account or password is incorrect（admin/888888）')}
            <Login.UserName name="email" placeholder="Email" />
            <Login.Password name="password" placeholder="Password" />
            <div>
              <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
                Remember me
              </Checkbox>
              <a style={{ float: 'right' }} href="">
                Forgot Password
              </a>
            </div>
            <Login.Submit>Submit</Login.Submit>
            <div className={styles.other}>
              <Icon className={styles.icon} type="facebook" onClick={this.handleFacebookLogin} />
              {this.isBrowser && (
                <Icon className={styles.icon} type="google" onClick={this.handleGoogleLogin} />
              )}
              <Icon className={styles.icon} type="twitter" onClick={this.handleTwitterLogin} />
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

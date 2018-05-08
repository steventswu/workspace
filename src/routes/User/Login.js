import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Spin } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const checkQueryString = qs => typeof qs === 'string' && qs.includes('oauth_token');

@connect(({ login, loading }) => ({
  login,
  submitting: loading.models.login,
}))
export default class LoginPage extends Component {
  state = {
    autoLogin: true,
  };

  componentDidMount() {
    if (checkQueryString(window.location.search)) {
      this.props.dispatch({ type: 'login/twitter' });
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
    this.props.dispatch({ type: 'login/google' });
  };

  handleFacebookLogin = () => {
    this.props.dispatch({ type: 'login/facebook' });
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
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Spin spinning={Boolean(submitting)}>
          <Login defaultActiveKey={type} onSubmit={this.handleSubmit}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('Account or password is incorrect（admin/888888）')}
            <Login.UserName name="userName" placeholder="Email" />
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
              <Icon className={styles.icon} type="google" onClick={this.handleGoogleLogin} />
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

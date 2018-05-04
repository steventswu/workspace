import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
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
          <Login.Submit loading={submitting}>Submit</Login.Submit>
          <div className={styles.other}>
            <Icon className={styles.icon} type="facebook" />
            <Icon className={styles.icon} type="google" />
            <Link className={styles.register} to="/user/register">
              Register
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

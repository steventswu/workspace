import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Popover, Progress } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: <div className={styles.success}>Strength：Strong</div>,
  pass: <div className={styles.warning}>Strength：Medium</div>,
  poor: <div className={styles.error}>Strength：Too Short</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const emailValidator = {
  validate: [
    {
      trigger: ['onChange', 'onBlur'],
      rules: [
        {
          required: true,
          message: 'Enter your email address',
        },
      ],
    },
    {
      trigger: 'onBlur',
      rules: [
        {
          type: 'email',
          message: 'Your email address is incorrect',
        },
      ],
    },
  ],
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class Register extends Component {
  state = {
    confirmDirty: false,
    popoverVisible: false,
    passwordHelp: '',
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'register/submit',
          payload: values,
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        passwordHelp: 'Enter the password',
        popoverVisible: !!value,
      });
      return callback('error');
    }

    this.setState({ passwordHelp: '' });
    if (!this.state.popoverVisible) {
      this.setState({ popoverVisible: !!value });
    }

    if (value.includes(' ')) {
      this.setState({ passwordHelp: 'Do not contain whitespace in password' });
      return callback('error');
    }

    if (value.length < 6) {
      return callback('error');
    }

    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', emailValidator)(<Input size="large" placeholder="Email" />)}
          </FormItem>
          <FormItem help={this.state.passwordHelp}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>Use at least 6 characters.</div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={this.state.popoverVisible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(<Input size="large" type="password" placeholder="Password" />)}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Confirm your password',
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(<Input size="large" type="password" placeholder="Confirm Password" />)}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
          </FormItem>
          <FormItem>
            <Link className={styles.login} to="/user/login">
              Sign in with existing account
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

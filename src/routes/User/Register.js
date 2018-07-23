import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Popover, Progress } from 'antd';
import { translate } from 'react-i18next';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@Form.create()
@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['user/register'],
}))
@translate(['user', 'common'])
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
          type: 'user/register',
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
    const { form, t } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(t('password_confirm.format'));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        passwordHelp: this.props.t('password.required'),
        popoverVisible: !!value,
      });
      return callback('error');
    }

    this.setState({ passwordHelp: '' });
    if (!this.state.popoverVisible) {
      this.setState({ popoverVisible: !!value });
    }

    if (value.includes(' ')) {
      this.setState({ passwordHelp: this.props.t('password.format') });
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

  emailValidator = {
    validate: [
      {
        trigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            message: this.props.t('email.required'),
          },
        ],
      },
      {
        trigger: 'onBlur',
        rules: [
          {
            type: 'email',
            message: this.props.t('email.format'),
          },
        ],
      },
    ],
  };

  passwordStatusMap = {
    ok: <div className={styles.success}>{this.props.t('password_strength.strong')}</div>,
    pass: <div className={styles.warning}>{this.props.t('password_strength.medium')}</div>,
    poor: <div className={styles.error}>{this.props.t('password_strength.weak')}</div>,
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
    const { form, submitting, t } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', this.emailValidator)(
              <Input size="large" placeholder={t('email.placeholder')} />
            )}
          </FormItem>
          <FormItem help={this.state.passwordHelp}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {this.passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>{t('password.tip')}</div>
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
              })(<Input size="large" type="password" placeholder={t('password.placeholder')} />)}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: t('password_confirm.required'),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input size="large" type="password" placeholder={t('password_confirm.placeholder')} />
            )}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              {t('common:register')}
            </Button>
          </FormItem>
          <FormItem>
            <Link className={styles.login} to="/user/login">
              {t('go_login')}
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

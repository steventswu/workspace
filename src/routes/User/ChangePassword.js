import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Popover, Progress } from 'antd';
import { translate } from 'react-i18next';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const fields = ['password', 'confirm'];

@Form.create()
@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['user/changePassword'],
}))
@translate(['user', 'common'])
export default class ChangePassword extends Component {
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
      if (err) return;
      this.props.dispatch({
        type: 'user/changePassword',
        payload: values,
      });
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
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
    const { getFieldDecorator, getFieldsError, isFieldTouched } = form;
    const hasError = Object.values(getFieldsError(fields)).some(Boolean);
    const isUntouched = fields.some(f => !isFieldTouched(f));
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
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
              {getFieldDecorator(fields[0], {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  autoComplete="new-password"
                  type="password"
                  placeholder={t('password.placeholder')}
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator(fields[1], {
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
              <Input
                size="large"
                autoComplete="new-password"
                type="password"
                placeholder={t('password_confirm.placeholder')}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              disabled={hasError || isUntouched}
              type="primary"
              htmlType="submit"
            >
              {t('common:change_password')}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

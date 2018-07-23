import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Popover, Progress, Alert } from 'antd';
import { translate } from 'react-i18next';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const fields = ['oldPassword', 'newPassword', 'confirm'];

@Form.create()
@connect(({ user, loading }) => ({
  errorMessage: user.errorMessage,
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
    const value = form.getFieldValue(fields[1]);
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
    this.setState({ popoverVisible: false });
    this.resetErrorMessage();
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
    if (value && value !== form.getFieldValue(fields[1])) {
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
      return callback('required');
    }

    this.setState({ passwordHelp: '' });
    if (!this.state.popoverVisible) {
      this.setState({ popoverVisible: true });
    }

    if (value.includes(' ')) {
      this.setState({ passwordHelp: this.props.t('password.format') });
      return callback('password.format');
    }

    if (value.length < 6) {
      return callback('length');
    }

    const { form } = this.props;

    if (value === form.getFieldValue(fields[0])) {
      this.setState({ passwordHelp: this.props.t('new_password.format') });
      return callback('new_password.format');
    }

    if (value && form.isFieldTouched(fields[2])) {
      form.validateFields([fields[2]], { force: true });
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
    const value = form.getFieldValue(fields[1]);
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

  resetErrorMessage = () => {
    this.props.dispatch({ type: 'user/resetErrorMessage' });
  };

  renderAlertMessage = content => (
    <Alert
      style={{ marginBottom: 24 }}
      message={content}
      type="error"
      showIcon
      closable
      afterClose={this.resetErrorMessage}
    />
  );

  hidePopover = () => this.setState({ popoverVisible: false });

  render() {
    const { form, submitting, t, errorMessage } = this.props;
    const { getFieldDecorator, getFieldsError, isFieldTouched } = form;
    const hasError = Object.values(getFieldsError(fields)).some(Boolean);
    const isUntouched = fields.some(f => !isFieldTouched(f));
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          {errorMessage && this.renderAlertMessage(errorMessage)}
          <FormItem>
            {getFieldDecorator(fields[0], {
              rules: [
                {
                  required: true,
                  message: t('password.required'),
                },
              ],
            })(
              <Input
                size="large"
                autoComplete="password"
                type="password"
                placeholder={t('old_password.placeholder')}
              />
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
              {getFieldDecorator(fields[1], {
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
                  placeholder={t('new_password.placeholder')}
                  onBlur={this.hidePopover}
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator(fields[2], {
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

import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col as Column,
  Form,
  Input,
  Icon,
  Button,
  Checkbox,
  Popover,
  Progress,
  Alert,
} from 'antd';
import Link from 'umi/link';
import { PRIVACY, TERMS_AND_CONDITIONS } from 'src/routes';
import { translate } from 'react-i18next';
import Container from 'src/components/Container';
import styles from './register.less';

const FormItem = Form.Item;

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@Form.create()
@connect(({ register, user, loading }) => ({
  register,
  errorMessage: user.errorMessage,
  submitting: loading.effects['user/register'],
}))
@translate(['user', 'common'])
export default class Register extends Component {
  state = {
    unchecked: true,
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
    this.setState({ popoverVisible: false });
    this.resetErrorMessage();
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

  handbleCheckbox = e => {
    const value = !e.target.checked;
    console.log(value);
    this.setState({
      unchecked: value,
    });
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

  render() {
    const { form, submitting, t, errorMessage } = this.props;
    const { getFieldDecorator } = form;
    const buttonDisabled = this.state.unchecked;
    return (
      <Container className={styles.registerBackground}>
        <Row gutter={16}>
          <Column
            xs={24}
            lg={{ span: 11, push: 13 }}
            style={{ marginTop: '20%', marginBottom: '10%' }}
          >
            <Form className={styles.main} onSubmit={this.handleSubmit}>
              {errorMessage && this.renderAlertMessage(errorMessage)}
              <FormItem>
                {getFieldDecorator('email', this.emailValidator)(
                  <Input
                    size="large"
                    placeholder={t('email.placeholder')}
                    prefix={<Icon type="user" style={{ color: 'rgba(255, 255, 255, 0.35)' }} />}
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
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder={t('password.placeholder')}
                      prefix={<Icon type="lock" style={{ color: 'rgba(255, 255, 255, 0.35)' }} />}
                    />
                  )}
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
                  <Input
                    size="large"
                    type="password"
                    placeholder={t('password_confirm.placeholder')}
                    prefix={<Icon type="lock" style={{ color: 'rgba(255, 255, 255, 0.35)' }} />}
                  />
                )}
              </FormItem>
              <FormItem>
                <Row>
                  <Checkbox onChange={this.handbleCheckbox} id="accept">
                    <span className={styles.links}>
                      <span>I accept&nbsp;</span>
                      <Link to={PRIVACY} target="_blank">
                        Privacy Policy&nbsp;
                      </Link>&amp;
                      <Link to={TERMS_AND_CONDITIONS} target="_blank">
                        &nbsp;Terms and Conditions
                      </Link>
                    </span>
                  </Checkbox>
                </Row>
              </FormItem>
              <FormItem>
                <Button
                  disabled={buttonDisabled}
                  size="large"
                  loading={submitting}
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  {t('common:join_now')}
                </Button>
              </FormItem>
              <FormItem>
                <Link className={styles.login} to="/user/login">
                  {t('go_login')}
                </Link>
              </FormItem>
            </Form>
          </Column>
          <Column xs={0} lg={{ span: 13, pull: 11 }} style={{ marginTop: '21%' }}>
            <Column offset={2}>
              <div className={styles.join}>{t('common:join_now')}</div>
              <div className={styles.title_container}>
                <p>Experience the future of crypto</p>
              </div>
            </Column>
          </Column>
        </Row>
      </Container>
    );
  }
}

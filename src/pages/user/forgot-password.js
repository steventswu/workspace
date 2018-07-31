import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Alert } from 'antd';
import { translate } from 'react-i18next';
import { LOGIN } from 'src/routes';
import styles from './styles.less';

const FormItem = Form.Item;

@Form.create()
@connect(({ loading }) => ({ submitting: loading.effects['user/forgotPassword'] }))
@translate(['user', 'common'])
export default class ForgotPassword extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.resetErrorMessage();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (err) return;
      this.props.dispatch({
        type: 'user/forgotPassword',
        payload: values,
      });
    });
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
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          {errorMessage && this.renderAlertMessage(errorMessage)}
          <FormItem>
            {getFieldDecorator('email', this.emailValidator)(
              <Input size="large" placeholder={t('email.placeholder')} />
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
              {t('common:submit')}
            </Button>
          </FormItem>
          <FormItem>
            <Link className={styles.login} to={LOGIN}>
              {t('common:return_to', { route: t('common:login') })}
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }

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
}

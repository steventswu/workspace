import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col as Column, Form, Icon, Input, Button, Alert } from 'antd';
import { translate } from 'react-i18next';
import { LOGIN } from 'src/routes';
import Container from 'src/components/Container';
import * as resetAssets from 'src/assets/reset';
import styles from './forgot-pass.less';

const FormItem = Form.Item;

@Form.create()
@connect(({ user, loading }) => ({
  errorMessage: user.errorMessage,
  submitting: loading.effects['user/forgotPassword'],
}))
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
      <Container className={styles.forgetPassBackground}>
        <Row gutter={16}>
          <Column
            xs={24}
            lg={{ span: 11, push: 13 }}
            style={{ marginTop: '20%', marginBottom: '20%' }}
          >
            <Form className={styles.main} onSubmit={this.handleSubmit}>
              {errorMessage && this.renderAlertMessage(errorMessage)}
              <Row className={styles.title}>
                <Column>
                  <img style={{ width: '160' }} src={resetAssets.key} alt="" />
                </Column>
                <h3>{t('reset.title')}</h3>
              </Row>
              <FormItem>
                {getFieldDecorator('email', this.emailValidator)(
                  <Input
                    size="large"
                    placeholder={t('email.placeholder')}
                    prefix={<Icon type="mail" style={{ color: 'rgba(255, 255, 255, 0.35)' }} />}
                  />
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
          </Column>
          <Column
            xs={0}
            lg={{ span: 13, pull: 11 }}
            style={{ marginTop: '20%', marginBottom: '30%' }}
          >
            <Column offset={2}>
              <div className={styles.changepass}>{t('common:submit')}</div>
            </Column>
          </Column>
        </Row>
      </Container>
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

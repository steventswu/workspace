import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col as Column, Form, Icon, Input, Button, Alert } from 'antd';
import { translate } from 'react-i18next';
import { LOGIN } from 'src/routes';
import Container from 'src/components/Container';
import * as resetAssets from 'src/assets/reset';
import styles from './confirm.less';

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
      <Container className={styles.confirmBackground}>
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
                  <img style={{ width: '160' }} src={resetAssets.success} alt="" />
                </Column>
                <h3>{t('result.title')}</h3>
              </Row>
              <FormItem>
                <Link to={LOGIN}>
                  <Button className={styles.submit} size="large" type="primary">
                    {t('common:return')}
                  </Button>
                </Link>
              </FormItem>
            </Form>
          </Column>
          <Column
            xs={0}
            lg={{ span: 13, pull: 11 }}
            style={{ marginTop: '20%', marginBottom: '30%' }}
          >
            <Column span={16} offset={2}>
              <div className={styles.help}>{t('common:mail_sent')}</div>
            </Column>
          </Column>
        </Row>
      </Container>
    );
  }
}
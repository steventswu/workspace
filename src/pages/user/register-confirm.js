import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Row, Col as Column, Form, Button } from 'antd';
import { translate } from 'react-i18next';
import { LOGIN } from 'src/routes';
import Container from 'src/components/Container';
import * as resetAssets from 'src/assets/reset';
import styles from './result.less';

const FormItem = Form.Item;

@Form.create()
@translate(['user', 'common'])
export default class RegisterResult extends Component {
  render() {
    const { t } = this.props;
    return (
      <Container className={styles.forgetPassBackground}>
        <Row gutter={16}>
          <Column
            xs={24}
            lg={{ span: 11, push: 13 }}
            style={{ marginTop: '20%', marginBottom: '20%' }}
          >
            <Form className={styles.main} onSubmit={this.handleSubmit}>
              <Row className={styles.title}>
                <Column>
                  <img style={{ width: '160' }} src={resetAssets.success} alt="" />
                </Column>
                <h3>{t('confirm.title')}</h3>
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

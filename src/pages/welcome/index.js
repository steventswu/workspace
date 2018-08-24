import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Row, Col as Column, Form, Button } from 'antd';
import { translate } from 'react-i18next';
import { HOME } from 'src/routes';
import Container from 'src/components/Container';
import * as welcomeAssets from 'src/assets/welcome';
import styles from './index.less';

const FormItem = Form.Item;

@Form.create()
@translate(['welcome', 'common'])
export default class Welcome extends Component {
  render() {
    const { t } = this.props;
    return (
      <Container className={styles.welcomeBackground}>
        <Row>
          <Column xs={24} lg={24}>
            <div className={styles.blur_block}>
              <img className={styles.logo} src={welcomeAssets.logo['1x']} alt="CAPxMICA" />
              <div className={styles.titleContainer}>
                <div className={styles.welcome}>{t('common:future_of')}</div>
                <div className={styles.subtitleWrapper}>{t('common:tixguru_unveiled')}</div>
              </div>
              <div className={styles.dateContainer}>
                <div className={styles.year}>2018</div>
                <div className={styles.month}>08</div>
                <div className={styles.day}>20</div>
              </div>
            </div>
          </Column>
          {/* <Column xs={{ span: 9, push: 7, pull: 7 }} lg={{ push: 10, span: 24 }}> */}
          <Column xs={{ span: 12, push: 6, pull: 6 }} lg={{ span: 5, push: 19, pull: 0 }}>
            <Link to={HOME}>
              <img style={{ marginTop: 24 }} src={welcomeAssets.getstarted} alt="Get Started" />
            </Link>
          </Column>
        </Row>
      </Container>
    );
  }
}

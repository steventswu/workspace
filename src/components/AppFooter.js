import React from 'react';
import { Row, Col as Column } from 'antd';

import tixguruLogo from 'src/assets/logo-text.svg';
import Container from './Container';
import styles from './styles/AppFooter.less';

export default () => (
  <Container className={styles.footerContainer}>
    <Row className={[styles.row, styles.footer].join(' ')}>
      <Column xs={24} lg={12}>
        <img className={styles.logo} src={tixguruLogo} alt="Tixguru" />
        <p className={styles.desc}>We'd love to hear from you</p>
        <p className={[styles.intro, styles.dim].join(' ')}>
          The first autonomous "tokenized crypto fund".<br /> An easy way for anyone to get exposure
          to crypto returns with a broad, diversified risk. If you'd like to learn more, contact
          anytime at
        </p>
        <p className={styles.intro}>
          <span className={styles.support}>support@tixguru.co</span>
          <span>
            <a href="tel:+886 2 85021138">+886 2 85021138</a>
          </span>
        </p>
      </Column>
      <Column xs={24} lg={12} className={styles.social}>
        <a href="#" target="_blank">
          <i className="fab fa-facebook-f" />
        </a>
        <a href="#" target="_blank">
          <i className="fab fa-twitter" />
        </a>
        <a href="#" target="_blank">
          <i className="fab fa-linkedin-in" />
        </a>
        <a href="#" target="_blank">
          <i className="fab fa-instagram" />
        </a>
      </Column>
      <Column span={24} className={styles.footer}>
        <span>© 2018 Tixguru Pte. Ltd.</span>
        <span className={styles.links}>
          <a href="#" target="_blank">
            Privacy
          </a>
          <a href="#" target="_blank">
            Terms and Conditions
          </a>
          <a href="#" target="_blank">
            Cookie Policy
          </a>
          <a href="#" target="_blank">
            FAQ
          </a>
        </span>
      </Column>
    </Row>
  </Container>
);

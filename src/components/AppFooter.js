import React from 'react';
import { Row, Col as Column } from 'antd';
import Link from 'umi/link';
import { PRIVACY, TERMS_AND_CONDITIONS, COOKIE_POLICY } from 'src/routes';
import tixguruLogo from 'src/assets/logo-text.svg';
import Container from './Container';
import styles from './AppFooter.less';

/* eslint-disable jsx-a11y/href-no-hash */
export default () => (
  <Container className={styles.footerContainer}>
    <Row className={[styles.row, styles.footer].join(' ')}>
      <Column xs={24} lg={12}>
        <img className={styles.logo} src={tixguruLogo} alt="Tixguru" />
        <p className={styles.desc}>We'd love to hear from you ;)</p>
        <p className={[styles.intro, styles.dim].join(' ')}>
          The first autonomous "tokenized crypto fund".<br /> An easy way for anyone to get exposure
          to crypto returns with a broad, diversified risk. If you'd like to learn more, contact
          anytime at
        </p>
        <p className={styles.intro}>
          <span className={styles.support}>
            <a href="mailto:support@tixguru.co">support@tixguru.co</a>
          </span>
          <span>
            <a href="tel:+886285021138">+886 2 85021138</a>
          </span>
        </p>
      </Column>
      <Column xs={24} lg={12} className={styles.social}>
        <a href="https://www.facebook.com/Tixguru/" target="_blank">
          <i className="fab fa-facebook-f" />
        </a>
        <a href="https://twitter.com/tixguru" target="_blank">
          <i className="fab fa-twitter" />
        </a>
        <a href="https://medium.com/tixguru" target="_blank">
          <i className="fab fa-medium-m" />
        </a>
        <a href="https://www.youtube.com/channel/UCw-PfsMFAN02gxw0D6D7ovA/featured" target="_blank">
          <i className="fab fa-youtube" />
        </a>
      </Column>
      <Column span={24} className={styles.footer}>
        <span>© 2018 Tixguru Pte. Ltd.</span>
        <span className={styles.links}>
          <Link to={PRIVACY}>Privacy</Link>
          <Link to={TERMS_AND_CONDITIONS}>Terms and Conditions</Link>
          <Link to={COOKIE_POLICY}>Cookie Policy</Link>
          <a
            href="https://medium.com/tixguru/cap-faq-7f5a5439a72f"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAQ
          </a>
        </span>
      </Column>
    </Row>
  </Container>
);

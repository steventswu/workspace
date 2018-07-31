import React from 'react';
import { Redirect } from 'dva/router';
import Container from 'src/components/Container';

import * as Section from './sections';
import styles from './index.less';

const checkQueryString = qs => typeof qs === 'string' && qs.includes('oauth_token');

export default () =>
  checkQueryString(window.location.search) ? (
    <Redirect to={{ pathname: '/user/login', search: window.location.search }} />
  ) : (
    <React.Fragment>
    <Container className={styles.main}>
      <Section.Main />
    </Container>
    <Container className={styles.features}>
      <Section.Features />
    </Container>
    <Container className={styles.product}>
      <Section.Product />
      <Section.Team />
    </Container>
    <Container className={styles.news}>
      <Section.News />
    </Container>
    <Section.Action />
  </React.Fragment>
  );

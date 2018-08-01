import React from 'react';
import Container from 'src/components/Container';
import router from 'umi/router';
import { BUY } from 'src/routes';

import * as Section from './sections';
import styles from './index.less';

const handleAction = () => router.push(BUY);

export default () => (
  <React.Fragment>
    <Container className={styles.main}>
      <Section.Main onAction={handleAction} />
    </Container>
    <Container className={styles.features}>
      <Section.Features />
    </Container>
    <Container className={styles.product}>
      <Section.Product onAction={handleAction} />
      <Section.Team />
    </Container>
    <Container className={styles.news}>
      <Section.News />
    </Container>
    <Section.Action onAction={handleAction} />
  </React.Fragment>
);

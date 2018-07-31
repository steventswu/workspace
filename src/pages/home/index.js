import React from 'react';
import Container from 'src/components/Container';

import * as Section from './sections';
import styles from './index.less';

export default () => (
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

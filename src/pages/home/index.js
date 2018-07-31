import React from 'react';
import Container from 'src/components/Container';
import router from 'umi/router';
import { BUY } from 'src/routes';

import { I18n } from 'react-i18next';
import * as Section from './sections';
import styles from './index.less';

const handleAction = () => router.push(BUY);

export default () => (
  <I18n ns={['home']}>
    {t => (
      <React.Fragment>
        <Container className={styles.main}>
          <Section.Main onAction={handleAction} content={t('main', { returnObjects: true })} />
        </Container>
        <Container className={styles.features}>
          <Section.Features t={t} />
        </Container>
        <Container className={styles.product}>
          <Section.Product onAction={handleAction} t={t} />
          <Section.Team t={t} />
        </Container>
        <Container className={styles.news}>
          <Section.News t={t} />
        </Container>
        <Section.Action onAction={handleAction} t={t} />
      </React.Fragment>
    )}
  </I18n>
);

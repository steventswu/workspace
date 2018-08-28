import React from 'react';
import Container from 'src/components/Container';
import router from 'umi/router';

import { I18n } from 'react-i18next';
import * as Section from './sections';
import * as whyAssets from 'src/assets/whyus';
import styles from './index.less';

export default () => (
  <I18n ns={['whyus']}>
    {t => (
      <React.Fragment>
        <Container className={styles.main}>
          <Section.Main content={t('main', { returnObjects: true })} />
        </Container>
        <Container className={styles.calendar}>
          <Section.Calendar t={t} />
        </Container>
      </React.Fragment>
    )}
  </I18n>
);

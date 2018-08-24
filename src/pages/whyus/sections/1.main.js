import React from 'react';
import { Row, Col as Column } from 'antd';
import { translate } from 'react-i18next';
import styles from './1.main.less';

@translate(['whyus'])
class TitlePage extends React.PureComponent {
  render() {
    const { t } = this.props;
    return (
      <main className={styles.main}>
        <Row className={styles.intro}>
          <Column xs={24} lg={{ span: 9 }}>
            <div className={styles.title_container}>
              <h1>{t('whyus:title')}</h1>
            </div>
          </Column>
          <Column xs={24} lg={{ span: 14, push: 1 }}>
            <div className={styles.description_container}>
              <p align="justify">{t('whyus:description')}</p>
              <p align="justify">{t('whyus:description_2')}</p>
              <p align="justify">{t('whyus:description_3')}</p>
            </div>
          </Column>
        </Row>
      </main>
    );
  }
}

export default () => <TitlePage />;

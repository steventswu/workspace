import React from 'react';
import { Layout, Row, Col as Column } from 'antd';
import DocumentTitle from 'react-document-title';
import GlobalHeader from 'src/components/GlobalHeader';
import logo from 'src/assets/logo.svg';

import * as Section from './sections';
import styles from './Home.less';

const Container = props => (
  <Row className={props.className}>
    <Column xs={24} md={{ push: 4, pull: 4, span: 16 }}>
      {props.children}
    </Column>
  </Row>
);

export default ({ isLoading, currentUser, onClickLogout, onClickLogin }) => (
  <DocumentTitle title="CAP, Cryptocurrency Assets Portfolio - The first Crypto index fund | Tixguru">
    <Layout>
      <Layout.Header style={{ overflow: 'hidden', paddingLeft: 0, paddingRight: 0 }}>
        <Container>
          <GlobalHeader
            logo={logo}
            currentUser={currentUser}
            onClickLogout={onClickLogout}
            onClickLogin={onClickLogin}
            isLoading={isLoading}
          />
        </Container>
      </Layout.Header>
      <Layout.Content>
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
      </Layout.Content>
      <Layout.Footer>{/* <Section.Contact /> */}</Layout.Footer>
    </Layout>
  </DocumentTitle>
);

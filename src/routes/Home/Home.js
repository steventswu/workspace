import React from 'react';
import { Layout, Row, Col as Column } from 'antd';
import DocumentTitle from 'react-document-title';
import GlobalHeader from 'src/components/GlobalHeader';
import logo from 'src/assets/logo.svg';

import * as Section from './sections';

export default ({ isLoading, currentUser, onClickLogout, onClickLogin }) => (
  <DocumentTitle title="CAP, Cryptocurrency Assets Portfolio - The first Crypto index fund | Tixguru">
    <Layout>
      <Layout.Header style={{ overflow: 'hidden', paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          <Column xs={24} md={{ span: 16, push: 4, pull: 4 }}>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              onClickLogout={onClickLogout}
              onClickLogin={onClickLogin}
              isLoading={isLoading}
            />
          </Column>
        </Row>
      </Layout.Header>
      <Layout.Content>
        <Row>
          <Column push={4} pull={4} span={16}>
            <Section.Main />
            <Section.Features />
            <Section.Product />
            <Section.Team />
            <Section.News />
            <Section.Action />
            <Section.Contact />
          </Column>
        </Row>
      </Layout.Content>
    </Layout>
  </DocumentTitle>
);

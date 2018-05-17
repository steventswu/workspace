import React, { Component, Fragment } from 'react';
import { Row, Col, Card } from 'antd';
import Title from 'components/Title';

import styles from './BasicPerformance.less';

export default class BasicPerformance extends Component {
  render() {
    return (
      <Fragment>
        <section className={styles.section}>
          <Title title="Net Asset Value" />
          <div>
            <Row style={{ marginBottom: 2 }} gutter={4}>
              <Col span={16} push={8}>
                <Card style={{ width: '100%' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col span={8} pull={16}>
                <Card style={{ width: '100%', height: '33%' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
                <Card style={{ width: '100%', height: '33%' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
                <Card style={{ width: '100%', height: '33%' }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </Fragment>
    );
  }
}

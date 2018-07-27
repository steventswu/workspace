import React from 'react';
import { Row, Col as Column } from 'antd';

const Container = props => (
  <Row className={props.className}>
    <Column xs={24} md={{ push: 4, pull: 4, span: 16 }}>
      {props.children}
    </Column>
  </Row>
);

export default Container;

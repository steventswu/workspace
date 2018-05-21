import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import Result from 'components/Result';
import styles from './style.less';

class Step3 extends React.PureComponent {
  render() {
    // const { data } = this.props;
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>
            Buy Your Tokens
          </Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            Contract Address
          </Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            0xe0de6bbc6589160e8539230eead301f8481bc1b2
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary">Finish</Button>
      </Fragment>
    );
    return <Result extra={information} actions={actions} className={styles.result} />;
  }
}

export default connect(({ token }) => ({
  data: token.step,
}))(Step3);

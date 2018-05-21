import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './style.less';

class Step3 extends React.PureComponent {
  render() {
    // const { data } = this.props;
    return (
      <Fragment>
        <div className={styles.information}>
          <Row>
            <Col offset={4} span={8} className={styles.cap}>
              Buy Your CAP
            </Col>
          </Row>
          <Row>
            <Col offset={5} span={8} className={styles.label}>
              • Do not send from exchange wallets
            </Col>
          </Row>
          <Row>
            <Col offset={5} span={8} className={styles.label}>
              • Set gas limit to 100,000.
            </Col>
          </Row>
          <Row>
            <Col offset={5} span={8} className={styles.label}>
              • Send ETH to following Contract Address
            </Col>
          </Row>
          <Row>
            <Col offset={4} span={8} className={styles.label}>
              Contract Address
            </Col>
          </Row>
          <Row>
            <Col offset={4} span={8} className={styles.address}>
              0xe0de6bbc6589160e8539230eead301f8481bc1b2
            </Col>
          </Row>
          <Row>
            <Col offset={4} span={8} className={styles.label}>
              <a>Open in Etherscan</a>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ token }) => ({
  data: token.step,
}))(Step3);

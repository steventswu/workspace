import React from 'react';
import { connect } from 'dva';
import styles from './style.less';

class Step3 extends React.PureComponent {
  render() {
    // const { data } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.information}>
          <h1>Buy Your CAP</h1>
          <ul>
            <li>Do not send from exchange wallets.</li>
            <li>Set gas limit to 100,000.</li>
            <li>Send ETH to following Contract Address.</li>
          </ul>
          <h2>Contract Address</h2>
          <p className={styles.address}>0xe0de6bbc6589160e8539230eead301f8481bc1b2</p>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://ropsten.etherscan.io/address/0xe0de6bbc6589160e8539230eead301f8481bc1b2"
            >
              Open in Etherscan
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default connect(({ token }) => ({
  data: token.step,
}))(Step3);

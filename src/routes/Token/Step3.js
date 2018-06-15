import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Metamask from 'src/services/Metamask';
import { CONTRACT, getEtherscanLink } from 'src/utils/contract';
import styles from './style.less';

const stateMapper = ({ token }) => ({
  contractAddress: CONTRACT[token.cap].address,
});

@connect(stateMapper)
export default class Step3 extends React.PureComponent {
  handleReturn = () => {
    this.props.dispatch(routerRedux.replace('/profile'));
  };

  render() {
    const Content = ({ children }) =>
      Metamask.isInstalled ? (
        <React.Fragment>
          <h1 style={{ marginTop: 50 }}>Continue your purchase on Metamask</h1>
          {children}
        </React.Fragment>
      ) : (
        <div className={styles.information}>
          <h1>Buy Your CAP</h1>
          <ul>
            <li>Do not send from exchange wallets.</li>
            <li>Set gas limit to 150,000.</li>
            <li>Send ETH to following Contract Address.</li>
          </ul>
          <h2>Contract Address</h2>
          <p className={styles.address}>{this.props.contractAddress}</p>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={getEtherscanLink(this.props.contractAddress)}
            >
              Open in Etherscan
            </a>
          </p>
          {children}
        </div>
      );
    return (
      <div className={styles.wrapper}>
        <Content>
          <p>Note: It takes 15-20 minutes of transaction time to process your purchase.</p>
          <Button type="primary" style={{ marginTop: 50 }} onClick={this.handleReturn}>
            Open Profile
          </Button>
        </Content>
      </div>
    );
  }
}

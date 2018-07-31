import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { translate } from 'react-i18next';
import Web3 from 'src/services/Web3';
import { CONTRACT, getEtherscanLink } from 'src/utils/contract';

import { PROFILE } from 'src/routes';
import styles from './style.less';

@connect(({ token }) => ({
  contractAddress: CONTRACT[token.cap].address,
}))
@translate('buy')
export default class Step3 extends React.PureComponent {
  handleReturn = () => {
    this.props.dispatch(routerRedux.replace(PROFILE));
  };

  render() {
    const { t } = this.props;
    const Content = ({ children }) =>
      Web3.isInstalled ? (
        <React.Fragment>
          <h1 style={{ marginTop: 50 }}>{t('continue')}</h1>
          {children}
        </React.Fragment>
      ) : (
        <div className={styles.information}>
          <h1>{t('info.title')}</h1>
          <ul>
            {t('info.content', { returnObjects: true }).map((content, i) => (
              // eslint-disable-next-line
              <li key={i}>{content}</li>
            ))}
          </ul>
          <h2>{t('info.contract')}</h2>
          <p className={styles.address}>{this.props.contractAddress}</p>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={getEtherscanLink(this.props.contractAddress)}
            >
              {t('info.etherscan')}
            </a>
          </p>
          {children}
        </div>
      );
    return (
      <div className={styles.wrapper}>
        <Content>
          <p>{t('notice')}</p>
          <Button type="primary" style={{ marginTop: 50 }} onClick={this.handleReturn}>
            {t('return')}
          </Button>
        </Content>
      </div>
    );
  }
}

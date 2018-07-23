import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import styles from './ProfileHome.less';
import column from './ProfileHome.json';

@connect(({ profile, loading }) => ({
  portfolio: profile.portfolio,
  loading: loading.effects['profile/fetchPortfolio'],
}))
@translate('profile')
export default class UserPortfolio extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetchPortfolio' });
  }

  portfolioColumnMapper = col => ({ ...col, title: this.props.t(`portfolio.${col.dataIndex}`) });

  render() {
    const { portfolio, loading, t } = this.props;

    let tableContent = (
      <Table
        style={{ marginBottom: 50 }}
        key="empty"
        columns={column.portfolio.map(this.portfolioColumnMapper)}
        pagination={false}
        scroll={{ x: 1000 }}
        locale={{ emptyText: t('empty_text') }}
        title={() => <h2>{t('portfolio.wallet_address', { address: '-----' })}</h2>}
        footer={() => (
          <ul>
            <li>{t('initial_capital')}: ---</li>
            <li>{t('total_eth')}: ---</li>
            <li>{t('roi')}: ---</li>
          </ul>
        )}
      />
    );

    if (portfolio.length) {
      tableContent = portfolio.map(data => (
        <Table
          style={{ marginBottom: 50 }}
          key={data.walletAddress}
          columns={column.portfolio.map(this.portfolioColumnMapper)}
          dataSource={data.contracts}
          loading={loading}
          pagination={false}
          scroll={{ x: 1000 }}
          locale={{ emptyText: t('empty_text') }}
          title={() => <h2>{t('portfolio.wallet_address', { address: data.walletAddress })}</h2>}
          footer={() => (
            <ul>
              <li>
                {t('initial_capital')}: {data.summary.amount}
              </li>
              <li>
                {t('total_eth')}: {data.summary.eth}
              </li>
              <li>
                {t('roi')}: {data.summary.roi}
              </li>
            </ul>
          )}
        />
      ));
    }

    return (
      <div className={styles.portfolio}>
        <h1>{t('portfolio.title')}</h1>
        {tableContent}
      </div>
    );
  }
}

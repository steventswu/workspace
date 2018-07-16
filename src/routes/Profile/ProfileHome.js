import React from 'react';
import { Table, Card } from 'antd';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import styles from './ProfileHome.less';
import column from './ProfileHome.json';

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetch'],
}))
@translate('profile')
export default class ProfileHome extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }

  portfolioColumnMapper = col => ({ ...col, title: this.props.t(`portfolio.${col.dataIndex}`) });

  transactionColumnMapper = col =>
    col.key === 'actions'
      ? {
          ...col,
          render: (_, record) => (
            <span>
              <a href={record.url || '#'} target="_blank">
                {this.props.t('view_in_etherscan')}
              </a>
            </span>
          ),
        }
      : {
          ...col,
          title: this.props.t(`transaction_history.${col.dataIndex}`),
        };

  render() {
    const {
      profile: { transactions, portfolio: { contracts, summary = {} } = {} },
      loading,
      t,
    } = this.props;
    return (
      <React.Fragment>
        <h1>{t('portfolio.title')}</h1>
        <Table
          columns={column.portfolio.map(this.portfolioColumnMapper)}
          dataSource={contracts}
          loading={loading}
          pagination={false}
          scroll={{ x: 1000 }}
          footer={() => (
            <div className={styles.summary}>
              <Card title={t('initial_capital')} bordered={false} style={{ width: 202 }}>
                <span>{summary.amount}</span>
              </Card>
              <Card title={t('total_eth')} bordered={false} style={{ width: 200 }}>
                <span>{summary.eth}</span>
              </Card>
              <Card title={t('total_usd')} bordered={false} style={{ width: 200 }}>
                <span>{summary.usd}</span>
              </Card>
              <Card title={t('roi')} bordered={false} style={{ width: 100 }}>
                <span>{summary.roi}</span>
              </Card>
            </div>
          )}
        />
        <h1>{t('transaction_history.title')}</h1>
        <Table
          columns={column.transaction.map(this.transactionColumnMapper)}
          dataSource={transactions}
          loading={loading}
        />
      </React.Fragment>
    );
  }
}

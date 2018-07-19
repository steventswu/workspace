import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import column from './ProfileHome.json';

@connect(({ profile, loading }) => ({
  transactions: profile.transactions,
  loading: loading.effects['profile/fetchTransactions'],
}))
@translate('profile')
export default class ProfileHome extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetchTransactions' });
  }

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
    const { transactions, loading, t } = this.props;
    return (
      <React.Fragment>
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

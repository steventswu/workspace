import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { translate } from 'react-i18next';

const column = [
  {
    title: 'Buy/Sell',
    dataIndex: 'type',
    fixed: 'left',
  },
  {
    title: 'Wallet Address',
    dataIndex: 'address',
  },
  {
    title: 'CAP Name',
    dataIndex: 'label',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: '',
    key: 'actions',
  },
];

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
          columns={column.map(this.transactionColumnMapper)}
          dataSource={transactions}
          loading={loading}
          scroll={{ x: true }}
        />
      </React.Fragment>
    );
  }
}

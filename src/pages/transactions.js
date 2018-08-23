import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import etherscanLogo from 'src/assets/etherscan-logo.svg';
import { CONTRACTS } from 'src/utils/contract';
import { statusMapper } from 'src/utils/helper';
import styles from './transactions.less';

const truncate = s => [s.substring(0, 5), '......', s.substring(35)].join('');

const column = [
  {
    title: 'Buy/Sell',
    dataIndex: 'type',
    width: 120,
    fixed: 'left',
    filters: [{ text: 'Buy', value: 'BUY' }, { text: 'Sell', value: 'SELL' }],
    onFilter: (value, record) => record.type === value,
  },
  {
    title: 'Wallet Address',
    dataIndex: 'address',
    onFilter: (value, record) => record.address === value,
  },
  {
    title: 'CAP Name',
    dataIndex: 'label',
    width: 150,
    filters: CONTRACTS.map(c => ({
      text: c.label,
      value: c.label,
    })),
    onFilter: (value, record) => record.label === value,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 120,
    filters: [
      { text: statusMapper.pending, value: statusMapper.pending },
      { text: statusMapper.success, value: statusMapper.success },
      { text: statusMapper.fail, value: statusMapper.fail },
    ],
    onFilter: (value, record) => record.status === value,
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
              <a
                title={this.props.t('view_in_etherscan')}
                href={record.url || '#'}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  style={{ height: 22, width: 22 }}
                  src={etherscanLogo}
                  alt={this.props.t('view_in_etherscan')}
                />
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
    column[1].filters = [...new Set(transactions.map(t => t.address))].map(value => ({
      text: truncate(value),
      value,
    }));
    return (
      <React.Fragment>
        <h1>{t('transaction_history.title')}</h1>
        <Table
          className={styles.transacation}
          columns={column.map(this.transactionColumnMapper)}
          dataSource={transactions}
          loading={loading}
          scroll={{ x: 1100 }}
        />
      </React.Fragment>
    );
  }
}

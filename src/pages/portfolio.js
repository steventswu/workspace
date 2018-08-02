import React from 'react';
import { Table, Collapse } from 'antd';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import styles from './portfolio.less';

const column = [
  {
    title: 'CAP Name',
    dataIndex: 'label',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'NAV',
    dataIndex: 'nav',
  },
  {
    title: 'ETH',
    dataIndex: 'eth',
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
  },
];

const truncate = string =>
  typeof string === 'string' && window.matchMedia('(max-width: 575px)').matches
    ? [string.substring(0, 10), '......', string.substring(30)].join('')
    : string;

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

    return (
      <div className={styles.portfolio}>
        <h1>{t('portfolio.title')}</h1>
        <Collapse bordered={false}>
          {portfolio.map(data => (
            <Collapse.Panel
              key={data.walletAddress}
              header={
                <h2>
                  {t('portfolio.wallet_address')}
                  <br />
                  <small>{truncate(data.walletAddress)}</small>
                </h2>
              }
            >
              <Table
                columns={column.map(this.portfolioColumnMapper)}
                dataSource={data.contracts}
                loading={loading}
                pagination={false}
                scroll={{ x: true }}
                locale={{ emptyText: t('empty_text') }}
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
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}

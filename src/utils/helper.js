import numeral from 'numeral';
import { getEtherscanLink, LINK_TYPE, CONTRACT } from 'src/utils/contract';
import i18n from 'src/i18n';

const formatCurrency = currency => numeral(currency).format('$ 0,0.0[0000]');
const formatAmount = amount => numeral(amount).format('0,0[.]0[0000]');
const formatPercentage = percentage => numeral(percentage / 100).format('0 %');

const formatTime = timestamp => {
  const d = new Date(timestamp);
  let offset = -(d.getTimezoneOffset() / 60);
  offset =
    offset > 0
      ? offset
          .toString()
          .padStart(2, '0')
          .padStart(3, '+')
      : (0 - offset)
          .toString()
          .padStart(2, '0')
          .padStart(3, '-');
  return `${d.toLocaleString('en', { hour12: false })} UTC${offset}00`;
};

export const statusMapper = {
  success: i18n.t('common:success'),
  fail: i18n.t('common:failure'),
  pending: i18n.t('common:pending'),
};

export const formatTransaction = (item, i) => ({
  key: item.transactionHash + i,
  type: item.transactionType.toUpperCase(),
  address: item.walletAddress,
  label: CONTRACT[item.contractName].label,
  status: statusMapper[item.transactionStatus],
  time: item.timestamp ? formatTime(item.timestamp * 1000) : '---',
  amount: formatAmount(item.amount),
  url: getEtherscanLink(item.transactionHash, LINK_TYPE.transaction),
});

export const portfolio = response =>
  Array.isArray(response)
    ? {
        portfolio: response.map(item => ({
          walletAddress: item.walletAddress,
          summary: {
            amount: formatAmount(item.summary.amount),
            eth: formatAmount(item.summary.eth),
            usd: formatCurrency(item.summary.usd),
            roi: formatPercentage(item.summary.roi),
          },
          contracts: item.contracts.map(contract => ({
            key: contract.name,
            label: CONTRACT[contract.name].label,
            amount: formatAmount(contract.amount),
            nav: formatAmount(contract.nav),
            eth: formatAmount(contract.eth),
            usd: formatCurrency(contract.usd),
            roi: formatPercentage(contract.roi),
          })),
        })),
      }
    : [];

export const transactions = response => ({
  transactions: response.sort(sortByTimestamp).map(formatTransaction),
});

export const all = response => ({
  portfolio: {
    summary: [
      {
        amount: formatAmount(response.portfolio.summary.amount),
        eth: formatAmount(response.portfolio.summary.eth),
        usd: formatCurrency(response.portfolio.summary.usd),
        roi: formatPercentage(response.portfolio.summary.roi),
      },
    ],
    contracts: Object.keys(response.portfolio.contracts).map(label => ({
      key: label,
      label: CONTRACT[label].label,
      amount: formatAmount(response.portfolio.contracts[label].amount),
      nav: formatAmount(response.portfolio.contracts[label].nav),
      eth: formatAmount(response.portfolio.contracts[label].eth),
      usd: formatCurrency(response.portfolio.contracts[label].usd),
      roi: formatPercentage(response.portfolio.contracts[label].roi),
    })),
  },
  transactions: response.transactions.sort(sortByTimestamp).map(formatTransaction),
});

const sortByTimestamp = function sortByTimestamp(a, b) {
  if (a.timestamp === 0) return -1;
  if (b.timestamp === 0) return 1;
  return b.timestamp - a.timestamp;
};

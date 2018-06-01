import { getEtherscanLink, LINK_TYPE, CONTRACT } from 'src/utils/contract';

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

const formatStatus = item =>
  item.transactionStatus === 'success' ? formatTime(item.timestamp * 1000) : item.transactionStatus;

export const formatTransaction = (item, i) => ({
  key: item.transactionHash + i,
  type: item.transactionType.toUpperCase(),
  label: CONTRACT[item.contractName].label,
  status: formatStatus(item),
  amount: item.amount,
  url: getEtherscanLink(item.transactionHash, LINK_TYPE.transaction),
});

export const formatAll = response => ({
  portfolio: {
    summary: {
      ...response.portfolio.summary,
      usd: `$ ${response.portfolio.summary.usd}`,
      roi: `${response.portfolio.summary.roi} %`,
    },
    list: Object.keys(response.portfolio.contracts).map(label => ({
      key: label,
      label: CONTRACT[label].label,
      amount: response.portfolio.contracts[label].amount,
      nav: response.portfolio.contracts[label].nav,
      eth: response.portfolio.contracts[label].eth,
      usd: `$ ${response.portfolio.contracts[label].usd}`,
      roi: `${response.portfolio.contracts[label].roi} %`,
    })),
  },
  transactions: response.transactions.sort(sortByTimestamp).map(formatTransaction),
});

const sortByTimestamp = (a, b) => b.timestamp - a.timestamp;

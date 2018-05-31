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

export const format = (item, i) => ({
  key: item.transactionHash + i,
  type: item.transactionType.toUpperCase(),
  label: item.contractName,
  status: formatStatus(item),
  amount: item.amount,
  url: `https://ropsten.etherscan.io/tx/${item.transactionHash}`,
});

export const formatAll = response => ({
  portfolio: [],
  transactions: response.transactions.map(format),
});

import i18n from 'src/i18n';

export const CAPP_13BTC = 'capp13btc';
export const CAPP_13BTC_FUNDING = 'capp13btc-funding';
export const CAPP_13BTC_OPERATION = 'capp13btc-operation';

export const CONTRACT = {
  [CAPP_13BTC]: {
    address: process.env.CAPP_13BTC,
    label: i18n.t(`contract:${CAPP_13BTC}.title`),
    key: CAPP_13BTC,
  },
  [CAPP_13BTC_FUNDING]: {
    address: process.env.CAPP_13BTC_FUNDING,
    label: i18n.t(`contract:${CAPP_13BTC_FUNDING}.title`),
    key: CAPP_13BTC_FUNDING,
  },
  [CAPP_13BTC_OPERATION]: {
    address: process.env.CAPP_13BTC_OPERATION,
    label: i18n.t(`contract:${CAPP_13BTC_OPERATION}.title`),
    key: CAPP_13BTC_OPERATION,
  },
};

export const CONTRACTS = Object.values(CONTRACT).filter(i => i.address);

export const LINK_TYPE = {
  address: 'address',
  transaction: 'tx',
};

export const getEtherscanLink = (address, type = LINK_TYPE.address) =>
  `https://${process.env.ETHERSCAN_HOST}/${type}/${address}`;

const contractInfo = {
  fund_size: '250 ~ 50000',
  hard_cap: 50000,
  soft_cap: 250,
  lock_up: 30,
  price: 1,
  fee: 3,
  bonus: 30,
  roi_limit: 5,
  period: 60,
  minimum: 0.01,
  amount: '80,000',
  nav: 0.97,
  listed: 3,
};

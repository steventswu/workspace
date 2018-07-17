import i18n from 'src/i18n';

export const CAPP01 = 'capp13btc';
export const CAPM01 = 'capm150quant';
export const CAPI01 = 'capibtc2';

export const CONTRACT = {
  [CAPP01]: {
    address: process.env.CAPP01,
    label: i18n.t(`contract:${CAPP01}.title`),
    key: CAPP01,
  },
  [CAPM01]: {
    address: process.env.CAPM01,
    label: i18n.t(`contract:${CAPM01}.title`),
    key: CAPM01,
  },
  [CAPI01]: {
    address: process.env.CAPI01,
    label: i18n.t(`contract:${CAPI01}.title`),
    key: CAPI01,
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

export const DATA = [CAPP01, CAPM01, CAPI01].reduce(
  (acc, key) => ({
    ...acc,
    [key]: {
      key,
      ...i18n.t(`contract:${CAPM01}`, { returnObjects: true, ...contractInfo }),
    },
  }),
  {}
);

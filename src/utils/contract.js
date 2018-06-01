import info from './contractInfo.json';

export const CAPP01 = 'CAPP01';
export const CAPM01 = 'CAPM01';
export const CAPI01 = 'CAPI01';

export const CONTRACT = {
  [CAPP01]: {
    address: process.env.CAPP01,
    label: info[CAPP01].title,
    key: CAPP01,
  },
  [CAPM01]: {
    address: process.env.CAPM01,
    label: info[CAPM01].title,
    key: CAPM01,
  },
  [CAPI01]: {
    address: process.env.CAPI01,
    label: info[CAPI01].title,
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

export const DATA = Object.values(info);

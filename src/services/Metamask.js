import Eth from 'ethjs-query';
// import abi from './abi.json';

const { web3 } = window;

export const isInstalled = !!web3;

export const isDisabled = !isInstalled;

const contracts = {
  CAP01: {
    address: '0x9497a25f80910ed51b0764a4222e765c2137226e',
  },
  CAP02: {
    address: '0x9497a25f80910ed51b0764a4222e765c2137226e',
  },
  CAP03: {
    address: '0x9497a25f80910ed51b0764a4222e765c2137226e',
  },
};

const getContractAddress = contractNumber => contracts[contractNumber].address;

const validateEnvironment = () => {
  if (typeof web3 === 'undefined') throw Error('web3 is not defined');
  if (web3.version.network !== '3') throw Error('web3 network version is not 3');
};

export const open = async ({ contractNumber, amount }) => {
  if (!contractNumber || !amount) return Promise.reject(Error('Invalid params'));

  validateEnvironment();

  const eth = new Eth(web3.currentProvider);

  const [from] = await eth.accounts();

  return eth.sendTransaction({
    from,
    to: getContractAddress(contractNumber),
    value: amount * 1000000000000000000,
    data: '0x',
  });
};

export default { open, isInstalled, isDisabled };

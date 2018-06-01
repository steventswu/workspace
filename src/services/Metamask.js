import Eth from 'ethjs-query';
// import abi from './abi.json';
import { CONTRACT } from 'src/utils/contract';

const { web3 } = window;

export const isInstalled = !!web3;

export const isDisabled = !isInstalled;

const validateEnvironment = () => {
  if (typeof web3 === 'undefined') throw Error('web3 is not defined');
  // if (web3.version.network !== '3') throw Error('web3 network version is not 3');
};

export const open = ({ cap, amount }) => {
  if (!cap || !amount) return Promise.reject(Error('Invalid params'));

  validateEnvironment();

  const eth = new Eth(web3.currentProvider);

  const walletAddress = web3.eth.defaultAccount;

  return eth
    .sendTransaction({
      from: walletAddress,
      to: CONTRACT[cap].address,
      value: amount * 1000000000000000000,
      data: '0x',
    })
    .then(result => ({ result, walletAddress }));
};

export default { open, isInstalled, isDisabled };

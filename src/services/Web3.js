import Eth from 'ethjs-query';
import { CONTRACT } from 'src/utils/contract';

const isInstalled = !!window.web3;

const isDisabled = !isInstalled;

let eth;

const init = () => {
  if (!eth) {
    eth = new Eth(window.web3.currentProvider);
  }
};

const validate = async () => {
  const version = await eth.net_version();
  if (version !== process.env.NETWORK_ID) throw TypeError('Invalid Network');
};

const WEI = 1000000000000000000;

const getAccount = async () => {
  const [account] = await eth.accounts();
  if (!account) throw TypeError('Unlock your wallet and try again');
  return account;
};

const open = async ({ cap, amount, account }) => {
  if (!cap || !amount) throw TypeError('Invalid params');

  const result = await eth.sendTransaction({
    from: account,
    to: CONTRACT[cap].address,
    value: amount * WEI,
    gas: 150000,
    data: '0x',
  });
  return result;
};

window.Eth = Eth;

export default { init, validate, open, isInstalled, isDisabled, getAccount };

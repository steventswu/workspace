import Eth from 'ethjs';
import { CONTRACT } from 'src/utils/contract';
import tokenAbi from './abi.json';

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

const getAccount = async () => {
  const [account] = await eth.accounts();
  if (!account) throw TypeError('Unlock your wallet and try again');
  return account.toLowerCase();
};

const buy = ({ cap, amount, account }) =>
  eth.sendTransaction({
    from: account,
    to: CONTRACT[cap].address,
    value: Eth.toWei(amount, 'ether'),
    gas: 150000,
    data: '0x',
  });

const redeem = ({ cap, amount, address }) => {
  const token = eth.contract(tokenAbi).at(CONTRACT[cap].address);
  return token.requestRedeem(Eth.toWei(amount, 'ether'), { from: address, gas: 4606350 });
};

export default { init, validate, buy, redeem, isInstalled, isDisabled, getAccount };

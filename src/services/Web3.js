import Eth from 'ethjs';
import { CONTRACT } from 'src/utils/contract';
import i18n from 'src/i18n';
import tokenAbi from './abi.json';

const isInstalled = !!window.web3;

const isDisabled = !isInstalled;

let eth;

const init = () => {
  if (isDisabled) {
    throw TypeError(i18n.t('message:web3.disabled'));
  }
  if (!eth) {
    eth = new Eth(window.web3.currentProvider);
  }
};

const validate = async () => {
  const version = await eth.net_version();
  if (version !== process.env.NETWORK_ID) throw TypeError(i18n.t('message:web3.invalid_network'));
};

const getAccount = async () => {
  const [account] = await eth.accounts();
  if (!account) throw TypeError(i18n.t('message:web3.locked'));
  return account.toLowerCase();
};

const buy = ({ cap, amount, account }) =>
  eth.sendTransaction({
    from: account,
    to: CONTRACT[cap].address,
    value: Eth.toWei(amount, 'ether'),
    gas: 300000,
    data: '0x',
  });

const redeem = ({ cap, amount, address }) => {
  const token = eth.contract(tokenAbi).at(CONTRACT[cap].address);
  return token.requestRedeem(Eth.toWei(amount, 'ether'), { from: address, gas: 300000 });
};

export default { init, validate, buy, redeem, isInstalled, isDisabled, getAccount };

import Eth from 'ethjs-query';
// import abi from './abi.json';
import { CONTRACT } from 'src/utils/contract';

const { web3 } = window;

const isInstalled = !!web3;

const isDisabled = !isInstalled;

let eth;

const init = () => {
  eth = new Eth(web3.currentProvider);
};

const validate = async () => {
  const version = await eth.net_version();
  if (version !== process.env.NETWORK_ID) throw TypeError('Invalid Network');
  const [account] = await eth.accounts();
  if (!account) throw TypeError('Unlock your wallet and try again');
};

const open = async ({ cap, amount }) => {
  if (!cap || !amount) throw TypeError('Invalid params');

  const walletAddress = web3.eth.defaultAccount;

  return eth
    .sendTransaction({
      from: walletAddress,
      to: CONTRACT[cap].address,
      value: web3.toWei(amount),
      gas: 150000,
      data: '0x',
    })
    .then(result => ({ result, walletAddress }));
};

window.Eth = Eth;

export default { init, validate, open, isInstalled, isDisabled };

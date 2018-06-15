import Eth from 'ethjs-query';
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

const WEI = 1000000000000000000;

const open = async ({ cap, amount }) => {
  if (!cap || !amount) throw TypeError('Invalid params');

  const [walletAddress] = await eth.accounts();

  const result = await eth.sendTransaction({
    from: walletAddress,
    to: CONTRACT[cap].address,
    value: amount * WEI,
    gas: 150000,
    data: '0x',
  });
  return { result, walletAddress };
};

window.Eth = Eth;

export default { init, validate, open, isInstalled, isDisabled };

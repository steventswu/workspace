import Eth from 'ethjs-query';
// import abi from './abi.json';

class Metamask {
  constructor() {
    this.web3 = window.web3;
    this.contracts = {
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
  }

  getContractAddress = contractNumber => {
    return this.contracts[contractNumber].address;
  };

  checkNetwork = () => {
    return this.web3.version.network === '3';
  };

  openMetamask = async ({ contractNumber, amount }) => {
    if (typeof contractNumber === 'undefined' || typeof amount === 'undefined') {
      return;
    }

    if (typeof this.web3 === 'undefined' && !this.checkNetwork()) {
      return;
    }

    const eth = new Eth(this.web3.currentProvider);

    const [from] = await eth.accounts();

    return eth.sendTransaction({
      from,
      to: this.contracts[contractNumber].address,
      value: amount * 1000000000000000000,
      data: '0x',
    });
  };
}

export default new Metamask();

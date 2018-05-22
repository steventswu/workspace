import Eth from 'ethjs-query';
import EthContract from 'ethjs-contract';
import abi from './abi.json';

const { web3 } = window;

class Metamask {
  constructor() {
    this.web3 = web3;
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

  openMetamask = ({ fromAddress, contractNumber, amount }) => {
    if (
      typeof fromAddress === 'undefined' ||
      typeof contractNumber === 'undefined' ||
      typeof amount === 'undefined'
    ) {
      return;
    }

    if (typeof this.web3 === 'undefined' && !this.checkNetwork()) {
      return;
    }

    const eth = new Eth(this.web3.currentProvider);
    const contract = new EthContract(eth);
    const myContract = contract(abi).at(this.contracts[contractNumber].address);

    return myContract.eth.sendTransaction({
      from: web3.eth.defaultAccount,
      to: this.contracts[contractNumber].address,
      value: amount * 1000000000000000000,
      data: '0x',
    });
  };
}

export default new Metamask();

import { GAS_LIMIT_MAX, WEB3_HTTP_PROVIDER, WEB3_HTTP_PROVIDER_SCAN } from '../constants/blockchain';

import Tx from 'ethereumjs-tx';
import Web3 from 'web3';
import logger from '../utils/logger';

let _instance;

/** @module EthClient */
export default class EthClient {

  static get waitInterval() {
    return 10 * 1000;
  }

  static get gasLimit() {
    return GAS_LIMIT_MAX;
  }

  static toHex(value) {
    return `${value}`.startsWith('0x') ? value : '0x' + value;
  }

  static getTransactionUrl(hash) {
    return `${WEB3_HTTP_PROVIDER_SCAN}/tx/${hash}`;
  }

  static isHexAddress(address) {
    address = String(address);
    return address.startsWith('0x') && address.length === 42;
  }

  static get instance() {
    if (!_instance) {
      _instance = new EthClient(new Web3(WEB3_HTTP_PROVIDER));
    }

    return _instance;
  }

  constructor(web3) {
    this._web3 = web3;
  }

  /**
   * @return {Eth}
   */
  get eth() {
    return this._web3.eth;
  }

  /**
   * @return {Utils}
   */
  get utils() {
    return this._web3.utils;
  }

  toWei(value) {
    return this.utils.toWei(String(value || 0), 'ether');
  }

  fromWei(value) {
    return this.utils.fromWei(String(value || 0), 'ether');
  }

  weiFromGWei(value) {
    return this.utils.toWei(String(value || 0), 'gwei');
  }

  weiToGWei(value) {
    return this.utils.fromWei(String(value || 0), 'gwei');
  }

  async ethNeed(limit, price) {
    price = Math.floor(Number(price)) || await this.gasPrice();

    return Number(limit) * price;
  };

  async getTransactionReceipt(hash) {
    return this.eth.getTransactionReceipt(hash);
  };

  async isTransactionReceiptSuccess(receipt) {
    return Boolean(receipt && Number(receipt.status));
  };

  async isTransactionSuccess(hash) {
    const receipt = await this.eth.getTransactionReceipt(hash);
    return this.isTransactionReceiptSuccess(receipt);
  };

  async isTransactionFailed(hash) {
    return !(await this.isTransactionSuccess(hash));
  };

  async getTransactionCount(from) {
    return this.eth.getTransactionCount(from)
      .catch(logger.warn);
  }

  async getNonce(from) {
    return this.eth.getTransactionCount(from, 'pending');
  };

  getContract(abi, address) {
    return new this.eth.Contract(abi, address);
  };

  async gasPrice() {
    return Math.floor(Number(await this.eth.getGasPrice()));
  }

  async gasPriceInUnit(unit) {
    return this.fromWei(await this.gasPrice(), unit);
  };

  async estimateGas(address, rowTx) {
    return this.eth.estimateGas({to: address, data: rowTx});
  }

  async estimateContractTransaction(wallet, contractMethod) {
    const from = wallet.getAddressString();
    return contractMethod.estimateGas({gas: EthClient.gasLimit, from})
      .catch(reason => {
        logger.warn(reason);
        return null;
      });
  }

  async call(contractMethod, ...props) {
    return contractMethod.call(...props)
      .catch(reason => {
        logger.warn(reason);
        return null;
      });
  }

  async _prepareContractTx(contractMethod, contractAddress, from, gas = null) {
    const gasLimit = Math.floor(Number(gas && gas.limit || EthClient.gasLimit));
    const gasPrice = Math.floor(Number(gas && gas.price)) || await this.gasPrice();

    return new Tx({
      nonce: await this.getNonce(from),
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      gas: gasLimit,
      from: from,
      to: contractAddress,
      data: contractMethod.encodeABI()
    });
  }

  async _sendSignedTx(txHex) {
    return new Promise((resolve, reject) => {
      this.eth.sendSignedTransaction(txHex, (err, tx) => {
        if (err) {
          logger.warn(err && err.message);
          return reject(err);
        }

        return resolve(tx);
      });
    });
  }

  _isFailReasonNonce(reason) {
    return Boolean(~String(reason && reason.message).indexOf('replacement transaction underpriced'))
      || Boolean(~String(reason && reason.message).indexOf('nonce too low'))
      || Boolean(~String(reason && reason.message).indexOf('known transaction'));
  }

  async sendSignedTransaction(wallet, contractMethod, contractAddress, gas = null, times = 10) {
    const address = wallet.getAddressString();
    const tx = await this._prepareContractTx(contractMethod, contractAddress, address, gas);

    tx.sign(wallet.getPrivateKey());
    const serializedTx = tx.serialize();

    return this._sendSignedTx(EthClient.toHex(serializedTx.toString('hex')))
      .catch(reason => {
        if (this._isFailReasonNonce(reason) && times) {
          logger.warn('Low nonce:', tx.nonce, 'times:', --times);

          return this.sendSignedTransaction(wallet, contractMethod, contractAddress, times);
        }

        return Promise.reject(reason);
      });
  }

  async waitTransaction(hash) {
    return new Promise((resolve, reject) => {
      // console.info(`...waiting ${hash}`);

      const timer = setInterval(() => {
        this.eth.getTransaction(hash)
          .then(tx => {
            if (tx && parseInt(tx.blockNumber) > 0 && parseInt(tx.blockHash) > 0) {
              clearInterval(timer);
              resolve(this.eth.getTransactionReceipt(hash));
            }
          })
          .catch(reason => {
            clearInterval(timer);
            reject(reason);
          });
      }, EthClient.waitInterval);
    });
  }

  async sendSignedTransactionSync(wallet, contractMethod, contractAddress) {
    return this.waitTransaction(await this.sendSignedTransaction(wallet, contractMethod, contractAddress));
  }

  async getBalance(address) {
    return this.eth.getBalance(EthClient.toHex(address));
  };

  async _prepareValueTx(from, to, value, gas = null) {
    return new Tx({
      nonce: await this.getNonce(from),
      gasPrice: gas && gas.price || await this.gasPrice(),
      gasLimit: gas && gas.limit || EthClient.gasLimit,
      gas: gas && gas.limit || EthClient.gasLimit,
      from,
      to,
      value
    });
  }

  async sendEther(wallet, gas, {to, value}) {
    const tx = this._prepareValueTx(wallet.getAddressString(), to, value, gas);

    tx.sign(wallet.getPrivateKey());
    const serializedTx = tx.serialize();

    return this._sendSignedTx(EthClient.toHex(serializedTx.toString('hex')));
  };

  async sendEtherSync(wallet, gas, {to, value}) {
    return this.waitTransaction(await this.sendEther(wallet, gas, {to, value}));
  };

  eventWatch(event) {
    event.watch(function (err, result) {
      if (err) {
        return logger.warn(err);
      }
      const {event, args} = result;
      logger.info(event || result, args);
    });
  };
}

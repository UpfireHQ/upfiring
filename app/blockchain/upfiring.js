import EthClient from './client';
import { UPFIRING } from '../constants/blockchain';
import contractSettings from './contracts/Upfiring.json';
import logger from '../utils/logger';

let _instance;

export default class UpfiringContract {

  static create() {
    return new UpfiringContract(UPFIRING);
  }

  /**
   * @return {UpfiringContract}
   */
  static get instance() {
    if (!_instance) {
      _instance = UpfiringContract.create();
    }

    return _instance;
  }

  constructor(address) {
    this._contract = EthClient.instance.getContract(contractSettings.abi, address);
  }

  get address() {
    return this._contract.options.address;
  }

  /**
   * @return {{
   *   balanceOf: function(*)
   *   check: function(*)
   *   refill: function(*)
   *   withdraw: function(*)
   *   pay: function(*)
   *   totalReceivingOf: function(*)
   *   totalSpendingOf: function(*)
   * }}
   */
  get methods() {
    return this._contract.methods;
  }

  async getEventInfo(event, address) {
    const events = [];
    if (address) {
      try {
        const result = await this._contract.getPastEvents(event, {
          filter: {_to: address},
          fromBlock: 0,
          toBlock: 'latest'
        });
        for (let e of result) {
          events.push({e, block: await EthClient.instance.eth.getBlock(e.blockNumber)});
        }
        return events;
      } catch (e) {
      }
    }
  }

  getEvents() {
    return this._contract.events;
  }

  async balanceOf(address) {
    return EthClient.instance.call(this.methods.balanceOf(address))
      .catch(() => 0);
  }

  async check(torrent, address) {
    return EthClient.instance.call(this.methods.check(torrent, address))
      .catch(() => false);
  }

  async refill(wallet, value, gas = null) {
    const method = this.methods.refill(String(value));

    return EthClient.instance.sendSignedTransaction(wallet, method, this.address, gas);
  }

  async estimateRefill(wallet, value, gas = null) {
    const method = this.methods.refill(String(value));

    return EthClient.instance.sendSignedTransaction(wallet, method, this.address, gas);
  }

  async withdraw(wallet, value, gas = null) {
    const method = this.methods.withdraw(String(value));

    return EthClient.instance.sendSignedTransaction(wallet, method, this.address, gas);
  }

  async estimateWithdraw(wallet, value, gas = null) {
    const method = this.methods.withdraw(String(value));

    return EthClient.instance.sendSignedTransaction(wallet, method, this.address, gas);
  }

  async pay(wallet, torrent, amount, owner, seeders, freeSeeders, gas = null) {
    const method = this.methods.pay(torrent, String(amount), owner, seeders, freeSeeders);

    logger.info('!UpfiringContract.pay', {wallet, torrent, amount, owner, seeders, freeSeeders});
    logger.info('!UpfiringContract.pay', method);

    return EthClient.instance.sendSignedTransaction(wallet, method, this.address, gas);
  }

  async estimatePay(wallet, torrent, amount, owner, seeders, freeSeeders, gas = null) {
    const method = this.methods.pay(torrent, String(amount), owner, seeders, freeSeeders);

    return EthClient.instance.sendSignedTransaction(wallet, method, this.address, gas);
  }

  async totalReceivingOf(address) {
    return EthClient.instance.call(this.methods.totalReceivingOf(address))
      .catch(() => 0);
  }

  async totalSpendingOf(address) {
    return EthClient.instance.call(this.methods.totalSpendingOf(address))
      .catch(() => 0);
  }

  async getChangeBalance(address) {
    return this.getEventInfo('ChangeBalance', address);
  }

  async getHistory(address) {
    const [refill, withdraw, pay] = await Promise.all([
      this.getEventInfo('Refill', address),
      this.getEventInfo('Withdraw', address),
      this.getEventInfo('Pay', address)
    ]);

    return [].concat(refill, withdraw, pay)
      .sort((a, b) => a.block.timestamp < b.block.timestamp ? 1 : -1);
  }
}

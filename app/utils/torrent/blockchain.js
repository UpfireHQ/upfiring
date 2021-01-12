import UpfiringContract from '../../blockchain/upfiring';
import EthClient from '../../blockchain/client';
import logger from '../logger';

export const checkMyPayment = async (torrent, wallet, tx) => {
  const [check, success] = await Promise.all([
    UpfiringContract.instance.check(torrent, wallet && wallet.address),
    EthClient.instance.isTransactionSuccess(tx)
  ]);

  return Boolean(check && success);
};

export const checkPayment = async (torrent, address, price) => {
  const amount = Number(await UpfiringContract.instance.check(torrent, address));
  price = EthClient.instance.toWei(price);

  logger.debug('*** Check Payment', torrent, address, price, amount);

  return amount && (amount >= price);
};

export const payTorrent = async (wallet, data, gas = null) => {
  const {torrent, amount: _amount, owner, seeders, freeSeeders} = data;
  const amount = EthClient.instance.toWei(_amount);

  return UpfiringContract.instance.pay(wallet, torrent, amount, owner, seeders, freeSeeders, gas);
};

export const isPaymentSuccess = async (hash) => {
  const receipt = await EthClient.instance.waitTransaction(hash);

  return EthClient.instance.isTransactionReceiptSuccess(receipt) || Promise.reject(receipt);
};

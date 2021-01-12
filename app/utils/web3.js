import Wallet from 'ethereumjs-wallet';
import EthUtil from 'ethereumjs-util';
import logger from './logger';

export const V3options = {
  kdf: 'scrypt',
  dklen: 32,
  n: 4096,
  r: 8,
  p: 1,
  cipher: 'aes-128-ctr'
};

export const decodeWallet = (wallet, password) => {
  try {
    return Wallet.fromV3((typeof wallet === 'string') ? JSON.parse(wallet) : wallet, password);
  } catch (e) {
    logger.warn(e);
  }

  return false;
};

export const decodeWalletByPrivateKey = (privateKey) => {
  try {
    const privateKeyBuffer = EthUtil.toBuffer(privateKey);
    return Wallet.fromPrivateKey(privateKeyBuffer);
  } catch (e) {
    logger.warn(e);
  }

  return null;
};

export const walletToV3 = (wallet, password) => {
  return wallet.toV3(password, V3options);
};

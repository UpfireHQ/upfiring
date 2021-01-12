const Wallet = require('ethereumjs-wallet');
const Util = require('ethereumjs-util');

const rinkebyWallet = Wallet.fromV3(require('./rinkeby/oracle.json'), '111');

const prodWallet = Wallet.fromPrivateKey(Util.toBuffer(require('./prod/deployer-pk').pk));

module.exports = {
  rinkebyWallet,
  prodWallet
};

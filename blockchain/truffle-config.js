const TruffleWalletProvider = require('truffle-wallet-provider');
const {rinkebyWallet, prodWallet} = require('./wallets');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // match any network
    },
    rinkeby: {
      provider: () => {
        return new TruffleWalletProvider(rinkebyWallet, 'https://rinkeby.infura.io');
      },
      from: rinkebyWallet.getAddressString(),
      gasPrice: 25000000000, //25 Gwei
      network_id: 4
    },
    live: {
      provider: () => {
        return new TruffleWalletProvider(prodWallet, 'https://mainnet.infura.io');
      },
      from: prodWallet.getAddressString(),
      gasPrice: 15000000000, //15 Gwei
      network_id: 1          // Ethereum public network
    }
  }
};

const UpfiringStore = artifacts.require('./UpfiringStore');
const Upfiring = artifacts.require('./Upfiring');
const TokenMock = artifacts.require('TokenMock');
// rinkeby test account
const rinkebyWallet = require('../wallets').rinkebyWallet.getAddressString();
const prodOwnerAddress = '0x49951f41cd7Cd1629D4D0468a2A2F087f8a48f1B';

module.exports = function (deployer, network, accounts) {
  switch (network) {
    case 'live':
      liveDeploy(deployer, {tokenAddress: '0xea097a2b1db00627b2fa17460ad260c016016977'})
        .catch(reason => console.error(reason));
      break;
    case 'rinkeby':
      rinkebyDeploy(deployer)
        .then(() => rinkebyUpfiringRefill())
        .catch(reason => console.error(reason));
      break;
    default:
      developmentDeploy(deployer)
        .catch(reason => console.error(reason));
      break;
  }
};

const developmentDeploy = async (deployer) => {
  await rinkebyDeploy(deployer);
};

const rinkebyDeploy = async (deployer) => {
  await deployer.deploy(TokenMock, rinkebyWallet, 1000000000e18);

  await liveDeploy(deployer, {tokenAddress: TokenMock.address});
};

const rinkebyUpfiringRefill = async () => {
  const balance = 100e18;
  const upfiring = await Upfiring.deployed();
  const token = await TokenMock.deployed();
  await token.approve(upfiring.address, balance);
  await upfiring.refill(balance);

  console.log('\n' + `  Upfiring balance ${rinkebyWallet} is ${balance}` + '\n');
};

const liveDeploy = async (deployer, config) => {
  const {tokenAddress} = config;

  await deployer.deploy(UpfiringStore);
  await deployer.deploy(Upfiring, UpfiringStore.address, tokenAddress, 50, 3, 0);

  const store = await UpfiringStore.deployed();
  await store.transferOwnership(Upfiring.address);

  const ufr = await Upfiring.deployed();
  await ufr.transferOwnership(prodOwnerAddress);

  console.log('\n-- JS --');
  console.log(`export const upfiringStoreAddress = '${UpfiringStore.address}';`);
  console.log(`export const upfiringContractAddress = '${Upfiring.address}';`);
  console.log('--------\n');
};

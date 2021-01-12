import { DEBUG_PROD } from './app';

/**
 * @type {{tokenContract, upfiringContract, providerUrl, etherscanUrl}}
 */
const config = DEBUG_PROD
  ? require('./blockchain-config/dev.json')
  : require('./blockchain-config/prod.json');

console.log('[blockchain-config]', config);

export const TOKEN = config.tokenContract;
export const UPFIRING = config.upfiringContract;

export const GAS_LIMIT_MAX = 4700000;
export const GAS_LIMIT = 180000;
export const GAS_PRICE_DEFAULT = 10; //Gwei

export const WEB3_HTTP_PROVIDER = config.providerUrl;
export const WEB3_HTTP_PROVIDER_SCAN = config.etherscanUrl;

export const DECIMALS = Math.pow(10, 18);

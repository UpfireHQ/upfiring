import { createAction } from 'redux-actions';
import {
  ALLOWANCE,
  APPROVE,
  BALANCE_OF_CONTRACT_TOKEN,
  BALANCE_OF_ETH,
  BALANCE_OF_TOKEN,
  CHANGE_BALANCE,
  GAS_PRICE,
  HISTORY,
  REDIRECT_AFTER_SET_WALLET,
  REFILL,
  REFILL_DONE,
  REFILL_INIT,
  REMOVE_WALLET,
  SET_WALLET,
  TOTAL_RECEIVING_OF,
  TOTAL_SPENDING_OF,
  WITHDRAW,
  WITHDRAW_DONE,
  WITHDRAW_INIT
} from './constants';
import { EthClient } from '../../blockchain';
import UpfiringContract from '../../blockchain/upfiring';
import Erc20 from '../../blockchain/erc20';

export const setWalletAction = createAction(SET_WALLET);

export const removeWalletAction = createAction(REMOVE_WALLET);

export const balanceOfEthAction = createAction(BALANCE_OF_ETH, async (address) => ({
  address,
  balance: await EthClient.instance.getBalance(address)
}));

export const balanceOfTokenAction = createAction(BALANCE_OF_TOKEN, async (address) => ({
  address,
  balance: await Erc20.instance.balanceOf(address)
}));

export const balanceOfContractTokenAction = createAction(BALANCE_OF_CONTRACT_TOKEN, async (address) => ({
  address,
  balance: await UpfiringContract.instance.balanceOf(address)
}));

export const approveAction = createAction(APPROVE, async (wallet, spender, amount, gas = null) => ({
  address: wallet && wallet.getAddressString(),
  tx: await Erc20.instance.approve(wallet, spender, amount, gas)
}));

export const allowanceAction = createAction(ALLOWANCE, async (address, spender) => ({
  address,
  allowance: await Erc20.instance.allowance(address, spender)
}));

export const refillAction = createAction(REFILL, async (wallet, value, gas = null) => ({
  address: wallet && wallet.getAddressString(),
  tx: await UpfiringContract.instance.refill(wallet, value, gas)
}));

export const refillInitAction = createAction(REFILL_INIT);

export const refillDoneAction = createAction(REFILL_DONE);

export const withdrawAction = createAction(WITHDRAW, async (wallet, value, gas = null) => ({
  address: wallet && wallet.getAddressString(),
  tx: await UpfiringContract.instance.withdraw(wallet, value, gas)
}));

export const withdrawInitAction = createAction(WITHDRAW_INIT);

export const withdrawDoneAction = createAction(WITHDRAW_DONE);

export const totalReceivingOfAction = createAction(TOTAL_RECEIVING_OF, async (address) => ({
  address,
  total: await UpfiringContract.instance.totalReceivingOf(address)
}));

export const totalSpendingOfAction = createAction(TOTAL_SPENDING_OF, async (address) => ({
  address,
  total: await UpfiringContract.instance.totalSpendingOf(address)
}));

export const getChangeBalanceAction = createAction(CHANGE_BALANCE, async (address) => ({
  address,
  changeBalance: await UpfiringContract.instance.getChangeBalance(address)
}));

export const getHistoryAction = createAction(HISTORY, async (address) => ({
  address,
  history: await UpfiringContract.instance.getHistory(address)
}));

export const redirectAfterSetWalletAction = createAction(REDIRECT_AFTER_SET_WALLET);

export const getGasPriceAction = createAction(GAS_PRICE, async () => EthClient.instance.gasPrice());

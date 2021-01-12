import {
  allowanceAction,
  approveAction,
  balanceOfContractTokenAction,
  balanceOfEthAction,
  balanceOfTokenAction,
  getChangeBalanceAction,
  getHistoryAction,
  refillAction,
  refillDoneAction,
  refillInitAction,
  totalReceivingOfAction,
  totalSpendingOfAction,
  withdrawAction,
  withdrawDoneAction,
  withdrawInitAction
} from './actions';
import EthClient from '../../blockchain/client';
import trans from '../../translations';
import { GAS_LIMIT } from '../../constants';
import UpfiringContract from '../../blockchain/upfiring';
import { alertConfirmationStory } from '../Alerts/story';
import downloadBlobFile from '../../utils/downloadBlobFile';
import logger from '../../utils/logger';

/**
 * refill
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const refillStory = async (dispatch, payload) => {
  const {wallet, amount, gasPrice} = payload;

  const address = wallet.getAddressString();
  const spender = UpfiringContract.instance.address;

  const [tokenBalance, ethBalance] = await Promise.all([
    dispatch(balanceOfTokenAction(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([token, eth]) => ([
    token.value && token.value.balance || 0,
    eth.value && eth.value.balance || 0
  ]));

  if (Number(tokenBalance) < Number(amount)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillUFR'));
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(refillInitAction({address}));

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  let allowed = false;

  try {
    const {value} = await dispatch(allowanceAction(address, spender));
    allowed = Number(value.allowance);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('refill.failed'));
    await dispatch(refillDoneAction({address}));
    return logger.error('allowanceAction.catch', e);
  }

  logger.debug('** already allowed', allowed);

  if (!allowed < Number(amount)) {
    try {
      if (allowed > 0) {
        const {value: valueZero} = await dispatch(approveAction(wallet, spender, 0, gas));
        await EthClient.instance.waitTransaction(valueZero.tx);
      }

      const {value} = await dispatch(approveAction(wallet, spender, amount, gas));
      await EthClient.instance.waitTransaction(value.tx);
    } catch (e) {
      await alertConfirmationStory(dispatch, trans('refill.failed'));
      await dispatch(refillDoneAction({address}));
      return logger.error('approveAction.catch', e);
    }
  }

  try {
    const {value} = await dispatch(allowanceAction(address, spender));
    if (Number(value.allowance) < Number(amount)) {
      await alertConfirmationStory(dispatch, trans('refill.failed'));
      await dispatch(refillDoneAction({address}));
      return;
    }
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('refill.failed'));
    await dispatch(refillDoneAction({address}));
    return logger.error('allowanceAction.catch', e);
  }

  try {
    const {value} = await dispatch(refillAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('refill.failed'));
    await dispatch(refillDoneAction({address}));
    return logger.error('refillAction', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, trans('refill.success'));
  await dispatch(refillDoneAction({address}));
};

/**
 * withdraw
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const withdrawStory = async (dispatch, payload) => {
  const {wallet, amount, gasPrice} = payload;
  const address = wallet.getAddressString();

  const [availableBalance, ethBalance] = await Promise.all([
    dispatch(balanceOfContractTokenAction(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([available, eth]) => ([
    available.value && available.value.balance || 0,
    eth.value && eth.value.balance || 0
  ]));

  if (Number(availableBalance) < Number(amount)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.WithdrawUFR'));
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(withdrawInitAction({address}));

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const {value} = await dispatch(withdrawAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('withdraw.failed'));
    await dispatch(withdrawDoneAction({address}));
    return logger.error('withdrawAction.catch', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, trans('withdraw.success'));
  await dispatch(withdrawDoneAction({address}));
};

/**
 * balances
 * @param dispatch
 * @param address
 * @return {Promise<void>}
 */
export const checkBalancesStory = async (dispatch, address) => {
  if (!address) {
    return;
  }
  dispatch(balanceOfTokenAction(address)).catch(logger.warn);
  dispatch(balanceOfEthAction(address)).catch(logger.warn);
  dispatch(balanceOfContractTokenAction(address)).catch(logger.warn);
};

/**
 * totals
 * @param dispatch
 * @param address
 * @return {Promise<void>}
 */
export const checkTotalsStory = async (dispatch, address) => {
  if (!address) {
    return;
  }
  dispatch(totalReceivingOfAction(address)).catch(logger.warn);
  dispatch(totalSpendingOfAction(address)).catch(logger.warn);
};

/**
 * transactions history
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const checkHistoryStory = async (dispatch, payload) => {
  const {address, loadingChangeBalance, loadingHistory} = payload;

  if (!loadingChangeBalance) {
    dispatch(getChangeBalanceAction(address)).catch(logger.warn);
  }

  if (!loadingHistory) {
    dispatch(getHistoryAction(address)).catch(logger.warn);
  }
};

/**
 *
 * @param wallet
 * @return {Promise<void>}
 */
export const downloadWalletStory = async (wallet) => {
  const data = wallet && wallet.address ? JSON.stringify(wallet) : String(wallet);

  downloadBlobFile(new Blob([data], {type: 'text/plain'}), 'wallet.json');
};

import { connect } from 'react-redux';

import React from 'react';
import WalletPage from './components/WalletPage';
import {
  checkBalancesStory,
  checkHistoryStory,
  checkTotalsStory,
  downloadWalletStory,
  refillStory,
  withdrawStory
} from './story';
import { getGasPriceAction, removeWalletAction, setWalletAction } from './actions';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch) => ({
  onCheckBalances: (address) => checkBalancesStory(dispatch, address),
  onCheckTotals: (address) => checkTotalsStory(dispatch, address),
  onCheckHistory: (payload) => checkHistoryStory(dispatch, payload),
  onRefill: (payload) => refillStory(dispatch, payload),
  onWithdraw: (payload) => withdrawStory(dispatch, payload),
  onSetWallet: (payload) => dispatch(setWalletAction(payload)),
  onRemoveWallet: (payload) => dispatch(removeWalletAction(payload)),
  routerTo: (path) => dispatch(push(path)),
  onDownloadWallet: (payload) => downloadWalletStory(payload),
  onGasPrice: () => dispatch(getGasPriceAction())
});

const mapStateToProps = (state) => {
  const wallet = state.wallet.get(state.wallet.get('address'));
  const statistic = state.app.get('statistic');

  return {
    internetConnection: state.app.get('disableTransaction'),
    ...(wallet && wallet.toJS && wallet.toJS()),
    ...(statistic && statistic.toJS && statistic.toJS()),
    disableChangeBalanceLoading: state.wallet.get('disableChangeBalanceLoading'),
    disableHistoryLoading: state.wallet.get('disableHistoryLoading'),
    refillProgress: state.wallet.get('refillProgress'),
    withdrawProgress: state.wallet.get('withdrawProgress'),
    redirect: state.wallet.get('redirectAfterSetWallet'),
    gasPrice: state.wallet.get('gasPrice')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);

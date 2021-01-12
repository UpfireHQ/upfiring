import { connect } from 'react-redux';
import {
  closeCommonAlertAction,
  closeCommonConfirmationAction,
  closeConfirmationAction,
  closeDeleteAction,
  closeModalAction,
  closeNotificationAction,
  closeWarningAction,
  toggleNoInternetAction
} from './actions';
import React from 'react';
import { Alerts } from './components/Alerts';

const mapDispatchToProps = (dispatch) => ({
  onCloseCommonAlert: () => dispatch(closeCommonAlertAction()),
  onCloseNotification: () => dispatch(closeNotificationAction()),
  onCloseCommonConfirmation: () => dispatch(closeCommonConfirmationAction()),
  onCloseConfirmation: () => dispatch(closeConfirmationAction()),
  onCloseModal: () => dispatch(closeModalAction()),
  onCloseDelete: () => dispatch(closeDeleteAction()),
  onCloseNoInternet: () => dispatch(toggleNoInternetAction(false)),
  onCloseWarning: () => dispatch(closeWarningAction())
});

const mapStateToProps = (state) => {
  const wallet = state.wallet.get(state.wallet.get('address'));

  return {
    ...state.alerts.toJS(),
    wallet: (wallet && wallet.toJS && wallet.toJS())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);

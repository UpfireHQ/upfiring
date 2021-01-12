import React from 'react';
import { CommonAlert } from './CommonAlert';
import Confirmation, {
  ConfirmationNoInternet,
  ConfirmationNotify,
  ConfirmationTwo,
  DeletePopUp,
  ModalPopup,
  WarningPopUp
} from '../../../components/confirmation';

export class Alerts extends React.PureComponent {
  get commonAlert() {
    const {commonAlerts, onCloseCommonAlert} = this.props;

    return (
      <CommonAlert
        key="commonAlerts"
        commonAlerts={commonAlerts}
        onCloseAlert={onCloseCommonAlert}
      />
    );
  }

  getOnClick(...actions) {
    return (...params) => Array.from(actions)
      .forEach(action => (typeof action === 'function') && action(...params));
  }

  get notification() {
    const {notifications, onCloseNotification} = this.props;
    const show = notifications && notifications[0];

    if (show) {
      const {title, subtitle, buttonText} = show;
      return (
        <ConfirmationNotify
          key="notifications"
          title={title}
          subtitle={subtitle}
          buttonText={buttonText}
          onClick={onCloseNotification}
        />
      );
    }

    return null;
  }

  get commonConfirmation() {
    const {commonConfirmations, onCloseCommonConfirmation} = this.props;
    const data = commonConfirmations && commonConfirmations[0];

    if (data) {
      const {callback, title, subtitle, buttonText} = data;
      return (
        <ConfirmationTwo
          key="commonConfirmations"
          title={title}
          subtitle={subtitle}
          buttonText={buttonText}
          onClick={this.getOnClick(onCloseCommonConfirmation, callback)}
        />
      );
    }

    return null;
  }

  get confirmation() {
    const {confirmations, onCloseConfirmation} = this.props;
    const data = confirmations && confirmations[0];

    if (data) {
      const {callback, children} = data;
      return (
        <Confirmation
          key="confirmations" show
          children={children}
          onClick={this.getOnClick(onCloseConfirmation, callback)}
        />
      );
    }

    return null;
  }

  get modal() {
    const {modals, onCloseModal} = this.props;
    const data = modals && modals[0];

    if (data) {
      const {callback, children} = data;
      return (
        <ModalPopup
          key="modals" show
          children={children}
          onClick={this.getOnClick(onCloseModal, callback)}
        />
      );
    }

    return null;
  }

  get delete() {
    const {deletes, onCloseDelete} = this.props;
    const data = deletes && deletes[0];

    if (data) {
      const {callback, title, subtitle} = data;
      return (
        <DeletePopUp
          key="deletes" show
          title={title}
          subtitle={subtitle}
          onClick={this.getOnClick(onCloseDelete, callback)}
        />
      );
    }

    return null;
  }

  get internetConnection() {
    const {noInternet, onCloseNoInternet} = this.props;

    if (noInternet) {
      return (
        <ConfirmationNoInternet
          key="noInternet" show
          onClick={onCloseNoInternet}/>
      );
    }

    return null;
  }

  get warning() {
    const {warnings, onCloseWarning} = this.props;
    const callback = warnings && warnings[0];

    if (callback) {
      return (
        <WarningPopUp
          key="warnings" show
          onClick={this.getOnClick(onCloseWarning, callback)}
        />
      );
    }

    return null;
  }

  render() {
    return [
      this.commonAlert,
      this.notification,
      this.commonConfirmation,
      this.confirmation,
      this.modal,
      this.delete,
      this.internetConnection,
      this.warning
    ]
  }
}


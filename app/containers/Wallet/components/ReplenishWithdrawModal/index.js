import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PromptReplenish } from '../PromptReplenish';
import { GAS_LIMIT, UFR_FLOAT_NUMBERS } from '../../../../constants';
import trans from '../../../../translations';
import { ufrFormat } from '../../../../utils/math';
import { decodeWallet } from '../../../../utils/web3';
import EthClient from '../../../../blockchain/client';

class ReplenishWithdrawModal extends PureComponent {

  get isWithdraw() {
    return Boolean(this.props && this.props.withdraw);
  }

  get title() {
    return trans(this.isWithdraw ? 'wallet.Withdraw' : 'wallet.Replenish');
  }

  get subtitle() {
    const {availableBalance} = this.props;
    return this.isWithdraw
      ? trans('wallet.withdrawSubtitle', {max: ufrFormat(availableBalance)})
      : trans('wallet.replenishSubtitle');
  }

  validateWithdrawReplenish(type, value = {}) {
    const {wallet, onClose} = this.props;

    if (type) {
      if (value.value && value.walletDecode && value.gasPrice && value.gasLimit) {
        const {gasPrice, gasLimit, walletDecode} = value;
        const amount = EthClient.instance.toWei(value.value);

        onClose && onClose();
        return {wallet: walletDecode, amount, gasPrice, gasLimit};
      }
    } else {
      onClose && onClose();
    }

    return null;
  }

  handlerReplenishClick = (type, value = {}) => {
    const {onRefill, refillStory} = this.props;
    const valid = this.validateWithdrawReplenish(type, value);

    if (valid && valid.wallet && valid.amount) {
      onRefill && onRefill({story: refillStory, ...valid});
    }
  };

  handlerWithdrawClick = (type, value = {}) => {
    const {onWithdraw, withdrawStory} = this.props;
    const valid = this.validateWithdrawReplenish(type, value);

    if (valid && valid.wallet && valid.amount) {
      onWithdraw && onWithdraw({story: withdrawStory, ...valid});
    }
  };

  render() {
    const {gasPrice, wallet} = this.props;
    const gasLimit = (this.isWithdraw ? 1 : 2) * GAS_LIMIT;

    const handlerResult = this.isWithdraw ?
      this.handlerWithdrawClick :
      this.handlerReplenishClick;

    return (
      <PromptReplenish
        key="replenish-withdraw"
        pattern={`[0-9]+(\\.[0-9]{0,${UFR_FLOAT_NUMBERS}})?`}
        onClick={handlerResult}
        title={this.title}
        subtitle={this.subtitle}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
        wallet={wallet}
      />
    );
  }
}

ReplenishWithdrawModal.propTypes = {
  replenish: PropTypes.bool,
  withdraw: PropTypes.bool,
  availableBalance: PropTypes.string,
  wallet: PropTypes.object,
  onRefill: PropTypes.func,
  refillStory: PropTypes.object,
  onWithdraw: PropTypes.func,
  withdrawStory: PropTypes.object,
  onClose: PropTypes.func
};

export default ReplenishWithdrawModal;

import React, { PureComponent } from 'react';
import trans from '../../../../translations';
import PropTypes from 'prop-types';
import PopUp from '../../../../components/PopUp';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import {
  Costs,
  CostsValue,
  CostsWrapper,
  InputWrapper,
  PopAction,
  PopUpTitle,
  Row,
  RowCenter,
  UpfiringIcon
} from '../../../../components/prompt/style';
import UInput from '../../../../components/InputText';
import MainButton from '../../../../components/Buttons/MainBtn';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
import { decodeWallet } from '../../../../utils/web3';
import InputGas from '../../../../components/InputGas';
import { GAS_LIMIT_MAX } from '../../../../constants';
import EthClient from '../../../../blockchain/client';

class UnpuckTorrent extends PureComponent {
  state = {
    password: '',
    invalid: false,
    gasLimit: GAS_LIMIT_MAX,
    gasLimitValid: true,
    gasPrice: null,
    gasPriceValid: true
  };

  static getDerivedStateFromProps(props, state) {
    const {gasPrice} = props;

    return {
      gasPrice: state.gasPrice === null ? EthClient.instance.weiToGWei(gasPrice) : state.gasPrice
    };
  }

  validate() {
    const {password, gasPrice, gasLimit} = this.state;
    let errors = false;

    if (!password) {
      errors = true;
      this.setState({invalid: true});
    }
    if (!Number(gasPrice)) {
      errors = true;
      this.setState({gasPriceValid: false});
    }
    if (!Number(gasLimit)) {
      errors = true;
      this.setState({gasLimitValid: false});
    }

    if (errors) {
      return false;
    }

    const {wallet} = this.props;
    const decodedWallet = decodeWallet(wallet && wallet.wallet, password);
    this.setState({invalid: !decodedWallet});

    return decodedWallet;
  }

  handlerUnpack = () => {
    const decodedWallet = this.validate();

    if (!decodedWallet) {
      return;
    }

    const {gasPrice, gasLimit} = this.state;
    const {unpackTorrent, webTorrent, onStartUnpackTorrent} = this.props;
    const payload = {
      torrent: webTorrent[unpackTorrent],
      decodedWallet,
      gasPrice: EthClient.instance.weiFromGWei(gasPrice),
      gasLimit
    };

    onStartUnpackTorrent && onStartUnpackTorrent(payload);
  };

  handlerInputPassword = (e) => {
    const {validity, value} = e.target;

    if (validity.valid) {
      this.setState({invalid: false, password: value});
    }
  };

  handlerInputGas = (e, gasPrice, gasLimit) => {
    this.setState({gasPriceValid: !!gasPrice, gasPrice, gasLimitValid: !!gasLimit, gasLimit});
  };

  render() {
    const {unpackTorrent, onCancelUnpackTorrent, webTorrent} = this.props;

    if (!unpackTorrent) {
      return;
    }

    const {password, invalid, gasPrice, gasLimit, gasPriceValid, gasLimitValid} = this.state;
    const torrent = webTorrent[unpackTorrent];

    return (
      <PopUp>
        <ClosePopUp onClick={onCancelUnpackTorrent}/>
        <PopUpTitle>{trans('wallet.UnpackTorrentTitle')}</PopUpTitle>
        <CostsWrapper>
          <Costs>
            <UpfiringIcon className="icon-ico-ufr"/>
            <CostsValue>{torrent && torrent.price} {trans('popups.upload.UFR')}</CostsValue>
          </Costs>
        </CostsWrapper>
        <RowCenter>
          <InputWrapper>
            <UInput
              value={password}
              onChange={this.handlerInputPassword}
              label={trans('Prompt.value.Password')}
              type="password"
              name="password"
              error={invalid && trans('Prompt.value.passwordValidation')}
              centerContent
            />
          </InputWrapper>
        </RowCenter>
        <RowCenter>
          <InputWrapper>
            <InputGas
              gasPrice={gasPrice}
              gasPriceError={!gasPriceValid ? trans('Prompt.value.wrongValue') : null}
              gasLimit={gasLimit}
              gasLimitError={!gasLimitValid ? trans('Prompt.value.wrongValue') : null}
              onChange={this.handlerInputGas}
              centerContent
            />
          </InputWrapper>
        </RowCenter>
        <Row>
          <PopAction>
            <MainButton
              disabled={!password}
              onClick={this.handlerUnpack}
              title={trans('Prompt.getFiles')}
            />
          </PopAction>
        </Row>
        <CancelBtn
          onClick={onCancelUnpackTorrent}
          title={trans('Cancel')}
        />
      </PopUp>
    );
  }
}

UnpuckTorrent.propTypes = {
  unpackTorrent: PropTypes.string,
  webTorrent: PropTypes.object,
  wallet: PropTypes.object,
  onCancelUnpackTorrent: PropTypes.func,
  onStartUnpackTorrent: PropTypes.func
};

export default UnpuckTorrent;

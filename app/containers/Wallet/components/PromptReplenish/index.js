import React from 'react';
import PopUp from '../../../../components/PopUp';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import {
  InputWrapper,
  PopAction,
  PopUpReplenishTitle,
  PopUpSubTitle,
  PromptWarningMessage,
  Row,
  RowCenter
} from '../../../../components/prompt/style';
import UInput from '../../../../components/InputText';
import InputGas from '../../../../components/InputGas';
import trans from '../../../../translations';
import MainButton from '../../../../components/Buttons/MainBtn';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
import EthClient from '../../../../blockchain/client';
import { decodeWallet } from '../../../../utils/web3';

export class PromptReplenish extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      password: '',
      valid: true,
      passwordValid: true,
      gasLimit: null,
      gasLimitValid: true,
      gasPrice: null,
      gasPriceValid: true
    };
    this.handlerResult = this.handlerResult.bind(this);
    this.handlerInputText = this.handlerInputText.bind(this);
    this.handlerInputPassword = this.handlerInputPassword.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const {gasPrice, gasLimit} = props;

    return {
      gasPrice: state.gasPrice === null ? EthClient.instance.weiToGWei(gasPrice) : state.gasPrice,
      gasLimit: state.gasLimit === null ? gasLimit : state.gasLimit
    };
  }

  handlerInputText = (e) => {
    if (e.target.validity.valid) {
      this.setState({valid: true, value: e.target.value});
    }
  };

  handlerInputPassword = (e) => {
    if (e.target.validity.valid) {
      this.setState({passwordValid: true, password: e.target.value});
    }
  };

  handlerInputGas = (e, gasPrice, gasLimit) => {
    this.setState({gasPriceValid: !!gasPrice, gasPrice, gasLimitValid: !!gasLimit, gasLimit});
  };

  handlerResult = () => {
    const {onClick, wallet} = this.props;
    const {password, value, gasPrice, gasLimit} = this.state;
    let errors = false;
    if (password === '') {
      errors = true;
      this.setState({passwordValid: false});
    }
    if (!value) {
      errors = true;
      this.setState({valid: false});
    }
    if (!Number(gasPrice)) {
      errors = true;
      this.setState({gasPriceValid: false});
    }
    if (!Number(gasLimit)) {
      errors = true;
      this.setState({gasLimitValid: false});
    }

    if (!errors) {
      const walletDecode = wallet && decodeWallet(wallet, password);

      if (!walletDecode) {
        this.setState({passwordValid: false});
        return;
      }

      onClick(true, {
        walletDecode,
        password,
        value,
        gasPrice: EthClient.instance.weiFromGWei(gasPrice),
        gasLimit
      });
    }
  };

  handlerClose = () => {
    const {onClick} = this.props;
    onClick(false);
  };

  render() {
    const {value, password, valid, passwordValid, gasPrice, gasLimit, gasPriceValid, gasLimitValid} = this.state;
    const {pattern = null, title, subtitle} = this.props;

    return (
      <PopUp>
        <ClosePopUp onClick={this.handlerClose}/>
        <PopUpReplenishTitle>{title}</PopUpReplenishTitle>
        <PopUpSubTitle>{subtitle}</PopUpSubTitle>
        <RowCenter>
          <InputWrapper>
            <UInput
              value={value}
              pattern={pattern}
              onChange={this.handlerInputText}
              label={trans('Prompt.value.Amount')}
              type="text"
              name="input"
              error={!valid ? trans('Prompt.value.Replenish') : null}
              centerContent
            />
          </InputWrapper>
        </RowCenter>
        <RowCenter>
          <InputWrapper>
            <UInput
              value={password}
              onChange={this.handlerInputPassword}
              label={trans('Prompt.value.Password')}
              type="password"
              name="password"
              error={!passwordValid ? trans('Prompt.value.passwordValidation') : null}
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
              onClick={this.handlerResult}
              title={trans('Confirm')}
            />
          </PopAction>
        </Row>
        <PromptWarningMessage>
          <span className="icon-ico-lock"/>
          {trans('wallet.warningMessage')}
          <div>
            {trans('wallet.warningMessageMore')}
          </div>
        </PromptWarningMessage>
        <CancelBtn
          onClick={this.handlerClose}
          title={trans('Cancel')}
        />
      </PopUp>
    );
  }
}

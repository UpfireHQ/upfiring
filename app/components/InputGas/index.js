import React from 'react';
import { Error, InputFix, Label, UInput } from '../InputText/style';
import styled from 'styled-components';
import trans from '../../translations';
import { UFR_FLOAT_NUMBERS } from '../../constants';
import { LinkButton } from '../../style/components';

const GasPriceBlock = styled.div`
  position: relative;
  width: auto;
  display: flex;
`;

const GasPriceInputFix = styled(InputFix)`
  flex: 1
`;

const GasPriceInputDivider = styled.div`
  width: 3em;
  min-width: 3em;
`;

const GasOptionsButton = styled(LinkButton)`
  height: 4.3em;
`;

const GasPriceBlockAdvanced = styled(GasPriceBlock)`
  justify-content: center;
`;

export default class extends React.PureComponent {

  state = {
    show: false
  };

  handleChangeGasPrice = (e) => {
    const {onChange, gasLimit} = this.props;
    if (e.target && e.target.validity.valid) {
      const gasPrice = e.target.value;
      onChange && onChange(e, gasPrice, gasLimit);
    }
  };

  handleChangeGasLimit = (e) => {
    const {onChange, gasPrice} = this.props;
    if (e.target && e.target.validity.valid) {
      const gasLimit = e.target.value;
      onChange && onChange(e, gasPrice, gasLimit);
    }
  };

  handlerShow = () => {
    this.setState({show: true});
  };

  render() {
    const {show} = this.state;
    const {gasPriceError = false, gasLimitError = false, gasPrice, gasLimit, centerContent = false} = this.props;

    return show ? (
      <GasPriceBlock>
        <GasPriceInputFix className={String(gasPrice) !== '' ? 'is-not-empty' : ''}>
          <UInput
            name="gas-price-input"
            type="text"
            pattern={`[0-9]+(\\.[0-9]{0,${UFR_FLOAT_NUMBERS}})?`}
            value={gasPrice}
            className={centerContent ? 'to-center' : ''}
            getRef={(input) => {
              this.gasPriceInput = input;
            }}
            onChange={this.handleChangeGasPrice}
          />
          {!gasPriceError && (
            <Label
              onClick={() => this.gasPriceInput.focus()}
              className={centerContent ? 'to-center' : ''}
            >
              {trans('wallet.gas.price')}
            </Label>
          )}
          {gasPriceError &&
          <Error className={centerContent ? 'to-center' : ''}>{gasPriceError}</Error>}
        </GasPriceInputFix>
        <GasPriceInputDivider/>
        <GasPriceInputFix className={String(gasLimit) !== '' ? 'is-not-empty' : ''}>
          <UInput
            name="gas-limit-input"
            type="text"
            pattern={'[0-9]+'}
            value={gasLimit}
            className={centerContent ? 'to-center' : ''}
            getRef={(input) => {
              this.gasLimitInput = input;
            }}
            onChange={this.handleChangeGasLimit}
            disabled
          />
          {!gasLimitError && (
            <Label
              onClick={() => this.gasLimitInput.focus()}
              className={centerContent ? 'to-center' : ''}
            >
              {trans('wallet.gas.limit')}
            </Label>
          )}
          {gasLimitError &&
          <Error className={centerContent ? 'to-center' : ''}>{gasLimitError}</Error>}
        </GasPriceInputFix>
      </GasPriceBlock>
    ) : (
      <GasPriceBlockAdvanced>
        <GasOptionsButton onClick={this.handlerShow}>
          {trans('show.gas.options')}
        </GasOptionsButton>
      </GasPriceBlockAdvanced>
    );
  }
}

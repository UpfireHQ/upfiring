import React, { PureComponent } from 'react';
import { PopUpWithBg } from '../../../../components/PopUp';
import bgWallet from '../../../../assets/images/bg-wallet.png';
import {
  PromptDangerMessage,
  PromptSecondaryActions,
  PromptWarningMessage,
  PromptWrapper,
  SecondaryAction,
  StubTitle
} from '../WalletSection/style';
import trans from '../../../../translations';
import { PromptCreateWallet } from '../PromptCreateWallet';

class CreateWalletPopup extends PureComponent {
  render() {
    const {passwordValid, password, createWallet} = this.state;
    return createWallet ? (
      <PopUpWithBg key="create" bg={bgWallet}>
        <StubTitle>{trans('wallet.createTitle')}</StubTitle>
        <PromptWrapper>
          <PromptCreateWallet
            onClick={this.handlerGenerateNew}
            passwordValid={passwordValid}
            parentPassword={password}
          />
        </PromptWrapper>
        <PromptWarningMessage>
          <span className="icon-ico-lock"/>
          {trans('wallet.warningMessage')}
          <div>
            {trans('wallet.warningMessageMore')}
          </div>
        </PromptWarningMessage>
        <PromptDangerMessage>
          {trans('wallet.dangerMessage')}
        </PromptDangerMessage>
        <PromptSecondaryActions>
          <SecondaryAction onClick={this.handlerShowPromptAddWallet}>
            {trans('wallet.alreadyHaveWallet')}
          </SecondaryAction>
          <SecondaryAction onClick={this.privacyPolicy}>
            {trans('wallet.privacyPolicy')}
          </SecondaryAction>
        </PromptSecondaryActions>
      </PopUpWithBg>
    ) : null;
  }
}

CreateWalletPopup.propTypes = {};

export default CreateWalletPopup;

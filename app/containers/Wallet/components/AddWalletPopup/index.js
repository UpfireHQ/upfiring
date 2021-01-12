import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PopUpWithBg } from '../../../../components/PopUp';
import bgWallet from '../../../../assets/images/bg-wallet.png';
import {
  AddWalletMenu,
  AddWalletMenuItem, PromptSecondaryActions,
  PromptWarningMessage,
  PromptWrapper, SecondaryAction,
  StubTitle
} from '../WalletSection/style';
import trans from '../../../../translations';
import { PromptAddWallet } from '../PromptAddWallet';

class AddWalletPopup extends PureComponent {
  render() {
    const {
      addWallet,
      addWalletKey,
      addWalletFile,
      errorFileReading,
      privateKeyValidation,
      passwordValid,
      walletDecodeValidation,
      justRead
    } = this.state;
    return addWallet ? (
      <PopUpWithBg key="add" bg={bgWallet}>
        <StubTitle>{trans('wallet.addTitle')}</StubTitle>
        <PromptWrapper>
          <AddWalletMenu>
            <AddWalletMenuItem
              onClick={this.handlerAddByPrivateKey}
              className={`withBorder ${addWalletKey ? 'active' : ''}`}
            >
              {trans('wallet.usePrivateKey')}
            </AddWalletMenuItem>
            <AddWalletMenuItem
              onClick={this.handlerAddByFile}
              className={addWalletFile ? 'active' : ''}
            >
              {trans('wallet.useWalletFile')}
            </AddWalletMenuItem>
          </AddWalletMenu>
          {addWalletKey ? (
              <PromptAddWallet
                contentType="key"
                type="text"
                onClick={this.handlerPrivateClick}
                privateKeyValidation={privateKeyValidation}
                validMessage={trans('Prompt.value.PrivateKeyValidation')}
                passwordValid={passwordValid}
                validationText={trans('Prompt.value.PrivateKey')}
                buttonTitle={trans('wallet.buttons.AddYourWallet')}
              />)
            : null
          }
          {addWalletFile ? (
              <PromptAddWallet
                contentType="file"
                onClick={this.handlerPromptClick}
                valid={walletDecodeValidation}
                showOnlyPassword={false}
                passwordValid={passwordValid}
                validationText={trans('Prompt.value.PasswordNotCorrect')}
                errorFileReading={errorFileReading}
                onFileReaded={this.handlerWalletRead}
                justRead={justRead}
                onRemoveFile={this.handlerRemoveFile}
                buttonTitle={trans('wallet.buttons.AddYourWallet')}
              />)
            : null
          }
        </PromptWrapper>
        <PromptWarningMessage>
          <span className="icon-ico-lock"/>
          {trans('wallet.warningMessage')}
          <div>
            {trans('wallet.warningMessageMore')}
          </div>
        </PromptWarningMessage>
        <PromptSecondaryActions>
          <SecondaryAction onClick={() => this.handlerShowPromptCreateWallet()}>
            {trans('wallet.createNewWallet')}
          </SecondaryAction>
          <SecondaryAction onClick={(e) => this.privacyPolicy(e)}>
            {trans('wallet.privacyPolicy')}
          </SecondaryAction>
        </PromptSecondaryActions>
      </PopUpWithBg>
    ) : null;
  }
}

AddWalletPopup.propTypes = {};

export default AddWalletPopup;

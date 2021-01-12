import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PopUp from '../../../../components/PopUp';
import {
  AddWalletMenu,
  AddWalletMenuItem,
  PromptWarningMessage,
  PromptWrapper,
  StubTitle
} from '../WalletSection/style';
import trans from '../../../../translations';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import { PromptAddWallet } from '../PromptAddWallet';
import CancelBtn from '../../../../components/Buttons/CancelBtn';

class EditWalletPopup extends PureComponent {
  render() {
    const {
      editWallet,
      addWalletKey,
      addWalletFile,
      errorFileReading,
      privateKeyValidation,
      passwordValid,
      walletDecodeValidation,
      justRead
    } = this.state;

    return editWallet ? (
      <PopUp key="edit">
        <StubTitle>{trans('wallet.editTitle')}</StubTitle>
        <ClosePopUp onClick={() => this.handlerCancelEditWallet()}/>
        <PromptWrapper>
          <AddWalletMenu>
            <AddWalletMenuItem
              onClick={() => this.handlerAddByPrivateKey()}
              className={`withBorder ${addWalletKey ? 'active' : ''}`}
            >
              {trans('wallet.usePrivateKey')}
            </AddWalletMenuItem>
            <AddWalletMenuItem
              onClick={() => this.handlerAddByFile()}
              className={addWalletFile ? 'active' : ''}
            >
              {trans('wallet.useWalletFile')}
            </AddWalletMenuItem>
          </AddWalletMenu>
          {addWalletKey ? (
              <PromptAddWallet
                contentType="key"
                onClick={this.handlerPrivateClick}
                privateKeyValidation={privateKeyValidation}
                validMessage={trans('Prompt.value.PrivateKeyValidation')}
                passwordValid={passwordValid}
                validationText={trans('Prompt.value.PrivateKey')}
                buttonTitle={trans('wallet.buttons.ChangeWallet')}
              />)
            : null
          }
          {addWalletFile ? (
              <PromptAddWallet
                contentType="file"
                onClick={this.handlerPromptClick}
                valid={walletDecodeValidation}
                passwordValid={passwordValid}
                validationText={trans('Prompt.value.PasswordNotCorrect')}
                errorFileReading={errorFileReading}
                onFileReaded={this.handlerWalletRead}
                justRead={justRead}
                onRemoveFile={this.handlerRemoveFile}
                buttonTitle={trans('wallet.buttons.ChangeWallet')}
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
        <CancelBtn
          onClick={() => this.handlerCancelEditWallet()}
          title={trans('Cancel')}
        />
      </PopUp>
    ) : null;

  }
}

EditWalletPopup.propTypes = {};

export default EditWalletPopup;

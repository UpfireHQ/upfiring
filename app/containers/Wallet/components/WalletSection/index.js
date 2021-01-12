import React, { Component } from 'react';
import { generate } from 'ethereumjs-wallet';
import {
  ActionBlock,
  ActionOneBlock,
  ActionsTwo,
  AddWalletMenu,
  AddWalletMenuItem,
  AvailableBalance,
  Ballance,
  BallanceDiv,
  BallanceEllipsis,
  BallanceOne,
  Close,
  CurrencyWidget,
  CurrencyWrapper,
  DecodingLoader,
  EthereumIcon,
  FileButton,
  FullWalletAddress,
  FullWalletAddressDesc,
  FullWalletAddressValue,
  Index,
  Loader,
  PromptDangerMessage,
  PromptSecondaryActions,
  PromptWarningMessage,
  PromptWrapper,
  SecondaryAction,
  Stub,
  StubBtnWrapper,
  StubLearnMore,
  StubSubTitle,
  StubTitle,
  Subtitle,
  SubtitleFlexRow,
  SubtitleWrapper,
  Tooltip,
  UpfiringIcon,
  WalletBallanceSection,
  WalletButton,
  WalletDiv,
  WalletError,
  WalletIn,
  WalletInputSection,
  WalletPass,
  WithdrawSection
} from './style';
import trans from '../../../../translations';

import {
  BtnWithTooltip,
  CancelBtn,
  CurrencyRates,
  DeletePopUp,
  Info,
  PopUp,
  PopUpWithBg,
  WalletBtn
} from '../../../../components';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import MainButton from '../../../../components/Buttons/MainBtn';
import SecondaryButton from '../../../../components/Buttons/SecondaryBtn';
import bgWallet from '../../../../assets/images/bg-wallet.png';

import UInput from '../../../../components/InputText';
import { ufrFormat } from '../../../../utils/math';

import { SITE_DECRYPTION, SITE_PRIVACY } from '../../../../constants';
import { decodeWallet, decodeWalletByPrivateKey, walletToV3 } from '../../../../utils/web3';
import { PromptAddWallet } from '../PromptAddWallet';
import { PromptCreateWallet } from '../PromptCreateWallet';
import ReplenishWithdrawModal from '../ReplenishWithdrawModal';
import ProgressPopup from '../ProgressPopup';

const {shell} = require('electron');
const {clipboard} = require('electron');

export default class WalletTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: null,
      password: '',
      walletValid: true,
      errorFileReading: false,
      justRead: false,
      justGenerate: false,
      walletDecodeValidation: true,
      privateKeyValidation: true,
      renderDeleteWallet: false,
      passwordValid: true,
      addWallet: false,
      createWallet: false,
      addWalletKey: true,
      addWalletFile: false,
      editWallet: false,
      showFullWalletAddress: false,
      replenish: false,
      withdraw: false
    };
  }

  handlerWalletRead = (fileContent) => {
    try {
      const wallet = JSON.parse(fileContent);

      if (wallet && wallet.crypto) {
        this.setState({
          errorFileReading: false,
          justRead: true,
          wallet
        });
      } else {
        this.setState({errorFileReading: true});
      }
    } catch (e) {
      this.setState({errorFileReading: true});
    }
  };

  handlerRemoveFile = () => {
    this.setState({justRead: false, wallet: null});
  };

  handlerOnChangeInput = (event) => {
    this.setState({walletValid: true, password: event.target.value});
  };

  handlerCreateNew = () => {
    this.setState({justGenerate: true});
  };

  handlerDownloadWallet = () => {
    const {wallet, onDownloadWallet} = this.props;
    onDownloadWallet && onDownloadWallet(wallet);
  };

  handlerShowStatistic = () => {
    const {onShowHistory} = this.props;
    onShowHistory && onShowHistory();
  };

  onSetWallet(wallet, password, download = false) {
    const {onSetWallet, redirect, routerTo, onDownloadWallet} = this.props;
    const walletV3 = walletToV3(wallet, password);

    onSetWallet && onSetWallet({
      address: wallet.getAddressString(),
      publicKey: wallet.getPublicKeyString(),
      wallet: walletV3
    });

    if (download) {
      onDownloadWallet && onDownloadWallet(walletV3);
    }

    return redirect && routerTo && routerTo(redirect);
  }

  handlerGenerateNew = (password) => {
    const wallet = generate();
    if (!password || password === '') {
      this.setState({walletValid: false});
    } else {
      this.onSetWallet(wallet, password, true);
      this.setState({
        justGenerate: false,
        password: '',
        createWallet: false
      });
    }
  };

  handlerPromptClick = (type, value = {}) => {
    let result = true;
    if (type) {
      const {wallet} = this.state;
      if (wallet && Boolean(value.password)) {
        const walletDecode = decodeWallet(wallet, value.password);
        if (walletDecode !== false) {
          this.setState({
            walletDecodeValidation: true,
            walletValid: true,
            justRead: false,
            passwordValid: true,
            addWallet: false,
            editWallet: false,
            wallet: null
          });
          this.onSetWallet(walletDecode, value.password);
        } else {
          result = false;
          this.setState({passwordValid: false, walletDecodeValidation: false});
        }
      }
    } else {
      this.setState({
        password: true,
        justRead: false
      });
    }
    return result;
  };

  handlerPrivateClick = (type, value = {}) => {
    if (type) {
      let errors = false;
      if (!Boolean(value.password)) {
        this.setState({passwordValid: false});
        errors = true;
      }
      if (!errors) {
        const wallet = decodeWalletByPrivateKey(value.value);
        if (wallet !== false) {
          this.onSetWallet(wallet, value.password);
          this.setState({
            walletDecodeValidation: true,
            walletValid: true,
            justRead: false,
            passwordValid: true,
            privateKeyValidation: true,
            addWallet: false,
            editWallet: false
          });
        } else {
          // try load by private key
          this.setState({privateKeyValidation: false});
        }
      }
    } else {
      this.setState({password: true, passwordValid: true});
    }
  };

  handlerWithdrawReplenishClose = () => {
    this.setState({withdraw: false, replenish: false});
  };

  handlerOnDeleteWallet = () => {
    this.setState({renderDeleteWallet: true});
  };

  handlerOnEditWallet = () => {
    this.setState({editWallet: true});
  };

  handlerShowPromptReplenish = () => {
    this.setState({replenish: true});
  };

  handlerShowPromptWithdraw = () => {
    this.setState({withdraw: true});
  };

  handlerShowPromptAddWallet = () => {
    this.setState({addWallet: true, createWallet: false});
  };

  handlerShowPromptCreateWallet = () => {
    this.setState({createWallet: true, addWallet: false});
  };

  handlerAddByPrivateKey = () => {
    this.setState({addWalletFile: false, addWalletKey: true});
  };

  handlerAddByFile = () => {
    this.setState({addWalletFile: true, addWalletKey: false});
  };

  handlerEditWallet = () => {
    this.setState({editWallet: true});
  };

  handlerCancelEditWallet = () => {
    this.setState({editWallet: false});
  };

  handlerOnShowFullWalletAddress = () => {
    const {address} = this.props;
    clipboard.writeText(address);
    this.setState({showFullWalletAddress: true});
  };

  handlerOnHideFullWalletAddress = () => {
    this.setState({showFullWalletAddress: false});
  };

  handlerRemoveWallet = (action) => {
    if (action) {
      const {onRemoveWallet} = this.props;
      onRemoveWallet && onRemoveWallet();
    }
    this.setState({renderDeleteWallet: false, password: '', wallet: null});
  };

  learnMore = (e) => {
    e.preventDefault();
    shell.openExternal(SITE_DECRYPTION);
  };

  privacyPolicy = (e) => {
    e.preventDefault();
    shell.openExternal(SITE_PRIVACY);
  };

  get DeleteWalletModal() {
    const {renderDeleteWallet} = this.state;
    return renderDeleteWallet ? (
      <DeletePopUp
        key="delete" show
        onClick={this.handlerRemoveWallet}
        title={trans('Warning.Popup.Title')}
        subtitle={trans('Warning.Popup.Delete')}
      />) : null;
  }

  get EmptyStub() {
    return (
      <Stub key="empty">
        <StubTitle>
          {trans('stub.wallet.title')}
        </StubTitle>
        <StubSubTitle>
          <p>{trans('stub.wallet.subtitle')}</p>
          <p>{trans('stub.wallet.subtitleMore')}</p>
        </StubSubTitle>
        <StubLearnMore>
          <a
            href="#"
            onClick={this.learnMore}
          >
            {trans('stub.wallet.learnMore')}
          </a>
        </StubLearnMore>
        <StubBtnWrapper>
          <ActionsTwo>
            <MainButton
              onClick={() => this.handlerShowPromptAddWallet()}
              title={trans('stub.wallet.addWallet')}
            />
            <SecondaryButton
              onClick={() => this.handlerShowPromptCreateWallet()}
              title={trans('stub.wallet.createWallet')}
            />
          </ActionsTwo>
        </StubBtnWrapper>
      </Stub>
    );
  }

  get AddWalletPopup() {
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

  get EditWalletPopup() {
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

  get CreateWalletPopup() {
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

  render() {
    const {
      password,
      walletValid,
      justGenerate,
      justRead,
      showFullWalletAddress,
      replenish,
      withdraw
    } = this.state;

    const {
      address,
      publicKey,
      wallet,
      history,
      ethBalance,
      tokenBalance,
      availableBalance,
      disableTransaction,
      refillStory,
      withdrawStory,
      refillProgress,
      withdrawProgress
    } = this.props;

    if (!Boolean(wallet)) {
      return [
        this.EmptyStub,
        this.CreateWalletPopup,
        this.AddWalletPopup
      ];
    }

    const walletInput = justGenerate
      ? (
        <UInput
          type="password"
          name="password"
          onChange={(e) => this.handlerOnChangeInput(e)}
          value={password}
          placeholder={trans('wallet.inputs.WalletPassword')}
        />
      )
      : null;

    const walletValidation = walletValid
      ? null
      : <WalletError>{trans('wallet.passwordIncorect')}</WalletError>;

    const walletButton = (
      <FileButton
        href="#"
        onClick={(e) => this.handlerGenerateNew(e)}
      />
    );

    const generateButton = justGenerate
      ? (
        <WalletPass>
          {walletInput}
          {walletValidation}
          {walletButton}
        </WalletPass>
      )
      : (
        <WalletButton
          disabled={justRead}
          onClick={this.handlerCreateNew}
          secondary
        >
          {trans('wallet.buttons.CreateNew')}
        </WalletButton>
      );

    const downloadWallet = wallet
      ? [
        <WalletBtn
          key="0"
          onClick={this.handlerDownloadWallet}
          title={trans('wallet.buttons.Download')}
          iconClass="download"
        />,
        history ? <WalletBtn
          key="1"
          onClick={this.handlerShowStatistic}
          title={trans('wallet.buttons.Transactions')}
          iconClass="transactions"
        /> : null
      ]
      : (
        <DecodingLoader>
          <Loader/>{trans('wallet.decoded')}
        </DecodingLoader>
      );

    const WalletTopPart = (
      <BtnWithTooltip
        onClick={this.handlerOnDeleteWallet}
        iconClass="remove"
        positionClass="right"
        text={trans('wallet.removeBtn')}
      />
    );

    const WalletBottomPart = Boolean(publicKey) ? downloadWallet : generateButton;

    const walletPublicFlag = (!Boolean(publicKey) || disableTransaction);
    const disabledWithdrawButton = (walletPublicFlag && Boolean(refillStory));
    const disabledReplenishButton = (walletPublicFlag && Boolean(withdrawStory));
    const WithdrawReplenishButton = [
      <WalletBtn
        key="2"
        onClick={this.handlerShowPromptWithdraw}
        title={trans('wallet.buttons.Withdraw')}
        iconClass={disabledWithdrawButton ? 'disabled' : 'withdraw'}
        disabled={disabledWithdrawButton}
      />,
      <WalletBtn
        key="3"
        onClick={this.handlerShowPromptReplenish}
        title={trans('wallet.buttons.Replenish')}
        iconClass={disabledReplenishButton ? disabled : 'replenish'}
        disabled={disabledReplenishButton}
      />
    ];

    let walletAddressShort = null;
    if (address) {
      walletAddressShort = [
        String(address).substring(0, 8),
        String(address).substring(address.length - 8, address.length)
      ].join('...');
    }

    let ethBalanceShort = 0;
    if (ethBalance) {
      const ethBalanceString = String(ethBalance);
      if (ethBalanceString.indexOf('.') !== -1 && (ethBalanceString.length - ethBalanceString.indexOf('.')) > 5) {
        ethBalanceShort = `${ethBalanceString.substr(0, ethBalanceString.indexOf('.') + 5)}...`;
      }
    }

    return [
      (<Index key="wallet-section">
        <WalletInputSection>
          <SubtitleFlexRow className={showFullWalletAddress ? 'withBlur' : ''}>
            <BtnWithTooltip
              onClick={() => this.handlerOnEditWallet()}
              iconClass="edit"
              positionClass="right"
              text={trans('wallet.editBtn')}
            />
            <Subtitle>{trans('wallet.titles.MyWallet')}</Subtitle>
            {WalletTopPart}
          </SubtitleFlexRow>
          <WalletDiv className={showFullWalletAddress ? 'withBlur' : ''}>
            <CurrencyWrapper>
              <EthereumIcon className="icon-ico-ethereum"/>
              <WalletIn>
                {walletAddressShort}
              </WalletIn>
            </CurrencyWrapper>
            <BtnWithTooltip
              onClick={() => this.handlerOnShowFullWalletAddress()}
              iconClass="copy"
              positionClass="right"
              text={trans('wallet.copyAddress')}
            />
          </WalletDiv>
          {history ? (
            <ActionBlock className={showFullWalletAddress ? 'withBlur' : ''}>
              {WalletBottomPart}
            </ActionBlock>) : (
            <ActionOneBlock className={showFullWalletAddress ? 'withBlur' : ''}>
              {WalletBottomPart}
            </ActionOneBlock>
          )}
          {showFullWalletAddress && (
            <FullWalletAddress>
              <Close onClick={this.handlerOnHideFullWalletAddress}/>
              <FullWalletAddressDesc>
                {trans('wallet.walletAddress')}
              </FullWalletAddressDesc>
              <FullWalletAddressValue>
                {address}
              </FullWalletAddressValue>
              <FullWalletAddressDesc>
                {trans('wallet.copiedToClipboard')}
              </FullWalletAddressDesc>
            </FullWalletAddress>
          )}
        </WalletInputSection>

        <WalletBallanceSection>
          <SubtitleWrapper>
            <Subtitle>{trans('wallet.titles.WalletBalance')}</Subtitle>
          </SubtitleWrapper>
          <BallanceDiv>
            <CurrencyWrapper>
              <EthereumIcon className="icon-ico-ethereum"/>
              <BallanceEllipsis className={ethBalanceShort ? 'withTooltip' : ''}>
                {trans('popups.upload.ETH')}: {ethBalanceShort || ethBalance || 0}
              </BallanceEllipsis>
              {ethBalance && ethBalanceShort ? (
                <Tooltip className="tooltip">
                  {ethBalance} {trans('popups.upload.ETH')}
                </Tooltip>
              ) : null}
            </CurrencyWrapper>
            <Info description={trans('wallet.eth.info')}/>
          </BallanceDiv>
          <BallanceDiv>
            <CurrencyWrapper>
              <UpfiringIcon className="icon-ico-ufr"/>
              <Ballance>
                {trans('popups.upload.UFR')}: {tokenBalance ? ufrFormat(tokenBalance) : 0}
              </Ballance>
              <CurrencyWidget className="coinmarketcap-currency-widget">
                <CurrencyRates/>
              </CurrencyWidget>
            </CurrencyWrapper>
            <Info description={trans('wallet.ufr.info')}/>
          </BallanceDiv>
        </WalletBallanceSection>

        <WithdrawSection>
          <SubtitleWrapper>
            <Subtitle>{trans('wallet.titles.Withdraw')}</Subtitle>
          </SubtitleWrapper>
          <BallanceOne>
            <UpfiringIcon className="icon-ico-ufr"/>
            <AvailableBalance>
              {availableBalance ? ufrFormat(availableBalance) : 0} {trans('popups.upload.UFR')}
            </AvailableBalance>
          </BallanceOne>
          <ActionBlock>
            {WithdrawReplenishButton}
          </ActionBlock>
        </WithdrawSection>
      </Index>),
      this.DeleteWalletModal,
      this.EditWalletPopup,
      (replenish || withdraw) && (
        <ReplenishWithdrawModal
          key="ReplenishWithdrawModal"
          {...this.props}
          replenish={replenish}
          withdraw={withdraw}
          onClose={this.handlerWithdrawReplenishClose}/>
      ),
      (refillProgress || withdrawProgress) && (
        <ProgressPopup key="ProgressPopup" {...this.props}/>
      )
    ];
  }
}

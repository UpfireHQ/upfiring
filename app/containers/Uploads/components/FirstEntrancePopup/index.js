import React from 'react';
import {
  Divider, PopAction, PopButton,
  PopUpDescription, PopUpImportnatMessage,
  PopUpLogo,
  PopUpSubtitle,
  PopUpTitle,
  SmallPopUp,
  WalletButton,
  WalletCover,
  WInput
} from '../UploadsPage/style';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import logo from '../../../../assets/images/logo.png';
import trans from '../../../../translations';

export default class FirstEntrancePopup extends React.PureComponent {

  render() {
    return (
      <SmallPopUp>
        <ClosePopUp onClick={this.handlerCancel}/>
        <PopUpTitle>
          <PopUpLogo src={logo}/>
          {trans('FirstEntrance.PopUp.Title')}
        </PopUpTitle>
        <PopUpSubtitle>{trans('FirstEntrance.PopUp.Title')}</PopUpSubtitle>
        <WalletCover>
          <WInput placeholder={trans('wallet.inputs.WalletAdress')}/>
          <WalletButton href="#"/>
        </WalletCover>
        <PopUpDescription>
          {trans('FirstEntrance.PopUp.description')}
        </PopUpDescription>
        <Divider/>
        <PopUpImportnatMessage>
          {trans('FirstEntrance.PopUp.important')}
        </PopUpImportnatMessage>
        <PopAction>
          <PopButton secondary>{trans('wallet.buttons.CreateNew')}</PopButton>
          <PopButton additional>
            {trans('FirstEntrance.PopUp.Addwallet')}
          </PopButton>
        </PopAction>
      </SmallPopUp>
    );

  }
}

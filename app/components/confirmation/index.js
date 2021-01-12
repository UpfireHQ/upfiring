/**
 * Created by maximnord on 2/23/18.
 */
import React from 'react';
import styled from 'styled-components';
import Warning from '../../assets/images/warning.svg';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import PopUp from '../PopUp/index';
import MainButton from '../Buttons/MainBtn';
import FourthButton from '../Buttons/FourthBtn';
import SecondaryButton from '../Buttons/SecondaryBtn';
import ThirdButton from '../Buttons/ThirdBtn';
import trans from '../../translations';
import ClosePopUp from '../Buttons/ClosePopUpBtn';
import CancelBtn from '../Buttons/CancelBtn';
import closeDangerIcon from '../../assets/icons/ico-cross-type-2.svg';
import closeDangerIconHover from '../../assets/icons/ico-cross-type-2-hover.svg';
import unboxed from '../../assets/images/illustration-unboxed.svg';
import UButton from '../UButton/index';

export const PopUpTitle = styled.h2`
  font-size:${fonts.largeSize};
  color:${colors.titleWhite};
  font-weight: 400;
  margin: 0.5em 0 1em;
  text-align:center;
  line-height: 1.5em;
`;

export const SmallPopUp = styled(PopUp)`
  height:auto;
`;

export const WarningPop = styled.p`
  margin: 0 auto;
  width:50px;
  height:50px;
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-image:url(${Warning});
`;

export const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:0 1 100%;
  justify-content: center;
`;

export const PopAction = styled.div`
  margin:1em auto 0;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export const PopActionTwo = styled(PopAction)`
  justify-content:space-between;
  min-width: 24em;
`;

export const PopButton = styled(UButton)`
  margin:0 0.5em;
`;

export const PopUpDetails = styled.div`
  text-align: center;
  margin: 0 0 1.5em 0;
  padding: 0 .5em;
  color: ${colors.fontPrimary};
  font-size: ${fonts.moreStadartSize};
`;

export const NoInternetPopUp = styled.div`
  position: fixed;
  z-index: 10;
  left: 70px;
  top: 72px;
  height: 3.2em;
  width: calc(100% - 70px);
  background-color: ${colors.noInternetBg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoInternetMessage = styled.div`
  color: ${colors.lightRed};
  font-size: ${fonts.moreStadartSize};
`;

export const CloseNoInternetPopUp = styled.div`
  cursor: pointer;
  background-image: url(${closeDangerIcon});
  width: 10px;
  height: 10px;
  position: absolute;
  right: 18px;
  &:hover {
    background-image: url(${closeDangerIconHover});
  }
`;

export const Unboxed = styled.div`
  text-align: center;
  padding-bottom: 1em;
  > span {
    display: inline-block;
    background-image: url(${unboxed});
    height: 91px;
    width: 115px;
  }
`;

export default class Index extends React.PureComponent {
  onClick(result) {
    const {onClick} = this.props;
    onClick && onClick(result);
  };

  handlerApply = () => {
    this.onClick(true);
  };

  handlerCancel = () => {
    this.onClick(false);
  };

  render() {
    const {show} = this.props;
    return show ? (
      <SmallPopUp>
        <ClosePopUp onClick={this.handlerCancel}/>
        <PopUpTitle>{this.props.children}</PopUpTitle>
        <Row>
          <PopActionTwo>
            <MainButton
              onClick={this.handlerCancel}
              title={trans('Cancel')}
            />
            <SecondaryButton
              onClick={this.handlerApply}
              title={trans('Yes')}
            />
          </PopActionTwo>
        </Row>
      </SmallPopUp>
    ) : null;
  }
}

export class WarningPopUp extends React.PureComponent {
  onClick(result) {
    const {onClick} = this.props;
    onClick && onClick(result);
  };

  handlerApply = () => {
    this.onClick(true);
  };

  handlerCancel = () => {
    this.onClick(false);
  };

  render() {
    const {show} = this.props;
    return show ? (
      <SmallPopUp>
        <ClosePopUp onClick={this.handlerCancel}/>
        <PopUpTitle>
          <WarningPop/>
        </PopUpTitle>
        <PopUpTitle>
          {trans('Warning.Popup.Title')}
        </PopUpTitle>
        <Row>
          <PopUpDetails>{trans('Warning.Popup.Delete')}</PopUpDetails>
        </Row>
        <Row>
          <PopActionTwo>
            <PopButton additional onClick={this.handlerCancel}>
              {trans('cancel')}
            </PopButton>
            <PopButton secondary onClick={this.handlerApply}>
              {trans('Warning.Btn.Delete')}
            </PopButton>
          </PopActionTwo>
        </Row>
      </SmallPopUp>
    ) : null;
  }
}

export class ModalPopup extends React.PureComponent {
  onClick(result) {
    const {onClick} = this.props;
    onClick && onClick(result);
  };

  handlerOk = () => {
    this.onClick(true);
  };

  handlerClose = () => {
    this.onClick(false);
  };

  render() {
    const {show} = this.props;

    return show ? (
      <SmallPopUp>
        <ClosePopUp onClick={this.handlerClose}/>
        <PopUpTitle>{this.props.children}</PopUpTitle>
        <Row>
          <PopAction>
            <MainButton onClick={this.handlerOk} title={trans('Ok')}/>
          </PopAction>
        </Row>
      </SmallPopUp>
    ) : null;
  }
}

export class DeletePopUp extends React.PureComponent {
  onClick(result) {
    const {onClick} = this.props;
    onClick && onClick(result);
  };

  handlerDelete = () => {
    this.onClick(true);
  };

  handlerCancel = () => {
    this.onClick(false);
  };

  render() {
    const {show, title, subtitle} = this.props;
    return show ? (
      <PopUp>
        <ClosePopUp onClick={this.handlerCancel}/>
        {title && (<PopUpTitle>{title}</PopUpTitle>)}
        {subtitle && (<Row><PopUpDetails>{subtitle}</PopUpDetails></Row>)}
        <Row>
          <PopAction>
            <MainButton onClick={this.handlerDelete} title={trans('Delete')}/>
          </PopAction>
        </Row>
        <CancelBtn onClick={this.handlerCancel} title={trans('Cancel')}/>
      </PopUp>
    ) : null;
  }
}

export class ConfirmationNoInternet extends React.PureComponent {
  handlerResult = () => {
    const {onClick} = this.props;
    onClick && onClick();
  };

  render() {
    const {show} = this.props;
    return show ? (
      <NoInternetPopUp>
        <NoInternetMessage>{trans('NoInternet')}</NoInternetMessage>
        <CloseNoInternetPopUp onClick={this.handlerResult}/>
      </NoInternetPopUp>
    ) : null;
  }
}

export class ModalUnpuckPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false
    };
    this.handlerResult = this.handlerResult.bind(this);
  }

  componentWillMount() {
    const {show} = this.props;
    this.setState({showConfirmation: show});
  }

  componentWillReceiveProps(newProps) {
    const {show} = newProps;
    this.setState({showConfirmation: show});
  }

  handlerResult(result) {
    const {onClick} = this.props;
    onClick(result);
  }

  render() {
    return (
      <SmallPopUp>
        <ClosePopUp onClick={() => this.handlerResult(false)}/>
        <Unboxed>
          <span/>
        </Unboxed>
        <PopUpTitle>{this.props.children}</PopUpTitle>
        <Row>
          <PopAction>
            <ThirdButton
              onClick={() => this.handlerResult(true)}
              title={trans('Ok')}
            />
          </PopAction>
        </Row>
        <CancelBtn
          onClick={() => this.handlerResult(false)}
          title={trans('Cancel')}
        />
      </SmallPopUp>
    );
  }
}

export class ConfirmationTwo extends React.PureComponent {
  onClick(result) {
    const {onClick} = this.props;
    onClick && onClick(result);
  };

  handlerApply = () => {
    this.onClick(true);
  };

  handlerCancel = () => {
    this.onClick(false);
  };

  render() {
    const {title, subtitle, buttonText} = this.props;
    return (
      <PopUp>
        <ClosePopUp onClick={this.handlerCancel}/>
        {title && (<PopUpTitle>{title}</PopUpTitle>)}
        {subtitle && (<Row><PopUpDetails>{subtitle}</PopUpDetails></Row>)}
        <Row>
          <PopAction>
            <MainButton
              onClick={this.handlerApply}
              title={buttonText}
            />
          </PopAction>
        </Row>
        <CancelBtn
          onClick={this.handlerCancel}
          title={trans('Cancel')}
        />
      </PopUp>
    );
  }
}

export class ConfirmationNotify extends React.PureComponent {
  handlerClick = () => {
    const {onClick} = this.props;
    onClick && onClick();
  };

  render() {
    const {title, subtitle, buttonText} = this.props;
    return (
      <PopUp>
        <ClosePopUp onClick={this.handlerClick}/>
        {title && (<PopUpTitle>{title}</PopUpTitle>)}
        {subtitle && (<Row><PopUpDetails>{subtitle}</PopUpDetails></Row>)}
        <Row>
          <PopAction>
            <FourthButton
              onClick={this.handlerClick}
              title={buttonText || trans('Ok')}
            />
          </PopAction>
        </Row>
      </PopUp>
    );
  }
}

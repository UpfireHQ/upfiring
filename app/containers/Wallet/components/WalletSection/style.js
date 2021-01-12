import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';
import { EmptyListStub, UButton } from '../../../../components';
import close from '../../../../assets/icons/ico-cross.svg';
import closeHover from '../../../../assets/icons/ico-cross-hover.svg';
import Ok from '../../../../assets/images/checking.svg';
import bgWallet from '../../../../assets/images/bg-wallet.png';
import { LinkButton } from '../../../../style/components';

export const Subtitle = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.titleWhite};
  font-weight:300;
`;

export const Index = styled.div`
  display: flex;
  flex-flow: row;
  flex: 1;
  justify-content: space-between;
  padding: 2em 1.5em 1em 1.5em;
  > div {
    > h4 {
      margin: 0;
    }
  }
`;

export const WalletInputSection = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.33;
  background-color: ${colors.mainGrey};
  border-radius:0.7em;
  padding: 0 1.5em 0 1.5em;
  position: relative;
`;

export const FullWalletAddress = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.7em;
  background-color: ${colors.fullWalletBlockBg};
  left: 0;
  padding: 2em 2.5em;
`;

export const Close = styled.span`
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 1.5em;
  top: 1.5em;
  background-image: url(${close});
  width: 11px;
  height: 11px;
  &:hover {
    background-image: url(${closeHover});
  }
`;

export const FullWalletAddressDesc = styled.div`
  text-align: center;
  font-size: ${fonts.minStandartSize};
  padding: 1.8em 0;
  color: ${colors.inputLabel};
`;

export const FullWalletAddressValue = styled.div`
  text-align: center;
  font-size: ${fonts.mediumSize};
  color: ${colors.titleWhite};
  word-break: break-all;
`;

export const WalletBallanceSection = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.3;
  background-color: ${colors.mainGrey};
  border-radius:0.7em;
  text-align:center;
  padding: 0 1.5em 0 1.5em;
`;

export const WithdrawSection = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.33;
  background-color: ${colors.mainGrey};
  border-radius:0.7em;
  text-align:center;
  padding: 0 1.5em 0 1.5em;
  > h4 {
    text-align:center !important;
  }
`;

export const WalletButton = styled(UButton)`
  width:100px;
  margin: 0 auto;
`;

export const BallanceDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-top:1px solid ${colors.bottomBorder};
  justify-content:space-between;
  position:relative;
  height: 5em;
`;

export const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Ballance = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.fontPrimary};
  margin: 0;
  text-align: left;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
  cursor: pointer;
  &:hover {
    color: ${colors.titleWhite}
    ~.coinmarketcap-currency-widget {
      display: block;
    }
  }
`;

export const CurrencyWidget = styled.div`
  position: absolute;
  z-index: 50;
  top: 3em;
  left: -40%;
  display: none;
`;

export const BallanceEllipsis = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.fontPrimary};
  margin: 0;
  text-align: left;
  display: inline-block;
  font-weight: normal;
  width: 74%;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  &.withTooltip {
    &:hover {
    color: ${colors.titleWhite}
      ~.tooltip {
        display: block;
      }
    }
  }
`;

export const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 2.5em;
  left: 0;
  z-index: 2;
  font-style: normal;
  color: ${colors.defaultBtnHover};
  padding: 1em;
  font-size: ${fonts.moreStadartSize};
  background-color: ${colors.tooltipsBackground};
  box-shadow: 0 4px 10px 4px rgba(0,0,0,0.5);
  border-radius: 4px;
  white-space: nowrap;
  &::after {
    content: " ";
    position: absolute;
    top: -10px;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${colors.tooltipsBackground} transparent;
  }
`;

export const WalletPass = styled.div`
  position:relative;
  width: 100%;
  margin-bottom: 2em;
`;

export const FileButton = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 94%;
  display: block;
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  border:1px solid ${colors.fontSecondary};
  background-color:${colors.brandSecondary};
  background-image:url(${Ok});
  &:hover {
    background-color: #0cb2c9;
  }
`;

export const WalletDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content:space-between;
  color:${colors.fontSecondary};
  height: 5em;
  &.withBlur {
    filter: blur(18px);
  }
`;

export const WalletIn = styled.h4`
  margin: 0;
  display: inline-block;
  word-break: break-all;
  font-size: ${fonts.mediumSize};
  color: ${colors.fontPrimary};
  font-weight: normal;
`;

export const BallanceOne = styled.div`
  border-top: 1px solid ${colors.bottomBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5em;
`;

export const AvailableBalance = styled.h4`
  font-size: ${fonts.middleSize};
  font-weight: normal;
  color:${colors.fontPrimary};
  margin: 0;
`;

export const SubtitleFlexRow = styled.div`
  display:flex;
  flex-flow:row wrap;
  align-items:center;
  justify-content:space-between;
  height: 5em;
  border-bottom: 1px solid ${colors.bottomBorder};
  > h4 {
    margin:0;
  }
  > span {
    color:${colors.fontSecondary};
    font-weight:300;
      > a {
      font-weight:600;
      color:${colors.fontPrimary};
      text-decoration:underline;
    }
  }
  &.withBlur {
    filter: blur(18px);
  }
`;

export const WalletError = styled.p`
  color: ${colors.brandPrimary};
  position:absolute;
  margin:0;
`;

export const ActionBlock = styled.div`
  display: flex;
  justify-content:space-between;
  width: 100%;
  border-top: 1px solid ${colors.bottomBorder};
  padding-top: 1.5em;
  &.withBlur {
    filter: blur(18px);
  }
`;

export const ActionOneBlock = styled(ActionBlock)`
  justify-content: center;
`;

export const EthereumIcon = styled.span`
  color: ${colors.secondaryBlue};
  font-size: ${fonts.biggestSize};
  margin-right: .5em;
`;

export const UpfiringIcon = styled.span`
  color: ${colors.ufrLogo};
  font-size: ${fonts.biggestSize};
  margin-right: .5em;
`;

export const SubtitleWrapper = styled.div`
  text-align: center;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  > h4 {
    margin: 0;
  }
`;

export const Stub = styled(EmptyListStub)`
  background-image: url(${bgWallet});
`;

export const StubTitle = styled.div`
  font-size: ${fonts.largeSize};
  color: ${colors.titleWhite};
  text-align: center;
  padding-bottom: 1.5em;
`;

export const StubSubTitle = styled.div`
  font-size: ${fonts.moreStadartSize};
  color: ${colors.titleWhite};
  text-align: center;
  line-height: 1.47;
  > p {
    margin: 0.2em;
  }
`;

export const StubLearnMore = styled.div`
  padding: 2em 0 3em 0;
  text-align: center;
  > a {
    color: ${colors.secondaryBlueHover};
    font-size: ${fonts.moreStadartSize};
    &:hover {
      color: ${colors.mainBlue};
    }
  }
`;

export const StubBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionsTwo = styled.div`
  display: flex;
  width: 24em;
  justify-content: space-between;
`;

export const PromptWrapper = styled.div`
  width: 65%;
  margin: 0 auto;
`;

export const AddWalletMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddWalletMenuItem = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.secondaryBlueHover};
  cursor: pointer;
  height: 4.4em;
  font-size: ${fonts.mediumSize}
  background-image: linear-gradient(${colors.tabBorderTop}, ${colors.tabBorderTop}), linear-gradient(transparent, transparent);
  background-size: 100% 3px, 100% 3px;
  background-repeat: no-repeat;
  background-position: center top, center calc(100% - 3px);
  position: relative;
  &:hover {
    color: ${colors.defaultBtnHover};
  }
  &.active {
    background-image: linear-gradient(${colors.thirdBtn}, ${colors.thirdBtn}), linear-gradient(transparent, transparent);
    color: ${colors.titleWhite};
  }
  &.withBorder {
    &:after {
      content : "";
      position: absolute;
      right    : -1px;
      z-index: 100;
      top  : 1.9em;
      width  : 1px;
      height   : 1.2em;
      background: ${colors.tabBorderRight};
    }
  }
`;

export const PromptWarningMessage = styled.div`
  color: ${colors.inputLabel};
  font-size: ${fonts.moreStadartSize}
  text-align: center;
  padding-top: 1em;
  > span {
    margin-right: 5px;
  }
`;

export const PromptDangerMessage = styled.div`
  font-size: ${fonts.mediumSize}
  text-align: center;
  color: ${colors.lightRed};
  padding-top: .5em;
`;

export const PromptSecondaryActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 58px);
  padding: 2em;
`;

export const SecondaryAction = styled(LinkButton)`
   padding: .375em .75em;
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom: 1.2em;
`;

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleWhite};
  font-weight: 400;
  margin: 1.5em 0 1em 0;
  text-align: center;
`;

export const DecodingLoader = styled.div`
  color: ${colors.fontPrimary};
  display: flex;
  align-items: center;
`;

export const Loader = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
  border: 3px solid ${colors.lightRed};
  border-top: 3px solid ${colors.sideBlack}; 
  border-radius: 50%;
  animation: spin 2s linear infinite; 
  margin-right: 15px;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

import styled from 'styled-components';
import UTable from '../../../../components/Table/index';
import fonts from '../../../../style/font-styles';
import colors from '../../../../style/colors';
import Cancel from '../../../../assets/images/cancel-btn.svg';
import UButton from '../../../../components/UButton/index';
import PopUp from '../../../../components/PopUp';

export const WalletPageWrapper = styled.div`
  background-color: #000000;
  height: 100%;
  overflow: auto;
`;

export const TransactionsTable = styled(UTable)`
  
`;

export const Actions = styled.div`
  display:flex;
  flex-flow:row wrap; 
  justify-content:space-between;
  align-items:center;
    > div {
    display:flex;
    flex-flow:row wrap;
    align-items:center;
      > div {
      margin:0 0.5em;
      }
  }
`;

export const PopUpTitle = styled.h2`
  font-size:${fonts.largeSize};
  color:${colors.fontPrimary};
  font-weight:400;
  margin:0.5em 0;
  text-align:center;
`;

export const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:0 1 100%;
  justify-content:space-between;
  overflow-y:auto;
  overflow-x:hidden;
`;

export const HalfColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 0.48 48%;
  position:relative;
  margin-bottom:1.2em;
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom:1.2em;
`;

export const ClosePopUp = styled.a`
  position:absolute;
  width:25px;
  height:25px;
  top:5px;
  right:5px;
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-image:url(${Cancel});
`;

export const PopButton = styled(UButton)`
  margin:0 0.5em;
`;

export const PopText = styled.span`
  width:auto;
  text-align:left;
  padding:0.5em 0;
  color:${colors.fontPrimary};
  font-weight:100;
  font-size:${fonts.mediumSize};
`;

export const Min = styled.span`
  width:100%;
  text-align:left;
  padding:0.5em 0;
  color:${colors.brandSecondary};
  font-size:${fonts.bigSize};
`;

export const Max = styled(Min)`
  color:${colors.brandPrimary};
`;

export const Helper = styled.p`
  font-size:${fonts.smallSize};
  color:${colors.brandDarker};
`;

export const SmallPopUp = styled(PopUp)`
  height:auto;
`;

export const ActionsOne = styled(Actions)`
  justify-content:center;
  align-items:center;
  width: 100%;
  margin-top: 0.5em;
`;

export const HistorySection = styled.div`
  min-height: 100%;
  background-color: #000000;
`;

export const DefaultBtn = styled.button`
  padding: 0;
  color: ${colors.secondaryBlueHover};
  width: 7.5em;
  height: 2.6em;
  font-size: inherit;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background-color: ${colors.statisticBtnBg};
  text-transform: none;
  font-family: ${fonts.familyMain};
  &:hover {
    color: ${colors.defaultBtnHover};
    background-color: ${colors.defaultBtnBackgroundHover};
  }
  &:focus {
    outline: 0;
  }
`;

export const HistoryColumn = styled.th`
  width: 18%;
`;

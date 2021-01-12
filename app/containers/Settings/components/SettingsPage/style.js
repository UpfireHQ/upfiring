import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';

export const PageWrapper = styled.div`
  overflow: hidden;
  height: 100%;
`;

export const SettingsTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  > tbody {
    > tr {
      height: 4.5em;
      &:nth-child(2n) {
        background-color: ${colors.mainBlack};
      }
      &:nth-child(2n+1) {
        background-color: ${colors.tableGrey};
      }
      &:hover{
        &:not(.empty) {
          background: ${colors.secondaryHover};
        }
      }
      > td {
        padding: 0 1.5em;
        border-collapse: collapse;
        border-bottom: none;
        color: ${colors.fontPrimary}
      }
    }
  }
`;

export const SettingName = styled.td`
    text-overflow: ellipsis;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    font-size: ${fonts.moreStadartSize};
`;

export const CheckColumn = styled.td`
  width: 40%;
  text-align: right;
`;

export const BtnDefault = styled.button`
  padding: 0;
  color: ${colors.secondaryBlueHover};
  font-size: ${fonts.smallSize};
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  width: 140px;
  height: 28px;
  text-align: center;
  cursor: pointer;
  border-radius: 14px;
  border: none;
  background-color: ${colors.switchBorder};
  text-transform: uppercase;
  &:hover {
    background-color: ${colors.greyIcon};
    color: ${colors.titleWhite};
  }
  &:focus {
    outline: 0;
  }
`;

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleWhite};
  font-weight: 400;
  margin: 0 0 1.5em 0;
  text-align: center;
`;

export const Progress = styled.div`
  margin: 1.5em auto;
  width: 85%;
`;

export const ProgressDescription = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.inputLabel};
  padding-bottom: 1em;
  font-size: ${fonts.moreStadartSize};
  > div {
    > span {
      color: ${colors.titleWhite};
    }
  }
`;

export const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  height: .6em;
  border-radius: .3em;
  background-color: ${colors.inputFormBackground};
`;

export const ProgressItem = styled.div`
  position: absolute;
  height: 100%;
  border-radius: .3em;
  background-color: ${colors.mainBlue};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3em;
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom: 1.2em;
`;

export const PopUpProgressTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleWhite};
  font-weight: 400;
  margin: 1em 0;
  text-align: center;
`;

export const PopUpSubtitle = styled.p`
  width:100%;
  text-align:center;
  color:${colors.fontPrimary};
  font-size:${fonts.moreStadartSize};
`;

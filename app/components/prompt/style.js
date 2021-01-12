import styled from 'styled-components';
import fonts from '../../style/font-styles';
import colors from '../../style/colors';
import PopUp from '../PopUp';
import UButton from '../UButton';

import removeIcon from '../../assets/icons/ico-cross.svg';
import removeIconHover from '../../assets/icons/ico-cross-hover.svg';

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleWhite};
  font-weight: 400;
  margin: 0.5em 0;
  text-align: center;
`;

export const PopUpReplenishTitle = styled(PopUpTitle)`
  margin: 0;
`;

export const PopUpSubTitle = styled.h3`
  margin: 0;
  font-size: ${fonts.mediumSize};
  color: ${colors.defaultBtnHover};
  text-align: center;
  padding: .5em 0 2.5em 0;
  font-weight: normal;
`;

export const SmallPopUp = styled(PopUp)`
  height:auto;
`;

export const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:0 1 100%;
`;

export const PopAction = styled.div`
  margin: 1.5em 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopButton = styled(UButton)`
  margin:0 0.5em;
`;

export const PassWTextArea = styled.textarea`
  margin: .5em;
  padding:0.5em;
  background-color:transparent;
  border: 1px solid ${colors.fontSecondary};
  font-size:${fonts.standardSize};
  color:${colors.fontPrimary};
  width:100%;
  height: 3em;
  &:focus {
    outline-color: ${colors.brandSecondary} !important;
  }
`;

export const PassWInput = styled.input`
  margin: .5em;
  padding:0.5em;
  background-color:transparent;
  border: 1px solid ${colors.fontSecondary};
  font-size:${fonts.standardSize};
  color:${colors.fontPrimary};
  width:100%;
  &:focus {
    outline-color: ${colors.brandSecondary} !important;
  }
`;

export const Label = styled.p`
  margin: .5em 0 0;
  padding:0 0.5em;
`;

export const CostsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 1.5em 0 2.5em 0;
`;

export const Costs = styled.div`
  display: flex;
  align-items: center;
`;

export const UpfiringIcon = styled.span`
  color: ${colors.ufrLogo};
  font-size: ${fonts.biggestSize};
  margin-right: .3em;
`;

export const CostsValue = styled.span`
  color: ${colors.ufrLogo};
  font-size: ${fonts.biggestSize};
`;

export const RowCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5em;
`;

export const InputWrapper = styled.div`
  width: 70%;
`;

export const UploadBtn = styled.div`
  position: relative;
  width: 100%;
  outline: none;
  background-color: ${colors.addButtonBackground};
  color: ${colors.defaultBtn};
  font-size: ${fonts.moreStadartSize};
  border-radius: 4px;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${colors.fourthBtnBorder};
    color: ${colors.defaultBtnHover}
  }
  &.withError {
    color: ${colors.lightRed};
  }
  > div {
    width: 100%;
    height: 100%;
    > form {
      height: 100%;
      > div {
        height: 100%;
        > div {
          height: 100%;
          > div {
            height: 100%;
            margin: 0;
            > input {
              height: 100%;
            }
          }
        }
      }
    }
  }
  > .button-title {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const FileField = styled.div`
  width: 100%;
  background-color: ${colors.addButtonBackground};
  color: ${colors.defaultBtn};
  font-size: ${fonts.moreStadartSize};
  border-radius: 4px;
  height: 4em;
  padding: 0 1.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FileId = styled.div`
  width: 15em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileRemoveBtn = styled.div`
  display: inline-block;
  cursor: pointer;
  background-image: url(${removeIcon});
  width: 11px;
  height: 11px;
  &:hover {
    background-image: url(${removeIconHover});
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

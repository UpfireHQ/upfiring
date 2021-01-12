import styled from 'styled-components';
import UTable from '../../../../components/Table';
import fonts from '../../../../style/font-styles';
import colors from '../../../../style/colors';
import removeIcon from '../../../../assets/icons/ico-cross.svg';
import removeIconHover from '../../../../assets/icons/ico-cross-hover.svg';
import UButton from '../../../../components/UButton';
import PopUp from '../../../../components/PopUp';
import UInput from '../../../../components/InputText';
import Ok from '../../../../assets/images/checking.svg';
import addMoreFilesIconHover from '../../../../assets/icons/ico-add-more-files-hover.svg';
import addMoreFilesIcon from '../../../../assets/icons/ico-add-more-files.svg';
import addMoreFilesError from '../../../../assets/icons/ico-add-more-files-error.svg';
import EmptyListStub from '../../../../components/EmptyListStub';
import bgMyUploads from '../../../../assets/images/bg-my-uploads.png';

export const PageWrapper = styled.div`
  height: 100%;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const UploadsTable = styled(UTable)`
  position: relative;
  flex: 1
`;

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleWhite};
  font-weight: 400;
  margin: 1.5em 0 1.5em 0;
  text-align: center;
`;

export const Progress = styled.div`
  margin: 1.5em auto;
  width: 85%;
`;

export const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:0 1 100%;
  justify-content:space-between;
`;

export const HalfColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 0.48 48%;
  position:relative;
  margin-bottom:1.2em;
`;

export const FullContainer = styled.div`
  width: 100%
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom: 1.2em;
`;

export const PopAction = styled.div`
  margin:2em auto 1em;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export const FileCover = styled.div`
  position:relative;
`;

export const WalletCover = styled.div`
  position:relative;
  width: 100%;
  margin-bottom: 1em;
`;

export const RemoveButton = styled.span`
  display: inline-block;
  cursor: pointer;
  background-image: url(${removeIcon});
  width: 11px;
  height: 11px;
  &:hover {
    background-image: url(${removeIconHover});
  }
`;

export const UfrInfoWrapper = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  right: 1.5em;
`;

export const PopButton = styled(UButton)`
  margin:0 0.5em;
`;

export const SmallPopUp = styled(PopUp)`
  height:auto;
`;

export const WInput = styled(UInput)`
  font-size:${fonts.smallSize};
  padding:1em 0.5em;
`;

export const WalletButton = styled.a`
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

export const PopUpImportnatMessage = styled.p`
  color:${colors.fontPrimary};
  font-size:${fonts.standardSize};
  padding:0.5em 0;
`;

export const PopUpDescription = styled.p`
  color:${colors.fontSecondary};
  font-size:${fonts.standardSize};
  padding:0.5em 0;
`;

export const Divider = styled.hr`
  width:100%;
  border:0;
  border-bottom:1px solid ${colors.fontSecondary};
`;

export const PopUpLogo = styled.img`
  width: 35px;
`;

export const PopUpSubtitle = styled.p`
  width:100%;
  text-align:center;
  color:${colors.fontPrimary};
  font-size:${fonts.moreStadartSize};
`;

export const AddButton = styled.button`
  width: 100%;
  height: 4.7em;
  display: block;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  color: ${colors.secondaryBlueHover}
  cursor: pointer;
  outline: none;
  background-color: ${colors.addButtonBackground};
  font-size: ${fonts.minStandartSize};
  &:hover {
    color: ${colors.defaultBtnHover};
    background-color: ${colors.addButtonBackgroundHover};
    > span {
      background-image: url(${addMoreFilesIconHover});
    }
  }
  > span {
    display: inline-block;
    margin-right: 10px;
    background-image: url(${addMoreFilesIcon});
    width: 12px;
    height: 12px;
  }
  &.with-error {
    color: ${colors.lightRed}
    text-transform: none;
    > span {
      background-image: url(${addMoreFilesError});
    }
  }
`;

export const TorrentName = styled.td`
    text-overflow: ellipsis;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
`;

export const DeletedTorrent = '#4a4949';

export const AddMoreFiles = styled.a`
  text-align: center;
  text-transform: uppercase;
  color: ${colors.secondaryBlueHover};
  cursor: pointer;
  padding-top: 1.2em;
  &:hover {
    color: ${colors.defaultBtnHover};
    > span {
      background-image: url(${addMoreFilesIcon});
    }
  }
  > span {
    display: inline-block;
    margin-right: 10px;
    background-image: url(${addMoreFilesIcon});
    width: 12px;
    height: 12px;
  }
`;

export const NameTable = styled.th`
  width: 40% !important;
`;

export const DataCell = styled.th`
  width: 9%;
`;

export const CreateDate = styled.th`
  width: 15% !important;
`;

export const TorrentInfo = styled.div`
  background-color: ${colors.mainGrey};
  height: 17.58em;
  padding: 0 1.5em 1em 1.5em;
`;

export const TorrentInfoHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(172, 172, 204, 0.08);
  padding: 1em 0;
`;

export const TorrentInfoHeadName = styled.div`
  color: ${colors.titleWhite};
  font-size: 1.1em;
`;

export const TorrentInfoHeadAction = styled.span`
  color: ${colors.fontPrimary};
  cursor: pointer;
  &:hover {
    color: ${colors.secondaryBlueHover};
  }
  margin-left: 25px;
  font-size: ${fonts.bigSize};
`;

export const TorrentDetails = styled.div`
  height: 13em;
  overflow-y: auto;
  padding: .5em 0;
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${colors.filesTableScroll};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.filesTableScroll};
  }
`;

export const TorrentDetailsRow = styled.div`
  display: flex;
  padding: .5em 0;
`;

export const TorrentDetailsTitle = styled.div`
  width: 20%;
  color: ${colors.fontSecondary}
`;

export const TorrentDetailsValue = styled.div`
  width: 80%;
  color: ${colors.fontPrimary};
`;

export const FilesList = styled.div`
  background-color: ${colors.filesListBackground};
  border-radius: 4px;
  padding: 1.5em 0.5em 0.2em 1.5em;
  margin-bottom: 1.2em;
`;

export const FilesListHead = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.bottomBorder};
  font-size: ${fonts.mediumSize}
  color: ${colors.titleWhite};
  padding-bottom: 1em;
  margin-right: 1em;
`;

export const FilesTable = styled.div`
  max-height: 10em;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${colors.filesTableScroll};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.filesTableScroll};
  }
`;

export const FilesListRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.bottomBorder};
  font-size: ${fonts.standardSize}
  color: ${colors.inputLabel}
  padding: 1.2em 0;
  margin-right: 1em;
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

export const ProgressFull = styled.div`
  position: absolute;
  height: 100%;
  border-radius: .3em;
  background-color: ${colors.mainBlue};
`;

export const ProgressItem = styled.div`
  position: absolute;
  height: 100%;
  border-radius: .3em;
  background-color: ${colors.lightRed};
`;

export const ButtonContainer = styled.div`
  //display: flex;
  display: none;
  justify-content: center;
  align-items: center;
`;

export const Stub = styled(EmptyListStub)`
  background-image: url(${bgMyUploads});
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

import styled from 'styled-components';
import gradients from '../../../style/gradients';
import fonts from '../../../style/font-styles';
import colors from '../../../style/colors';
import UTable from '../../../components/Table';
import { EmptyListStub, PopUp } from '../../../components';

import bgDownloads from '../../../assets/images/bg-downloads.png';
import Dropzone from 'react-dropzone';

export const PageWrapper = styled(Dropzone)`
  height: 100%;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const DownloadsTable = styled(UTable)`
  position: relative;
`;

export const NameCell = styled.th`
  width: 25%;
`;

export const ProgressCell = styled.th`
  width: 18%;
`;

export const StatusColumn = styled.th`
  width: 10%;
`;

export const DownloadedColumn = styled.th`
  width: 12%;
`;

export const SizeColumn = styled.th`
  width: 10%;
`;

export const EtaColumn = styled.th`
  width: 10%;
`;

export const SpeedColumn = styled.th`
  width: 10%;
`;

export const SmallDownloadProgressCover = styled.div`
  background-color: ${colors.progressEmptyBg};
  position: relative;
  width:95%;
  min-width:150px;
  height:12px;
  padding-right:0.5em;
  border-radius: 6px;
`;

export const DownloadProgressValue = styled.div`
  width:100%;
  position:absolute;
  left:0;
  top: 0;
  font-size: 11px;
  color: ${colors.titleWhite};
  text-align: center;
  z-index: 2;
`;

export const DownloadProgressBar = styled.div`
  background-image: ${gradients.redProgress};
  position:absolute;
  height:100%;
  left:0;
  top: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const ActionsOne = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2.5em;
`;

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleWhite};
  font-weight: 400;
  margin: 1em 0;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 0 1 100%;
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom: .1em;
`;

export const FileCover = styled.div`
  position:relative;
`;

export const FullFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 1 100%;
  > p {
    font-size:${fonts.smallSize};
  }
`;

export const HalfFlex = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 0 0.45 45%;
  padding-right: 0.5em;
  align-items: flex-start;
  > p {
    font-size: ${fonts.minStandartSize};
    margin: 0.4em 0;
  }
`;

export const HalfFlexA = styled(HalfFlex)`
  flex: 0 0.65 65%;
  padding-right: 0;
  color: ${colors.filesTableHead};
`;

export const SecondFlex = styled(HalfFlex)`
  flex: 0 0.3 30%;
  padding-right: 0;
  color: ${colors.torrentFileDetailsPropertyName};
`;

export const FilesWrapper = styled.div`
  background: ${colors.addButtonBackground};
  padding: .8em 0.5em 1em 1.2em;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const FilesList = styled.div`
  overflow-y: auto;
  max-height: 11em;
  font-size: ${fonts.minStandartSize};
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

export const FilesListHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.filesTableHead};
  padding: .8em 1em;
  margin-right: .5em;
`;

export const FilesListRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.defaultBtnHover}
  padding: .8em 1em;
  margin: 0 1em .1em 0;
  cursor: pointer;
  border-radius: 1.3em;
  &:hover {
    background-color: ${colors.filesTableRowHover};
  }
  &.active {
    background-color: ${colors.filesTableRowSelected};
    color: ${colors.titleWhite}
  }
`;

export const TorrentInfo = styled.div`
  background-color: ${colors.torrentFileDetailBg};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 1.5em .5em 1.5em 2.2em;
  width: 100%;
`;

export const TorrentInfoDetails = styled.div`
  width: 100%;
  max-height: 13em;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${colors.torrentFileDetailBg};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.torrentFileDetailBg};
  }
`;

export const FullFileColumn = styled(FullColumn)`
  margin-bottom: 1.5em;
`;

export const TorrentName = styled.td`
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
`;

export const TrClick = styled.tr`
  &:hover, &:active, &:focus {
    cursor:pointer;
  }
`;

export const CheckboxCell = styled.th`
  padding: 0 0 0 28px !important;
  width: 5%;
`;

export const CheckboxTdWrapper = styled.td`
  padding: 0 0 0 28px !important;
`;

export const Stub = styled(EmptyListStub)`
  background-image: url(${bgDownloads});
`;

export const StubTitle = styled.div`
  font-size: ${fonts.largeSize};
  color: ${colors.titleWhite};
  text-align: center;
  padding-bottom: 1em;
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

export const StubBtnWrapper = styled.div`
  padding-top: 3em;
  display: flex;
  align-items: center;
`;


import styled from 'styled-components';
import fonts from '../../../style/font-styles';
import colors from '../../../style/colors';
import UTable from '../../../components/Table';
import { EmptyListStub, PopUp } from '../../../components';
import bgCompleted from '../../../assets/images/bg-completed.png';

export const PageWrapper = styled.div`
  height: 100%;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const DownloadsTable = styled(UTable)`
  position: relative;
  flex: 1
`;

export const PopUpTitle = styled.h2`
  font-size:${fonts.largeSize};
  color:${colors.fontPrimary};
  font-weight:400;
  margin:1em 0;
  text-align:center;
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom:1.2em;
`;

export const NameCell = styled.th`
  width: 40%;
`;

export const DataCell = styled.th`
  width: 10%;
`;

export const FilesCell = styled.th`
  width: 15%;
`;

export const TorrentName = styled.td`
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
`;

export const DeletedTorrent = '#4a4949';

export const TrClick = styled.tr`
  &:hover, &:active, &:focus {
    cursor:pointer;
  }
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

export const TorrentInfoHeadActions = styled.div`

`;

export const TorrentInfoHeadAction = styled.span`
  color: ${colors.fontPrimary};
  cursor: pointer;
  &:hover {
    color: #b1b7f0;
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

export const GotItLink = styled.div`
  width: 67px;
  color: ${colors.switchActive};
  text-align: center;
`;

export const GotItLinkWrapper = styled.td`
  width: 13%;
  padding: .4em 1.5em .4em 1.5em !important;
`;

export const Stub = styled(EmptyListStub)`
  background-image: url(${bgCompleted});
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

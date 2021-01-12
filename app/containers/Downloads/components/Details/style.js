import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';

export const DetailsWrapper = styled.div`
  background-color: ${colors.mainGrey};
  display:flex;
  height: 17.58em;
  padding-bottom: 1em;
`;

export const Field = styled.div`
  width:100%;
  padding: 0 1.5em;
`;

export const Menu = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content: space-between;
  align-items:center;
  margin:0;
  padding: 1em 0;
  border-bottom: 1px solid rgba(172, 172, 204, 0.08);
`;

export const Nav = styled.ul`
  display:inline;
  padding:0;
  margin: 0;
  > li {
    display:inline-block;
    padding-right: 2em;
  }
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

export const MenuLink = styled.a`
  color: ${colors.mainBlue};
  padding:1em 0;
  transition: all 0.3s;
  font-size: 1.1em;
  &:hover {
    color: ${colors.mainBlueHover};
  }
  &.selected, &:active, &:focus {
    color: ${colors.titleWhite};
  }
`;

export const Column = styled.div`
  display:flex;
  flex-flow:column wrap;
  padding: .5em 0;
`;

export const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content:space-between;
  align-items: flex-start;
  height: 13em;
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

export const HalfFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 0.45 45%;
  padding-right:0.5em;
  align-items: flex-start;
  > p {
    margin: 0;
  }
`;

export const HalfFlexDetail = styled(HalfFlex)`
  color:${colors.fontPrimary};
  flex: 0 0.61 61%;
  padding: .5em 0;
`;

export const SecondFlex = styled(HalfFlex)`
  flex: 0 0.2 20%;
  padding: .5em 0;
  color: ${colors.fontSecondary};
`;

export const ThirdFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 0.33 33%;
  align-items: flex-start;
  justify-content:space-between;
`;

export const SpeedColumnFlex = styled(HalfFlex)`
  flex: 0 0.39 39%;
  padding: .5em 0;
  color: ${colors.fontSecondary};
`;

export const FullFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 1 100%;
`;

export const FileTbodyRow = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 1 100%;
  align-items: flex-start;
  justify-content:space-between;
`;

export const FileTheadFirst = styled(HalfFlex)`
  color: ${colors.fontSecondary};
  flex: 0 0.4 40%;
  padding: .5em 0;
`;

export const FileTheadSecond = styled(HalfFlex)`
  flex: 0 0.6 60%;
  padding: .5em 0;
  color: ${colors.fontSecondary};
`;

export const FileTbodyFirst = styled(HalfFlex)`
  color:${colors.fontPrimary};
  flex: 0 0.4 40%;
  padding: .5em 0;
`;

export const FileTbodySecond = styled(HalfFlex)`
  flex: 0 0.60 60%;
  padding: .5em 0;
  color:${colors.fontPrimary};
`;

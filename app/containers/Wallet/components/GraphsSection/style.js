import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';

export const Subtitle = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.titleWhite};
  font-weight:300;
`;

export const Index = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:1;
  justify-content:space-between;
  padding: 0 1.5em;
`;

export const CircleGraphs = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.34;
`;

export const OneGraph = styled.div`
  display:flex;
  flex-flow:column wrap;
  margin: .75em 0;
  background-color: ${colors.mainGrey};
  border-radius: 0.7em;
  padding: 1.5em;
    > h4 {
      margin:0.5em 0;
    }
`;

export const SubtitleWrapper = styled.div`
  text-align: center;
  padding-bottom: 1.5em;
  > h4 {
    margin: 0;
  }
`;

export const StatisticGraph = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 0.64;
  background-color: ${colors.mainGrey};
  border-radius: 0.7em;
  padding: 1.5em;
  margin: .75em 0;
  > h4 {
    margin: 0;
  }
  > div > div > div {
    > svg {
      padding: .5em !important;
    }
  }
`;

export const GraphInfo = styled.div`
  display:flex;
  flex-flow:row;
`;

export const InfoContainer = styled.div`
  text-align: center;
  > div {
    font-style: normal;
    font-size:1em;
    
    color: ${colors.fontPrimary};
  }
`;

export const Info = styled.div`
  height: 100px;
  width: 100px;
  border: 7px solid ${colors.mainBlack}; 
  border-top: 7px solid ${colors.lightRed};
  border-radius: 50%;
  animation: spin 2s linear infinite;
  color:${colors.fontPrimary};
  margin: 20px auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

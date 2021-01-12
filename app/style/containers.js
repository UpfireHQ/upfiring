import styled, { css } from 'styled-components';
import colors from '../style/colors';
import fonts from './font-styles';
import Dropzone from 'react-dropzone';

export const sizes = {
  large: 1919,
  big: 1199,
  desktop: 991,
  tablet: 767,
  phone: 150
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label];
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}px) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

export const Container = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 100%;
    display:block;
    &:after, &:before  {
        content: " ";
        display: table;
    }
    &:after {
        clear: both;
    }
    ${media.big`
        width: 1180px;
        max-width: 1180px;`}
    ${media.desktop` 
        width: 980px;
        max-width: 100%;`}
    ${media.tablet`
        width: 760px;
        max-width: 100%;`}
`;

export const ContainerFluid = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
    &:after, &:before  {
        content: " ";
        display: table;
    }
    &:after {
        clear: both;
    }
    ${media.phone`
        padding:0;`}
    ${media.desktop`
        padding-left: 20px;
        padding-right: 20px;`}
`;

export const MainAppContainer = styled(Dropzone).attrs({disableClick: true, disablePreview: true})`
    &:after, &:before  {
      content: " ";
      display: table;
    }
    display:flex;
    position: relative;
    height: 100wh !important;
    width: 100% !important;
    align-items: stretch;
    overflow: hidden;
`;

export const AppContainer = styled.div`
  border-left: 1px solid #000000;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const PageHead = styled.div`
  color: ${colors.titleWhite};
  background-color: ${colors.mainGrey};
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 20px;
  > div {
    width: 33.33%;
  }
  > .title {
    font-size: ${fonts.bigSize};
    text-align: center;
  }
  > .buttons {
    text-align: right;
  }
`;

export const DropContainer = styled(Dropzone).attrs({
  disableClick: true,
  disablePreview: true,
  activeClassName: 'active'
})`
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  border: 1.5px dashed ${colors.dropBorder};
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  &.active {
    border: none;
    background-color: ${colors.dropActiveBg};
  }
`;

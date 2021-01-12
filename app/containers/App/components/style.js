import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';

export const SideWrapper = styled.div`
  background:${colors.sideBlack};
  text-align: center;
  width: 70px;
  padding: 1em 0;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 100% !important;
  }
`;

export const Logo = styled.img`
  max-width:100%;
  width: 50px;
  margin: 0 auto 2em;
  display: block;
`;

export const Navigation = styled.ul`
  list-style: none;
  padding: 0;
  > li {
    margin: 2em auto;
    position: relative;
    height: 2em;
  } 
`;

export const MenuIcon = styled.a`
  cursor: pointer;
  position: absolute;
  z-index: 10000;
  font-size: 1.5em;
  padding: 5px 0;
  display: block;
  box-sizing: border-box;
  width: 100%;
  text-decoration:none;
  color: ${colors.greyIcon};
  &:hover {
    color: ${colors.fontPrimary};
    & ~ div {
      width: auto;
      opacity: 1;
    }
  }
  &:active, &:focus {
    border-left: 3px solid ${colors.activeRed};
    cursor:pointer;
  }
  ${({active}) => active ? `
    color: ${colors.activeRed};
    border-left: 3px solid ${colors.activeRed};
    ` : `
    border-left: 3px solid transparent;`}
`;

export const MenuTooltip = styled.div`
  position: absolute;
  z-index: 9999;
  opacity: 0;
  top: -9px;
  left: 10px;
  width: 0;
  padding: 1em 1em 1em 3.4em;
  background-color: ${colors.tooltipsBackground};
  color: ${colors.secondaryBlueHover};
  font-size: ${fonts.moreStadartSize};
  border-radius: 8px;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity .4s ease-out, left .1s ease-out;
`;

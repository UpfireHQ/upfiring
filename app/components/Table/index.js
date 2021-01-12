import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const TableOver = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1
`;

const UTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  height: 100%;
  >thead { 
    tr{
    height: 3.3em;
      th{
        padding: 1.1em 0 1.1em 1.5em;
        border-collapse: collapse;
        border: 1px solid #000;
        font-size:${fonts.mediumSize};
        font-weight: 300;
        background: ${colors.mainGrey};
        color: ${colors.fontSecondary};
        font-size: ${fonts.standardSize};
      }
    }
  }
  > tbody {
    > tr {
      height: 3.3em;
      &:nth-child(odd){
        background: ${colors.tableGrey};
      }
      &:nth-child(even){
        background: ${colors.mainBlack};
      }
      &:hover {
        background: ${colors.secondaryHover};
        color:${colors.titleWhite};
        cursor: pointer;
      }
      &.active {
        background: ${colors.mainHover};
        > td {
          color:${colors.titleWhite};
        }
      }
      &:first-child {
        &:hover {
          color:${colors.fontPrimary};
        }
      }
      > td {
        padding: 1.1em 0 1.1em 1.8em;
        border-collapse: collapse;
        border-bottom: 1px solid #000;
        font-size: ${fonts.minStandartSize};
        color: ${colors.fontPrimary};
        > a {
          color: ${colors.thirdBtn};
          text-decoration: none;
          &:hover {
            color: ${colors.mainBlueHover};
          }
        }
      }
      &.empty {
      background: none;
      cursor: auto;
        > td {
          border-bottom: none;
          padding: 0;
        }
        &:hover {
          background: none;
        }
      }
      &.withoutHover {
        cursor: auto;
        &:hover {
          &:nth-child(odd){
            background: ${colors.tableGrey};
          }
          &:nth-child(even){
            background: ${colors.mainBlack};
          }
        }
      }
    }
  }
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return (
      <TableOver>
        <UTable {...props} />
      </TableOver>
    );
  }
}

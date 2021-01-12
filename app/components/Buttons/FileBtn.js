import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fileAdd from '../../assets/icons/ico-add.svg';
import fileAddHover from '../../assets/icons/ico-add-hover.svg';

const FileButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 4.3em;
  height: 100%;
  font-size: 1em;
  display: block;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: ${colors.secondaryBlueHover}
  cursor: pointer;
  outline: none;
  background-color: ${colors.addButtonBackground};
  &:hover {
    color: ${colors.defaultBtnHover};
    background-color: ${colors.addButtonBackgroundHover};
    > span {
      background-image: url(${fileAddHover});
    }
  }
  > span {
    background-image: url(${fileAdd});
    display: inline-block;
    width: 19px;
    height: 19px;
  }
`;

export default class extends React.PureComponent {
  render() {
    const { onClick } = this.props;
    return (
      <FileButton onClick={onClick}>
        <span />
      </FileButton>
    );
  }
}

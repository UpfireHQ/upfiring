import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import closeIcon from '../../assets/icons/ico-cross.svg';
import closeIconHover from '../../assets/icons/ico-cross-hover.svg';

const ClosePopUp = styled.div`
  position:absolute;
  width:32px;
  height:32px;
  top:20px;
  right:20px;
  cursor: pointer;
  background-color: ${colors.closeBtnBg};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  > span {
    background-image: url(${closeIcon});
    display: inline-block;
    width: 13px;
    height: 13px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &:hover {
    background-color: ${colors.closeBtnBgHover};
    > span {
      background-image: url(${closeIconHover});
    }
  }
`;

export default class extends React.PureComponent {
  render() {
    const {onClick} = this.props;
    return (
      <ClosePopUp onClick={onClick}>
        <span/>
      </ClosePopUp>
    );
  }
}

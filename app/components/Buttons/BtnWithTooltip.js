import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import edit from '../../assets/icons/ico-edit.svg';
import editHover from '../../assets/icons/ico-edit-hover.svg';
import remove from '../../assets/icons/ico-remove-type-2.svg';
import removeHover from '../../assets/icons/ico-remove-type-2-hover.svg';
import copy from '../../assets/icons/ico-copy-to-clipboard.svg';
import copyHover from '../../assets/icons/ico-copy-to-clipboard-hover.svg';

const Button = styled.button`
  text-transform: none;
  background-color: inherit;
  box-shadow: none;
  font-family: ${fonts.familyMain};
  padding: 0;
  min-height: 24px;
  border: none;
  cursor: pointer;
  font-size: ${fonts.standardSize};
  display: flex;
  align-items: center;
  outline: none;
  position: relative;
  > div {
    display: none;
    position: absolute;
    z-index: 2;
    align-items: center;
    font-style: normal;
    color: ${colors.defaultBtnHover};
    padding: 0 1em;
    font-size: ${fonts.standardSize};
    background-color: ${colors.tooltipsBackground};
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, .5);
    border-radius: 4px;
    height: 38px;
    white-space: nowrap;
    &.right {
      left: 35px;
      top: -5px;
      &::after {
        content: " ";
        position: absolute;
        top: 14px;
        left: 0;
        margin-left: -10px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent ${colors.tooltipsBackground} transparent transparent;
      }
    }
  }
  &:hover {
    background-color: inherit;
    color: ${colors.mainBlueHover};
    > div {
      display:flex;
    }
    > .edit {
      background-image: url(${editHover});
    }
    > .remove {
      background-image: url(${removeHover});
    }
    > .copy {
      background-image: url(${copyHover});
    }
  }
  > span {
    display: inline-block;
    background-repeat: no-repeat;
  }
  > .edit {
    background-image: url(${edit});
    width: 18px;
    height: 18px;
  }
  > .remove {
    background-image: url(${remove});
    width: 18px;
    height: 18px;
  }
  > .copy {
    background-image: url(${copy});
    width: 17px;
    height: 17px;
  }
`;

export default class extends React.PureComponent {
  render() {
    const {disabled = false, iconClass, onClick, text, positionClass = ''} = this.props;
    return (
      <Button onClick={onClick} disabled={disabled}>
        <span className={iconClass}/>
        <div className={positionClass}>{text}</div>
      </Button>
    );
  }
}

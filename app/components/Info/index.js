import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import helpCircleIcon from '../../assets/icons/ico-help-circle.svg';
import helpCircleIconHover from '../../assets/icons/ico-help-circle-hover.svg';

const Index = styled.div`
  cursor: pointer;
  position: relative;
  > div {
    display: none;
    position: absolute;
    top: 2.5em;
    left: -130px;
    z-index: 2;
    font-style: normal;
    width: 240px;
    color: ${colors.defaultBtnHover};
    padding: 1.5em;
    font-size: ${fonts.standardSize};
    background-color: ${colors.tooltipsBackground};
    box-shadow: 0 4px 10px 4px rgba(0,0,0,0.5);
    border-radius: 10px;
    line-height: 2em;
    text-align: center;
    &::after {
      content: " ";
      position: absolute;
      top: -10px;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent ${colors.tooltipsBackground} transparent;
    }
  }
  > span {
    background-image: url(${helpCircleIcon});
    display: inline-block;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
  }
  &:hover {
    > div {
      display:block;
    }
    > span {
      background-image: url(${helpCircleIconHover});
    }
  }
`;

export default class extends React.PureComponent {
  render() {
    const { description } = this.props;
    return (
      <Index>
        <span />
        <div>{description}</div>
      </Index>
    );
  }
}

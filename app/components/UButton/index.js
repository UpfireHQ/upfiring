import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import gradients from '../../style/gradients';

const Index = styled.a`
  padding:0.5em 1em;
  color: ${colors.fontPrimary};
  font-size:${fonts.standardSize};
  background-repeat: repeat;
  background-position: 0 -30px;
  background-size: 200%;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  width: 130px;
  text-align: center;
  display: block;
  cursor: pointer;
  &:hover {
    background-position: 0 0;
    background-position: 100px 0;
  }
  ${({ secondary }) => secondary ? `
    background-image:${gradients.bluePrimary};
    ` : `
    background-image:${gradients.redPrimary};
  `}
  ${({ additional }) => additional ? `
    background-image:none;
    background: #7B7575;
    &:hover {
    background: #908f8f;
    }
    ` : `
    text-decoration:none;
  `}
  ${({ disabled }) => disabled ? `
    color: #1F1F1F;
    background-image:none;
    background: #515151;
    pointer-events: none;
    &:hover {
    background: #515151;
    }
    ` : `
    text-decoration:none;
  `}
`;

export default class extends React.PureComponent {
  render() {
    const { additional, secondary, disabled, ...props } = this.props;
    return (
      <div>
        <Index
          additional={additional}
          secondary={secondary}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
}

import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import gradients from '../../style/gradients';

const Index = styled.a`
  padding:0.5em 1em;
  color: ${colors.fontPrimary};
  font-size:${fonts.standardSize};
  background-image:${gradients.redPrimary};
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
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <Index {...props} />
      </div>
    );
  }
}

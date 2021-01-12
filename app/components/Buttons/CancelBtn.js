import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const CancelBtn = styled.div`
  position: absolute;
  bottom: 3em;
  left: calc(50% - 1.8em);
  > a {
    color: ${colors.secondaryBlueHover};
    font-size: ${fonts.moreStadartSize};
    &:hover {
      color: ${colors.mainBlue};
    }
  }
`;

export default class extends React.PureComponent {

  handlerClick = (e) => {
    const {onClick} = this.props;
    e.preventDefault();
    onClick && onClick(e);
  };

  render() {
    const {title} = this.props;
    return (
      <CancelBtn onClick={this.handlerClick}>
        <a href="#">{title}</a>
      </CancelBtn>
    );
  }
}

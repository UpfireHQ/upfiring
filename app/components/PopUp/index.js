import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';

const PopUpOver = styled.div`
    position: fixed;
    background-color: ${colors.popupBackground};
    z-index: 998;
    width: calc(100% - 70px);
    height: 100%;
    top: 0;
    left: 70px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
`;

const PopUpOverWithBg = styled(PopUpOver)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

const PopUp = styled.div`
  width: 65%;
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return (
      <PopUpOver>
        <PopUp {...props} />
      </PopUpOver>
    );
  }
}

export class PopUpWithBg extends React.PureComponent {
  render() {
    const { bg, ...props } = this.props;
    return (
      <PopUpOverWithBg style={{ backgroundImage: `url(${bg})` }}>
        <PopUp {...props} />
      </PopUpOverWithBg>
    );
  }
}

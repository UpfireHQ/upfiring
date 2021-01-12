import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';

const Stub = styled.div`
    position: fixed;
    background-color: ${colors.popupBackground};
    z-index: 997;
    width: calc(100% - 70px);
    height: 100%;
    top: 0;
    left: 70px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return <Stub {...props} />;
  }
}

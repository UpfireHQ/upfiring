import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const ErrorCover = styled.div`
  position: absolute;
  bottom: -13px;
  padding-left: 0.5em;
`;

const Error = styled.p`
  color:${colors.brandPrimary};
  margin:0;
  visibility:visible;
  font-size:${fonts.smallSize};
  font-weight:normal;
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return (
      <ErrorCover>
        <Error {...props} />
      </ErrorCover>
    );
  }
}

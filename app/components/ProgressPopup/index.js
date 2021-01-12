import * as React from 'react';
import { PopUpDetails, PopUpTitle, Row, SmallPopUp } from '../confirmation';
import LoadingCube from '../LoadingCube';
import trans from '../../translations';
import styled from 'styled-components';
import fonts from '../../style/font-styles';

const PopUpBigDetails = styled(PopUpDetails)`
  font-size: ${fonts.middleSize};
`;

export default class ProgressPopup extends React.PureComponent {
  render() {
    const {title, details, message} = this.props;
    return (
      <SmallPopUp>
        <PopUpTitle>{title}</PopUpTitle>
        <Row>
          <LoadingCube/>
        </Row>
        {details && (<Row>
          <PopUpBigDetails>{details}</PopUpBigDetails>
        </Row>)}
        <Row>
          <PopUpDetails>{message || trans('popups.torrentGenerate')}</PopUpDetails>
        </Row>
      </SmallPopUp>
    );
  }
}

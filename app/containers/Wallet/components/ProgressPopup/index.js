import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import trans from '../../../../translations';
import PopUp from '../../../../components/PopUp';
import { FullColumn, PopUpTitle } from '../WalletSection/style';
import LoadingCube from '../../../../components/LoadingCube';

class ProgressPopup extends PureComponent {
  get title() {
    const {withdrawProgress} = this.props;

    return withdrawProgress
      ? trans('details.ContractProcessingWithDraw')
      : trans('details.ContractProcessing');
  }

  render() {
    return (
      <PopUp key="progress-popup">
        <FullColumn>
          <div className="sk-cube-grid">
            <LoadingCube/>
          </div>
        </FullColumn>
        <PopUpTitle>{this.title}</PopUpTitle>
      </PopUp>
    );
  }
}

ProgressPopup.propTypes = {
  refillProgress: PropTypes.bool,
  withdrawProgress: PropTypes.bool
};

export default ProgressPopup;

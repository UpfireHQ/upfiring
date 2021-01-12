import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PopUp from '../../../components/PopUp';
import {
  ButtonContainer,
  PopUpTitle,
  Progress,
  ProgressDescription,
  ProgressItem,
  ProgressWrapper
} from '../../Settings/components/SettingsPage/style';
import trans from '../../../translations';
import FourthBtn from '../../../components/Buttons/FourthBtn';
import { PopUpSubTitle, RowCenter } from '../../../components/prompt/style';
import MainButton from '../../../components/Buttons/MainBtn';
import ClosePopUp from '../../../components/Buttons/ClosePopUpBtn';

class DownloadUpdateModal extends PureComponent {

  handlerDownload = () => {
    const {update, onDownloadUpdate} = this.props;
    onDownloadUpdate && onDownloadUpdate(update);
  };

  handlerClose = () => {
    const {onCloseUpdateModalAction} = this.props;
    onCloseUpdateModalAction && onCloseUpdateModalAction();
  };

  get Progress() {
    const {updateProgress} = this.props;
    const percent = updateProgress.percent;
    return [
      <Progress key="progress">
        <ProgressDescription>
          <div>
            {trans('settings.downloadProgress')}
          </div>
          <div>
            {percent}%
          </div>
        </ProgressDescription>
        <ProgressWrapper>
          <ProgressItem
            style={
              {
                width: `${percent}%`,
                borderTopRightRadius: percent > 95 ? '.3em' : 0,
                borderBottomRightRadius: percent > 95 ? '.3em' : 0
              }
            }
          />
        </ProgressWrapper>
      </Progress>
    ];
  }

  get Download() {
    const {update} = this.props;

    return [
      <RowCenter key="message">
        <PopUpSubTitle>
          {trans('settings.downloadNewVersion', {version: update.version})}
        </PopUpSubTitle>
      </RowCenter>,
      <ButtonContainer key="download">
        <FourthBtn
          title={trans('settings.updateLater')}
          onClick={this.handlerClose}
        />
        &nbsp;&nbsp;&nbsp;
        <MainButton
          title={trans('Download')}
          onClick={this.handlerDownload}
        />
      </ButtonContainer>
    ];
  }

  render() {
    const {updateProgress} = this.props;

    return (
      <PopUp>
        <ClosePopUp onClick={this.handlerClose}/>
        <PopUpTitle>{trans('settings.versionAvailable')}</PopUpTitle>
        {updateProgress ? this.Progress : this.Download}
      </PopUp>
    );
  }
}

DownloadUpdateModal.propTypes = {
  update: PropTypes.object,
  updateProgress: PropTypes.object,
  onCloseUpdateModalAction: PropTypes.func,
  onDownloadUpdate: PropTypes.func,
  onAbortDownloadUpdate: PropTypes.func
};

export default DownloadUpdateModal;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PopUp from '../../../../components/PopUp';
import ClosePopUpBtn from '../../../../components/Buttons/ClosePopUpBtn';
import { PopUpTitle } from '../../../Uploads/components/UploadsPage/style';
import trans from '../../../../translations';
import { ActionsOne, FileCover, FullFileColumn, Row } from '../../../Downloads/components/style';
import InputText from '../../../../components/InputText';
import FileBtn from '../../../../components/Buttons/FileBtn';
import MainBtn from '../../../../components/Buttons/MainBtn';
import { remote } from 'electron';

class SelectPathPopup extends PureComponent {
  state = {
    path: '',
    pathError: false
  };

  handlerSelectPath = () => {
    this.setState({pathError: false});
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: trans('Upload.selectedPath'),
        properties: ['createDirectory', 'openDirectory']
      },
      (filePaths) => filePaths && filePaths.length && this.setState({path: filePaths[0]})
    );
  };

  handlerRun = () => {
    const {onRunDecodeTorrent, unpackTorrentProgress, webTorrent} = this.props;
    const {path} = this.state;
    const pathError = !path;
    this.setState({pathError});

    if (pathError) {
      return;
    }

    onRunDecodeTorrent && onRunDecodeTorrent({
      torrent: webTorrent[unpackTorrentProgress && unpackTorrentProgress.infoHash],
      unpackTorrentProgress: {...unpackTorrentProgress, path}
    });
  };

  handlerCancel = () => {
    const {onCancelDecodeTorrent} = this.props;

    onCancelDecodeTorrent && onCancelDecodeTorrent();
  };

  render() {
    const {path, pathError} = this.state;
    return (
      <PopUp>
        <ClosePopUpBtn onClick={this.handlerCancel}/>
        <PopUpTitle>{trans('finished.title')}</PopUpTitle>
        <Row>
          <FullFileColumn>
            <FileCover>
              <InputText
                readOnly="readOnly"
                disabled
                value={path}
                label={trans('download.saveAs')}
                error={pathError ? trans('Download.Path.Error') : null}
              />
              <FileBtn onClick={this.handlerSelectPath}/>
            </FileCover>
          </FullFileColumn>
        </Row>
        <ActionsOne>
          <MainBtn
            disabled={!path}
            onClick={this.handlerRun}
            title={trans('finished.Unpack')}
          />
        </ActionsOne>
      </PopUp>
    );
  }
}

SelectPathPopup.propTypes = {
  webTorrent: PropTypes.object,
  unpackTorrentProgress: PropTypes.object,
  onRunDecodeTorrent: PropTypes.func,
  onCancelDecodeTorrent: PropTypes.func
};

export default SelectPathPopup;

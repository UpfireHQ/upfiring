import React from 'react';
import _ from 'lodash';
import { FILENAME_FILTER_SYMBOLS, UFR_FLOAT_NUMBERS } from '../../../../constants';
import { PopUpWithBg } from '../../../../components/PopUp';
import bgMyUploads from '../../../../assets/images/bg-my-uploads.png';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import { FileCover, FullColumn, HalfColumn, PopAction, PopUpTitle, Row, UfrInfoWrapper } from '../UploadsPage/style';
import trans from '../../../../translations';
import UInput from '../../../../components/InputText';
import Info from '../../../../components/Info';
import FileButton from '../../../../components/Buttons/FileBtn';
import UTextarea from '../../../../components/InputTextarea';
import ThirdBtn from '../../../../components/Buttons/ThirdBtn';
import { DropContainer } from '../../../../style/containers';
import FileSelector from '../FileSelector';

import { remote } from 'electron';
import { FileEntity, prettySize } from '../../../../utils/file';
import { isTorrentFileExists } from '../../../../utils/torrent/helpers';

export default class UploadTorrent extends React.Component {
  state = {
    validationError: null,
    validationErrorFile: null,
    size: 0
  };

  static get pattern() {
    return `[0-9]+(\\.[0-9]{0,${UFR_FLOAT_NUMBERS}})?%?`;
  }

  static getDerivedStateFromProps(props, state) {
    const {uploadFiles} = props;
    const size = uploadFiles && uploadFiles.files && prettySize(uploadFiles.files);

    return {size};
  }

  get uploadFiles() {
    return this.props.uploadFiles || {};
  }

  onChange(data) {
    const {onUploadTorrent} = this.props;
    onUploadTorrent && onUploadTorrent({...this.uploadFiles, ...data});
  };

  handlerCancel = () => {
    const {onCancelUploadTorrent} = this.props;
    onCancelUploadTorrent && onCancelUploadTorrent();
  };

  handlerCreate = () => {
    const {path, files, name, cost} = this.uploadFiles;
    const {onCreateUploadTorrent, wallet} = this.props;

    const validationError = !(Boolean(name) && Boolean(Number(cost)) && (files && files.length) && Boolean(path));
    const validationErrorFile = isTorrentFileExists(path, name);

    this.setState({validationError, validationErrorFile});

    if (validationError || validationErrorFile) {
      return;
    }

    onCreateUploadTorrent && onCreateUploadTorrent({...this.uploadFiles, wallet});
  };

  handlerSelectDestinationPath = () => {
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: trans('Upload.selectedPath'),
        properties: ['createDirectory', 'openDirectory']
      },
      (filePaths) => {
        this.onChange({path: String(filePaths || '')});
      }
    );
  };

  onChangeInput = (name, {validity, value}, validator) => {
    validator = (typeof validator === 'function') ? validator : () => true;

    if (validity && validity.valid && validator()) {
      this.onChange({[name]: value});
    }
  };

  handlerChangeName = (e) => {
    const {value = ''} = e.target || {};
    this.onChangeInput('name', e.target || {}, () => {
      return FILENAME_FILTER_SYMBOLS.split('')
        .reduce((all, symbol) => ~value.indexOf(symbol) ? false : all, true);
    });
  };

  handlerChangeCost = (e) => this.onChangeInput('cost', e.target || {});

  handlerChangeDescription = (e) => this.onChangeInput('description', e.target || {});

  onAddFiles(newFiles) {
    let {files = []} = this.uploadFiles;
    if (newFiles && newFiles.length) {
      files = _.uniqWith(_.concat(files, newFiles.map(f => new FileEntity(f))), (a, b) => String(a) === String(b));
      this.onChange({files});
    }
  }

  handlerAddFileDrop = (files) => {
    this.onAddFiles(files);
  };

  handlerAddFileDialog = () => {
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        properties: ['openFile', 'multiSelections']
      },
      (filePaths) => filePaths && filePaths.length && this.onAddFiles(filePaths)
    );
  };

  handlerRemoveFile = (index) => {
    const {files = []} = this.uploadFiles;
    files.splice(index, 1);
    this.onChange({files});
  };

  render() {
    const {validationError, validationErrorFile, size} = this.state;
    const {path = '', files = [], name = '', cost = '', description = ''} = this.uploadFiles;

    return (
      <DropContainer onDrop={this.handlerAddFileDrop}>
        <PopUpWithBg bg={bgMyUploads}>
          <ClosePopUp onClick={this.handlerCancel}>
            <span className="icon-cancel"/>
          </ClosePopUp>
          <PopUpTitle>{trans('popups.upload.UploadDetails')}</PopUpTitle>
          <Row>
            <HalfColumn>
              <UInput
                value={name}
                onChange={this.handlerChangeName}
                label={trans('popups.upload.Enter.torrent.name')}
                error={validationError && (!name) ?
                  trans('upload.error.torrentName') : validationErrorFile ?
                    trans('upload.error.torrentNameFileName') : null}
              />
            </HalfColumn>
            <HalfColumn>
              <FileCover>
                <UInput
                  pattern={UploadTorrent.pattern}
                  onChange={this.handlerChangeCost}
                  value={cost}
                  label={trans('popups.upload.Enter.Price')}
                  error={validationError && (!Number(cost)) ? trans('upload.error.torrentCost') : null}
                />
                <UfrInfoWrapper>
                  <Info description={trans('popups.upload.ufrInfo')}/>
                </UfrInfoWrapper>
              </FileCover>
            </HalfColumn>

            <FullColumn>
              <FileCover>
                <UInput
                  readOnly="readOnly"
                  disabled
                  value={path}
                  label={trans('popups.upload.Enter.choose.archive.path')}
                  error={validationError && (!path) ? trans(
                    'upload.error.torrentPath') : null}
                />
                <FileButton onClick={this.handlerSelectDestinationPath}/>
              </FileCover>
            </FullColumn>
            <FullColumn>
              <UTextarea
                value={description}
                onChange={this.handlerChangeDescription}
                label={trans('popups.upload.Enter.torrent.description')}
              />
            </FullColumn>

            <FileSelector
              validationError={validationError}
              selectedFiles={files}
              onAddFiles={this.handlerAddFileDialog}
              onRemoveFiles={this.handlerRemoveFile}
              fileSize={size}
            />
          </Row>
          <PopAction>
            <ThirdBtn
              title={trans('popups.upload.startUpload')}
              onClick={this.handlerCreate}
            />
          </PopAction>
        </PopUpWithBg>
      </DropContainer>
    );
  }

}

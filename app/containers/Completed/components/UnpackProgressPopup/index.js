import React, { PureComponent } from 'react';
import trans from '../../../../translations';
import { PopUp } from '../../../../components';
import {
  PopUpTitle,
  Progress,
  ProgressDescription,
  ProgressFull,
  ProgressItem,
  ProgressWrapper
} from '../../../Uploads/components/UploadsPage/style';
import { Row } from '../../../Downloads/components/style';
import SelectPathPopup from './SelectPathPopup';
import ProgressPopup from '../../../../components/ProgressPopup';

export default class UnpackProgressPopup extends PureComponent {
  render() {
    const {unpackTorrentProgress} = this.props;

    if (!(unpackTorrentProgress && unpackTorrentProgress.path)) {
      return (
        <SelectPathPopup {...this.props}/>
      );
    }

    if (!unpackTorrentProgress.files) {
      return (
        <ProgressPopup message={trans('details.ContractProcessingUnpack')}/>
      );
    }

    const {currentPercent, allPercent, file} = (unpackTorrentProgress || {});

    return (
      <PopUp>
        <PopUpTitle>{trans('popups.torrentdecrypt')}</PopUpTitle>
        <Row>
          <Progress>
            <ProgressDescription>
              <div>
                {trans('popups.torrentDecrypting')}
              </div>
              <div>
                {allPercent}%
              </div>
            </ProgressDescription>
            <ProgressWrapper>
              <ProgressFull
                style={{
                  width: `${allPercent}%`,
                  borderTopRightRadius: allPercent > 95 ? '.3em' : 0,
                  borderBottomRightRadius: allPercent > 95 ? '.3em' : 0
                }}
              />
            </ProgressWrapper>
          </Progress>
          <Progress>
            <ProgressDescription>
              <div>
                {trans('Decrypting')}: <span>{file}</span>
              </div>
              <div>
                {currentPercent}%
              </div>
            </ProgressDescription>
            <ProgressWrapper>
              <ProgressItem
                style={{
                  width: `${currentPercent}%`,
                  borderTopRightRadius: currentPercent > 95 ? '.3em' : 0,
                  borderBottomRightRadius: currentPercent > 95 ? '.3em' : 0
                }}
              />
            </ProgressWrapper>
          </Progress>
        </Row>
      </PopUp>
    );
  }
}

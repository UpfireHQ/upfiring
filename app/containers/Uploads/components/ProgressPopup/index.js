import React from 'react';
import {
  FullColumn,
  PopUpSubtitle,
  PopUpTitle,
  Progress,
  ProgressDescription,
  ProgressFull,
  ProgressItem,
  ProgressWrapper
} from '../UploadsPage/style';
import trans from '../../../../translations';
import PopUp from '../../../../components/PopUp';
import LoadingCube from '../../../../components/LoadingCube';

export default class FirstEntrancePopup extends React.Component {

  get isProgress() {
    return Boolean(this.props && this.props.progress);
  }

  get ProgressBars() {
    const {currentPercent, allPercent, file} = (this.props && this.props.progress || {});

    return (
      <FullColumn>
        <Progress>
          <ProgressDescription>
            <div>
              {trans('popups.torrentEncrypting')}
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
              {trans('Encrypting')}: <span>{file}</span>
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
      </FullColumn>
    );
  }

  handlerAbortEncrypt = () => {

  };

  render() {
    const {title} = this.props;

    return (
      <PopUp>
        {(!this.isProgress) && (
          <FullColumn>
            <LoadingCube/>
          </FullColumn>
        )}
        <PopUpTitle>{title}</PopUpTitle>
        {(!this.isProgress) && (
          <PopUpSubtitle>
            {trans('popups.torrentGenerateSubtitle')}
          </PopUpSubtitle>
        )}
        {this.isProgress && this.ProgressBars}
      </PopUp>
    );
  }
}

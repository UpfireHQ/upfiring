import React from 'react';
import { Stub, StubBtnWrapper, StubLearnMore, StubSubTitle, StubTitle } from '../UploadsPage/style';
import { DropContainer } from '../../../../style/containers';
import trans from '../../../../translations';
import StubUploadButton from '../StubUploadButton';
import { SITE_DECRYPTION } from '../../../../constants';
import { shell } from 'electron';

export default class extends React.PureComponent {
  learnMore = (e) => {
    e.preventDefault();
    shell.openExternal(SITE_DECRYPTION);
  };

  render() {
    const {onDragFilesToTorrent, onClickAddFilesToTorrent} = this.props;

    return (
      <Stub>
        <DropContainer
          onDrop={onDragFilesToTorrent}
          disableClick
          activeClassName="active"
        >
          <StubTitle>
            {trans('stub.upload.title')}
          </StubTitle>
          <StubSubTitle>
            <p>{trans('stub.upload.subtitle')}</p>
            <p>{trans('stub.upload.subtitleMore')}</p>
          </StubSubTitle>
          <StubLearnMore>
            <a href="#" onClick={this.learnMore}>{trans('stub.upload.learMore')}</a>
          </StubLearnMore>
          <StubBtnWrapper>
            <StubUploadButton
              onClickAddFilesToTorrent={onClickAddFilesToTorrent}
            />
          </StubBtnWrapper>
        </DropContainer>
      </Stub>
    );
  }

}

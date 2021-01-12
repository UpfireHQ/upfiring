import React, { PureComponent } from 'react';
import { Stub, StubBtnWrapper, StubSubTitle, StubTitle } from '../style';
import trans from '../../../../translations';
import FourthButton from '../../../../components/Buttons/FourthBtn';
import { SITE_DECRYPTION } from '../../../../constants';

import { shell } from 'electron';

export default class EmptyListStub extends PureComponent {

  learnMore(e) {
    e.preventDefault();
    shell.openExternal(SITE_DECRYPTION);
  }

  render() {
    return (
      <Stub>
        <StubTitle>
          {trans('stub.completed.title')}
        </StubTitle>
        <StubSubTitle>
          <p>{trans('stub.completed.subtitle')}</p>
          <p>{trans('stub.completed.subtitleMore')}</p>
        </StubSubTitle>
        <StubBtnWrapper>
          <FourthButton
            onClick={(e) => this.learnMore(e)}
            title={trans('stub.upload.learMore')}
          />
        </StubBtnWrapper>
      </Stub>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActionsTwo, Stub, StubBtnWrapper, StubLearnMore, StubSubTitle, StubTitle } from '../WalletSection/style';
import trans from '../../../../translations';
import MainButton from '../../../../components/Buttons/MainBtn';
import SecondaryButton from '../../../../components/Buttons/SecondaryBtn';

class EmptyStub extends PureComponent {
  render() {
    return (
      <Stub key="empty">
        <StubTitle>
          {trans('stub.wallet.title')}
        </StubTitle>
        <StubSubTitle>
          <p>{trans('stub.wallet.subtitle')}</p>
          <p>{trans('stub.wallet.subtitleMore')}</p>
        </StubSubTitle>
        <StubLearnMore>
          <a
            href="#"
            onClick={this.learnMore}
          >
            {trans('stub.wallet.learnMore')}
          </a>
        </StubLearnMore>
        <StubBtnWrapper>
          <ActionsTwo>
            <MainButton
              onClick={() => this.handlerShowPromptAddWallet()}
              title={trans('stub.wallet.addWallet')}
            />
            <SecondaryButton
              onClick={() => this.handlerShowPromptCreateWallet()}
              title={trans('stub.wallet.createWallet')}
            />
          </ActionsTwo>
        </StubBtnWrapper>
      </Stub>
    );
  }
}

EmptyStub.propTypes = {};

export default EmptyStub;

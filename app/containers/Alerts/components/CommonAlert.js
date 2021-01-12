import React from 'react';
import { PopAction, PopUpDetails, PopUpTitle, Row } from '../../../components/confirmation';
import { PopUpSubTitle } from '../../../components/prompt/style';
import PopUp from '../../../components/PopUp';
import ClosePopUp from '../../../components/Buttons/ClosePopUpBtn';
import MainButton from '../../../components/Buttons/MainBtn';
import trans from '../../../translations';

export class CommonAlert extends React.PureComponent {
  get alert() {
    const {commonAlerts} = this.props;

    return commonAlerts && commonAlerts[0];
  }

  get title() {
    return (this.alert && this.alert.title && (<PopUpTitle>{this.alert.title}</PopUpTitle>)) || null;
  }

  get message() {
    const message = this.alert && this.alert.message;

    if (!message) {
      return null;
    }

    const messages = Array.from(Array.isArray(message) ? message : [message])
      .map((value, index) => (<div key={index}>{value}</div>));

    return (
      <Row>
        {this.title
          ? (<PopUpDetails>{messages}</PopUpDetails>)
          : (<PopUpSubTitle>{messages}</PopUpSubTitle>)
        }
      </Row>
    );
  }

  render() {
    if (!this.alert) {
      return null;
    }

    const {onCloseAlert} = this.props;

    return (
      <PopUp>
        <ClosePopUp onClick={onCloseAlert}/>
        {this.title}
        {this.message}
        <Row>
          <PopAction>
            <MainButton
              onClick={onCloseAlert}
              title={trans('Ok')}
            />
          </PopAction>
        </Row>
      </PopUp>
    );
  }
}

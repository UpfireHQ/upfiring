/**
 * Created by maximnord on 2/23/18.
 */
import React from 'react';
import { Label, PassWInput, PassWTextArea, PopAction, PopButton, PopUpTitle, Row, SmallPopUp } from './style';
import ClosePopUp from '../Buttons/ClosePopUpBtn';
import trans from '../../translations';

export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      value: '',
      password: '',
      valid: true,
      validationText: '',
      showOnlyPassword: false,
      passwordValid: true,
      privateKeyValidation: true
    };
    this.handlerResult = this.handlerResult.bind(this);
    this.handlerInputText = this.handlerInputText.bind(this);
    this.handlerInputPassword = this.handlerInputPassword.bind(this);
  }

  componentWillMount() {
    const {show, showOnlyPassword, privateKeyValidation = true, passwordValid} = this.props;
    this.setState({
      showConfirmation: show,
      privateKeyValidation,
      showOnlyPassword,
      passwordValid
    });
  }

  componentWillReceiveProps(newProps) {
    const {
      show,
      validationText = '',
      valid = true,
      showOnlyPassword,
      privateKeyValidation = true,
      passwordValid = true
    } = newProps;
    this.setState({
      showConfirmation: show,
      valid,
      validationText,
      showOnlyPassword,
      privateKeyValidation,
      passwordValid
    });
  }

  handlerInputText(e) {
    if (e.target.validity.valid) {
      this.setState({invalid: true, value: e.target.value});
    }
  }

  handlerInputPassword(e) {
    if (e.target.validity.valid) {
      this.setState({invalid: true, password: e.target.value});
    }
  }

  handlerResult(result) {
    const {onClick} = this.props;
    const {password, value, showOnlyPassword} = this.state;
    if (!result) {
      onClick(result);
    } else {
      let errors = false;
      if (showOnlyPassword) {
        if (password === '') {
          this.setState({passwordValid: false});
          errors = true;
        }
      } else {
        if (value === '') {
          errors = true;
          this.setState({invalid: false});
        }
      }
      if (!errors) {
        onClick(result, {password, value});
      }
    }
  }

  render() {
    const {
      value,
      password,
      showOnlyPassword,
      valid,
      privateKeyValidation,
      passwordValid
    } = this.state;
    const {pattern = null, validMessage = '', textArea = false, textAreaPlaceHolder = ''} = this.props;
    let ValidationMessage = null;
    if (!valid) {
      ValidationMessage = (
        <Label
          style={
            {color: '#ED362B'}
          }
          key="1"
        >
          {textArea ? validMessage : trans('Prompt.value.Empty')}
        </Label>
      );
    }
    if (!privateKeyValidation) {
      ValidationMessage = (
        <Label
          style={
            {color: '#ED362B'}
          }
          key="1"
        >
          {trans('Prompt.value.PrivateKeyWrong')}
        </Label>
      );
    }
    let Form = null;
    let PasswordValidation = null;
    if (!passwordValid) {
      PasswordValidation = (
        <Label
          style={
            {color: '#ED362B'}
          }
          key="6"
        >
          {trans('Prompt.value.passwordValidation')}
        </Label>
      );
    }
    const Password = (
      <Row key="5">
        <PassWInput
          value={password}
          pattern={pattern}
          name="password"
          type="password"
          onChange={(e) => this.handlerInputPassword(e)}
        />
      </Row>
    );
    const Value = textArea ? (
      <Row key="3">
        <PassWTextArea
          value={value}
          name="input"
          onChange={(e) => this.handlerInputText(e)}
        >
          {value}
        </PassWTextArea>
      </Row>
    ) : (
      <Row key="3">
        <PassWInput
          value={value}
          pattern={pattern}
          name="input"
          type="text"
          onChange={(e) => this.handlerInputText(e)}
        />
      </Row>
    );
    if (showOnlyPassword) {
      Form = [
        <Label key="4">{trans('Prompt.value.Password')}</Label>,
        PasswordValidation,
        Password
      ];
    } else {
      Form = [
        <Label key="2">{textAreaPlaceHolder || trans('Prompt.value.Amount')}</Label>,
        ValidationMessage,
        Value,
        <Label key="4">{trans('Prompt.value.Password')}</Label>,
        PasswordValidation,
        Password
      ];
    }

    return (
      <SmallPopUp>
        <ClosePopUp onClick={() => this.handlerResult(false)}/>
        <PopUpTitle>{this.props.children}</PopUpTitle>
        {Form}
        <Row>
          <PopAction>
            <PopButton
              additional
              onClick={() => this.handlerResult(false)}>
              {trans('cancel')}
            </PopButton>
            <PopButton
              secondary
              onClick={() => this.handlerResult(true)}>
              {trans('Ok')}
            </PopButton>
          </PopAction>
        </Row>
      </SmallPopUp>
    );
  }
}

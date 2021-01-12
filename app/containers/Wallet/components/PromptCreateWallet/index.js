import React from 'react';
import trans from '../../../../translations';
import { PopAction, Row, RowCenter } from '../../../../components/prompt/style';
import UInput from '../../../../components/InputText';
import SecondaryButton from '../../../../components/Buttons/SecondaryBtn';

export class PromptCreateWallet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      password: '',
      valid: true,
      validationText: '',
      passwordValid: true,
      passwordErrorText: ''
    };
    this.handlerResult = this.handlerResult.bind(this);
    this.handlerInputPassword = this.handlerInputPassword.bind(this);
  }

  componentWillMount() {
    const {show, passwordValid} = this.props;
    this.setState({
      showConfirmation: show,
      passwordValid
    });
  }

  componentWillReceiveProps(newProps) {
    const {
      show,
      validationText = '',
      valid = true,
      passwordValid = true
    } = newProps;
    this.setState({
      showConfirmation: show,
      valid,
      validationText,
      passwordValid
    });
  }

  handlerInputPassword(e) {
    if (e.target.validity.valid) {
      this.setState({invalid: true, password: e.target.value});
    }
  }

  handlerResult() {
    const {onClick} = this.props;
    const {password} = this.state;
    let errors = false;
    if (password === '') {
      this.setState({
        passwordValid: false,
        passwordErrorText: trans('Prompt.value.PasswordNotCorrect')
      });
      errors = true;
    } else if (password.length < 6) {
      this.setState({
        passwordValid: false,
        passwordErrorText: trans('Prompt.value.PasswordIsShort')
      });
      errors = true;
    }
    if (!errors) {
      onClick(password);
    }
  }

  render() {
    const {password, passwordValid, passwordErrorText} = this.state;

    return (
      <div>
        <RowCenter>
          <UInput
            value={password}
            onChange={(e) => this.handlerInputPassword(e)}
            label={trans('Prompt.value.createPassword')}
            type="password"
            name="password"
            error={!passwordValid ? passwordErrorText : null}
            centerContent
          />
        </RowCenter>
        <Row>
          <PopAction>
            <SecondaryButton
              onClick={() => this.handlerResult()}
              title={trans('wallet.createNewWallet')}
            />
          </PopAction>
        </Row>
      </div>
    );
  }
}

import React from 'react';
import { Error, EyeIcon, InputFix, Label, UInput } from './style';

export default class extends React.PureComponent {

  handleEyeIconClick = () => {
    this.textInput.type === 'text'
      ? this.textInput.type = 'password'
      : this.textInput.type = 'text';
  };

  render() {
    const {label, error = false, value, centerContent = false, type, ...props} = this.props;
    return (
      <InputFix className={value !== '' ? 'is-not-empty' : ''}>
        <UInput
          {...props}
          type={type}
          value={value}
          className={centerContent ? 'to-center' : ''}
          getRef={(input) => {
            this.textInput = input;
          }}
        />
        {!error && (
          <Label
            onClick={() => this.textInput.focus()}
            className={centerContent ? 'to-center' : ''}
          >
            {label}
          </Label>
        )}
        {error &&
        <Error className={centerContent ? 'to-center' : ''}>{error}</Error>}
        {type === 'password' ? (
          <EyeIcon onClick={this.handleEyeIconClick}>
            <span className="icon-ico-eye-inactive"/>
          </EyeIcon>
        ) : null}
      </InputFix>
    );
  }
}

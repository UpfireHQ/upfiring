import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const InputFix = styled.div`
  position: relative;
  max-width: 100%;
  display: flex;
  &.is-not-empty {
    label {
      top: .8em;
      font-size: ${fonts.smallSize};
      left: 2.5em;
    }
  }
`;

const UTextarea = styled(({ getRef, ...props }) => <textarea {...props} ref={getRef} />)`
  padding: 2em .5em 0 2em;
  background-color: ${colors.inputFormBackground};
  border: none;
  font-size: ${fonts.standardSize};
  color: ${colors.titleWhite};
  width:100%;
  height: 4em;
  border-radius: 4px;
  outline: none;
  font-family: ${fonts.familyMain};
  background-image: linear-gradient(${colors.mainBlue}, ${colors.mainBlue}), linear-gradient(transparent, transparent);
  background-repeat: no-repeat;
  background-position: center top,center calc(100% - 1px);
  background-size: 0 1px, 100% 1px;
  transition: background 0s ease-out;
  &:focus {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-size: 100% 1px, 100% 1px;
    transition-duration: .4s;
    ~ label {
      top: .8em;
      font-size: ${fonts.smallSize};
      left: 2.5em;
    }
  }
`;

const Label = styled.label`
  color: ${colors.inputLabel};
  position: absolute;
  left: 2em;
  top: calc(50% - .5em);
  font-size: ${fonts.standardSize};
  transition: font-size 0.3s ease, top .3s ease, left .3s ease;
  &:hover {
    cursor: text;
  }
`;

const Error = styled.span`
  color: ${colors.lightRed};
  position: absolute;
  left: 2.5em;
  top: .8em;
  font-size: ${fonts.smallSize};
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { label, error = false, value } = this.props;
    return (
      <InputFix className={value !== '' ? 'is-not-empty' : ''}>
        <UTextarea
          type="text"
          {...props}
          getRef={(textarea) => {
            this.textarea = textarea;
          }}
        />
        {!error && <Label onClick={() => this.textarea.focus()}>{label}</Label>}
        {error && <Error>{error}</Error>}
      </InputFix>
    );
  }
}
import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import trans from '../../translations';

const InputWrapper = styled.div`
  position: relative;
  padding: 0;
`;

const SearchInput = styled.input`
  border-radius: 4px;
  background-color: ${colors.inputBackground};
  border: none;
  padding: 12px 38px 12px 38px;
  width: 136px;
  color: ${colors.fontSecondary};
  outline: none;
  font-family: ${fonts.familyMain};
  font-size: ${fonts.minStandartSize};
  &:focus {
    border: none;
    background-color: ${colors.inputBackgroundFocus};
    color: ${colors.titleWhite};
    ~ .icon-ico-search {
      color: ${colors.titleWhite};
    }
  };
  &::placeholder {
    color: ${colors.fontSecondary};
    font-family: ${fonts.familyMain};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  color: ${colors.fontSecondary};
  left: 12px;
  top: 12px;
  font-size: 14px;
`;

const CloseIconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: ${colors.fontSecondary};
  left: 11px;
  top: 11px;
  width: 16px;
  height: 16px;
  background-color: ${colors.fontPrimary};
  border-radius: 50%;
  cursor: pointer;
`;

const CloseIcon = styled.span`
  color: ${colors.mainBlack};
  font-size: .8em;
`;

export default class extends React.PureComponent {

  handleChange = () => event => {
    const {onChange} = this.props;
    onChange(event);
  };

  handlerCleanInput = () => {
    const {onClearInput} = this.props;
    onClearInput();
  };

  render() {
    const {searchString, ...props} = this.props;
    return (
      <InputWrapper>
        <SearchIcon className="icon-ico-search"/>
        <SearchInput
          {...props}
          placeholder={trans('Upload.SearchPlaceholder')}
          onChange={this.handleChange()}
          value={searchString}
        />
        {searchString.length > 0 && (
          <CloseIconWrapper
            className="icon-cancel-wrapper"
            onClick={this.handlerCleanInput}
          >
            <CloseIcon className="icon-cancel"/>
          </CloseIconWrapper>
        )}
      </InputWrapper>
    );
  }
}

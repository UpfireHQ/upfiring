import styled from 'styled-components';
import colors from './colors';

export const LinkButton = styled.button`
  display: inline-block;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: none;
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  background-color: transparent;
  color: ${colors.thirdBtn};
  text-decoration: none;
  &:hover {
    color: ${colors.mainBlueHover};
  }
  &[disabled],
  &:disabled {
    color: ${colors.defaultBtnDisabled} !important;
  }
`;

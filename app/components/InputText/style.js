import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

export const InputFix = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  height: 4.3em;
  &.is-not-empty {
    label {
      top: .8em;
      font-size: ${fonts.smallSize};
      left: 2.5em;
    }
  }
`;

export const UInput = styled(({getRef, ...props}) => <input {...props} ref={getRef}/>)`
  padding: .85em 2em 0 1.8em;
  background-color: ${colors.inputFormBackground};
  border: none;
  font-size: ${fonts.moreStadartSize};
  color: ${colors.titleWhite};
  width: 100%;
  border-radius: 4px;
  outline: none;
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
  &.to-center {
    text-align: center;
    &:focus {
      ~ label {
        left: 0;
      }
    }
  }
  &::placeholder {
    padding-bottom: .5em;
    color: ${colors.inputLabel};
  }
  &::selection { background: ${colors.mainBlue}; }
`;

export const Label = styled.label`
  color: ${colors.inputLabel};
  position: absolute;
  left: 2em;
  top: calc(50% - .5em);
  font-size: ${fonts.standardSize};
  transition: font-size 0.3s ease, top .3s ease, left .3s ease;
  &.to-center {
    left: 0 !important;
    width: 100%;
    text-align: center;
  }
  &:hover {
    cursor: text;
  }
`;

export const Error = styled.span`
  color: ${colors.lightRed};
  position: absolute;
  left: 2.5em;
  top: .8em;
  font-size: ${fonts.smallSize};
  &.to-center {
    left: 0;
    width: 100%;
    text-align: center;
  }
`;

export const EyeIcon = styled.div`
  position: absolute;
  right: 1.5em;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > span {
    color: ${colors.inputLabel};
    font-size: ${fonts.bigSize};
  }
  &:hover {
    > span {
      color: ${colors.secondaryBlueHover};
    }
  }
;`;

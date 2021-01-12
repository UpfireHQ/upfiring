import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import download from '../../assets/icons/ico-wallet-download.svg';
import downloadHover from '../../assets/icons/ico-wallet-download-hover.svg';
import transactions from '../../assets/icons/ico-transactions.svg';
import transactionsHover from '../../assets/icons/ico-transactions-hover.svg';
import withdraw from '../../assets/icons/ico-withdraw.svg';
import withdrawHover from '../../assets/icons/ico-withdraw-hover.svg';
import replenish from '../../assets/icons/ico-replenish.svg';
import replenishHover from '../../assets/icons/ico-replenish-hover.svg';
import closeIcon from '../../assets/icons/ico-cross.svg';

const Button = styled.button`
  color: ${colors.mainBlue};
  text-transform: none;
  background-color: inherit;
  box-shadow: none;
  font-family: ${fonts.familyMain};
  padding: 0;
  min-height: 24px;
  border: none;
  cursor: pointer;
  font-size: ${fonts.standardSize};
  display: flex;
  align-items: center;
  outline: none;
  &:hover {
    background-color: inherit;
    color: ${colors.mainBlueHover};
    > .download {
      background-image: url(${downloadHover});
    }
    > .transactions {
      background-image: url(${transactionsHover});
    }
    > .withdraw {
      background-image: url(${withdrawHover});
    }
    > .replenish {
      background-image: url(${replenishHover});
    }
  }
  &[disabled],
  &:disabled {
    color: ${colors.defaultBtnDisabled} !important;
    > .disabled {
      background-image: url(${closeIcon});
      width: 16px;
      height: 16px;
    }
  }
  > span {
    display: inline-block;
    margin-right: 5px;
    background-repeat: no-repeat;
  }
  > .download {
    background-image: url(${download});
    width: 15px;
    height: 14px;
  }
  > .transactions {
    background-image: url(${transactions});
    width: 15px;
    height: 14px;
  }
  > .withdraw {
    background-image: url(${withdraw});
    width: 16px;
    height: 16px;
  }
  > .replenish {
    background-image: url(${replenish});
    width: 16px;
    height: 16px;
  }
`;

export default class extends React.PureComponent {
  render() {
    const {disabled = false, iconClass, onClick, title} = this.props;
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
      >
        <span className={iconClass || ''}/>
        {title}
      </Button>
    );
  }
}

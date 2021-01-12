import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import trans from '../../translations';
import searchIcon from '../../assets/icons/ico-search-no-results.svg';

const NoTorrents = styled.td`
  vertical-align: bottom;
`;

const NoTorrentsIcon = styled.div`
  text-align: center;
  margin-bottom: 1em;
  > span {
    display: inline-block;
    background-image: url(${searchIcon});
    width: 80px;
    height: 80px;
  }
`;

const NoTorrentsText = styled.div`
  text-align: center;
  color: ${colors.greyIcon};
  font-weight: 300;
  font-size: ${fonts.veryLargeSize};
  padding-bottom: .7em;
`;

const NoTorrentsAction = styled.div`
  text-align: center;
`;

const Reset = styled.a`
  color: ${colors.mainBlue};
  font-size: ${fonts.middleSize};
  &:hover {
    color: ${colors.secondaryBlueHover};
  }
`;

const NoTorrentsWrapper = styled.div`
  &.absolute {
    position: absolute;
    width: 100%;
    padding: 4em 2em;
  }
`;

export default class extends React.PureComponent {

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {onClick} = this.props;
    onClick && onClick();
  };

  render() {
    const {colSpan, absolute = false} = this.props;
    return (
      <tr className="empty">
        <NoTorrents colSpan={colSpan}>
          <NoTorrentsWrapper className={absolute ? 'absolute' : ''}>
            <NoTorrentsIcon>
              <span/>
            </NoTorrentsIcon>
            <NoTorrentsText>
              {trans('Upload.searchResultEmpty')}
            </NoTorrentsText>
            <NoTorrentsAction>
              <Reset href="#" onClick={this.handleClick}>
                {trans('Upload.searchReset')}
              </Reset>
            </NoTorrentsAction>
          </NoTorrentsWrapper>
        </NoTorrents>
      </tr>
    );
  }
}

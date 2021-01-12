import React, { Component } from 'react';
import moment from 'moment';
import { PageHead } from '../../../../style/containers';
import { DefaultBtn, HistoryColumn, HistorySection, TransactionsTable, WalletPageWrapper } from './style';
import trans from '../../../../translations';
import WalletGraphs from '../GraphsSection';
import WalletTop from '../WalletSection';
import EmptyTorrentsSearch from '../../../../components/EmptyTorrentsSearch/index';
import { ufrFormat } from '../../../../utils/math';
import SearchComponent from '../../../../components/SearchComponent/index';
import EthClient from '../../../../blockchain/client';

const {shell} = require('electron');

export default class WalletPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      historyFiltered: [],
      showHistory: false,
      withSearch: false,
      searchString: ''
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props && (state.address !== props.address)) {
      const {onCheckBalances, onCheckHistory, onCheckTotals, address, loadingChangeBalance, loadingHistory} = props;
      onCheckBalances && onCheckBalances(address);
      onCheckTotals && onCheckTotals(address);
      onCheckHistory && onCheckHistory({address, loadingChangeBalance, loadingHistory});
      return {address};
    }

    return null;
  }

  componentDidMount() {
    const {onGasPrice} = this.props;
    onGasPrice && onGasPrice();
  }

  fromWei = (value) => EthClient.instance.fromWei(value);

  getHandlerTxUrl = (hash) => (event) => {
    event.preventDefault();
    return hash && shell.openExternal(EthClient.getTransactionUrl(hash));
  };

  handlerChangeSearchInput = (e) => {
    const {history} = this.props;
    let {searchString, withSearch, historyFiltered} = this.state;
    searchString = e ? (e.target.value).toLowerCase() : searchString;

    if (searchString.length > 0) {
      withSearch = true;
      historyFiltered = history.filter(item => item.e.blockNumber.toString().indexOf(searchString) !== -1);
    } else {
      withSearch = false;
      historyFiltered = history;
    }

    this.setState({searchString, withSearch, historyFiltered});
  };

  handlerClearSearchInput = () => {
    const {history} = this.props;

    this.setState({
      withSearch: false,
      historyFiltered: history,
      searchString: ''
    });
  };

  handlerShowHistory = () => {
    this.setState({showHistory: true});
  };

  handlerHideHistory = () => {
    this.setState({showHistory: false, withSearch: false, searchString: ''});
  };

  renderTransactionHistory() {
    const {history} = this.props;
    const {withSearch, historyFiltered, searchString} = this.state;
    const list = Array.from((withSearch ? historyFiltered : history) || []);

    return (
      <HistorySection>
        <PageHead>
          <div className="search">
            <SearchComponent
              onChange={(e) => this.handlerChangeSearchInput(e)}
              onClearInput={(e) => this.handlerClearSearchInput(e)}
              searchString={searchString}
            />
          </div>
          <div className="title">
            {trans('wallet.titles.TransactionsHistory')}
          </div>
          <div className="buttons">
            <DefaultBtn onClick={this.handlerHideHistory}>
              {trans('wallet.titles.MyWallet')}
            </DefaultBtn>
          </div>
        </PageHead>
        <TransactionsTable>
          <thead>
          <tr>
            <th>{trans('table.#')}</th>
            <HistoryColumn>{trans('wallet.transactions.ID')}</HistoryColumn>
            <HistoryColumn>{trans('wallet.transactions.Type')}</HistoryColumn>
            <HistoryColumn>{trans('wallet.transactions.Amount')}</HistoryColumn>
            <HistoryColumn>
              {trans('wallet.transactions.CompletedOn')}
            </HistoryColumn>
            <HistoryColumn>{trans('wallet.transactions.Status')}</HistoryColumn>
          </tr>
          </thead>
          <tbody>
          {list && list.length ? list.map((e, i) => {
            if (!(e && e.e && e.block)) {
              return;
            }
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.e.blockNumber}</td>
                <td>{e.e.event}</td>
                <td>
                  {ufrFormat(this.fromWei(e.e.returnValues._amount))} {trans('popups.upload.UFR')}
                </td>
                <td>
                  {moment(e.block.timestamp * 1000).format('L LT')}
                </td>
                <td>
                  <a href="javascript: void(0)" onClick={this.getHandlerTxUrl(e.e.transactionHash)}>
                    {trans('history.result')}
                  </a>
                </td>
              </tr>
            );
          }) : (
            <EmptyTorrentsSearch
              colSpan={6}
              onClick={this.handlerClearSearchInput}
              absolute
            />
          )}
          </tbody>
        </TransactionsTable>
      </HistorySection>);
  }

  render() {
    const {showHistory} = this.state;
    const {history, ethBalance, tokenBalance, availableBalance} = this.props;

    if (showHistory && history && history.length > 0) {
      return this.renderTransactionHistory();
    }

    return (
      <WalletPageWrapper>
        <WalletTop
          {...this.props}
          ethBalance={this.fromWei(ethBalance)}
          tokenBalance={this.fromWei(tokenBalance)}
          availableBalance={this.fromWei(availableBalance)}
          history={history && history.length}
          onShowHistory={this.handlerShowHistory}
        />
        <WalletGraphs {...this.props} />
      </WalletPageWrapper>
    );
  }
}

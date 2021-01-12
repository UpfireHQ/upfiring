import React, { Component } from 'react';
import {
  DeletedTorrent,
  DownloadsTable,
  EarnedCell,
  FilesCell,
  GotItLink,
  GotItLinkWrapper,
  NameCell,
  PageWrapper,
  DataCell,
  SeedesCell,
  SizeCell,
  TorrentName,
  TrClick
} from '../style';
import { PageHead } from '../../../../style/containers';
import trans from '../../../../translations';
import { EmptyTorrentsSearch, SearchComponent, UnpuckBtn } from '../../../../components';
import { bytesToSize } from '../../../../utils/bytesformat';
import EmptyListStub from '../EmptyListStub';
import Details from '../Details';
import UnpuckTorrent from '../UnpuckTorrent';
import ProgressPopup from '../../../../components/ProgressPopup';
import UnpackProgressPopup from '../UnpackProgressPopup';
import UploadTorrentDetails from '../../../Uploads/components/UploadTorrentDetails';

const {shell} = require('electron');

export default class FinishedPage extends Component {
  state = {
    selected: 0,
    search: '',
    torrents: []
  };

  static getDerivedStateFromProps(props, state) {
    const {torrents = [], webTorrent = {}} = props;
    const search = String(state.search).toLowerCase();

    const filteredTorrent = Boolean(search)
      ? torrents.filter(t => ~String(t.name).toLowerCase().search(search))
      : torrents;

    return {
      torrents: filteredTorrent.map(t => Object.assign(t, webTorrent[t.infoHash]))
    };
  }

  componentDidMount() {
    const {onCheckCompletedFiles, torrents = []} = this.props;
    onCheckCompletedFiles && onCheckCompletedFiles({torrents});
  }

  get isEmpty() {
    const {torrents} = this.props;
    return !(torrents && torrents.length);
  }

  get isUnpackTorrent() {
    return Boolean(this.props.unpackTorrent);
  }

  get selected() {
    const {selected, torrents} = this.state;
    return torrents[selected];
  }

  handlerSelect = (item) => {
    this.setState({selected: item || 0});
  };

  handlerChangeSearchInput = (e) => {
    const search = String(e.target && e.target.value);
    this.setState({search, selected: 0});
  };

  handlerClearSearchInput = () => {
    this.setState({search: '', selected: 0});
  };

  handlerClickUnpack = (torrent) => {
    const {onUnpackTorrent, webTorrent, wallet} = this.props;
    const {infoHash} = torrent;
    onUnpackTorrent && onUnpackTorrent({torrent: webTorrent[infoHash], wallet});
  };

  handlerShowFilesInFolder(torrent) {
    if (!(torrent && torrent.decoded)) {
      return;
    }

    shell.showItemInFolder(torrent.decoded);
  }

  get TorrentInfo() {
    const {onDeleteCompletedTorrent, onResumeTorrent, onPauseTorrent} = this.props;
    return (
      <Details
        torrent={this.selected}
        onDeleteTorrent={onDeleteCompletedTorrent}
        onResumeTorrent={onResumeTorrent}
        onPauseTorrent={onPauseTorrent}
      />);

  }

  get TorrentsList() {
    const {torrents, selected} = this.state;

    return torrents.map((torrent, i) => {
      const color = (torrent.deleting || torrent.failed) ? {color: DeletedTorrent} : {};
      const seeded = Number(torrent.uploaded) + Number(torrent.seeded);

      return (
        <TrClick
          onClick={() => this.handlerSelect(i)}
          style={color}
          key={i}
          className={((selected === i) && 'active') || ''}
        >
          <TorrentName>
            {torrent.name}
          </TorrentName>
          <td>{trans((torrent && torrent.paused) ? 'table.Paused' : 'table.Seeding')}</td>
          <td>{torrent.price} {trans('popups.upload.UFR')}</td>
          <td>{bytesToSize(torrent.size)}</td>
          <td>{seeded && bytesToSize(seeded) || '--'}</td>
          <td>{(torrent && torrent.seeds) || '--'}</td>
          <GotItLinkWrapper>
            {torrent.decoded
              ? (
                <GotItLink onClick={() => this.handlerShowFilesInFolder(torrent)}>
                  {trans('Completed.gotIt')}
                </GotItLink>
              ) : (
                torrent.failed
                  ? trans('Download.Deleted')
                  : (
                    <UnpuckBtn
                      onClick={() => this.handlerClickUnpack(torrent)}
                      title={trans('Completed.getFile')}
                    />
                  )
              )
            }
          </GotItLinkWrapper>
        </TrClick>
      );
    });
  }

  get EmptyTorrentsSearch() {
    return (
      <EmptyTorrentsSearch
        colSpan={6}
        onClick={this.handlerClearSearchInput}
      />
    );
  }

  get EmptyRows() {
    const {torrents} = this.state;
    let emptyTrs = null;
    if (torrents.length < 10) {
      emptyTrs = [];
      for (let j = 0; j < 9 - torrents.length; j++) {
        emptyTrs.push(
          <tr
            key={torrents.length + j}
            className="withoutHover"
          >
            <td colSpan="7"/>
          </tr>
        );
      }
    }

    return emptyTrs;
  }

  render() {
    if (this.isUnpackTorrent) {
      const {onRouteToWallet, wallet} = this.props;

      if (wallet && wallet.address) {
        return (
          <UnpuckTorrent {...this.props}/>
        );
      }

      onRouteToWallet && onRouteToWallet();
    }

    if (this.isEmpty) {
      return (
        <EmptyListStub/>
      );
    }

    const {search, torrents} = this.state;
    const {unpackTorrentStatus, unpackTorrentProgress, webTorrent} = this.props;

    return [
      (
        <PageWrapper key="FinishedPage">
          <PageHead>
            <div className="search">
              <SearchComponent
                onChange={this.handlerChangeSearchInput}
                onClearInput={this.handlerClearSearchInput}
                searchString={search}
              />
            </div>
            <div className="title">
              {trans('Completed.title')}
            </div>
            <div className="buttons"/>
          </PageHead>

          <DownloadsTable>
            <thead>
            <tr>
              <NameCell>{trans('table.Name')}</NameCell>
              <DataCell>{trans('table.Status')}</DataCell>
              <DataCell>{trans('table.Price')}</DataCell>
              <DataCell>{trans('table.Size')}</DataCell>
              <DataCell>{trans('table.Seeded')}</DataCell>
              <DataCell>{trans('table.Seeders')}</DataCell>
              <DataCell>{trans('table.Files')}</DataCell>
            </tr>
            </thead>
            <tbody>
            {torrents.length ? this.TorrentsList : this.EmptyTorrentsSearch}
            {this.EmptyRows}
            </tbody>
          </DownloadsTable>
          {this.selected && this.TorrentInfo}
        </PageWrapper>
      ),
      (unpackTorrentStatus && webTorrent[unpackTorrentStatus] && (
        <ProgressPopup
          key="unpackTorrentStatus"
          message={trans('details.ContractProcessingUnpack')}
          details={(webTorrent[unpackTorrentStatus].name)}
        />
      )),
      (unpackTorrentProgress && (
        <UnpackProgressPopup key="unpackTorrentProgress" {...this.props}/>
      ))
    ];
  }
}

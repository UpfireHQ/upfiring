import React, { PureComponent } from 'react';
import moment from 'moment';
import EmptyListStub from '../EmptyListStub';
import UploadTorrent from '../UploadTorrent';
import UploadProgressPopup from '../ProgressPopup';
import UploadTorrentDetails from '../UploadTorrentDetails';
import { PageHead } from '../../../../style/containers';
import { CreateDate, DataCell, DeletedTorrent, NameTable, PageWrapper, TorrentName, UploadsTable } from './style';
import trans from '../../../../translations';
import SearchComponent from '../../../../components/SearchComponent';
import EmptyTorrentsSearch from '../../../../components/EmptyTorrentsSearch';
import UploadButton from '../UploadButton';
import { TS_GENERATION_ENCRYPTED, TS_GENERATION_TORRENT, TS_SET_COSTS, TS_STATUS_DELETED } from '../../../../constants';
import { FileEntity } from '../../../../utils/file';
import { bytesToSize } from '../../../../utils/bytesformat';

export default class UploadsPage extends PureComponent {
  state = {
    selected: 0,
    search: '',
    torrents: []
  };

  get isEmpty() {
    const {torrents} = this.props;
    return !(torrents && torrents.length);
  }

  get isUploadTorrent() {
    return Boolean(this.props.uploadFiles);
  }

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

  get selected() {
    const {selected, torrents} = this.state;
    return torrents[selected];
  }

  handlerUploadFiles = (files) => {
    const {onUploadTorrent, onRouteToWallet, wallet} = this.props;

    if (!(wallet && wallet.address)) {
      onRouteToWallet && onRouteToWallet();
    }

    files = files && files.length && files.map(f => new FileEntity(f));

    onUploadTorrent && onUploadTorrent({files});
  };

  handlerButtonUploadFiles = () => this.handlerUploadFiles();

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

  get EncryptionPopup() {
    const {generateTorrentStatus, generateTorrentProgress} = this.props;

    switch (generateTorrentStatus) {
      case TS_GENERATION_ENCRYPTED:
        return (
          <UploadProgressPopup
            key="ProgressPopup"
            title={trans('popups.fileencript')}
            progress={generateTorrentProgress}
          />
        );
      case TS_GENERATION_TORRENT:
        return (
          <UploadProgressPopup
            key="ProgressPopup"
            title={trans('popups.torrentGenerate')}
          />
        );
      case TS_SET_COSTS:
        return (
          <UploadProgressPopup key="ProgressPopup"/>
        );
    }

    return null;
  }

  get TorrentInfo() {
    const {onDeleteUploadTorrent, onResumeTorrent, onPauseTorrent} = this.props;

    return this.selected && (
      <UploadTorrentDetails
        torrent={this.selected}
        onDeleteUploadTorrent={onDeleteUploadTorrent}
        onResumeTorrent={onResumeTorrent}
        onPauseTorrent={onPauseTorrent}
      />
    );
  }

  get EmptyTorrentsSearch() {
    return (
      <EmptyTorrentsSearch
        colSpan={6}
        onClick={this.handlerClearSearchInput}
      />
    );
  }

  get TorrentsList() {
    const {selected, torrents} = this.state;

    return torrents.map((item, i) => {
      const color = Boolean(item[TS_STATUS_DELETED]) ? {color: DeletedTorrent} : {};
      //const seeded = item && Number(item.uploaded) + Number(item.seeded);
      return (
        <tr
          style={color}
          key={i}
          className={(selected === i) ? 'active' : ''}
          onClick={() => this.handlerSelect(i)}
        >
          <TorrentName>{item.name}</TorrentName>
          <td>{trans((item && item.paused) ? 'table.Paused' : 'table.Seeding')}</td>
          <td>{item && item.price} {trans('popups.upload.UFR')}</td>
          <td>{(item && item.size && bytesToSize(item.size)) || trans('Unknown')}</td>
          <td>{(item && item.peers) || '--'}</td>
          <td>{(item && item.seeds) || '--'}</td>
          <td>{(item && item.createdAt && moment(item.createdAt).format('L LT')) || '--/--/--'}</td>
        </tr>
      );
    });
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
    if (this.isUploadTorrent) {
      const {onRouteToWallet, wallet} = this.props;

      if (wallet && wallet.address) {
        return (
          <UploadTorrent {...this.props}/>
        );
      }

      onRouteToWallet && onRouteToWallet();
    }

    if (this.isEmpty) {
      return (
        <EmptyListStub
          onDragFilesToTorrent={this.handlerUploadFiles}
          onClickAddFilesToTorrent={this.handlerButtonUploadFiles}
        />
      );
    }

    const {search, torrents} = this.state;

    return [
      (
        <PageWrapper key="UploadPage">
          <PageHead>
            <div className="search">
              <SearchComponent
                onChange={this.handlerChangeSearchInput}
                onClearInput={this.handlerClearSearchInput}
                searchString={search}
              />
            </div>
            <div className="title">
              {trans('Upload.title')}
            </div>
            <div className="buttons">
              <UploadButton
                onClickAddFilesToTorrent={this.handlerButtonUploadFiles}
              />
            </div>
          </PageHead>

          <UploadsTable>
            <thead>
            <tr>
              <NameTable>{trans('table.Name')}</NameTable>
              <DataCell>{trans('table.Status')}</DataCell>
              <DataCell>{trans('table.Price')}</DataCell>
              <DataCell>{trans('table.Size')}</DataCell>
              <DataCell>{trans('table.Peers')}</DataCell>
              <DataCell>{trans('table.Seeders')}</DataCell>
              <CreateDate>{trans('table.Created')}</CreateDate>
            </tr>
            </thead>
            <tbody>
            {torrents.length ? this.TorrentsList : this.EmptyTorrentsSearch}
            {this.EmptyRows}
            </tbody>
          </UploadsTable>
          {this.selected && this.TorrentInfo}
        </PageWrapper>
      ),
      this.EncryptionPopup
    ];
  }
}

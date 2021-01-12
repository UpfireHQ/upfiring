import React, { PureComponent } from 'react';
import {
  DownloadedColumn,
  DownloadProgressBar,
  DownloadProgressValue,
  DownloadsTable,
  EtaColumn,
  NameCell,
  PageWrapper,
  ProgressCell,
  SizeColumn,
  SmallDownloadProgressCover,
  SpeedColumn,
  TorrentName,
  TrClick
} from '../style';
import { DefaultIconBtn, EmptyTorrentsSearch, SearchComponent } from '../../../../components';
import { PageHead } from '../../../../style/containers';
import colors from '../../../../style/colors';
import trans from '../../../../translations';
import Details from '../Details';
import { bytesToSize } from '../../../../utils/bytesformat';
import { convertMS } from '../../../../utils/timeconvert';
import { TORRENT_EXTENSION } from '../../../../constants';
import EmptyListStub from '../EmptyListStub';
import TorrentPopup from '../TorrentPopup';

export default class DownloadsPage extends PureComponent {
  state = {
    search: '',
    torrents: [],
    checkedAll: false,
    selected: 0
  };

  static getDerivedStateFromProps(props, state) {
    const {torrents = [], webTorrent = {}} = props;
    const search = String(state.search).toLowerCase();

    const filteredTorrent = Boolean(search)
      ? torrents.filter(t => ~String(t.name).toLowerCase().search(search))
      : torrents;

    return {
      torrents: filteredTorrent.map(t => Object.assign(t, webTorrent[t.infoHash])),
      checkedAll: filteredTorrent.every(t => t.checked)
    };
  }

  get isEmpty() {
    const {torrents} = this.props;
    return !(torrents && torrents.length);
  }

  get isNewDownload() {
    const {newDownload} = this.props;
    return Boolean(newDownload);
  }

  get selected() {
    const {selected, torrents} = this.state;
    return torrents[selected];
  }

  get checkedTorrents() {
    const {torrents} = this.state;
    const checked = torrents.filter(t => t.checked);

    return checked && checked.length ? checked : this.selected;
  }

  handlerSelectItem = (item) => {
    this.setState({selected: item || 0});
  };

  handlerButtonDownloadFiles = () => {
    const {onOpenDownloadTorrent} = this.props;
    onOpenDownloadTorrent && onOpenDownloadTorrent();
  };

  handlerDropDownloadFiles = (files) => {
    const {onDropDownloadTorrent} = this.props;
    onDropDownloadTorrent && onDropDownloadTorrent(files);
  };

  handlerChangeSearchInput = (e) => {
    const search = String(e.target && e.target.value);
    this.setState({search, selected: 0});
  };

  handlerClearSearchInput = () => {
    this.setState({search: '', selected: 0});
  };

  handlerCheckAll = (e) => {
    const {torrents} = this.state;
    const {checked} = e.target;
    const {onCheckDownloadTorrent} = this.props;
    const data = torrents.reduce((res, t) => Object.assign(res, {[t.infoHash]: checked}), {});
    onCheckDownloadTorrent && onCheckDownloadTorrent(data);
  };

  handlerCheckItem = (e, i) => {
    const {torrents} = this.state;
    const {checked} = e.target;
    const {onCheckDownloadTorrent} = this.props;
    const {infoHash} = torrents[i];
    const data = {[infoHash]: checked};
    onCheckDownloadTorrent && onCheckDownloadTorrent(data);
  };

  handlerClickMultiPlay = () => {
    const {onPlayDownloadTorrent} = this.props;
    onPlayDownloadTorrent && onPlayDownloadTorrent(this.checkedTorrents);
  };

  handlerClickMultiPause = () => {
    const {onPauseDownloadTorrent} = this.props;
    onPauseDownloadTorrent && onPauseDownloadTorrent(this.checkedTorrents);
  };

  handlerClickMultiRemove = () => {
    const {onDeleteDownloadTorrent} = this.props;
    onDeleteDownloadTorrent && onDeleteDownloadTorrent(this.checkedTorrents);
  };

  get Buttons() {
    const multiButtons = true;
    return [
      {className: 'icon-ico-play', onClick: this.handlerClickMultiPlay},
      {className: 'icon-ico-pause', onClick: this.handlerClickMultiPause},
      {className: 'icon-ico-remove', onClick: this.handlerClickMultiRemove}
    ].map((button, i) => {
      return (
        <DefaultIconBtn
          key={i}
          disabled={!multiButtons}
          iconClass={button.className}
          onClick={button.onClick}
        />
      );
    });
  }

  get DownloadList() {
    const {torrents, selected} = this.state;
    const {webTorrent} = this.props;

    return torrents.map((torrent, i) => {
      const {infoHash} = webTorrent;
      Object.assign(torrent, webTorrent[infoHash]);

      const styleProgressBar = {
        width: `${torrent.progress}%`,
        borderTopRightRadius: `${(torrent.progress > 95) ? 6 : 0}px`,
        borderBottomRightRadius: `${(torrent.progress > 95) ? 6 : 0}px`
      };

      const color = torrent.failed ? {cursor: 'pointer', color: colors.defaultBtnDisabled} : {};

      return (
        <TrClick
          onClick={() => this.handlerSelectItem(i)}
          style={color}
          key={i}
          className={((selected === i) && 'active') || ''}
        >
          {/*<CheckboxTdWrapper>*/}
          {/*<UCheckbox*/}
          {/*onChange={this.handlerCheckItem}*/}
          {/*checked={torrent.checked}*/}
          {/*index={i}*/}
          {/*/>*/}
          {/*</CheckboxTdWrapper>*/}
          <TorrentName>
            {torrent.name}
          </TorrentName>
          <td>
            <SmallDownloadProgressCover>
              <DownloadProgressValue>
                {torrent.paused ? trans('table.Stopped') : `${torrent.progress}%`}
              </DownloadProgressValue>
              <DownloadProgressBar style={styleProgressBar}/>
            </SmallDownloadProgressCover>
          </td>
          <td>{bytesToSize(torrent.size)}</td>
          <td>{bytesToSize(torrent.downloaded)}</td>
          <td>{bytesToSize(torrent.downloadSpeed, 0, 1)} </td>
          <td>{convertMS(torrent.timeRemaining) || '--'}</td>
        </TrClick>
      );
    });
  }

  get EmptySearch() {
    return (
      <EmptyTorrentsSearch
        colSpan={7}
        onClick={this.handlerClearSearchInput}
      />
    );
  }

  get EmptyRows() {
    const {torrents} = this.state;
    let emptyTrs = [];

    if (torrents.length < 10) {
      emptyTrs = [];
      for (let j = 0; j < 9 - torrents.length; j++) {
        emptyTrs.push(
          <tr
            key={torrents.length + j}
            className="withoutHover"
          >
            <td colSpan="8"/>
          </tr>
        );
      }
    }

    return emptyTrs;
  }

  get Details() {
    const {onDeleteDownloadTorrent} = this.props;
    return (
      <Details
        torrent={this.selected}
        onDeleteTorrent={onDeleteDownloadTorrent}
      />);
  }

  render() {
    if (this.isNewDownload) {
      const {newDownload, newDownloadStatus, onStartDownloadTorrent, onCancelDownloadTorrent} = this.props;
      return (
        <TorrentPopup
          torrents={newDownload}
          status={newDownloadStatus}
          onStartDownloadTorrent={onStartDownloadTorrent}
          onCancelDownloadTorrent={onCancelDownloadTorrent}
        />
      );
    }

    if (this.isEmpty) {
      return (
        <EmptyListStub
          onDragFilesToTorrent={this.handlerDropDownloadFiles}
          onClickAddFilesToTorrent={this.handlerButtonDownloadFiles}
        />
      );
    }

    const {torrents, search, checkedAll} = this.state;

    return (
      <PageWrapper
        key='downloads'
        accept={TORRENT_EXTENSION}
        onDrop={this.handlerDropDownloadFiles}
        disableClick
      >
        <PageHead>
          <div className="search">
            <SearchComponent
              onChange={this.handlerChangeSearchInput}
              onClearInput={this.handlerClearSearchInput}
              searchString={search}
            />
          </div>
          <div className="title">
            {trans('download.title')}
          </div>
          <div className="buttons">
            {/*{this.Buttons}*/}
          </div>
        </PageHead>

        <DownloadsTable>
          <thead>
          <tr>
            {/*<CheckboxCell>*/}
            {/*<UCheckbox*/}
            {/*onChange={this.handlerCheckAll}*/}
            {/*checked={checkedAll}*/}
            {/*/>*/}
            {/*</CheckboxCell>*/}
            <NameCell>{trans('table.FileName')}</NameCell>
            <ProgressCell>{trans('table.Progress')}</ProgressCell>
            <SizeColumn>{trans('table.Size')}</SizeColumn>
            <DownloadedColumn>{trans('details.Downloaded')}</DownloadedColumn>
            <SpeedColumn>
              <span className="icon-arrow-down2"/> {trans('table.Speed')}
            </SpeedColumn>
            <EtaColumn>{trans('table.ETA')}</EtaColumn>
          </tr>
          </thead>
          <tbody>
          {(torrents.length) ? this.DownloadList : this.EmptySearch}
          {this.EmptyRows}
          </tbody>
        </DownloadsTable>
        {this.selected && this.Details}
      </PageWrapper>
    );
  }
}

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import React from 'react';
import {
  dropDownloadTorrentStory,
  openDownloadTorrentStory,
  pauseDownloadTorrentStory,
  removeDownloadTorrentStory,
  resumeDownloadTorrentStory,
  routeToWalletStory,
  startDownloadTorrentStory
} from './story';

import DownloadsPage from './components/DownloadsPage';
import { checkDownloadTorrentAction, setNewDownloadAction } from './actions';

const mapDispatchToProps = (dispatch) => ({
  routerTo: (path) => dispatch(push(path)),
  onRouteToWallet: () => routeToWalletStory(dispatch),
  onDropDownloadTorrent: (files) => dropDownloadTorrentStory(dispatch, files),
  onOpenDownloadTorrent: () => openDownloadTorrentStory(dispatch),
  onStartDownloadTorrent: (payload) => startDownloadTorrentStory(dispatch, payload),
  onCancelDownloadTorrent: () => dispatch(setNewDownloadAction()),
  onCheckDownloadTorrent: (payload) => dispatch(checkDownloadTorrentAction(payload)),

  onPlayDownloadTorrent: (torrents) => resumeDownloadTorrentStory(dispatch, torrents),
  onPauseDownloadTorrent: (torrents) => pauseDownloadTorrentStory(dispatch, torrents),
  onDeleteDownloadTorrent: (torrents) => removeDownloadTorrentStory(dispatch, torrents)
});

const mapStateToProps = (state) => {
  const {app, wallet, webTorrent, downloads} = state;
  const currWallet = wallet.get(wallet.get('address'));

  return {
    internetConnection: app.get('internetConnection'),
    disableTransaction: app.get('disableTransaction'),
    wallet: currWallet && currWallet.toJS && currWallet.toJS(),
    webTorrent: webTorrent && webTorrent.toJS && webTorrent.toJS(),
    ...(downloads && downloads.toJS && downloads.toJS())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsPage);

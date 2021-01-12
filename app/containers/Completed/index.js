import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import React from 'react';
import {
  checkCompletedFilesStory,
  decodeTorrentStory,
  downloadAgainStory,
  removeCompletedTorrentStory,
  routeToWalletStory,
  startUnpackTorrentStory,
  unpackTorrentStory
} from './story';

import FinishedPage from './components/FinishedPage';
import { setUnpackTorrentAction, setUnpackTorrentProgressAction } from './actions';
import { dispatchPauseTorrentAction, dispatchResumeTorrentAction } from '../../utils/torrent/store';

const mapDispatchToProps = (dispatch) => ({
  routerTo: (path) => dispatch(push(path)),
  onRouteToWallet: () => routeToWalletStory(dispatch),
  onDeleteCompletedTorrent: (payload) => removeCompletedTorrentStory(dispatch, payload),
  onUnpackTorrent: (payload) => unpackTorrentStory(dispatch, payload),
  onCancelUnpackTorrent: () => dispatch(setUnpackTorrentAction()),
  onStartUnpackTorrent: (payload) => startUnpackTorrentStory(dispatch, payload),
  onRunDecodeTorrent: (payload) => decodeTorrentStory(dispatch, payload),
  onCancelDecodeTorrent: () => dispatch(setUnpackTorrentProgressAction()),
  onCheckCompletedFiles: (payload) => checkCompletedFilesStory(dispatch, payload),
  onDownloadAgain: (payload) => downloadAgainStory(dispatch, payload),

  onResumeTorrent: (infoHash) => dispatchResumeTorrentAction(infoHash),
  onPauseTorrent: (infoHash) => dispatchPauseTorrentAction(infoHash)
});

const mapStateToProps = (state) => {
  const {app, wallet, webTorrent, completed} = state;
  const currWallet = wallet.get(wallet.get('address'));

  return {
    internetConnection: app.get('internetConnection'),
    disableTransaction: app.get('disableTransaction'),
    wallet: currWallet && currWallet.toJS && currWallet.toJS(),
    webTorrent: webTorrent && webTorrent.toJS && webTorrent.toJS(),
    ...(completed && completed.toJS && completed.toJS()),
    gasPrice: wallet.get('gasPrice')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishedPage);

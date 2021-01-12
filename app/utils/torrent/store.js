import { dispatch, getState } from '../../store';
import { completeWebTorrentAction, peersAction, torrentAction, wireAction } from '../../reducers/webTorrent/actions';
import { TORRENT_TYPE_DOWNLOAD, TORRENT_TYPE_UPLOAD } from '../../constants';
import {
  dropDownloadTorrentStory,
  initDownloadTorrentsStory,
  openDownloadTorrentStory
} from '../../containers/Downloads/story';
import { initCompletedTorrentsStory } from '../../containers/Completed/story';
import { checkOwnerByWires, checkPriceByWires, checkTokenByWires, getTorrentStats, isTorrentToken } from './helpers';
import {
  autoStartUnpackAction,
  setUnpackTorrentProgressAction,
  setUnpackTorrentStatusAction
} from '../../containers/Completed/actions';
import { getClientTorrent } from './index';
import { push } from 'react-router-redux';
import routes from '../../constants/routes';
import seedStatisticDispatcher from './seed-statistic';
import { addStatisticAction } from '../../containers/App/actions';
import { fileExists } from '../file';
import logger from '../logger';

export const dispatchResumeTorrentAction = async (infoHash) => {
  const clientTorrent = getClientTorrent(infoHash);
  clientTorrent.resume();
  dispatchTorrentStatsAction(clientTorrent);
};

export const dispatchPauseTorrentAction = async (infoHash) => {
  const clientTorrent = getClientTorrent(infoHash);
  clientTorrent.pause();
  dispatchTorrentStatsAction(clientTorrent);
};

export const dispatchWireAction = (torrent, wire, value = {}) => {
  dispatch(wireAction({torrent, wire, value}));

  const state = getTorrentState(torrent && torrent.infoHash);

  if (state && state.type !== TORRENT_TYPE_UPLOAD && (value.token || value.owner)) {
    const data = {};

    if (isTorrentToken(value && value.token) && state.token !== value.token) {
      data.token = checkTokenByWires(state);
    }

    if ((value && value.owner) && state.owner !== value.owner) {
      data.owner = checkTokenByWires(state);
    }

    if (data.token || data.owner) {
      logger.debug('*** update torrent token|owner', {torrent, data});
      dispatchTorrentAction(torrent, data);
    }
  }
};

export const dispatchTorrentAction = (torrent, value = {}) => {
  dispatch(torrentAction({torrent, value}));
};

export const dispatchTorrentStatsAction = (torrent) => {
  if (torrent.done) {
    dispatchTorrentDoneAction(torrent);
  }

  dispatchTorrentAction(torrent, getTorrentStats(torrent));

  Array.from(torrent && torrent.wires || []).map(wire => {
    (wire && wire.downloaded) && dispatchWireAction(torrent, wire, {downloaded: Boolean(wire.downloaded)});
  });
};

export const dispatchTorrentDoneAction = (torrent) => {
  const {files, done, ready, infoHash, length} = torrent;
  const webTorrent = getState('webTorrent');

  if (!(webTorrent[infoHash] && webTorrent[infoHash].type === TORRENT_TYPE_DOWNLOAD)) {
    return;
  }

  const filesDone = Array.from(files || []).every(file => Boolean(file.done));

  if (!(filesDone && done && ready)) {
    return;
  }

  Promise.resolve(dispatch(completeWebTorrentAction(torrent)))
    .then(() => Promise.all([
      initDownloadTorrentsStory(dispatch, getState('webTorrent')),
      initCompletedTorrentsStory(dispatch, getState('webTorrent')),
      dispatchCheckOwnerAndPrice(getState('webTorrent'), torrent),
      dispatch(addStatisticAction({download: Number(length)}))
    ]))
    .catch(logger.warn);
};

export const getTorrentState = (infoHash) => {
  const webTorrent = getState('webTorrent');
  return webTorrent && webTorrent[infoHash];
};

export const getWalletState = () => {
  const wallet = getState('wallet');
  return (wallet && wallet.address) && wallet[wallet.address];
};

export const dispatchCheckOwnerAndPrice = (webTorrent, torrent) => {
  const {infoHash} = torrent;
  const {[infoHash]: torrentState} = webTorrent;

  if (!torrentState || (torrentState && torrentState.owner)) {
    return;
  }

  const owner = checkOwnerByWires(torrentState);
  const price = checkPriceByWires(torrentState);

  return dispatchTorrentAction(torrent, {owner, price});
};

export const autoStartTorrentAction = (infoHash) => {
  const state = getState('completed');

  logger.info('autoStartTorrentAction %s == %s', infoHash, state && String(state['autoStartUnpack']));

  if (state && String(state['autoStartUnpack']) === String(infoHash)) {
    const torrent = getTorrentState(infoHash);
    const {location} = getState('router');

    console.log('** autoStartTorrentAction', torrent, location);
    if (torrent) {
      dispatchDecodeTorrentStory(torrent);
      logger.info('dispatchDecodeTorrentStory', torrent, location);
      (!(location && location.pathname === routes.COMPLETED)) && dispatch(push(routes.COMPLETED));
    }
  }
};

export const dispatchDecodeTorrentStory = (torrent) => {
  const {infoHash} = torrent;

  if (!isTorrentToken(torrent && torrent.token)) {
    const token = checkTokenByWires(torrent);
    dispatchTorrentAction(getClientTorrent(infoHash), {token});
  }

  dispatch(autoStartUnpackAction());
  dispatch(setUnpackTorrentProgressAction({infoHash}));
  dispatch(setUnpackTorrentStatusAction());
};

export const dispatchSeedStatistic = (bytes) => seedStatisticDispatcher.onUpload(bytes);

export const dispatchTorrentPeerConnections = (torrent) => {
  const {infoHash, _peers: peers} = torrent;

  const value = Object.keys(peers).reduce((value, peer) => {
    if (peers[peer]) {
      const {addr, conn, type, id} = peers[peer];
      const remote = (conn && conn.remoteAddress && conn.remotePort)
        ? `${conn.remoteAddress}:${conn.remotePort}`
        : null;

      if (addr || remote) {
        value[id] = {type, addr: addr || remote};
      }
    }

    return value;
  }, {});

  dispatch(peersAction({infoHash, value}));
};

export const ipcMenuDownloadStory = () => {
  const {location} = getState('router');
  if (!(location && location.pathname === routes.DOWNLOADS)) {
    dispatch(push(routes.DOWNLOADS));
  }

  openDownloadTorrentStory(dispatch).catch(logger.warn);
};

export const ipcOpenFileStory = (file) => {
  const {location} = getState('router');
  if (!(location && location.pathname === routes.DOWNLOADS)) {
    dispatch(push(routes.DOWNLOADS));
  }

  if (fileExists(file)) {
    dropDownloadTorrentStory(dispatch, [file]).catch(logger.warn);
  }
};

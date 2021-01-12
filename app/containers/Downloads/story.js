import { push } from 'react-router-redux';
import routes from '../../constants/routes';
import { redirectAfterSetWalletAction } from '../Wallet/actions';
import { addTorrentFile, getClientTorrent, initTorrentsByType, removeClientTorrent } from '../../utils/torrent';
import { TORRENT_EXTENSION, TORRENT_TYPE_DOWNLOAD, TS_STATUS_DOWNLOAD } from '../../constants';
import {
  createDownloadTorrentAction,
  removeDownloadTorrentAction,
  setDownloadTorrentsAction,
  setNewDownloadAction,
  setNewDownloadStatusAction
} from './actions';
import trans from '../../translations';
import { remote } from 'electron';
import { parseTorrentFile } from '../../utils/torrent/helpers';
import { FileEntity } from '../../utils/file';
import checkDiskSpace from 'check-disk-space';
import { alertConfirmationStory, commonAlertStory, deleteConfirmationStory } from '../Alerts/story';
import { addWebTorrentAction, removeWebTorrentAction } from '../../reducers/webTorrent/actions';
import { dispatchTorrentStatsAction } from '../../utils/torrent/store';
import logger from '../../utils/logger';

const torrentExtensions = [TORRENT_EXTENSION.substring(1)];

export const routeToWalletStory = async (dispatch) => {
  dispatch(push(routes.WALLET));
  dispatch(redirectAfterSetWalletAction(routes.DOWNLOADS));
};

export const initDownloadTorrentsStory = async (dispatch, store) => {
  const torrents = initTorrentsByType(TORRENT_TYPE_DOWNLOAD, store);
  dispatch(setDownloadTorrentsAction(torrents));
};

export const dropDownloadTorrentStory = async (dispatch, files = []) => {
  if (!(files && files.length)) {
    return;
  }

  try {
    let torrents = await Promise.all(files.map(file => {
      return parseTorrentFile(new FileEntity(file));
    }));

    const exists = [];

    torrents = torrents
      .filter(t => Boolean(t))
      .filter(t => {
        const {infoHash} = t;
        if (getClientTorrent(infoHash)) {
          exists.push(t);
          return false;
        }
        return true;
      });

    if (exists.length) {
      await commonAlertStory(dispatch, {
        title: trans('UploadValidation.owner'),
        message: exists.map(t => t.path)
      });
    }

    dispatch(setNewDownloadAction(torrents.length ? torrents : null));
  } catch (e) {
    dispatch(setNewDownloadAction());
  }
};

export const openDownloadTorrentStory = async (dispatch) => {
  remote.dialog.showOpenDialog(
    remote.getCurrentWindow(),
    {
      filters: [
        {
          name: trans('download.TorrentFile'),
          extensions: torrentExtensions
        }
      ],
      properties: ['openFile', 'multiSelections']
    },
    (filePaths) => dropDownloadTorrentStory(dispatch, filePaths)
  );
};

export const startDownloadTorrentStory = async (dispatch, payload) => {
  dispatch(setNewDownloadStatusAction(TS_STATUS_DOWNLOAD));
  const {path, torrents = []} = payload;
  const type = TORRENT_TYPE_DOWNLOAD;
  const fullSize = torrents.reduce((size, t) => (size + t.size), 0);
  const ds = await checkDiskSpace(path);

  if (ds.free <= fullSize) {
    dispatch(setNewDownloadStatusAction());
    return alertConfirmationStory(dispatch, trans('upload.space'));
  }

  torrents.forEach(async torrent => {
    const {name, description, size, price, createdAt, owner, torrent: parsed} = torrent;
    try {
      const clientTorrent = await addTorrentFile(parsed, path);
      const {infoHash} = clientTorrent;

      dispatch(addWebTorrentAction({infoHash, path, type, name, description, size, price, createdAt, owner}));
      dispatch(createDownloadTorrentAction({infoHash, name, description, size, price, createdAt}));
    } catch (e) {
      logger.warn(e);
    }
    dispatch(setNewDownloadStatusAction());
    dispatch(setNewDownloadAction());
  });
};

export const resumeDownloadTorrentStory = async (dispatch, payload) => {
  const torrents = Array.isArray(payload) ? payload : [payload];
  torrents.forEach(async ({infoHash}) => {
    const clientTorrent = getClientTorrent(infoHash);
    clientTorrent.resume();
    dispatchTorrentStatsAction(clientTorrent);
  });
};

export const pauseDownloadTorrentStory = async (dispatch, payload) => {
  const torrents = Array.isArray(payload) ? payload : [payload];
  torrents.forEach(async ({infoHash}) => {
    const clientTorrent = getClientTorrent(infoHash);
    clientTorrent.pause();
    dispatchTorrentStatsAction(clientTorrent);
  });
};

export const removeDownloadTorrentStory = async (dispatch, payload) => {
  const torrents = Array.isArray(payload) ? payload : [payload];

  if (!(torrents.length)) {
    return;
  }

  const subtitle = torrents.map(({name}) => name).join(', ');
  const title = trans('remove.torrent');

  const confirm = await deleteConfirmationStory(dispatch, {title, subtitle});

  if (confirm) {
    torrents.forEach(async ({infoHash}) => {
      dispatch(removeDownloadTorrentAction({infoHash, mark: true}));

      try {
        await removeClientTorrent(infoHash);
        dispatch(removeDownloadTorrentAction({infoHash}));
        dispatch(removeWebTorrentAction({infoHash}));
      } catch (e) {
        return dispatch(removeDownloadTorrentAction({infoHash, mark: false}));
      }
    });
  }

};

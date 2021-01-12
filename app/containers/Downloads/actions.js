import { createAction } from 'redux-actions';
import {
  CHECK_TORRENTS,
  DOWNLOAD_TORRENT,
  NEW_DOWNLOAD_STATUS,
  REMOVE_TORRENT,
  SET_NEW_DOWNLOAD,
  TORRENTS
} from './constants';

export const setDownloadTorrentsAction = createAction(TORRENTS);

export const setNewDownloadAction = createAction(SET_NEW_DOWNLOAD);

export const createDownloadTorrentAction = createAction(DOWNLOAD_TORRENT);

export const removeDownloadTorrentAction = createAction(REMOVE_TORRENT);

export const setNewDownloadStatusAction = createAction(NEW_DOWNLOAD_STATUS);

export const checkDownloadTorrentAction = createAction(CHECK_TORRENTS);

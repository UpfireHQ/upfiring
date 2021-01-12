import { createAction } from 'redux-actions';
import {
  CLEAR_UPLOAD_FILES,
  CREATE_TORRENT,
  GENERATE_TORRENT_PROGRESS,
  GENERATE_TORRENT_STATUS,
  REMOVE_TORRENT,
  SET_UPLOAD_FILES,
  TORRENTS
} from './constants';

export const setUploadFilesAction = createAction(SET_UPLOAD_FILES);

export const clearUploadFilesAction = createAction(CLEAR_UPLOAD_FILES);

export const setUploadTorrentsAction = createAction(TORRENTS);

export const createUploadTorrentAction = createAction(CREATE_TORRENT);

export const removeUploadTorrentAction = createAction(REMOVE_TORRENT);

export const generateTorrentStatusAction = createAction(GENERATE_TORRENT_STATUS);

export const generateTorrentProgressAction = createAction(GENERATE_TORRENT_PROGRESS);

import { createAction } from 'redux-actions';
import {
  AUTO_START_UNPACK,
  REMOVE_TORRENT,
  SET_UNPACK_TORRENT,
  TORRENTS,
  UNPACK_TORRENT_PROGRESS,
  UNPACK_TORRENT_STATUS
} from './constants';

export const setCompletedTorrentsAction = createAction(TORRENTS);

export const removeCompletedTorrentAction = createAction(REMOVE_TORRENT);

export const setUnpackTorrentAction = createAction(SET_UNPACK_TORRENT);

export const setUnpackTorrentStatusAction = createAction(UNPACK_TORRENT_STATUS);

export const setUnpackTorrentProgressAction = createAction(UNPACK_TORRENT_PROGRESS);

export const autoStartUnpackAction = createAction(AUTO_START_UNPACK);

//export const removeAutoStartUnpackAction = createAction(REMOVE_AUTO_START_UNPACK);

import createAction from 'redux-actions/es/createAction';
import { ADD_TORRENT, REMOVE_TORRENT, TORRENT, COMPLETE_TORRENT, WIRE, PEERS } from './constants';

export const addWebTorrentAction = createAction(ADD_TORRENT);

export const removeWebTorrentAction = createAction(REMOVE_TORRENT);

export const completeWebTorrentAction = createAction(COMPLETE_TORRENT);

export const torrentAction = createAction(TORRENT);

export const wireAction = createAction(WIRE);

export const peersAction = createAction(PEERS);


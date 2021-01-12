import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import {
  AUTO_START_UNPACK,
  REMOVE_TORRENT,
  SET_UNPACK_TORRENT,
  TORRENTS,
  UNPACK_TORRENT_PROGRESS,
  UNPACK_TORRENT_STATUS
} from './constants';
import logger from '../../utils/logger';

const initialState = fromJS({});

export default typeToReducer({
  [TORRENTS]: (state, {payload}) => {
    return state.set('torrents', fromJS(payload || []));
  },

  [REMOVE_TORRENT]: (state, {payload}) => {
    const {createdAt, mark = null} = payload;
    const torrents = state.get('torrents').toJS();
    const index = torrents.findIndex(item => item.createdAt === createdAt);

    if (~index) {
      if (mark !== null) {
        torrents[index].deleting = mark;
      } else {
        torrents.splice(index, 1);
      }

      return state.set('torrents', fromJS(torrents));
    }

    return state;
  },

  [SET_UNPACK_TORRENT]: (state, {payload}) => {
    return (payload) ? state.set('unpackTorrent', fromJS(payload)) : state.delete('unpackTorrent');
  },

  [UNPACK_TORRENT_STATUS]: (state, {payload}) => {
    return (payload) ? state.set('unpackTorrentStatus', fromJS(payload)) : state.delete('unpackTorrentStatus');
  },

  [UNPACK_TORRENT_PROGRESS]: (state, {payload}) => {
    return (payload) ? state.set('unpackTorrentProgress', fromJS(payload)) : state.delete('unpackTorrentProgress');
  },

  [AUTO_START_UNPACK]: (state, {payload}) => {
    logger.info('SET_UNPACK_TORRENT', payload ? payload : '---');
    return (payload) ? state.set('autoStartUnpack', fromJS(payload)) : state.delete('autoStartUnpack');
  }

}, initialState);

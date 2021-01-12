import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import {
  CHECK_TORRENTS,
  DOWNLOAD_TORRENT,
  NEW_DOWNLOAD_STATUS,
  REMOVE_TORRENT,
  SET_NEW_DOWNLOAD,
  TORRENTS
} from './constants';

const initialState = fromJS({});

export default typeToReducer({
  [TORRENTS]: (state, {payload}) => {
    return state.set('torrents', fromJS(payload || []));
  },

  [SET_NEW_DOWNLOAD]: (state, {payload}) => {
    return payload ? state.set('newDownload', fromJS(payload)) : state.delete('newDownload');
  },

  [NEW_DOWNLOAD_STATUS]: (state, {payload}) => {
    return payload ? state.set('newDownloadStatus', fromJS(payload)) : state.delete('newDownloadStatus');
  },

  [DOWNLOAD_TORRENT]: (state, {payload}) => {
    const {infoHash} = payload;
    const torrents = state.get('torrents').toJS();
    const index = torrents.findIndex(item => item.infoHash === infoHash);

    if (~index) {
      torrents[index] = {...torrents[index], ...payload};
    } else {
      torrents.push(payload);
    }

    return state.set('torrents', fromJS(torrents));
  },

  [REMOVE_TORRENT]: (state, {payload}) => {
    const {infoHash, mark = null} = payload;
    const torrents = state.get('torrents').toJS();
    const index = torrents.findIndex(item => item.infoHash === infoHash);

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

  [CHECK_TORRENTS]: (state, {payload}) => {
    const torrents = state.get('torrents').map((torrent) => {
      const infoHash = torrent.get('infoHash');
      return Object(payload).hasOwnProperty(infoHash)
        ? torrent.set('checked', payload[infoHash])
        : torrent;
    });

    return state.set('torrents', torrents);
  }

}, initialState);

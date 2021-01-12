import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import {
  CLEAR_UPLOAD_FILES,
  CREATE_TORRENT,
  GENERATE_TORRENT_PROGRESS,
  GENERATE_TORRENT_STATUS,
  REMOVE_TORRENT,
  SET_UPLOAD_FILES,
  TORRENTS
} from './constants';

const initialState = fromJS({torrents: []});

export default typeToReducer({
  [SET_UPLOAD_FILES]: (state, {payload}) => {
    const {path, name, cost, description, files} = payload;

    return state.set('uploadFiles', fromJS({path, name, cost, description, files}));
  },

  [CLEAR_UPLOAD_FILES]: (state, {payload}) => {
    return state.delete('uploadFiles');
  },

  [TORRENTS]: (state, {payload}) => {
    return state.set('torrents', fromJS(payload || []));
  },

  [CREATE_TORRENT]: (state, {payload}) => {
    const {createdAt} = payload;
    const torrents = state.get('torrents').toJS();
    const index = torrents.findIndex(item => item.createdAt === createdAt);

    if (~index) {
      torrents[index] = {...torrents[index], ...payload};
    } else {
      torrents.push(payload);
    }

    return state.set('torrents', fromJS(torrents));
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

  [GENERATE_TORRENT_STATUS]: (state, {payload}) => {
    return payload ? state.set('generateTorrentStatus', fromJS(payload)) : state.delete('generateTorrentStatus');
  },

  [GENERATE_TORRENT_PROGRESS]: (state, {payload}) => {
    return payload ? state.set('generateTorrentProgress', fromJS(payload)) : state.delete('generateTorrentProgress');
  }

}, initialState);

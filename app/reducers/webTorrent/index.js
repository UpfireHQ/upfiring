import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { ADD_TORRENT, COMPLETE_TORRENT, PEERS, REMOVE_TORRENT, TORRENT, WIRE } from './constants';
import { torrentStore } from '../../utils/localStorage';
import { fileExists } from '../../utils/file';
import { getUserDataTorrentPath } from '../../utils/torrent/helpers';
import { TORRENT_TYPE_COMPLETED, TORRENT_TYPE_DOWNLOAD, TORRENT_TYPE_UPLOAD } from '../../constants';

const initialState = {
  nodeId: torrentStore.get('nodeId'),
  peerId: torrentStore.get('peerId')
};

initialState.torrents = Array.from(torrentStore.get('torrents'))
  .filter(torrent => {
    const {infoHash, type} = torrent;
    const torrentFile = getUserDataTorrentPath(infoHash);

    if (fileExists(torrentFile)) {
      const torrent = torrentStore.get(infoHash);
      const seeded = Number(torrent && torrent.seeded) + Number(torrent && torrent.uploaded);

      initialState[infoHash] = Object.assign(torrent, {type, seeded});
      return true;
    }

    return false;
  });

export const webTorrentReducer = typeToReducer({
  [ADD_TORRENT]: (state, {payload}) => {
    const {infoHash, type} = payload;
    const torrents = state.get('torrents');

    if (
      !!torrents.find(t => t.get('infoHash') === infoHash)
      || !(type === TORRENT_TYPE_DOWNLOAD || type === TORRENT_TYPE_UPLOAD)
    ) {
      return state;
    }

    const torrentState = state.get(infoHash) || fromJS({infoHash});

    return state.withMutations(map => {
      map
        .set('torrents', torrents.push(fromJS({infoHash, type})))
        .set(infoHash, torrentState.mergeDeep(fromJS(payload)));
    });
  },

  [REMOVE_TORRENT]: (state, {payload}) => {
    const {infoHash} = payload;
    const torrents = state.get('torrents');
    const index = torrents.findIndex(item => item.get('infoHash') === infoHash);

    return ~index
      ? state.withMutations(map => {
        map.set('torrents', torrents.delete(index)).delete(infoHash);
      })
      : state;

  },

  [COMPLETE_TORRENT]: (state, {payload}) => {
    const {infoHash} = payload;
    const torrents = state.get('torrents');
    const index = torrents.findIndex(item => item.get('infoHash') === infoHash);

    return (~index && state.has(infoHash))
      ? state.withMutations(map => {
        map.set('torrents', torrents.setIn([index, 'type'], TORRENT_TYPE_COMPLETED))
          .setIn([infoHash, 'type'], TORRENT_TYPE_COMPLETED);
      })
      : state;
  },

  [WIRE]: (state, {payload}) => {
    const {torrent, wire, value = {}} = payload;
    const {infoHash} = torrent;
    const {peerId} = wire;
    value.peerId = peerId;

    return state.update(infoHash, torrentState => {
      const wires = torrentState.get('wires') || fromJS({});
      const mergeData = fromJS({[peerId]: value});

      return torrentState
        .set('wires', wires.mergeDeep(mergeData))
        .set('hasToken', Boolean(torrentState.get('hasToken')) || Boolean(value.hasToken));
    });
  },

  [TORRENT]: (state, {payload}) => {
    const {torrent, value = {}} = payload;
    const {infoHash} = torrent;
    delete value.infoHash;
    delete value.wires;
    delete value.type;

    const torrentState = state.get(infoHash) || fromJS({infoHash});

    if (torrentState.get('type') === TORRENT_TYPE_UPLOAD) {
      delete value.owner;
      delete value.token;
    }

    return state.set(infoHash, torrentState.mergeDeep(fromJS(value)));
  },

  [PEERS]: (state, {payload}) => {
    const {infoHash, value = {}} = payload;

    return state.update(infoHash, torrentState => {
      const peers = torrentState.get('peersConnections');

      return torrentState.set('peersConnections', peers ? peers.merge(fromJS(value)) : fromJS(value));
    });
  }

}, fromJS(initialState));



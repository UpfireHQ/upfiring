import WebTorrent from 'webtorrent';
import fs from 'fs';
import { APP_NAME } from '../../constants';
import {
  autoStartTorrentAction,
  dispatchSeedStatistic,
  dispatchTorrentAction,
  dispatchTorrentDoneAction,
  dispatchTorrentPeerConnections,
  dispatchTorrentStatsAction,
  dispatchWireAction,
  getTorrentState,
  getWalletState
} from './store';
import { TorrentUpfiringAction } from './ut-upfiring-action';
import {
  TORRENT_EVENT_INFO,
  TORRENT_EVENT_PASSWORD,
  torrentRequestEmitter,
  torrentResponseEmitter
} from './event-emitter';
import _ from 'lodash';
import { torrentStore } from '../localStorage';
import { getTorrentValue, getUserDataTorrentPath } from './helpers';
import { fileExists } from '../file';
import { requestTorrentWiresInfo, requestWire, responseWire } from './wire';
import { checkPayment } from './blockchain';
import logger from '../logger';

export const client = new WebTorrent({
  webSeeds: false,
  nodeId: torrentStore.get('nodeId'),
  peerId: torrentStore.get('peerId'),
  tracker: {
    nodeId: torrentStore.get('nodeId'),
    peerId: torrentStore.get('peerId')
  }
});

console.log('[WebTorrent]', client);

export const getClientTorrent = (infoHash) => client.get(infoHash);

client.on('error', (err) => {
  logger.error('WebTorrent', err, client.torrents);
});

const bindTorrentWireEvents = (torrent, wire) => {
  wire.use(TorrentUpfiringAction);

  const tuAction = wire[TorrentUpfiringAction.EXTENSION_NAME];
  tuAction.on('warning', logger.warn);
  tuAction.on('request', (type) => torrentRequestEmitter.emit(type, torrent, wire));
  tuAction.on('response', (type, payload) => torrentResponseEmitter.emit(type, torrent, wire, payload));
  tuAction.on('handshake', () => {
    dispatchTorrentPeerConnections(torrent);
    tuAction.request(TORRENT_EVENT_INFO);
  });

  //wire.on('extended', (ext, obj) => console.log('## wire:extended', {ext, obj, wire, torrent}));

  dispatchWireAction(torrent, wire);
};

const bindTorrentEvents = (torrent) => {
  torrent.on('ready', () => dispatchTorrentAction(torrent, getTorrentValue(torrent)));

  torrent.on('done', () => {
    dispatchTorrentDoneAction(torrent);
    requestTorrentWiresInfo(torrent);
  });

  torrent.on('download', _.debounce(() => dispatchTorrentStatsAction(torrent), 500));
  torrent.on('upload', _.debounce(() => dispatchTorrentStatsAction(torrent), 500));
  torrent.on('upload', dispatchSeedStatistic);

  torrent.on('wire', (wire) => bindTorrentWireEvents(torrent, wire));

  dispatchTorrentStatsAction(torrent);
};

export const generateTorrentFile = (savePath, files, name, comment, creationDate) => {
  return new Promise((resolve, reject) => {
    try {
      const options = {
        path: savePath,
        name: (files && files.length > 1) ? name : undefined,
        comment,
        createdBy: APP_NAME,
        creationDate
      };

      client.seed(files, options, (torrent) => {
        fs.writeFileSync(getUserDataTorrentPath(torrent.infoHash), torrent.torrentFile);
        bindTorrentEvents(torrent);

        resolve(torrent);
      });
    } catch (e) {
      reject(e, 'client.seed');
    }
  });
};

export const addTorrentFile = (torrentFile, savePath) => {
  return new Promise((resolve, reject) => {
    try {
      const options = {
        path: savePath
      };

      client.add(torrentFile, options, (torrent) => {
        const torrentFilePath = getUserDataTorrentPath(torrent.infoHash);
        if (!fileExists(torrentFilePath)) {
          fs.writeFileSync(torrentFilePath, torrent.torrentFile);
        }
        bindTorrentEvents(torrent);

        resolve(torrent);
      });

    } catch (e) {
      reject(e, 'client.add');
    }
  });
};

export const removeClientTorrent = (infoHash) => {
  return new Promise((resolve, reject) => {
    try {
      client.remove(infoHash, (err) => {
        if (err) {
          return reject(err, 'client.remove');
        }

        const torrentFilePath = getUserDataTorrentPath(infoHash);
        if (fileExists(torrentFilePath)) {
          fs.unlinkSync(torrentFilePath);
        }

        resolve(true);
      });
    } catch (e) {
      reject(e, 'client.remove');
    }
  });
};

export const resumeClientTorrents = () => {
  try {
    Array.from(client.torrents).forEach((torrent) => {
      torrent.resume();
    });

    client.address();
  } catch (e) {
    logger.warn(e);
  }
};

/* EVENTS */

const _fixEventResponseValue = (value) => {
  if (!value) {
    return {};
  }

  value.hasToken = Boolean(value.hasToken) || Boolean(value.token);

  value.price = Number(value.price) || 0;

  if (value.owner) {
    value.owner = String(value.owner);
  } else {
    delete value.owner;
  }

  if (value.token) {
    value.token = String(value.token);
  } else {
    delete value.token;
  }

  return value;
};

torrentResponseEmitter.on(TORRENT_EVENT_INFO, (torrent, wire, value) => {
  value = _fixEventResponseValue(value);
  dispatchWireAction(torrent, wire, value);

  const {infoHash} = torrent;
  const {peerId} = wire;
  const torrentState = getTorrentState(infoHash);

  if ((torrentState && torrentState.payment) && (value && value.hasToken)) {
    requestWire(wire, TORRENT_EVENT_PASSWORD);
  }
  logger.debug('** receive', TORRENT_EVENT_INFO, {infoHash, peerId, value});
});

torrentRequestEmitter.on(TORRENT_EVENT_INFO, (torrent, wire) => {
  const {infoHash} = torrent;
  const {peerId} = wire;
  const torrentState = getTorrentState(infoHash);
  const wallet = getWalletState();

  if (torrentState && wallet) {
    const payload = {
      hasToken: Number(Boolean(torrentState.token)),
      owner: String(torrentState.owner),
      price: Number(torrentState.price),
      address: String(wallet.address)
    };

    logger.debug('** sending', TORRENT_EVENT_INFO, {infoHash, peerId, payload});
    responseWire(wire, TORRENT_EVENT_INFO, payload);
  }
});

torrentResponseEmitter.on(TORRENT_EVENT_PASSWORD, (torrent, wire, value) => {
  value = _fixEventResponseValue(value);

  Promise.resolve(dispatchWireAction(torrent, wire, value))
    .then(() => autoStartTorrentAction(torrent && torrent.infoHash))
    .catch(logger.warn);

  const {infoHash} = torrent;
  const {peerId} = wire;
  logger.info('** receive', TORRENT_EVENT_PASSWORD, {infoHash, peerId, value});
});

torrentRequestEmitter.on(TORRENT_EVENT_PASSWORD, (torrent, wire) => {
  const {infoHash} = torrent;
  const {peerId} = wire;
  const torrentState = getTorrentState(infoHash);
  const wallet = getWalletState();

  if (!(torrentState && torrentState.wires && torrentState.wires[peerId] && wallet)) {
    return;
  }

  const {price} = torrentState;
  const {address} = torrentState.wires[peerId];

  checkPayment(infoHash, address, price).then(ok => {
    if (ok) {
      const payload = {
        token: torrentState && torrentState.token,
        owner: torrentState && torrentState.owner,
        price: torrentState && torrentState.price,
        address: wallet.address
      };

      logger.info('** sending', TORRENT_EVENT_PASSWORD, {infoHash, peerId, payload});
      responseWire(wire, TORRENT_EVENT_PASSWORD, payload);
    }
  });
});

/* INITIALISATION */

export const initTorrentClient = (store) => {
  Array.from(store.torrents)
    .forEach(torrent => {
      Object.assign(torrent, store[torrent.infoHash]);
      const torrentFile = fs.readFileSync(getUserDataTorrentPath(torrent.infoHash));

      return addTorrentFile(torrentFile, torrent.path)
        .then((t) => {
          const peers = Object.values(torrent.peersConnections || {});
          if (peers.length && t.addPeer) {
            Array.from(peers).forEach(({type, addr}) => {
              logger.debug('addTorrentFile.peersConnections', torrent.infoHash, addr, type, t.addPeer(addr));
            });
          }

          return t;
        })
        .catch(logger.warn);
    });
};

export const initTorrentsByType = (type, store) => {
  return Array.from(store.torrents)
    .filter(torrent => torrent.type === type)
    .map(torrent => {
      const {infoHash} = torrent;
      const {createdAt, name, price, description, size} = store[infoHash] || {};

      return {infoHash, createdAt, name, price, description, size};
    });
};

export const requestInfoTorrentsWithoutToken = (store) => {
  Array.from(store.torrents)
    .filter(t => !(store[t.infoHash] && store[t.infoHash].token))
    .forEach(t => {
      const torrent = getClientTorrent(t.infoHash);
      if (torrent) {
        requestTorrentWiresInfo(torrent);
      }
    });
};

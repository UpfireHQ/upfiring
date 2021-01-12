import path from 'path';
import { userDataPath } from '../localStorage';
import { TORRENT_EXTENSION } from '../../constants';
import { fileExists, readTorrentFile } from '../file';
import parseTorrent from 'parse-torrent';
import _ from 'lodash';
import EthClient from '../../blockchain/client';
import logger from '../logger';

export const getUserDataTorrentPath = (hash) => {
  return getTorrentFilePath(userDataPath, `torrent-${hash}`);
};

export const getTorrentFilePath = (dir, name) => {
  return path.format({dir, name, ext: TORRENT_EXTENSION});
};

export const isTorrentFileExists = (dir, name) => {
  return fileExists(getTorrentFilePath(dir, name));
};

export const getClientTorrentFullPath = (torrent = {}) => {
  const {files = [], name = '', path: torrentPath = ''} = torrent;

  return path.join(torrentPath, name) + (files.length > 1 ? '/' : '');
};

export const getTorrentComment = (name, description, price, owner) => {
  return JSON.stringify({name, description, price, owner});
};

export const getTorrentValue = (torrent = {}) => {
  const {length, comment, created, infoHash} = torrent;
  const {name, description, price, owner} = JSON.parse(comment);

  return {
    infoHash,
    name: name,
    description,
    price,
    size: length,
    owner: EthClient.isHexAddress(owner) ? owner : null,
    createdAt: created
  };
};

/**
 * @param {FileEntity} fileEntity
 * @return {Promise<Object>}
 */
export const parseTorrentFile = async (fileEntity) => {
  if (!fileEntity.exist) {
    return;
  }

  try {
    const torrent = parseTorrent(readTorrentFile(fileEntity.path));

    if (torrent) {
      const value = getTorrentValue(torrent);
      if (!torrent.name) {
        torrent.name = path.basename(fileEntity.name, fileEntity.ext);
      }

      return Object.assign(value, {torrent, path: fileEntity.path});
    }
  } catch (e) {
    logger.warn(e);
  }
};

export const getClientTorrentSeeders = (torrent = {}) => {
  const {wires} = torrent;

  return Array.from(wires || []).filter(w => w.isSeeder).length;
};

export const getTorrentStats = (torrent = {}) => {
  const {
    timeRemaining,
    downloaded,
    uploaded,
    downloadSpeed,
    uploadSpeed,
    progress,
    paused,
    numPeers,
    received,
    ratio
  } = torrent;

  return {
    timeRemaining,
    received: (Number(received) || 0),
    downloaded: (Number(downloaded) || 0),
    uploaded: (Number(uploaded) || 0),
    downloadSpeed: (Number(downloadSpeed) || 0),
    uploadSpeed: (Number(uploadSpeed) || 0),
    ratio: (Number(ratio) || 0),
    progress: Math.floor((Number(progress) || 0) * 100),
    paused,
    peers: (Number(numPeers) || 0),
    seeds: getClientTorrentSeeders(torrent)
  };
};

export const checkOwnerByWires = (torrent = {}) => {
  const owners = Array.from(torrent.wires ? Object.values(torrent.wires) : [])
    .reduce((value, wire) => {
      if (wire && wire.owner && EthClient.isHexAddress(wire.owner)) {
        value[wire.owner] = value[wire.owner] ? value[wire.owner] + 1 : 1;
      }

      return value;
    }, {});

  return Object.keys(owners).reduce((value, key) => {
    return (value && (owners[value] > owners[key])) ? value : key;
  }, null);
};

export const checkPriceByWires = (torrent = {}) => {
  const prices = Array.from(torrent.wires ? Object.values(torrent.wires) : [])
    .reduce((value, wire) => {
      if (wire && wire.price) {
        value[wire.price] = value[wire.price] ? value[wire.price] + 1 : 1;
      }

      return value;
    }, {});

  return Object.keys(prices).reduce((value, key) => {
    return (value && (prices[value] > prices[key])) ? value : key;
  }, 0);
};

export const checkTokenByWires = (torrent = {}) => {
  const tokens = Array.from(torrent.wires ? Object.values(torrent.wires) : [])
    .reduce((value, wire) => {
      if (isTorrentToken(wire && wire.token)) {
        value[wire.token] = value[wire.token] ? value[wire.token] + 1 : 1;
      }

      return value;
    }, {});

  return Object.keys(tokens).reduce((value, key) => {
    return (value && (tokens[value] > tokens[key])) ? value : key;
  }, null);
};

export const getTorrentSeeders = (torrent = {}, hasToken = false) => {
  const {owner} = torrent;

  return Array.from(Object.values(torrent.wires || {}))
    .filter(w => (w && (w.address !== owner) && w.downloaded && Boolean(w.hasToken) === Boolean(hasToken)))
    .map(w => w.address);
};

export const getPaymentData = (torrent) => {
  if (!(torrent && torrent.infoHash)) {
    return {};
  }

  const owner = (torrent.owner) || checkOwnerByWires(torrent);
  const amount = (torrent.price) || checkPriceByWires(torrent);

  const seeders = _.uniq(getTorrentSeeders(torrent, true));
  const freeSeeders = _.uniq(getTorrentSeeders(torrent, false));

  return {torrent: torrent.infoHash, amount, owner, seeders, freeSeeders};
};

export const isTorrentToken = (token) => {
  return token && String(token).startsWith('0x');
};

export const isTorrentFilesExists = (torrent) => {
  return Boolean(torrent && torrent.files && torrent.files.length)
    && Array.from(torrent.files).reduce((value, file) => {
      const exist = Boolean(file && fileExists(path.join(torrent.path, file.path)));
      return exist && value;
    }, true);
};

export const isTorrentHasRemoteToken = (clientTorrent, storeTorrent) => {
  if (clientTorrent && clientTorrent.wires && clientTorrent.wires.length && storeTorrent && storeTorrent.wires) {
    return Array.from(clientTorrent.wires).reduce((value, wire) => {
      if (wire && wire.peerId && storeTorrent.wires && storeTorrent.wires[wire.peerId]) {
        return Boolean(storeTorrent.wires[wire.peerId].hasToken) || value;
      }

      return value;
    }, false);
  }

  return false;
};

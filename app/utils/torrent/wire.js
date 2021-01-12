import { TORRENT_EVENT_INFO, TORRENT_EVENT_PASSWORD } from './event-emitter';
import { TorrentUpfiringAction } from './ut-upfiring-action';
import logger from '../logger';

export const responseWire = (wire, type, payload) => {
  try {
    const tuAction = wire && wire[TorrentUpfiringAction.EXTENSION_NAME];
    tuAction && tuAction.response(type, payload);
  } catch (e) {
    logger.warn(e && e.message, wire);
  }
};

export const requestWire = (wire, type) => {
  try {
    const tuAction = wire && wire[TorrentUpfiringAction.EXTENSION_NAME];
    tuAction && tuAction.request(type);
  } catch (e) {
    logger.warn(e && e.message, wire);
  }
};

export const requestTorrentWiresInfo = (torrent) => {
  Array.from(torrent && torrent.wires || [])
    .forEach(wire => requestWire(wire, TORRENT_EVENT_INFO));
};

export const requestTorrentWiresPassword = (torrent) => {
  Array.from(torrent && torrent.wires || [])
    .forEach(wire => requestWire(wire, TORRENT_EVENT_PASSWORD));
};


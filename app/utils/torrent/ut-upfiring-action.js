import { EventEmitter } from 'events';
import bencode from 'bencode';
import logger from '../logger';

const TORRENT_UPFIRING_ACTION_REQUEST = 0;
const TORRENT_UPFIRING_ACTION_RESPONSE = 1;

export class TorrentUpfiringAction extends EventEmitter {
  static get EXTENSION_NAME() {
    return 'TU_Action';
  }

  constructor(wire) {
    super();

    this._wire = wire;
    this._meta = {
      infoHash: null,
      peerId: null,
      extensions: null
    };
  }

  get name() {
    return TorrentUpfiringAction.EXTENSION_NAME;
  };

  onHandshake(infoHash, peerId, extensions) {
    this._meta = {infoHash, peerId, extensions};
  }

  onExtendedHandshake(handshake) {
    if (!handshake.m || !handshake.m[TorrentUpfiringAction.EXTENSION_NAME]) {
      return this.emit('warning', new Error('Peer does not support Torrent Upfiring Action'));
    }
    this.emit('handshake', this._meta);
  }

  _decodeMessage(buf) {
    let msg = null;
    try {
      msg = bencode.decode(buf, 'utf8');
    } catch (e) {
      logger.warn(TorrentUpfiringAction.EXTENSION_NAME, 'Decode failed.');
      return null;
    }

    try {
      return JSON.parse(msg);
    } catch (e) {
      logger.warn(TorrentUpfiringAction.EXTENSION_NAME, 'Not JSON data.');
    }

    return msg;
  }

  onMessage(buf) {
    const msg = this._decodeMessage(buf);

    if (msg && msg.action === TORRENT_UPFIRING_ACTION_REQUEST) {
      this.emit('request', msg.type, this._meta);
    } else if (msg && msg.action === TORRENT_UPFIRING_ACTION_RESPONSE) {
      this.emit('response', msg.type, msg.payload, this._meta);
    }
  }

  response(type, payload) {
    const buf = bencode.encode(JSON.stringify({action: TORRENT_UPFIRING_ACTION_RESPONSE, type, payload}));
    try {
      this._wire.extended(TorrentUpfiringAction.EXTENSION_NAME, buf);
    } catch (e) {
      this.emit('warning', e);
    }
  }

  request(type) {
    const buf = bencode.encode(JSON.stringify({action: TORRENT_UPFIRING_ACTION_REQUEST, type}));
    try {
      this._wire.extended(TorrentUpfiringAction.EXTENSION_NAME, buf);
    } catch (e) {
      this.emit('warning', e);
    }
  }

}

import { EventEmitter } from 'events';

export const TORRENT_EVENT_ERROR = 'error';
export const TORRENT_EVENT_PASSWORD = 'password';
export const TORRENT_EVENT_INFO = 'info';

export const torrentResponseEmitter = new EventEmitter();

export const torrentRequestEmitter = new EventEmitter();

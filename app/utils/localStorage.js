import electron from 'electron';
import path from 'path';
import fs from 'fs';
import { random } from './crypt/crypto.factory';

export const userDataPath = (electron.app || electron.remote.app).getPath('userData');

class Store {
  constructor(opts = {}) {
    const {name, defaults} = opts;
    this._defaults = defaults;
    this._stop = false;
    this._path = path.join(userDataPath, name + '.json');
    this._data = {...defaults, ...parseDataFile(this._path)};
  }

  get defaults() {
    return this._defaults;
  }

  get path() {
    return this._path;
  }

  setStop(flag) {
    this._stop = Boolean(flag);

    return this;
  }

  flush() {
    if (!this._stop) {
      fs.writeFileSync(this._path, JSON.stringify(this._data));
    }

    return this;
  }

  all() {
    return {...this._data};
  }

  get(key) {
    return this._data[key];
  }

  set(key, val) {
    this._data[key] = val;

    return this;
  }

  remove(key) {
    delete this._data[key];

    return this;
  }

  update(data, replace = false) {
    this._data = Object.assign({}, replace ? this._defaults : this._data, data);

    return this;
  }

  clear() {
    this._data = {...this._defaults};

    return this;
  }
}

function parseDataFile(filePath, defaults = {}) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
  }
  return defaults;
}

export const appStore = new Store({
  name: 'preferences',
  defaults: {
    statistic: {upload: 0, download: 0, seed: 0},
    autoLaunch: false,
    minimizeOnClose: true,
    checkUpdatesOnApplicationStart: true,
    lastUpdate: Date.now()
  }
});

export const walletStore = new Store({
  name: 'wallet',
  defaults: {}
});

export const torrentStore = new Store({
  name: 'torrents',
  defaults: {
    torrents: [], // {file, state, ...}
    nodeId: random(20).toString('hex'),
    peerId: random(20).toString('hex')
  }
});

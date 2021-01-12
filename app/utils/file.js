import { FILE_ENCRYPT_EXTENSION } from '../constants/torrent';
import { bytesToSize } from './bytesformat';
import fs from 'fs';
import path from 'path';
import * as fileCrypt from './file-crypt';

export class FileEntity {

  constructor(input) {
    /**
     * @type {String}
     * @private
     */
    this._path = String(input && input.path || input);
    /**
     * @type {Stats}
     * @private
     */
    this._stats = null;
  }

  get stats() {
    if (!this._stats) {
      this._stats = fs.statSync(this._path);
    }
    return this._stats;
  }

  get path() {
    return this._path;
  }

  get name() {
    return path.basename(this._path);
  }

  get ext() {
    return path.extname(this._path);
  }

  get directory() {
    return path.dirname(this._path);
  }

  get exist() {
    return fs.existsSync(this._path);
  }

  get size() {
    return this.stats && this.stats.size || 0;
  }

  toString() {
    return this.path;
  }
}

/**
 * @param {string} filePath
 * @return {number}
 */
export const fileSize = (filePath) => ((Boolean(filePath) && fs.statSync(filePath)) || {size: 0}).size;

/**
 * @param {string} filePath
 * @return {boolean}
 */
export const fileExists = (filePath) => Boolean(filePath) && fs.existsSync(filePath);

/**
 * @param {string} filePath
 * @return {string}
 */
export const getFileName = (filePath) => filePath && path.basename(filePath);

/**
 * @param {FileEntity[]} files
 * @return {number}
 */
export const fileEntitiesSize = (files) => Array.from(files || [])
  .reduce((value, item) => (value + (item && item.size)), 0);

/**
 * @param {FileEntity[]|FileEntity} files
 * @return {string}
 */
export const prettySize = (files) => bytesToSize(fileEntitiesSize(Array.isArray(files) ? files : [files]));

/**
 * @param path
 * @return {Buffer | string}
 */
export const readTorrentFile = (path) => {
  return fs.readFileSync(path);
};

/**
 * @param path
 * @param torrentFile
 */
export const writeTorrentFile = (path, torrentFile) => {
  fs.writeFileSync(path, torrentFile);
};

/* encrypt/decrypt */

const _destination = (files, destination, name) => {
  if (files.length > 1) {
    destination = path.join(destination, name);
    
    if (!fileExists(destination)) {
      fs.mkdirSync(destination, {recursive: true});
    }
  }

  return destination;
};

export const encryptFiles = async (files, destination, name, password, callback) => {
  files = Array.isArray(files) ? files : [files];
  destination = _destination(files, destination, name);
  const result = [];

  for (let file of files) {
    const destFile = path.join(destination, file.name + FILE_ENCRYPT_EXTENSION);

    result.push(await fileCrypt.encrypt(file.path, destFile, password, callback));
  }

  return result;
};

export const decryptFiles = async (files, destination, name, password, callback) => {
  files = Array.isArray(files) ? files : [files];
  destination = _destination(files, destination, name);
  const result = [];

  for (let file of files) {
    const destFile = path.join(destination, path.basename(file.name, FILE_ENCRYPT_EXTENSION));

    result.push(await fileCrypt.decrypt(file.path, destFile, password, callback));
  }

  return result;
};

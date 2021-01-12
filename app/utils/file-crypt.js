'use strict';
import crypto from 'crypto';
import fs from 'fs';

export const ALGORITHMS = 'aes192';

export const encrypt = async (filepath, destination, secret, callback) => new Promise((resolve, reject) => {
  if (!fs.lstatSync(filepath).isFile()) {
    return reject(new Error(`File ${filepath} not found`));
  }

  return fs.createReadStream(filepath, {flags: 'r+'})
    .on('data', (data) => (typeof callback === 'function') && callback(filepath, data.length))
    .pipe(crypto.createCipher(ALGORITHMS, secret))
    .on('error', reject)
    .pipe(fs.createWriteStream(destination, {flags: 'w+'}))
    .on('finish', () => {
      (typeof callback === 'function') && callback(filepath, 0, true);
      resolve(destination);
    });
});

export const decrypt = async (filepath, destination, secret, callback) => new Promise((resolve, reject) => {
  if (!fs.lstatSync(filepath).isFile()) {
    return reject(new Error(`File ${filepath} not found`));
  }

  return fs.createReadStream(filepath, {flags: 'r+'})
    .on('data', (data) => (typeof callback === 'function') && callback(filepath, data.length))
    .pipe(crypto.createDecipher(ALGORITHMS, secret))
    .on('error', reject)
    .pipe(fs.createWriteStream(destination, {flags: 'w+'}))
    .on('finish', () => {
      (typeof callback === 'function') && callback(filepath, 0, true);
      resolve(destination);
    });
});

/**
 * Created by maximnord on 10/10/17.
 */
// (c) SigmaLedger 2016-2017.
// Distributed under commercial license. Property of SigmaLedger.
// Refer to LICENSE for full text of license.

import secp256k1 from 'secp256k1';
import crypto from 'crypto';
import ethUtil from 'ethereumjs-util';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function getPublic(privateKey) {
  assert(privateKey.length === 32, 'Bad private key');
  // See https://github.com/wanderer/secp256k1-node/issues/46
  const compressed = secp256k1.publicKeyCreate(privateKey);
  return secp256k1.publicKeyConvert(compressed, false);
}

function sha512(msg) {
  return crypto.createHash('sha512').update(msg).digest();
}

function aes256CbcEncrypt(iv, key, plaintext) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const firstChunk = cipher.update(plaintext);
  const secondChunk = cipher.final();
  return Buffer.concat([firstChunk, secondChunk]);
}

function aes256CbcDecrypt(iv, key, ciphertext) {
  const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const firstChunk = cipher.update(ciphertext);
  const secondChunk = cipher.final();
  return Buffer.concat([firstChunk, secondChunk]);
}

function hmacSha256(key, msg) {
  return crypto.createHmac('sha256', key).update(msg).digest();
}

// Compare two buffers in constant time to prevent timing attacks.
function equalConstTime(b1, b2) {
  if (b1.length !== b2.length) {
    return false;
  }
  let res = 0;
  for (let i = 0; i < b1.length; i++) {
    res |= b1[i] ^ b2[i]; // jshint ignore:line
  }
  return res === 0;
}

function derive(privateKeyA, publicKeyB) {
  return new Promise(function (resolve) {
    resolve(secp256k1.ecdh(publicKeyB, privateKeyA));
  });
}

function serialize(opts) {
  return Buffer.concat([
    opts.iv,
    opts.ephemPublicKey,
    opts.ciphertext,
    opts.mac
  ]);
}

function deserialize(buffer) {
  buffer = Buffer.from(buffer, 'utf8');
  return {
    iv: buffer.slice(0, 16),
    ephemPublicKey: buffer.slice(16, 81),
    ciphertext: buffer.slice(81, buffer.length - 32),
    mac: buffer.slice(buffer.length - 32)
  };
}

export const encrypt = async (publicKeyTo, msg, opts) => {
  publicKeyTo = Buffer.concat([Buffer.from([0x04]), Buffer.from(ethUtil.toBuffer(ethUtil.addHexPrefix(publicKeyTo)), 'utf8')]);
  opts = opts || {};
  let ephemPublicKey;
  let ephemPrivateKey;
  return new Promise(function (resolve, reject) {
    ephemPrivateKey = opts.ephemPrivateKey || crypto.randomBytes(32);
    ephemPublicKey = getPublic(ephemPrivateKey);
    return resolve(derive(ephemPrivateKey, publicKeyTo));
  }).then(function (Px) {
    const hash = sha512(Px);
    const iv = opts.iv || crypto.randomBytes(16);
    const encryptionKey = hash.slice(0, 32);
    const macKey = hash.slice(32);
    const ciphertext = aes256CbcEncrypt(iv, encryptionKey, msg);
    const dataToMac = Buffer.concat([iv, ephemPublicKey, ciphertext]);
    const mac = hmacSha256(macKey, dataToMac);
    return serialize({
      iv: iv,
      ephemPublicKey: ephemPublicKey,
      ephemPrivateKey: ephemPrivateKey,
      ciphertext: ciphertext,
      mac: mac
    });
  }).catch((result)=>{

  });
};

export const decrypt = (privateKey, buffer) => {
  const opts = deserialize(buffer);

  return derive(privateKey, opts.ephemPublicKey).then(function (Px) {
    const hash = sha512(Px);
    const encryptionKey = hash.slice(0, 32);
    const macKey = hash.slice(32);
    const dataToMac = Buffer.concat([
      opts.iv,
      opts.ephemPublicKey,
      opts.ciphertext
    ]);
    const realMac = hmacSha256(macKey, dataToMac);
    assert(equalConstTime(opts.mac, realMac), 'Bad MAC');
    return aes256CbcDecrypt(opts.iv, encryptionKey, opts.ciphertext);
  });
};

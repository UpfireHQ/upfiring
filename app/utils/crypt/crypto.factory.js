
import crypto from 'crypto';
import ethUtil from 'ethereumjs-util';

export const toBuffer = (hex) => {
  return ethUtil.toBuffer(hex);
};

export const random = (bytes) => {
  return crypto.randomBytes(bytes);
};

export const randomString = (bytes) => {
  return ethUtil.bufferToHex(random(bytes));
};

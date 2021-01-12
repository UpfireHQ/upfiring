require('babel-register');

const _ = require('lodash');

const torrentData = {
  'uploaded': 0,
  'size': 13787888,
  'received': 0,
  'seeds': 1,
  'path': '/Users/tylerfallon/Desktop/Upfiring Files 3',
  'payment': '0x4a3e9f8367de20f1dcc0ef3e93744d689cb76c7aab3b69bce8a7f1e3ec09cd1c',
  'uploadSpeed': 0,
  'downloaded': 13787888,
  'price': 2,
  'timeRemaining': 0,
  'ratio': 0,
  'name': 'Upfiring Desktop Wallpapers',
  'progress': 100,
  'wires': {
    'e262f2b52fd84bd6366748768a0a8dd6e5f66472': {
      'peerId': 'e262f2b52fd84bd6366748768a0a8dd6e5f66472',
      'hasToken': true,
      'owner': '0x3e49c8cf29e4142df5ef8b47413983352e7bf45d',
      'price': 2,
      'address': '0x3e49c8cf29e4142df5ef8b47413983352e7bf45d',
      'downloaded': true,
      'token': '0x51183b447c26384329c140177a659bf07bf8e2719ce237cd96e2f5dba27a'
    },
    'c5d43f67efa9e13656cd36a383d960f097d7ddb0': {
      'peerId': 'c5d43f67efa9e13656cd36a383d960f097d7ddb0',
      'hasToken': false,
      'owner': '0x3e49c8cf29e4142df5ef8b47413983352e7bf45d',
      'price': 2,
      'address': '0xc7310d4c24b02c411b4541b3f6bf3c71e3d76ad8'
    },
    'ec9b8fd737d91625530ba6c8d5f311bf20e3e92a': {
      'peerId': 'ec9b8fd737d91625530ba6c8d5f311bf20e3e92a',
      'hasToken': false,
      'owner': '0x3e49c8cf29e4142df5ef8b47413983352e7bf45d',
      'price': 2,
      'address': '0x1a6e64a15cb07639eb27471e422a947085c2f4fc'
    },
    '82b24c4f1b41200c93b32b79b64899e6a2d444a1': {
      'peerId': '82b24c4f1b41200c93b32b79b64899e6a2d444a1',
      'hasToken': false,
      'owner': '0x3e49c8cf29e4142df5ef8b47413983352e7bf45d',
      'price': 2,
      'address': '0x0530e1480560daffa6f8c6f0fce068e3f96dd83e',
      'downloaded': true
    },
    '7e406e1d347ddb59a7351f276c5b4f4b0c3a1047': {
      'peerId': '7e406e1d347ddb59a7351f276c5b4f4b0c3a1047',
      'hasToken': false,
      'owner': '0x3e49c8cf29e4142df5ef8b47413983352e7bf45d',
      'price': 2,
      'address': '0x75662a7549c8582e1e324a8333558b7be02f19a1',
      'downloaded': true
    },
    'ec51ff57019a3063834040cfb06cf0bb19938be8': {
      'peerId': 'ec51ff57019a3063834040cfb06cf0bb19938be8',
      'hasToken': false,
      'owner': '0x3e49c8cf29e4142df5ef8b47413983352e7bf45d',
      'price': 2,
      'address': '0x2fb3176c70151bc1073fa7b406c7cf94a1413020'
    }
  },
  'paused': false,
  'seeded': 5881856,
  'peers': 1,
  'owner': '0x3e49c8cf29e4142df5ef8b47413983352e7bf45d',
  'decoded': '/Users/tylerfallon/Desktop/Upfiring Files 3',
  'token': '0x51183b447c26384329c140177a659bf07bf8e2719ce237cd96e2f5dba27a',
  'type': 'COMPLETED',
  'createdAt': '2018-12-27T02:02:10.000Z',
  'infoHash': '99081ad26c5847ac4b025cbb776b403948d220ce',
  'description': 'Zip file containing 9 custom-created Upfiring desktop wall paper images in multiple high-resolution sizes\n\nDimensions: 2880x1800px, 2560x1600px, 1920x1080px\n\nLow-resolution samples can be found at https://imgur.com/a/9ziXctr',
  'failed': false,
  'downloadSpeed': 0,
  'hasToken': true
};

// ------

 const checkOwnerByWires = (torrent = {}) => {
  const owners = Array.from(torrent.wires ? Object.values(torrent.wires) : [])
    .reduce((value, wire) => {
      if (wire && wire.owner /*&& EthClient.isHexAddress(wire.owner)*/) {
        value[wire.owner] = value[wire.owner] ? value[wire.owner] + 1 : 1;
      }

      return value;
    }, {});

  return Object.keys(owners).reduce((value, key) => {
    return (value && (owners[value] > owners[key])) ? value : key;
  }, null);
};

 const checkPriceByWires = (torrent = {}) => {
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

 const checkTokenByWires = (torrent = {}) => {
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

 const getTorrentSeeders = (torrent = {}, hasToken = false) => {
  const {owner} = torrent;

  return Array.from(Object.values(torrent.wires || {}))
    .filter(w => (w && (w.address !== owner) && w.downloaded && Boolean(w.hasToken) === Boolean(hasToken)))
    .map(w => w.address);
};

 const getPaymentData = (torrent) => {
  if (!(torrent && torrent.infoHash)) {
    return {};
  }

  const owner = (torrent.owner) || checkOwnerByWires(torrent);
  const amount = (torrent.price) || checkPriceByWires(torrent);

  const seeders = _.uniq(getTorrentSeeders(torrent, true));
  const freeSeeders = _.uniq(getTorrentSeeders(torrent, false));

  return {torrent: torrent.infoHash, amount, owner, seeders, freeSeeders};
};

 const isTorrentToken = (token) => {
  return token && String(token).startsWith('0x');
};

// ------

const res = getPaymentData(torrentData);

console.log(res);

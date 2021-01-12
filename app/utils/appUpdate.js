import updateConfig from '../update-version';
import rp from 'request-promise-native';
import semver from 'semver';
import { DEBUG_PROD } from '../constants';
import logger from './logger';

export const getLatestUrl = () => {
  const {releases, test} = updateConfig;

  return DEBUG_PROD ? test : releases;
};

export const isNewVersion = (data) => {
  if (!(data && data.tag_name)) {
    return false;
  }

  const {tag_name} = data;
  const {version} = updateConfig;

  return semver.gt(tag_name, version);
};

export const getLatestData = async () => {
  return rp({
    uri: getLatestUrl(),
    headers: {
      'User-Agent': 'Request-Promise, Upfiring'
    },
    json: true
  }).catch(e => {
    logger.warn(e.message);
    return null;
  });
};

export const getInstallerUrl = (data) => {
  let search = null;

  if (process.platform === 'win32') {
    search = new RegExp('upfiring(.*)\\.exe', 'i');
  } else if (process.platform === 'darwin') {
    search = new RegExp('upfiring(.*)\\.dmg', 'i');
  } else if (process.platform === 'linux') {
    search = new RegExp('upfiring(.*)\\.deb', 'i');
  }

  if (search && data && Array.isArray(data.assets)) {
    const asset = Array.from(data.assets).find(a => search.test(String(a && a.name)));
    if (asset && asset.browser_download_url) {
      return asset.browser_download_url;
    }
  }

  return null;
};

export const checkNewVersion = async () => {
  const data = await getLatestData();

  if (data && data.name && isNewVersion(data)) {
    const {name: version, tag_name: tag} = data;
    const url = getInstallerUrl(data);

    if (url) {
      return {version, tag, url};
    }
  }

  return null;
};

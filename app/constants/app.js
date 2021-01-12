import updateVersionJson from '../update-version.json';
import { remote } from 'electron';

export const DEBUG_PROD = (remote && remote.getGlobal('DEBUG_PROD'))
  || process.env.NODE_ENV === 'development'
  || process.env.DEBUG_PROD === 'true';

export const VERSION_UPDATE_URL = updateVersionJson.releases;
export const CURRENT_VERSION = updateVersionJson.version;

export const APP_NAME = 'Upfiring';

export const SITE = 'https://www.upfiring.com';
export const SITE_DECRYPTION = 'https://www.upfiring.com/decryption.html';
export const SITE_PRIVACY = 'https://upfiring.com/disclaimer.html';

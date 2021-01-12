import electron from 'electron';
import path from 'path';
import log from 'electron-log';
import { APP_NAME } from '../constants';

if (log.transports) {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData');
  
  log.transports.console.level = 'debug';
  log.transports.console.format = '[{level}] {text}';

  log.transports.file.level = 'info';
  log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s} {level}] {text}';
  log.transports.file.maxSize = 10 * 1024 * 1024;
  log.transports.file.file = path.join(userDataPath, `${APP_NAME}.log`);
}

export default log;

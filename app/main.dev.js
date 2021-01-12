/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron';
import logger from './utils/logger';
import MenuBuilder from './menu';
import path from 'path';
import AutoLaunch from 'auto-launch';
import { appStore } from './utils/localStorage';
import {
  IPC_AUTO_START,
  IPC_CHECK_UPDATE,
  IPC_MESSAGE,
  IPC_OPEN_FILE,
  IPC_PROGRESS,
  IPC_PROGRESS_DONE,
  IPC_UPDATE_INSTALL,
  IPC_UPDATE_SYS_TRAY
} from './constants/ipc';
import { APP_NAME } from './constants/app';
import { download } from 'electron-dl';

logger.info('*** RUN ***');

let mainWindow = null;
let tray = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
  global.DEBUG_PROD = true;
}

if (process.platform === 'win32') {
  let shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
      winFiles(argv);
    }
  });

  if (shouldQuit) {
    app.quit();
  }
}

const autoLaunch = new AutoLaunch({
  name: APP_NAME,
  path: app.getPath('exe')
});

autoLaunch.isEnabled().then((isEnabled) => {
  if (!isEnabled && appStore.get(autoLaunch)) {
    autoLaunch.enable();
  }
}).catch(logger.warn);

/**
 * Functions
 */

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(logger.warn);
};

const sendStatusToWindow = (text, message = IPC_MESSAGE) => {
  mainWindow && mainWindow.send(message, text);
};

const winFiles = (argv = null) => {
  try {
    const _argv = argv ? argv : process.argv;
    sendStatusToWindow(JSON.stringify(_argv));
    if (process.platform === 'win32' && _argv.length >= 2) {
      let openFilePath = _argv[1];
      sendStatusToWindow(openFilePath);
      if (openFilePath !== '') {
        let winFiles = appStore.get('winFiles');
        if (typeof winFiles === 'undefined') {
          winFiles = [];
        }
        sendStatusToWindow(winFiles);
        winFiles.push(_argv[1]);
        appStore.set('winFiles', winFiles);
      }
      mainWindow && mainWindow.send(IPC_OPEN_FILE, openFilePath);
      mainWindow && mainWindow.show();
    }
  } catch (e) {
    logger.warn(e);
    if (mainWindow) {
      sendStatusToWindow(e && e.message || String(e));
      mainWindow.send(IPC_OPEN_FILE, e);
    }
  }
};

const checkUpdatesOnApplicationStart = () => {
  if (appStore.get('checkUpdatesOnApplicationStart')) {
    mainWindow && mainWindow.send(IPC_CHECK_UPDATE);
  }
};

/**
 * Add event listeners...
 */
ipcMain.on(IPC_AUTO_START, (event, message) => {
  const enable = Boolean(message);

  if (enable) {
    autoLaunch.enable();
  } else {
    autoLaunch.disable();
  }
});

ipcMain.on(IPC_UPDATE_SYS_TRAY, (event, message) => {
  app.__minimizeOnClose = Boolean(message);
});

ipcMain.on(IPC_UPDATE_INSTALL, (e, url) => {
  download(BrowserWindow.getFocusedWindow(), url, {
    onProgress: (value) => {
      mainWindow && mainWindow.send(IPC_PROGRESS, value);
    },
    openFolderWhenDone: true
  })
    .then(dl => {
      mainWindow && mainWindow.send(IPC_PROGRESS_DONE);
    })
    .catch(logger.error);
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('will-finish-launching', () => {
  app.on(IPC_OPEN_FILE, (event, path) => {
    event.preventDefault();
    let osFiles = appStore.get('osFiles');
    if (process.platform === 'darwin') {
      if (typeof osFiles === 'undefined') {
        osFiles = [];
      }
      osFiles.push(path);
      appStore.set('osFiles', osFiles);
      if (mainWindow) {
        mainWindow.send(IPC_OPEN_FILE, path);
        mainWindow.show();
      }
    }
  });

  winFiles();
});

app.on('ready', async () => {
  sendStatusToWindow('ready');

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  app.__isQuiting = false;
  app.__minimizeOnClose = Boolean(appStore.get('minimizeOnClose'));

  initMainWindow();

  initTray();
});

const initMainWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: process.env.NODE_ENV === 'development' ? 1560 : 1024,
    height: 728,
    minWidth: 950,
    minHeight: 700
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    winFiles();

    checkUpdatesOnApplicationStart();
  });

  mainWindow.on('close', (event) => {
    if (app.__isQuiting) {
      return;
    }

    if (app.__minimizeOnClose) {
      event.preventDefault();

      if (mainWindow && mainWindow.isFullScreen()) {
        mainWindow.once('leave-full-screen', function () {
          mainWindow && mainWindow.hide();
        });
        mainWindow.setFullScreen(false);
      } else {
        mainWindow && mainWindow.hide();
      }
      if (process.platform === 'darwin') {
        app.dock.hide();
      }
      return false;
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
};

const initTray = () => {
  const name = (process.platform === 'darwin')
    ? 'iconTemplate.png'
    : ((process.platform === 'win32') ? 'iconTemplate.png' : 'icon.png');

  tray = new Tray(path.join(__dirname, 'assets', 'tray', name));
  tray.setContextMenu(contextMenu());
  tray.setToolTip(APP_NAME);
  tray.on('click', () => {
    if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show();
    }
  });
};

const contextMenu = () => Menu.buildFromTemplate([
  {
    label: 'Show App',
    click: () => {
      mainWindow && mainWindow.show();
      if (process.platform === 'darwin') {
        app.dock.show();
      }
    }
  },
  {
    label: 'Quit',
    click: () => {
      app.__isQuiting = true;
      app.quit();
    }
  }
]);



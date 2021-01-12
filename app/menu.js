// @flow
import { app, BrowserWindow, dialog, Menu, nativeImage, shell } from 'electron';
import updateVersion from './update-version';
import path from 'path';
import { IPC_MENU_DOWNLOAD } from './constants';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const {x, y} = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'Upfiring',
      submenu: [
        {
          label: 'Download',
          accelerator: 'Command+O',
          click: () => this.clickOnDownload()
        },
        {type: 'separator'},
        {label: 'Hide Upfiring', accelerator: 'Command+H', selector: 'hide:'},
        {label: 'Hide Others', accelerator: 'Command+Shift+H', selector: 'hideOtherApplications:'},
        {label: 'Show All', selector: 'unhideAllApplications:'},
        {type: 'separator'},
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => this.clickOnQuit()
        }
      ]
    };
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {type: 'separator'},
        {
          label: 'Reload',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: 'Toggle Developer Tools',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
      ]
    };
    const subMenuWindow = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {label: 'Close', accelerator: 'Command+W', selector: 'performClose:'},
        {type: 'separator'},
        {label: 'Bring All to Front', selector: 'arrangeInFront:'}
      ]
    };
    const subMenuHelp = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://www.upfiring.com');
          }
        },
        {
          label: 'About',
          click: () => this.clickOnAbout()
        }
      ]
    };

    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'}
      ]
    };

    const subMenuView = (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true')
      ? subMenuViewDev
      : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: 'D&ownload',
            accelerator: 'Ctrl+O',
            click: () => this.clickOnDownload()
          },
          {type: 'separator'},
          {
            label: '&Quit',
            accelerator: 'Ctrl+Q',
            click: () => this.clickOnQuit()
          }
        ]
      },
      {
        label: '&Edit',
        submenu: [
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'}
        ]
      },
      {
        label: '&View',
        submenu:
          (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true')
            ? [
              {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                }
              },
              {type: 'separator'},
              {
                label: '&Reload',
                click: () => {
                  this.mainWindow.webContents.reload();
                }
              },
              {
                label: 'Toggle &Developer Tools',
                click: () => {
                  this.mainWindow.webContents.toggleDevTools();
                }
              }
            ]
            : [
              {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                }
              }
            ]
      },
      {
        label: '&Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('https://www.upfiring.com');
            }
          },
          {
            label: 'About',
            click: () => this.clickOnAbout()
          }
        ]
      }
    ];

    return templateDefault;
  }

  clickOnAbout() {
    dialog.showMessageBox(this.mainWindow, {
      title: 'About',
      message: `Version: ${updateVersion.version}`,
      detail: 'https://www.upfiring.com',
      icon: nativeImage.createFromPath(path.join(__dirname, 'assets', 'images', 'logo.png'))
    });
  }

  clickOnQuit() {
    app.__isQuiting = true;
    app.quit();
  }

  clickOnDownload() {
    this.mainWindow.send(IPC_MENU_DOWNLOAD);
  }
}

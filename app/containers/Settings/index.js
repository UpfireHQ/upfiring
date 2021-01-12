import { connect } from 'react-redux';

import React from 'react';
import SettingsPage from './components/SettingsPage';
import { checkVersionStory, setAction } from './actions';

import { ipcRenderer } from 'electron';
import { IPC_AUTO_START, IPC_UPDATE_SYS_TRAY } from '../../constants/ipc';

const mapDispatchToProps = (dispatch) => ({
  setAutoLaunch: (value) => {
    dispatch(setAction({key: 'autoLaunch', value}));
    ipcRenderer.send(IPC_AUTO_START, value);
  },
  setMinimizeOnClose: (value) => {
    dispatch(setAction({key: 'minimizeOnClose', value}));
    ipcRenderer.send(IPC_UPDATE_SYS_TRAY, value);
  },
  setCheckUpdatesOnApplicationStart: (value) => {
    dispatch(setAction({key: 'checkUpdatesOnApplicationStart', value}));
  },
  checkNewVersion: () => checkVersionStory(dispatch)
});

const mapStateToProps = (state) => {
  const settings = state.settings.toJS();
  const {updateTime} = state.app.toJS();
  return {
    ...settings,
    updateTime
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);

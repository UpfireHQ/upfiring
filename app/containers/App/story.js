import { setUpdateAction, showUpdateModalAction, updateProgressAction } from './actions';
import { checkNewVersion } from '../../utils/appUpdate';
import { ipcRenderer } from 'electron';
import { IPC_UPDATE_INSTALL } from '../../constants';
import logger from '../../utils/logger';

export const checkNewVersionStory = async (dispatch) => {
  try {
    const update = await checkNewVersion();
    dispatch(setUpdateAction(update));

    if (update) {
      dispatch(showUpdateModalAction(true));
      return true;
    }
  } catch (e) {
    logger.warn('[Check Version]', e.message);
  }
  return false;
};

export const updateProgressStory = async (dispatch, progress, done = false) => {
  if (done) {
    dispatch(updateProgressAction(false));
    dispatch(showUpdateModalAction(false));
  } else {
    const percent = progress ? Math.round(progress * 100) : 0;
    dispatch(updateProgressAction({percent, progress, done}));
  }
};

export const downloadUpdateStory = async (dispatch, update) => {
  if (update && update.url) {
    ipcRenderer.send(IPC_UPDATE_INSTALL, update.url);
  }
};

export const abortDownloadUpdateStory = async (dispatch) => {
  dispatch(updateProgressAction());
};

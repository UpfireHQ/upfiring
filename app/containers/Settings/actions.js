import { createAction } from 'redux-actions';
import { CHECK_VERSION, SET } from './constants';
import { checkNewVersionStory } from '../App/story';
import { commonAlertStory } from '../Alerts/story';
import trans from '../../translations';
import updateConfig from '../../update-version';
import logger from '../../utils/logger';

export const setAction = createAction(SET);

export const checkVersionAction = createAction(CHECK_VERSION);

export const checkVersionStory = async (dispatch) => {
  dispatch(checkVersionAction(true));
  try {
    if (!await checkNewVersionStory(dispatch)) {
      commonAlertStory(dispatch, {
        message: trans('settings.NewVersionNotAvailable', {version: updateConfig.version})
      });
    }
  } catch (e) {
    logger.warn('[Settings]', e.message);
  }
  dispatch(checkVersionAction(false));
};

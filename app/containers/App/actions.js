import { createAction } from 'redux-actions';
import {
  ADD_STATISTIC,
  CHECK_DISK_SPACE,
  INTERNET_CONNECTION,
  UPDATE,
  UPDATE_MODAL,
  UPDATE_PROGRESS
} from './constants';

export const checkDiskSpaceAction = createAction(CHECK_DISK_SPACE, async (payload) => checkDiskSpaceAction(payload));

export const internetConnectionAction = createAction(INTERNET_CONNECTION);

export const addStatisticAction = createAction(ADD_STATISTIC);

export const setUpdateAction = createAction(UPDATE);

export const showUpdateModalAction = createAction(UPDATE_MODAL);

export const updateProgressAction = createAction(UPDATE_PROGRESS);

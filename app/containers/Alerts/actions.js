import { createAction } from 'redux-actions';
import {
  CLOSE_COMMON_ALERT,
  CLOSE_COMMON_CONFIRMATION,
  CLOSE_CONFIRMATION,
  CLOSE_DELETE,
  CLOSE_MODAL,
  CLOSE_NOTIFICATION,
  CLOSE_WARNING,
  SHOW_COMMON_ALERT,
  SHOW_COMMON_CONFIRMATION,
  SHOW_CONFIRMATION,
  SHOW_DELETE,
  SHOW_MODAL,
  SHOW_NOTIFICATION,
  SHOW_WARNING,
  TOGGLE_INTERNET_CONNECTION
} from './constants';

export const toggleNoInternetAction = createAction(TOGGLE_INTERNET_CONNECTION);

export const showCommonAlertAction = createAction(SHOW_COMMON_ALERT);
export const closeCommonAlertAction = createAction(CLOSE_COMMON_ALERT);

export const showNotificationAction = createAction(
  SHOW_NOTIFICATION,
  ({title, subtitle, buttonText}) => ({title, subtitle, buttonText})
);
export const closeNotificationAction = createAction(CLOSE_NOTIFICATION);

export const showCommonConfirmationAction = createAction(
  SHOW_COMMON_CONFIRMATION,
  ({callback, title, subtitle, buttonText}) => ({callback, title, subtitle, buttonText})
);
export const closeCommonConfirmationAction = createAction(CLOSE_COMMON_CONFIRMATION);

export const showConfirmationAction = createAction(
  SHOW_CONFIRMATION,
  ({callback, children}) => ({callback, children})
);
export const closeConfirmationAction = createAction(CLOSE_CONFIRMATION);

export const showModalAction = createAction(
  SHOW_MODAL,
  ({callback, children}) => ({callback, children})
);
export const closeModalAction = createAction(CLOSE_MODAL);

export const showDeleteAction = createAction(
  SHOW_DELETE,
  ({callback, title, subtitle}) => ({callback, title, subtitle})
);
export const closeDeleteAction = createAction(CLOSE_DELETE);

export const showWarningAction = createAction(SHOW_WARNING);
export const closeWarningAction = createAction(CLOSE_WARNING);

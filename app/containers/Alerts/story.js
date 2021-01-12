import {
  showCommonAlertAction,
  showCommonConfirmationAction,
  showConfirmationAction,
  showDeleteAction,
  showModalAction,
  showNotificationAction,
  showWarningAction
} from './actions';

export const commonAlertStory = (dispatch, payload) => dispatch(showCommonAlertAction(payload));

export const notificationAlertStory = (dispatch, payload) => dispatch(showNotificationAction(payload));

export const commonConfirmationStory = (dispatch, payload) => {
  return new Promise(resolve => {
    dispatch(showCommonConfirmationAction({...payload, callback: resolve}));
  });
};

export const confirmationStory = (dispatch, payload) => {
  return new Promise(resolve => {
    dispatch(showConfirmationAction({children: payload, callback: resolve}));
  });
};

export const alertConfirmationStory = (dispatch, payload) => {
  return new Promise(resolve => {
    dispatch(showModalAction({children: payload, callback: resolve}));
  });
};

export const deleteConfirmationStory = (dispatch, payload) => {
  return new Promise(resolve => {
    dispatch(showDeleteAction({...payload, callback: resolve}));
  });
};

export const warningConfirmationStory = (dispatch) => {
  return new Promise(resolve => {
    dispatch(showWarningAction(resolve));
  });
};

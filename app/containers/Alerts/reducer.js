import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
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

const initialState = fromJS({
  commonAlerts: [],
  notifications: [],
  commonConfirmations: [],
  confirmations: [],
  modals: [],
  deletes: [],
  noInternet: false,
  warnings: []
});

export default typeToReducer({
  [TOGGLE_INTERNET_CONNECTION]: (state, action) => {
    return state.set('noInternet', Boolean(action.payload));
  },

  [SHOW_COMMON_ALERT]: (state, {payload}) => {
    const commonAlerts = state.get('commonAlerts').toJS();
    commonAlerts.push((typeof payload === 'string') ? {title: payload} : payload);

    return state.set('commonAlerts', fromJS(commonAlerts));
  },

  [CLOSE_COMMON_ALERT]: (state) => {
    const commonAlerts = state.get('commonAlerts').toJS();
    commonAlerts.shift();

    return state.set('commonAlerts', fromJS(commonAlerts));
  },

  [SHOW_NOTIFICATION]: (state, action) => {
    const notifications = state.get('notifications').toJS();
    notifications.push(action.payload);

    return state.set('notifications', fromJS(notifications));
  },

  [CLOSE_NOTIFICATION]: (state) => {
    const notifications = state.get('notifications').toJS();
    notifications.shift();

    return state.set('notifications', fromJS(notifications));
  },

  [SHOW_COMMON_CONFIRMATION]: (state, action) => {
    const commonConfirmations = state.get('commonConfirmations').toJS();
    commonConfirmations.push(action.payload);

    return state.set('commonConfirmations', fromJS(commonConfirmations));
  },

  [CLOSE_COMMON_CONFIRMATION]: (state) => {
    const commonConfirmations = state.get('commonConfirmations').toJS();
    commonConfirmations.shift();

    return state.set('commonConfirmations', fromJS(commonConfirmations));
  },

  [SHOW_CONFIRMATION]: (state, action) => {
    const confirmations = state.get('confirmations').toJS();
    confirmations.push(action.payload);

    return state.set('confirmations', fromJS(confirmations));
  },

  [CLOSE_CONFIRMATION]: (state) => {
    const confirmations = state.get('confirmations').toJS();
    confirmations.shift();

    return state.set('confirmations', fromJS(confirmations));
  },

  [SHOW_MODAL]: (state, action) => {
    const modals = state.get('modals').toJS();
    modals.push(action.payload);

    return state.set('modals', fromJS(modals));
  },

  [CLOSE_MODAL]: (state) => {
    const modals = state.get('modals').toJS();
    modals.shift();

    return state.set('modals', fromJS(modals));
  },

  [SHOW_DELETE]: (state, action) => {
    const deletes = state.get('deletes').toJS();
    deletes.push(action.payload);

    return state.set('deletes', fromJS(deletes));
  },

  [CLOSE_DELETE]: (state) => {
    const deletes = state.get('deletes').toJS();
    deletes.shift();

    return state.set('deletes', fromJS(deletes));
  },

  [SHOW_WARNING]: (state, action) => {
    const warnings = state.get('warnings').toJS();
    warnings.push(action.payload);

    return state.set('warnings', fromJS(warnings));
  },

  [CLOSE_WARNING]: (state) => {
    const warnings = state.get('warnings').toJS();
    warnings.shift();

    return state.set('warnings', fromJS(warnings));
  }
}, initialState);


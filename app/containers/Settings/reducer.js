import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { CHECK_VERSION, SET } from './constants';
import { appStore } from '../../utils/localStorage';

const initialState = fromJS({
  autoLaunch: appStore.get('autoLaunch'),
  minimizeOnClose: appStore.get('minimizeOnClose'),
  checkUpdatesOnApplicationStart: appStore.get('checkUpdatesOnApplicationStart'),
  lastUpdate: appStore.get('lastUpdate')
});

export default typeToReducer({

  [SET]: (state, action) => {
    const {key, value} = action.payload;
    return state.set(key, value);
  },

  [CHECK_VERSION]: (state, {payload}) => {
    return payload ? state.set('checkVersion', payload) : state.delete('checkVersion');
  }

}, initialState);

import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import {
  ADD_STATISTIC,
  CHECK_DISK_SPACE,
  INTERNET_CONNECTION,
  UPDATE,
  UPDATE_MODAL,
  UPDATE_PROGRESS
} from './constants';

import { appStore } from '../../utils/localStorage';
import logger from '../../utils/logger';

const initialState = fromJS({
  statistic: appStore.get('statistic'),
  internetConnection: true
});

export default typeToReducer({
  [INTERNET_CONNECTION]: (state, {payload}) => {
    logger.debug('INTERNET_CONNECTION', payload);
    return state.set('internetConnection', payload);
  },

  [CHECK_DISK_SPACE]: (state, {payload}) => {
    return state.set('diskSpace', fromJS(payload));
  },

  [ADD_STATISTIC]: (state, {payload}) => {
    return state.update('statistic', (map) => map.withMutations(statistic => {
      Object.keys(payload || {}).forEach(key => {
        statistic.update(key, value => Number(value + payload[key]));
      });
    }));
  },

  [UPDATE]: (state, {payload}) => {
    return state.withMutations(map => {
      map.set('update', payload)
        .set('updateTime', Date.now());
    });
  },

  [UPDATE_MODAL]: (state, {payload}) => {
    return payload ? state.set('updateModal', Boolean(payload)) : state.delete('updateModal');
  },

  [UPDATE_PROGRESS]: (state, {payload}) => {
    return payload ? state.set('updateProgress', payload) : state.delete('updateProgress');
  }
}, initialState);

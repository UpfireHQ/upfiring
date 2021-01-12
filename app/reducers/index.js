// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { webTorrentReducer as webTorrent } from './webTorrent';
import alerts from '../containers/Alerts/reducer';
import app from '../containers/App/reducer';
import uploads from '../containers/Uploads/reducer';
import downloads from '../containers/Downloads/reducer';
import completed from '../containers/Completed/reducer';
import wallet from '../containers/Wallet/reducer';
import settings from '../containers/Settings/reducer';

const rootReducer = combineReducers({
  router,
  webTorrent,
  alerts,
  app,
  uploads,
  downloads,
  completed,
  wallet,
  settings
});

export default rootReducer;

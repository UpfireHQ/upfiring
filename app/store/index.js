import { configureStore, history } from './configureStore';
import { appStore, torrentStore, walletStore } from '../utils/localStorage';

export const store = configureStore();

export const dispatch = store.dispatch;

export const getState = (key) => {
  const state = store.getState();

  return state[key] && (state[key].toJS && state[key].toJS() || state[key]);
};

export { history };

/* save store to files */

let _storeReady = false, _timerReady = false;

store.subscribe(() => save(true, false));
setInterval(() => save(false, true), 5 * 1000);

export const save = (storeReady = false, timerReady = false) => {
  _storeReady = _storeReady || storeReady;
  _timerReady = _timerReady || timerReady;

  if (_storeReady && _timerReady) {
    const {app, wallet, settings, webTorrent} = store.getState();
    saveTorrentStore(webTorrent);
    saveWalletStore(wallet);
    saveAppStore(settings, app);
    _storeReady = false;
    _timerReady = false;
  }
};

const saveWalletStore = (state) => {
  const address = state.get('address');
  const value = state.get(address);

  if (value && value.toJS) {
    walletStore.update(value.toJS());
  } else {
    walletStore.clear();
  }
  walletStore.flush();
};

const saveAppStore = (settings, app) => {
  appStore
    .update({
      ...app.toJS(),
      ...settings.toJS()
    })
    .flush();
};

const saveTorrentStore = (state) => {
  torrentStore
    .update(state.toJS(), true)
    .flush();
};

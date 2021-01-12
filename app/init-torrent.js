import { dispatch, getState } from './store';
import { client, initTorrentClient, requestInfoTorrentsWithoutToken } from './utils/torrent';
import { initUploadTorrentsStory } from './containers/Uploads/story';
import { initDownloadTorrentsStory } from './containers/Downloads/story';
import { initCompletedTorrentsStory } from './containers/Completed/story';
import { ipcRenderer } from 'electron';
import { IPC_CHECK_UPDATE, IPC_MENU_DOWNLOAD, IPC_OPEN_FILE, IPC_PROGRESS, IPC_PROGRESS_DONE } from './constants';
import { dispatchTorrentStatsAction, ipcMenuDownloadStory, ipcOpenFileStory } from './utils/torrent/store';
import { checkNewVersionStory, updateProgressStory } from './containers/App/story';
import logger from './utils/logger';

let _requestInterval = null;
let _torrentInterval = null;

export default () => {

  const webTorrent = getState('webTorrent') || {torrents: []};

  initTorrentClient(webTorrent);

  initUploadTorrentsStory(dispatch, webTorrent)
    .catch(e => logger.error(e));

  initDownloadTorrentsStory(dispatch, webTorrent)
    .catch(e => logger.error(e));

  initCompletedTorrentsStory(dispatch, webTorrent)
    .catch(e => logger.error(e));

  ipcRenderer.on(IPC_OPEN_FILE, (event, data) => ipcOpenFileStory(data));

  ipcRenderer.on(IPC_MENU_DOWNLOAD, () => ipcMenuDownloadStory());

  ipcRenderer.on(IPC_CHECK_UPDATE, () => checkNewVersionStory(dispatch));

  ipcRenderer.on(IPC_PROGRESS, (event, value) => updateProgressStory(dispatch, value));

  ipcRenderer.on(IPC_PROGRESS_DONE, () => updateProgressStory(dispatch, 1, true));

  clearInterval(_requestInterval);
  _requestInterval = setInterval(() => {
    try {
      logger.debug('** requestInfoTorrentsWithoutToken');
      requestInfoTorrentsWithoutToken(getState('webTorrent') || {torrents: []});
    } catch (e) {
      logger.warn(e && e.message);
    }
  }, 5 * 60 * 1000); // 5min
  requestInfoTorrentsWithoutToken(getState('webTorrent') || {torrents: []});

  clearInterval(_torrentInterval);
  _torrentInterval = setInterval(() => {
    Array.from(client && client.torrents || [])
      .map(torrent => dispatchTorrentStatsAction(torrent));
  }, 5 * 1000);

}


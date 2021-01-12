import { push } from 'react-router-redux';
import routes from '../../constants/routes';
import { redirectAfterSetWalletAction } from '../Wallet/actions';
import checkDiskSpace from 'check-disk-space';
import trans from '../../translations';
import { encryptFiles, fileEntitiesSize, writeTorrentFile } from '../../utils/file';
import { alertConfirmationStory, deleteConfirmationStory } from '../Alerts/story';
import {
  clearUploadFilesAction,
  createUploadTorrentAction,
  generateTorrentProgressAction,
  generateTorrentStatusAction,
  removeUploadTorrentAction,
  setUploadTorrentsAction
} from './actions';
import {
  TORRENT_TYPE_UPLOAD,
  TS_GENERATION_ENCRYPTED,
  TS_GENERATION_TORRENT,
  TS_GENERATION_TORRENT_FAILED
} from '../../constants';
import { randomString } from '../../utils/crypt/crypto.factory';
import { FilesProgress } from '../../utils/files-progress';
import { generateTorrentFile, initTorrentsByType, removeClientTorrent } from '../../utils/torrent';
import React from 'react';
import { addWebTorrentAction, removeWebTorrentAction } from '../../reducers/webTorrent/actions';
import { getTorrentComment, getTorrentFilePath } from '../../utils/torrent/helpers';
import { addStatisticAction } from '../App/actions';
import { shell } from 'electron';
import logger from '../../utils/logger';

export const routeToWalletStory = async (dispatch) => {
  dispatch(push(routes.WALLET));
  dispatch(redirectAfterSetWalletAction(routes.UPLOADS));
};

export const createUploadTorrentStory = async (dispatch, payload) => {
  dispatch(generateTorrentStatusAction(TS_GENERATION_ENCRYPTED));
  const {path, files, name, cost: price, description, wallet} = payload;

  const owner = wallet.address;
  const createdAt = Date.now();
  const type = TORRENT_TYPE_UPLOAD;

  const filesSize = fileEntitiesSize(files);
  dispatch(createUploadTorrentAction({createdAt, name, price, description, size: filesSize}));

  const ds = await checkDiskSpace(path);

  if (ds.free <= filesSize) {
    dispatch(generateTorrentStatusAction());
    dispatch(removeUploadTorrentAction({createdAt}));
    return alertConfirmationStory(dispatch, trans('upload.space'));
  }

  dispatch(clearUploadFilesAction());

  try {
    const token = randomString(30);

    const progress = new FilesProgress(files, (payload) => dispatch(generateTorrentProgressAction(payload)));
    dispatch(generateTorrentProgressAction(progress.progress));

    const encryptedFiles = await encryptFiles(files, path, name, token, progress.listener);
    progress.destroy();

    dispatch(generateTorrentProgressAction());
    dispatch(generateTorrentStatusAction(TS_GENERATION_TORRENT));

    const comment = getTorrentComment(name, description, Number(price), owner);
    const {infoHash, torrentFile, length: size} = await generateTorrentFile(path, encryptedFiles, name, comment, createdAt);
    const torrentFilePath = getTorrentFilePath(path, name);
    writeTorrentFile(torrentFilePath, torrentFile);

    dispatch(addWebTorrentAction({infoHash, path, name, description, size, price, createdAt, token, owner, type}));
    dispatch(createUploadTorrentAction({createdAt, infoHash}));
    dispatch(generateTorrentStatusAction());
    dispatch(addStatisticAction({upload: Number(size)}));
    shell.showItemInFolder(torrentFilePath);
  } catch (e) {
    logger.warn(e);
    dispatch(removeUploadTorrentAction({createdAt}));
    dispatch(generateTorrentProgressAction());
    return dispatch(generateTorrentStatusAction(TS_GENERATION_TORRENT_FAILED));
  }
};

export const removeUploadTorrentStory = async (dispatch, payload) => {
  const {infoHash, createdAt, name: subtitle} = payload;
  const title = trans('remove.torrent');

  const confirm = await deleteConfirmationStory(dispatch, {title, subtitle});

  if (confirm) {
    dispatch(removeUploadTorrentAction({createdAt, mark: true}));

    try {
      await removeClientTorrent(infoHash);
      dispatch(removeUploadTorrentAction({createdAt}));
      dispatch(removeWebTorrentAction({infoHash}));
    } catch (e) {
      logger.warn(e);
      return dispatch(removeUploadTorrentAction({createdAt, mark: false}));
    }
  }
};

export const initUploadTorrentsStory = async (dispatch, store) => {
  const torrents = initTorrentsByType(TORRENT_TYPE_UPLOAD, store);
  dispatch(setUploadTorrentsAction(torrents));
};

import { connect } from 'react-redux';

import UploadsPage from './components/UploadsPage';
import { createUploadTorrentStory, removeUploadTorrentStory, routeToWalletStory } from './story';
import { clearUploadFilesAction, setUploadFilesAction } from './actions';
import { dispatchPauseTorrentAction, dispatchResumeTorrentAction } from '../../utils/torrent/store';

const mapDispatchToProps = (dispatch) => ({
  onRouteToWallet: () => routeToWalletStory(dispatch),
  onUploadTorrent: (payload) => dispatch(setUploadFilesAction(payload)),
  onCancelUploadTorrent: (payload) => dispatch(clearUploadFilesAction(payload)),
  onCreateUploadTorrent: (payload) => createUploadTorrentStory(dispatch, payload),
  onDeleteUploadTorrent: (payload) => removeUploadTorrentStory(dispatch, payload),

  onResumeTorrent: (infoHash) => dispatchResumeTorrentAction(infoHash),
  onPauseTorrent: (infoHash) => dispatchPauseTorrentAction(infoHash)
});

const mapStateToProps = (state) => {
  const {app, wallet, webTorrent, uploads} = state;
  const currWallet = wallet.get(wallet.get('address'));

  return {
    internetConnection: app.get('internetConnection'),
    disableTransaction: app.get('disableTransaction'),
    wallet: currWallet && currWallet.toJS && currWallet.toJS(),
    webTorrent: webTorrent && webTorrent.toJS && webTorrent.toJS(),
    ...(uploads && uploads.toJS && uploads.toJS())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadsPage);

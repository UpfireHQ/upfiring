import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import App from './components/App';
import { internetConnectionAction, showUpdateModalAction } from './actions';
import { abortDownloadUpdateStory, downloadUpdateStory } from './story';
import { getGasPriceAction } from '../Wallet/actions';

const mapDispatchToProps = (dispatch) => ({
  routerTo: (path) => dispatch(push(path)),
  onInternetConnection: (value) => dispatch(internetConnectionAction(value)),
  onCloseUpdateModalAction: () => dispatch(showUpdateModalAction(false)),
  onDownloadUpdate: (payload) => downloadUpdateStory(dispatch, payload),
  onAbortDownloadUpdate: () => abortDownloadUpdateStory(dispatch),
  onGasPrice: () => dispatch(getGasPriceAction())
});

const mapStateToProps = (state) => {
  return {
    router: state.router,
    app: state.app.toJS(),
    webTorrent: state.webTorrent.toJS(),
    wallet: state.wallet.toJS()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// @flow
import * as React from 'react';
import { AppContainer, MainAppContainer } from '../../../style/containers';
import { SideWrapper } from './style';
import SideMenu from './SideMenu';
import { DownloadSpeedProgress, UploadSpeedProgress } from '../../../components/graphs';
import Alerts from '../../Alerts';
import { resumeClientTorrents } from '../../../utils/torrent';
import DownloadUpdateModal from './DownloadUpdateModal';

type Props = {
  children: React.Node,
  router: any,
  routerTo: any,
  app: any,
  wallet: any,
  onInternetConnection: any,
  onCloseUpdateModalAction: any,
  onDownloadUpdate: any,
  onAbortDownloadUpdate: any,
  onGasPrice: any,
};

export default class App extends React.Component<Props> {
  props: Props;
  interval = null;

  componentDidMount() {
    const {onGasPrice} = this.props;

    this.interval = setInterval(() => {
      this.checkInternetConnection();
    }, 1000);

    onGasPrice && onGasPrice();
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  checkInternetConnection() {
    const {onInternetConnection, app} = this.props;

    if ((app && app.internetConnection) !== navigator.onLine) {
      onInternetConnection && onInternetConnection(navigator.onLine);
      navigator.onLine && resumeClientTorrents();
    }
  }

  render() {
    const {
      router, routerTo, children, app,
      onCloseUpdateModalAction,
      onDownloadUpdate,
      onAbortDownloadUpdate
    } = this.props;

    return (
      <MainAppContainer onDrop={() => null}>
        <SideWrapper>
          <SideMenu router={router} routerTo={routerTo}/>
          <div>
            <UploadSpeedProgress/>
            <DownloadSpeedProgress/>
          </div>
        </SideWrapper>
        <AppContainer>
          <React.Fragment>{children}</React.Fragment>
          <Alerts/>
          {app && app.update && app.updateModal && (
            <DownloadUpdateModal update={app.update}
                                 updateProgress={app.updateProgress}
                                 onAbortDownloadUpdate={onAbortDownloadUpdate}
                                 onCloseUpdateModalAction={onCloseUpdateModalAction}
                                 onDownloadUpdate={onDownloadUpdate}/>
          )}
        </AppContainer>
      </MainAppContainer>
    );
  }
}

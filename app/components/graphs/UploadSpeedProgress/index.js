import React, { PureComponent } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import trans from '../../../translations/index';
import { TIME_DOWNLOAD_SPEED } from '../../../constants/time';
import Speed from '../Speed';

import { client } from '../../../utils/torrent/index';
import { lnProgres } from '../../../utils/lnProgress';

const SpeedWrapper = styled.div`
  padding-bottom: 1em;
`;

export default class UploadSpeedProgress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploadSpeed: 0,
      AmChartsObj: require('@amcharts/amcharts3-react')
    };
  }

  componentWillMount() {
    const intervalId = setInterval(this.syncUploadSpeed, TIME_DOWNLOAD_SPEED);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    const {intervalId} = this.state;
    intervalId && clearInterval(intervalId);
    this.setState = () => {}
  }

  syncUploadSpeed = () => {
    this.setState({
      uploadSpeed: client.uploadSpeed
    });
  };

  get AmChartsObj() {
    return this.state.AmChartsObj;
  }

  get uploadSpeed() {
    return this.state.uploadSpeed;
  }

  get increase() {
    const lnDownload = lnProgres(this.uploadSpeed);
    return lnDownload ? (14 * (lnDownload / 10)) : 0;
  }

  render() {
    return (
      <SpeedWrapper>
        <Speed
          AmChartsObj={this.AmChartsObj}
          speedIndicator={this.increase}
          speed={this.uploadSpeed}
          activeColor={colors.activeRed}
          title={trans('Progress.Popup.Upload')}
        />
      </SpeedWrapper>
    );
  }
}

import React from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';
import { bytesValue } from '../../../utils/bytesformat';

const ProgressImage = styled.div`
   text-align: center;
   position: relative;
`;

const Index = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 1.8em;
`;

const SpeedValue = styled.div`
  color: ${colors.titleWhite};
  font-weight: bold;
  font-size: ${fonts.mediumSize};
  text-shadow: 4px 4px 20px #000000, 4px -4px 20px #000000, -4px 4px 20px #000000, -4px -4px 20px #000000;
`;

const SpeedUnits = styled.div`
  color: ${colors.speedDescription};
  font-size: ${fonts.microSize};
  padding-top: .8em;
  > div {
    text-align: center;
    text-transform: lowercase;
    font-weight: bold;
  }
`;

export default class extends React.PureComponent {
  render() {
    const {
      AmChartsObj,
      activeColor,
      speedIndicator,
      speed = 0,
      title
    } = this.props;

    const config = {
      type: 'gauge',
      theme: 'light',
      axes: [
        {
          axisAlpha: 0,
          tickAlpha: 0,
          labelsEnabled: false,
          startValue: 0,
          endValue: 100,
          startAngle: -135,
          endAngle: 135,
          bands: [
            {
              color: 'rgba(160, 164, 201, .2)',
              startValue: 0,
              endValue: 100,
              radius: '100%',
              innerRadius: '0%'
            }, {
              color: activeColor,
              startValue: 0,
              endValue: speedIndicator > 140 ? 140 : speedIndicator,
              radius: '100%',
              innerRadius: '0%',
              balloonText: '80%'
            }]
        }],
      export: {
        enabled: true
      }
    };
    let Chart = null;

    if (AmCharts && (typeof AmCharts.AmAngularGauge !== 'undefined') &&
      AmChartsObj) {
      Chart = (
        <AmChartsObj.React
          style={{
            width: '5em',
            height: '5em'
          }}
          options={config}
        />
      );
    }

    return (
      <ProgressImage>
        {Chart}
        <Index>
          <SpeedValue>
            {bytesValue(speed).split(' ')[0]}
          </SpeedValue>
          <SpeedUnits>
            <div>
              {bytesValue(speed).split(' ')[1]}/s
            </div>
            <div>
              {title}
            </div>
          </SpeedUnits>
        </Index>
      </ProgressImage>
    );
  }
}

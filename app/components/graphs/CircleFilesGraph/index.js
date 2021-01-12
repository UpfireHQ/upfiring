import React, { PureComponent } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';
import trans from '../../../translations';
import { bytesValue } from '../../../utils/bytesformat';

const ProgressImage = styled.div`
   text-align: center;
   position: relative;
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   > svg {
       padding: 0 !important;
      overflow: visible;
      transform-origin: 0;
      display: block;
       > circle {
         fill: transparent;  
    }
   }
`;

const TrafficWrapper = styled.div`
  color: ${colors.brandSecondary};
  position: absolute;
  width: 100%;
  font-weight: 300;
`;

const TrafficDescription = styled.div`
  font-size: ${fonts.smallSize};
  text-align: center;
  color: ${colors.tokenWalletDesc};
`;

const TrafficValue = styled.div`
  font-size: ${fonts.bigSize};
  text-align: center;
  color: ${colors.titleWhite};
  padding: 0.2em 0;
`;

const staticConfig = {
  type: 'pie',
  theme: 'light',
  valueField: 'value',
  radius: '42%',
  innerRadius: '90%',
  accessible: false,
  labelsEnabled: false,
  export: {
    enabled: true
  }
};

export default class CircleFilesGraph extends PureComponent {

  get additionalConfig() {
    const {upload, download, seed} = this.props;
    return Number(upload) === 0 && Number(download) === 0 && Number(seed) === 0 ? {
      dataProvider: [
        {
          value: 1
        }
      ],
      colors: [colors.emptyGraphCircle],
      balloon: {
        enabled: false
      }
    } : {
      dataProvider: [
        {
          title: trans('wallet.graphs.Uploaded'),
          value: upload,
          color: colors.mainBlue,
          valueMB: bytesValue(upload),
          percent: Math.round((upload / (upload + download + seed)) * 100)
        }, {
          title: trans('wallet.graphs.Downloaded'),
          value: download,
          color: colors.lightRed,
          valueMB: bytesValue(download),
          percent: Math.round((download / (upload + download + seed)) * 100)
        }, {
          title: trans('wallet.graphs.Seeded'),
          value: seed,
          color: colors.secondaryBlue,
          valueMB: bytesValue(seed),
          percent: Math.round((seed / (upload + download + seed)) * 100)
        }
      ],
      colors: [colors.mainBlue, colors.lightRed, colors.secondaryBlue],
      titleField: 'title',
      colorField: 'color',
      balloon: {
        fixedPosition: false,
        adjustBorderColor: true,
        borderColor: colors.tooltipsBackground,
        color: colors.titleWhite,
        cornerRadius: 10,
        verticalPadding: 15,
        horizontalPadding: 15,
        borderThickness: 0,
        fillColor: colors.tooltipsBackground,
        fontSize: fonts.standardSize,
        textAlign: 'middle',
        minWidth: 100,
        fillAlpha: 1
      },
      balloonText: '<div>' +
        '<div style=\'color:[[color]]; padding-bottom: 5px;\'>[[title]]</div>' +
        '<div>[[percent]]% <span style=\'display: inline-block; border-left: 1px solid ' +
        colors.tabBorderRight +
        '; padding-left: 6px;\'>[[valueMB]]</span>' +
        '</div>' +
        '</div>'
    };
  }

  get statisticChart() {
    const {AmChartsObj} = this.props;
    const options = Object.assign(staticConfig, this.additionalConfig);

    return (AmChartsObj) && (
      <AmChartsObj.React
        style={{
          marginTop: '-0.5em !important',
          width: '100%',
          height: '10em'
        }}
        options={options}
      />
    );
  }

  get traffic() {
    const {upload, download, seed} = this.props;
    const all = bytesValue(Number(upload) + Number(download) + Number(seed));

    return (
      <TrafficWrapper>
        <TrafficDescription>
          {trans('wallet.graphs.TotalSize')}
        </TrafficDescription>
        <TrafficValue>{all.split(' ')[0]}</TrafficValue>
        <TrafficDescription>{all.split(' ')[1]}</TrafficDescription>
      </TrafficWrapper>
    );
  }

  render() {
    return (
      <ProgressImage>
        {this.traffic}
        {this.statisticChart}
      </ProgressImage>
    );
  }
}

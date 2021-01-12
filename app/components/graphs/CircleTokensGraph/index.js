import React, { PureComponent } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';
import { ufrFormat } from '../../../utils/math';
import trans from '../../../translations';

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

const SumWrapper = styled.div`
  color: ${colors.brandSecondary};
  position: absolute;
  width: 100%;
  font-weight: 300;
`;

const SumDescription = styled.div`
  font-size: ${fonts.standardSize};
  text-transform: uppercase;
  text-align: center;
  color: ${colors.tokenWalletDesc};
`;

const SumValue = styled.div`
  font-size: ${fonts.bigSize};
  text-align: center;
  color: ${colors.titleWhite};
  padding: 0.1em 0;
`;

export default class CircleTokensGraph extends PureComponent {

  get staticConfig() {
    return {
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
  }

  get additionalConfig() {
    const {totalSpending = 0, totalReceiving = 0} = this.props;

    return (Number(totalSpending) === 0 && Number(totalReceiving) === 0) ? {
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
          title: trans('wallet.graphs.Received'),
          value: ufrFormat(totalReceiving),
          color: colors.mainBlue
        }, {
          title: trans('wallet.graphs.Paid'),
          value: ufrFormat(totalSpending),
          color: colors.lightRed
        }
      ],
      colors: [colors.mainBlue, colors.lightRed],
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
      balloonText: '<div><div style=\'color:[[color]];padding-bottom: 5px;\'>[[title]]</div><div>[[value]] UFR</div></div>'
    };
  }

  get statisticChart() {
    const {AmChartsObj} = this.props;
    const options = Object.assign(this.staticConfig, this.additionalConfig);

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

  get summary() {
    const {totalSpending = 0, totalReceiving = 0} = this.props;

    let all = ufrFormat(Number(totalReceiving) - Number(totalSpending));
    if (all.length > 9 && all.indexOf('.') !== -1) {
      all = all.substr(0, all.indexOf('.'));
    }

    return (
      <SumWrapper>
        <SumDescription>
          {(all < 0) ? trans('wallet.minus') : ((all > 0) ? trans('wallet.plus') : '')}
        </SumDescription>
        <SumValue>{all}</SumValue>
        <SumDescription>{trans('popups.upload.UFR')}</SumDescription>
      </SumWrapper>
    );
  }

  render() {
    return (
      <ProgressImage>
        {this.summary}
        {this.statisticChart}
      </ProgressImage>
    );
  }
}

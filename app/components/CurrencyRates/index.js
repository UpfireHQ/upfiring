import React from 'react';
import styled from 'styled-components';
import trans from '../../translations';
import colors from '../../style/colors';
import { api } from '../../utils/api';
import logo from '../../assets/images/logo.png';
import fonts from '../../style/font-styles';
import { currencyToSize } from '../../utils/math';

const Index = styled.div`
  width: 356px;
  height: 212px;
  background-color: ${colors.tooltipsBackground};
  border-radius: 10px;
`;

const Head = styled.div`
  
`;

const HeadRates = styled.div`
  float: right;
  width: 67%;
  border: none;
  text-align: left;
  line-height: 22px;
  padding: 1em .5em;
`;

const Ufr = styled.div`
  font-size: ${fonts.middleSize};
  color: ${colors.mainBlue};
  padding-bottom: 4px;
`;

const Usd = styled.div`
  font-size: ${fonts.mediumSize};
  color: ${colors.fontPrimary};
  > span {
    padding-left: 5px;
    &.positive {
      color: ${colors.switchActive};
    }
    &.negative {
      color: ${colors.lightRed};
    }
  }
`;

const Btc = styled.div`
  font-size: ${fonts.smallSize};
  color: ${colors.inputLabel};
`;

const HeadLogo = styled.div`
  text-align:center;
  width: 33%;
  padding: 1em .5em;
  > img {
    max-width: 100%;
    width: 63px;
  }
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${colors.tooltipHr};
`;

const BodyLeftColumn = styled.div`
  text-align: center;
  width: 33%;
  padding: 17px 0;
  border-right: 1px solid ${colors.tooltipHr};
`;

const BodyCenterColumn = styled.div`
  text-align: center;
  width: 33%;
  padding: 17px 0;
  border-right: 1px solid ${colors.tooltipHr};
`;

const BodyRightColumn = styled.div`
  text-align: center;
  width: 33%;
  padding: 17px 0;
`;

const BodyTitle = styled.div`
  color: ${colors.fontPrimary};
  text-transform: uppercase;
  font-size: ${fonts.smallSize};
  padding: 5px;
`;

const BodyValue = styled.div`
  color: ${colors.fontPrimary};
  font-size: ${fonts.middleSize};
`;

const Footer = styled.div`
  border-top: 1px solid ${colors.tooltipHr};
  text-align: center;
  font-style: italic;
  padding: 5px 0;
  > a {
    font-size: ${fonts.microSize};
    text-decoration: none;
    color: ${colors.mainBlue};
    &:hover {
      color: ${colors.mainBlueHover};
    }
  }
`;

export default class extends React.PureComponent {
  state = {
    currencyData: null
  };

  getRatesPromise() {
    let aborted = false;

    return {
      abort: () => aborted = true,
      promise: api.get('https://api.coinmarketcap.com/v2/ticker/2178/?convert=BTC')
        .then((data) => aborted ? Promise.reject('abort') : data && data.data && data.data.data)
    };
  }

  componentWillMount() {
    const ratesPromise = this.getRatesPromise();

    ratesPromise.promise
      .then((data) => data && this.setState({currencyData: data}))
      .catch(() => {});

    this.setState({ratesPromise});
  }

  componentWillUnmount() {
    const {ratesPromise} = this.state;
    ratesPromise && ratesPromise.abort();
  }

  render() {
    const {currencyData} = this.state;
    return (currencyData &&
      <Index>
        <Head>
          <HeadRates>
            <Ufr>
              {trans('productName')} ({trans('popups.upload.UFR')})
            </Ufr>
            <Usd>
              {Number((currencyData.quotes.USD.price).toFixed(6))} USD
              <span className={currencyData.quotes.USD.percent_change_24h > 0 ? 'positive' : 'negative'}>
                ({currencyData.quotes.USD.percent_change_24h}%)
              </span>
            </Usd>
            <Btc>
              {currencyData.quotes.BTC.price} BTC
            </Btc>
          </HeadRates>
          <HeadLogo>
            <img src={logo}/>
          </HeadLogo>
        </Head>

        <Body>
        <BodyLeftColumn>
          <BodyTitle>
            {trans('currencyWidget.rank')}
          </BodyTitle>
          <BodyValue>
            {currencyData.rank}
          </BodyValue>
        </BodyLeftColumn>
        <BodyCenterColumn>
          <BodyTitle>
            {trans('currencyWidget.marketCap')}
          </BodyTitle>
          <BodyValue>
            ${currencyToSize(currencyData.quotes.USD.market_cap)}
          </BodyValue>
        </BodyCenterColumn>
        <BodyRightColumn>
          <BodyTitle>
            {trans('currencyWidget.volume24h')}
          </BodyTitle>
          <BodyValue>
            ${currencyToSize(currencyData.quotes.USD.volume_24h)}
          </BodyValue>
        </BodyRightColumn>
        </Body>

        <Footer>
          <a href="#">
            {trans('currencyWidget.footerLink')}
          </a>
        </Footer>
      </Index>
    );
  }
}

import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { history, store } from './store';
import './app.global.scss';
import initTorrent from './init-torrent';

initTorrent();
hydrate(
  <AppContainer>
    <Root store={store} history={history}/>
  </AppContainer>,
  document.getElementById('root'),
  () => {
    document.getElementById('introduction-screen').remove();
  }
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    initTorrent();
    render(
      <AppContainer>
        <NextRoot store={store} history={history}/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}


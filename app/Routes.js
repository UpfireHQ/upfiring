/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import Uploads from './containers/Uploads';
import Downloads from './containers/Downloads';
import Completed from './containers/Completed';
import Wallet from './containers/Wallet';
import Settings from './containers/Settings';

export default () => (
  <App>
    <Switch>
      <Redirect exact from='/' to={routes.UPLOADS}/>
      <Route exact path={routes.UPLOADS} component={Uploads}/>
      <Route exact path={routes.DOWNLOADS} component={Downloads}/>
      <Route exact path={routes.COMPLETED} component={Completed}/>
      <Route exact path={routes.WALLET} component={Wallet}/>
      <Route exact path={routes.SETTINGS} component={Settings}/>
    </Switch>
  </App>
);

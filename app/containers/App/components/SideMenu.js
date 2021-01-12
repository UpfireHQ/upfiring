import React, { Component } from 'react';
import { Logo, MenuIcon, MenuTooltip, Navigation } from './style';
import logo from '../../../assets/images/logo.png';
import trans from '../../../translations';
import routes from '../../../constants/routes';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlerToUploads = this.handlerRouterTo.bind(this, routes.UPLOADS);
    this.handlerToDownloads = this.handlerRouterTo.bind(this, routes.DOWNLOADS);
    this.handlerToCompleted = this.handlerRouterTo.bind(this, routes.COMPLETED);
    this.handlerToWallet = this.handlerRouterTo.bind(this, routes.WALLET);
    this.handlerToSettings = this.handlerRouterTo.bind(this, routes.SETTINGS);
  }

  handlerRouterTo(path) {
    const {routerTo, router} = this.props;
    !(router && router.location && router.location.pathname === path) && routerTo && routerTo(path);
  };

  isActive(path) {
    const {location} = this.props.router;
    return location && location.pathname === path;
  }

  render() {
    return (
      <div>
        <Logo src={logo}/>
        <Navigation>
          <li>
            <MenuIcon
              className="icon-ico-upload-active"
              active={this.isActive(routes.UPLOADS)}
              onClick={this.handlerToUploads}
            />
            <MenuTooltip>
              {trans('Upload.title')}
            </MenuTooltip>
          </li>
          <li>
            <MenuIcon
              className="icon-ico-download"
              active={this.isActive(routes.DOWNLOADS)}
              onClick={this.handlerToDownloads}
            />
            <MenuTooltip>
              {trans('download.title')}
            </MenuTooltip>
          </li>
          <li>
            <MenuIcon
              className="icon-ico-completed"
              active={this.isActive(routes.COMPLETED)}
              onClick={this.handlerToCompleted}
            />
            <MenuTooltip>
              {trans('Completed.title')}
            </MenuTooltip>
          </li>
          <li>
            <MenuIcon
              className="icon-ico-wallet"
              active={this.isActive(routes.WALLET)}
              onClick={this.handlerToWallet}
            />
            <MenuTooltip>
              {trans('stub.wallet.title')}
            </MenuTooltip>
          </li>
          <li>
            <MenuIcon
              className="icon-ico-settings"
              active={this.isActive(routes.SETTINGS)}
              onClick={this.handlerToSettings}
            />
            <MenuTooltip>
              {trans('settings.title')}
            </MenuTooltip>
          </li>
        </Navigation>
      </div>
    );
  }
}

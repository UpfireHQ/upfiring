import React, { PureComponent } from 'react';
import { PageHead } from '../../../../style/containers';
import {
  BtnDefault,
  CheckColumn,
  FullColumn,
  PageWrapper,
  PopUpProgressTitle,
  PopUpSubtitle,
  SettingName,
  SettingsTable
} from './style';
import PopUp from '../../../../components/PopUp';
import trans from '../../../../translations';
import Switch from '../../../../components/Switch';
import LoadingCube from '../../../../components/LoadingCube';
import moment from 'moment';

export default class SettingsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlerCheckForUpdates = (e) => {
    e.preventDefault();
    const {checkNewVersion} = this.props;
    checkNewVersion && checkNewVersion();
  };

  handlerChangeCheckboxAutoLaunch = (e, checked) => {
    const {setAutoLaunch} = this.props;
    setAutoLaunch(checked);
  };

  handlerChangeCheckboxMinimizeOnClose = (e, checked) => {
    const {setMinimizeOnClose} = this.props;
    setMinimizeOnClose(checked);
  };

  handlerChangeCheckboxCheckUpdatesOnApplicationStart = (e, checked) => {
    const {setCheckUpdatesOnApplicationStart} = this.props;
    setCheckUpdatesOnApplicationStart(checked);
  };

  get SearchProgressNewVersion() {
    return (
      <PopUp>
        <FullColumn>
          <LoadingCube/>
        </FullColumn>
        <PopUpProgressTitle>{trans('settings.updateChecking')}</PopUpProgressTitle>
        <PopUpSubtitle>
          {trans('settings.waiteMoment')}
        </PopUpSubtitle>
      </PopUp>
    );
  }

  render() {
    const {
      autoLaunch,
      minimizeOnClose,
      checkUpdatesOnApplicationStart,
      updateTime,
      checkVersion
    } = this.props;

    return (
      <PageWrapper>
        <PageHead>
          <div/>
          <div className="title">
            {trans('settings.title')}
          </div>
          <div/>
        </PageHead>
        <SettingsTable>
          <tbody>
          <tr>
            <SettingName>{trans('settings.autoLaunch')}</SettingName>
            <CheckColumn>
              <Switch
                name="autoLaunch"
                checked={autoLaunch}
                onChange={this.handlerChangeCheckboxAutoLaunch}
              />
            </CheckColumn>
          </tr>
          <tr>
            <SettingName>{trans('settings.minimizeOnClose')}</SettingName>
            <CheckColumn>
              <Switch
                name="minimizeOnClose"
                checked={minimizeOnClose}
                onChange={this.handlerChangeCheckboxMinimizeOnClose}
              />
            </CheckColumn>
          </tr>
          <tr>
            <SettingName>{trans('settings.checkUpdatesOnApplicationStart')}</SettingName>
            <CheckColumn>
              <Switch
                name="checkUpdatesOnApplicationStart"
                checked={checkUpdatesOnApplicationStart}
                onChange={this.handlerChangeCheckboxCheckUpdatesOnApplicationStart}
              />
            </CheckColumn>
          </tr>
          <tr>
            <SettingName>{trans('settings.manualUpdate')}</SettingName>
            <CheckColumn>
              {updateTime && moment(updateTime).calendar()}
              &nbsp;&nbsp;&nbsp;
              <BtnDefault onClick={this.handlerCheckForUpdates}>
                {trans('settings.checkForUpdates')}
              </BtnDefault>
            </CheckColumn>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          <tr className="empty">
            <td colSpan="2"/>
          </tr>
          </tbody>
        </SettingsTable>
        {checkVersion && this.SearchProgressNewVersion}
      </PageWrapper>
    );
  }
}

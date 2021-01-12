import React, { Component } from 'react';

import {
  Column,
  DetailsWrapper,
  Field,
  FileTbodyFirst,
  FileTbodyRow,
  FileTbodySecond,
  FileTheadFirst,
  FileTheadSecond,
  FullFlex,
  HalfFlexDetail,
  Menu,
  MenuLink,
  Nav,
  Row,
  SecondFlex,
  SpeedColumnFlex,
  ThirdFlex,
  TorrentInfoHeadAction,
  TorrentInfoHeadActions
} from './style';

import moment from 'moment';
import trans from '../../../../translations';

import { bytesToSize } from '../../../../utils/bytesformat';
import { convertMS } from '../../../../utils/timeconvert';
import { DETAIL_FILES, DETAIL_GENERAL, DETAIL_SPEED } from '../../../../constants';
import { client } from '../../../../utils/torrent';
import { getClientTorrentFullPath } from '../../../../utils/torrent/helpers';

const {shell} = require('electron');

export default class Details extends Component {
  state = {
    clientTorrent: null,
    path: null,
    tab: DETAIL_GENERAL
  };

  static getDerivedStateFromProps(props, state) {
    const {torrent} = props;
    const clientTorrent = client.get(torrent && torrent.infoHash);

    return {
      clientTorrent,
      path: clientTorrent && getClientTorrentFullPath(clientTorrent)
    };
  }

  handlerShowItemInFolder = () => {
    const {path} = this.state;
    path && shell.showItemInFolder(path);
  };

  handlerDeleteTorrent = () => {
    const {torrent, onDeleteTorrent} = this.props;
    onDeleteTorrent && onDeleteTorrent(torrent);
  };

  handlerTabGeneral = (e) => {
    e.preventDefault();
    this.setState({tab: DETAIL_GENERAL});
  };

  handlerTabFiles = (e) => {
    e.preventDefault();
    this.setState({tab: DETAIL_FILES});
  };

  handlerTabSpeed = (e) => {
    e.preventDefault();
    this.setState({tab: DETAIL_SPEED});
  };

  get GeneralTab() {
    const {torrent} = this.props;
    const {path} = this.state;

    return (
      <Column>
        <Row>
          <FullFlex>
            <SecondFlex>
              <p>{trans('details.Path')}</p>
            </SecondFlex>
            <HalfFlexDetail>
              <p>{path}</p>
            </HalfFlexDetail>
            <SecondFlex>
              <p>{trans('details.Size')}</p>
            </SecondFlex>
            <HalfFlexDetail>
              <p>{bytesToSize(torrent.size) || 0}</p>
            </HalfFlexDetail>
            <SecondFlex>
              <p>{trans('details.Price')}</p>
            </SecondFlex>
            <HalfFlexDetail>
              <p>{torrent.price} {trans('popups.upload.UFR')}</p>
            </HalfFlexDetail>
            <SecondFlex>
              <p>{trans('details.Created')}</p>
            </SecondFlex>
            <HalfFlexDetail>
              <p>{moment(torrent.createdAt).format('L LT')}</p>
            </HalfFlexDetail>
            {torrent.owner && (
              <SecondFlex>
                <p>{trans('details.Owner')}</p>
              </SecondFlex>
            )}
            {torrent.owner && (
              <HalfFlexDetail>
                <p>{torrent.owner}</p>
              </HalfFlexDetail>
            )}
            <SecondFlex>
              <p>{trans('details.Description')}</p>
            </SecondFlex>
            <HalfFlexDetail>
              <p>{torrent.description}</p>
            </HalfFlexDetail>
          </FullFlex>
        </Row>
      </Column>
    );
  }

  get SpeedTab() {
    const {torrent} = this.props;
    const clientTorrent = this.state.clientTorrent || {};

    const timeElapsed = (!clientTorrent.timeRemaining || clientTorrent.timeRemaining === Infinity)
      ? null
      : clientTorrent.timeRemaining;

    const timeRemaining = isFinite(clientTorrent.timeRemaining) && clientTorrent.timeRemaining;
    return (
      <Column>
        <Row>
          <FullFlex>
            <ThirdFlex>
              <SpeedColumnFlex>
                <p>{trans('details.TimeElapsed')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{timeElapsed && convertMS(timeElapsed) || '--'}
                </p>
              </HalfFlexDetail>
              <SpeedColumnFlex>
                <p>{trans('details.Downloaded')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{bytesToSize((clientTorrent.downloaded) || 0)}</p>
              </HalfFlexDetail>
              <SpeedColumnFlex>
                <p>{trans('details.DownloadSpeed')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{bytesToSize((clientTorrent.downloadSpeed) || 0, 0, 1)}</p>
              </HalfFlexDetail>
            </ThirdFlex>
            <ThirdFlex>
              <SpeedColumnFlex>
                <p>{trans('details.Remaining')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{timeRemaining && convertMS(timeRemaining) || '--'}
                </p>
              </HalfFlexDetail>
              <SpeedColumnFlex>
                <p>{trans('details.Uploaded')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{bytesToSize((clientTorrent.uploaded) || 0)}</p>
              </HalfFlexDetail>
              <SpeedColumnFlex><p>{trans('details.UploadSpeed')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{bytesToSize((clientTorrent.uploadSpeed) || 0, 0, 1)}</p>
              </HalfFlexDetail>
            </ThirdFlex>
            <ThirdFlex>
              <SpeedColumnFlex>
                <p>{trans('details.Wasted')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{bytesToSize((clientTorrent.received) || 0)}</p>
              </HalfFlexDetail>
              <SpeedColumnFlex>
                <p>{trans('details.Seeds')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{(torrent.seeds) || '--'}</p>
              </HalfFlexDetail>
              <SpeedColumnFlex>
                <p>{trans('details.Peers')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{(torrent.peers) || '--'}</p>
              </HalfFlexDetail>
              <SpeedColumnFlex>
                <p>{trans('details.ShareRatio')}</p>
              </SpeedColumnFlex>
              <HalfFlexDetail>
                <p>{(clientTorrent.ratio) || 0}</p>
              </HalfFlexDetail>
            </ThirdFlex>
          </FullFlex>
        </Row>
      </Column>
    );
  }

  get FilesTab() {
    const {clientTorrent} = this.state;

    return (
      <Column>
        <Row>
          <FullFlex>
            <FileTheadFirst>
              <p>{trans('details.FileName')}</p>
            </FileTheadFirst>
            <FileTheadSecond>
              <p>{trans('details.Size')}</p>
            </FileTheadSecond>
            {Array.from(clientTorrent && clientTorrent.files).map((file, i) => {
              return (
                <FileTbodyRow key={i}>
                  <FileTbodyFirst><p>{file.name}</p></FileTbodyFirst>
                  <FileTbodySecond><p>{bytesToSize(file.length)}</p>
                  </FileTbodySecond>
                </FileTbodyRow>
              );
            })}
          </FullFlex>
        </Row>
      </Column>
    );
  }

  get Menu() {
    const {tab} = this.state;

    return (
      <Menu>
        <Nav>
          <li>
            <MenuLink
              className={tab === DETAIL_GENERAL ? 'selected' : ''}
              onClick={this.handlerTabGeneral}
              href="#"
            >
              {trans('details.GeneralInfo')}
            </MenuLink>
          </li>
          <li>
            <MenuLink
              className={tab === DETAIL_FILES ? 'selected' : ''}
              onClick={this.handlerTabFiles}
              href="#"
            >
              {trans('details.Files')}
            </MenuLink>
          </li>
          <li>
            <MenuLink
              className={tab === DETAIL_SPEED ? 'selected' : ''}
              onClick={this.handlerTabSpeed}
              href="#"
            >
              {trans('details.Speed')}
            </MenuLink>
          </li>
        </Nav>
        <TorrentInfoHeadActions>
          <TorrentInfoHeadAction onClick={this.handlerShowItemInFolder}>
            <span className="icon-ico-find-f-ile"/>
          </TorrentInfoHeadAction>
          <TorrentInfoHeadAction onClick={this.handlerDeleteTorrent}>
            <span className="icon-ico-remove-file"/>
          </TorrentInfoHeadAction>
        </TorrentInfoHeadActions>
      </Menu>
    );
  }

  render() {
    const {tab} = this.state;
    const {torrent} = this.props;

    if (!torrent) {
      return;
    }

    return (
      <DetailsWrapper>
        <Field>
          {this.Menu}
          {tab === DETAIL_GENERAL && this.GeneralTab}
          {tab === DETAIL_FILES && this.FilesTab}
          {tab === DETAIL_SPEED && this.SpeedTab}
        </Field>
      </DetailsWrapper>
    );
  }
}

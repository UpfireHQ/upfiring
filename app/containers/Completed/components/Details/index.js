import React, { PureComponent } from 'react';
import { client } from '../../../../utils/torrent';
import { getClientTorrentFullPath } from '../../../../utils/torrent/helpers';
import { shell } from 'electron';
import {
  TorrentDetails,
  TorrentDetailsRow,
  TorrentDetailsTitle,
  TorrentDetailsValue,
  TorrentInfo,
  TorrentInfoHead,
  TorrentInfoHeadAction,
  TorrentInfoHeadActions,
  TorrentInfoHeadName
} from '../style';
import trans from '../../../../translations';
import { bytesToSize } from '../../../../utils/bytesformat';
import moment from 'moment';

export default class Details extends PureComponent {
  state = {
    clientTorrent: null,
    path: null
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

  handlerResumeTorrent = () => {
    const {torrent, onResumeTorrent} = this.props;
    torrent && onResumeTorrent && onResumeTorrent(torrent.infoHash);
  };

  handlerPauseTorrent = () => {
    const {torrent, onPauseTorrent} = this.props;
    torrent && onPauseTorrent && onPauseTorrent(torrent.infoHash);
  };

  render() {
    const {torrent} = this.props;
    const {clientTorrent, path} = this.state;

    if (!(torrent && clientTorrent)) {
      return null;
    }

    return (
      <TorrentInfo>
        <TorrentInfoHead>
          <TorrentInfoHeadName>
            {torrent.name}
          </TorrentInfoHeadName>
          <TorrentInfoHeadActions>
            {(torrent && torrent.paused) ? (
              <TorrentInfoHeadAction onClick={this.handlerResumeTorrent}>
                <span className="icon-ico-play"/>
              </TorrentInfoHeadAction>
            ) : (
              <TorrentInfoHeadAction onClick={this.handlerPauseTorrent}>
                <span className="icon-ico-pause"/>
              </TorrentInfoHeadAction>
            )}
            <TorrentInfoHeadAction onClick={this.handlerShowItemInFolder}>
              <span className="icon-ico-find-f-ile"/>
            </TorrentInfoHeadAction>
            <TorrentInfoHeadAction onClick={this.handlerDeleteTorrent}>
              <span className="icon-ico-remove-file"/>
            </TorrentInfoHeadAction>
          </TorrentInfoHeadActions>
        </TorrentInfoHead>

        <TorrentDetails>
          <TorrentDetailsRow>
            <TorrentDetailsTitle>
              {trans('details.Path')}
            </TorrentDetailsTitle>
            <TorrentDetailsValue>
              {path}
            </TorrentDetailsValue>
          </TorrentDetailsRow>

          <TorrentDetailsRow>
            <TorrentDetailsTitle>
              {trans('table.Status')}
            </TorrentDetailsTitle>
            <TorrentDetailsValue>
              {trans((torrent && torrent.paused) ? 'table.Paused' : 'table.Seeding')}
            </TorrentDetailsValue>
          </TorrentDetailsRow>

          <TorrentDetailsRow>
            <TorrentDetailsTitle>
              {trans('details.Size')}
            </TorrentDetailsTitle>
            <TorrentDetailsValue>
              {bytesToSize(torrent.size)}
            </TorrentDetailsValue>
          </TorrentDetailsRow>

          <TorrentDetailsRow>
            <TorrentDetailsTitle>
              {trans('details.Price')}
            </TorrentDetailsTitle>
            <TorrentDetailsValue>
              {torrent.price} {trans('popups.upload.UFR')}
            </TorrentDetailsValue>
          </TorrentDetailsRow>

          <TorrentDetailsRow>
            <TorrentDetailsTitle>
              {trans('details.Created')}
            </TorrentDetailsTitle>
            <TorrentDetailsValue>
              {moment(torrent.createdAt).format('L LT')}
            </TorrentDetailsValue>
          </TorrentDetailsRow>

          <TorrentDetailsRow>
            <TorrentDetailsTitle>
              {trans('details.Description')}
            </TorrentDetailsTitle>
            <TorrentDetailsValue>
              {torrent.description}
            </TorrentDetailsValue>
          </TorrentDetailsRow>
        </TorrentDetails>
      </TorrentInfo>
    );
  }
}

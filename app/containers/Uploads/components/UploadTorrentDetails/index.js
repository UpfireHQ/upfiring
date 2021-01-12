import React from 'react';
import { client } from '../../../../utils/torrent';
import {
  TorrentDetails,
  TorrentDetailsRow,
  TorrentDetailsTitle,
  TorrentDetailsValue,
  TorrentInfo,
  TorrentInfoHead,
  TorrentInfoHeadAction,
  TorrentInfoHeadName
} from '../UploadsPage/style';
import trans from '../../../../translations';
import { bytesToSize } from '../../../../utils/bytesformat';
import moment from 'moment';
import { getClientTorrentFullPath } from '../../../../utils/torrent/helpers';

import { shell } from 'electron';

export default class UploadTorrentDetails extends React.Component {
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

  handlerDeleteUploadTorrent = () => {
    const {torrent, onDeleteUploadTorrent} = this.props;
    onDeleteUploadTorrent && onDeleteUploadTorrent(torrent);
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
          <div>
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
            <TorrentInfoHeadAction onClick={this.handlerDeleteUploadTorrent}>
              <span className="icon-ico-remove-file"/>
            </TorrentInfoHeadAction>
          </div>
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

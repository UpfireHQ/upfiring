/**
 * Created by maximnord on 10/5/17.
 */
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import UploadButton from '../UploadButton';

export const dataURLtoFile = (dataurl) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return Utf8ArrayToStr(u8arr); // new File([u8arr], filename, {type:mime});
};

export const Utf8ArrayToStr = (array) => {
  let out, i, len, c;
  let char2, char3;

  out = '';
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
};

class Uploader extends Component {
  /*

  static propTypes = {
    handleGetImgPreview: PropTypes.func,
    data: PropTypes.object,
    multiple: PropTypes.bool,
    btnAttrs: PropTypes.object,
    style: PropTypes.object,
    isPreviewImg: PropTypes.bool
  }

  static defaultProps = {
    btnAttrs: {},
    data: {},
    multiple: false,
    isPreviewImg: true
  }

  */

  constructor(props) {
    super(props);

    this.state = {
      file: '',
      data: props.data,
      imagePreviewUrl: ''
    };

    this._handleFileChange = this._handleFileChange.bind(this);
  }

  loadFile(file) {
    const { onFileRead } = this.props;
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileContent = dataURLtoFile(reader.result);
      if (typeof onFileRead === 'function') {
        onFileRead(fileContent);
      }
    };
    reader.readAsDataURL(file);
  }

  _handleFileChange(e, files) {
    if (!files) {
      files = e.target.files;
    }
    if (e) {
      e.preventDefault();
    }
    const { multiple } = this.props;
    if (multiple) {
      for (let i = 0; i < files.length; i++) {
        this.loadFile(files[i]);
      }
    } else {
      this.loadFile(files[0]);
    }
  }

  render() {
    let { btnAttrs, wallet, style, multiple, error, children } = this.props;
    return (
      <div className="inline-block" style={style}>
        <form>
          <div className="text-center">
            <UploadButton
              wallet={wallet}
              error={error}
              multiple={multiple}
              onChange={this._handleFileChange}
              {...btnAttrs}
            >
              {children}
            </UploadButton>
          </div>
        </form>
      </div>
    );
  }
}

export default Uploader;

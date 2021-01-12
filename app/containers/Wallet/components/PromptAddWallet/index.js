import React from 'react';
import {
  FileField,
  FileId,
  FileRemoveBtn,
  PopAction,
  Row,
  RowCenter,
  UploadBtn
} from '../../../../components/prompt/style';
import UInput from '../../../../components/InputText';
import trans from '../../../../translations';
import Uploader from '../../../../components/Uploader';
import MainButton from '../../../../components/Buttons/MainBtn';

export class PromptAddWallet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      password: '',
      valid: true,
      validationText: '',
      passwordValid: true,
      privateKeyValidation: true,
      fileValid: true,
      file: null
    };
    this.handlerResult = this.handlerResult.bind(this);
    this.handlerInputText = this.handlerInputText.bind(this);
    this.handlerInputPassword = this.handlerInputPassword.bind(this);
    this.handlerFileReaded = this.handlerFileReaded.bind(this);
  }

  componentWillMount() {
    const {
      privateKeyValidation = true,
      passwordValid
    } = this.props;
    this.setState({
      privateKeyValidation,
      passwordValid
    });
  }

  componentWillReceiveProps(newProps) {
    const {
      validationText = '',
      valid = true,
      fileValid = true,
      privateKeyValidation = true,
      passwordValid = true
    } = newProps;
    this.setState({
      valid,
      validationText,
      privateKeyValidation,
      passwordValid,
      fileValid
    });
  }

  handlerInputText(e) {
    if (e.target.validity.valid) {
      this.setState({invalid: true, value: e.target.value});
    }
  }

  handlerInputPassword(e) {
    if (e.target.validity.valid) {
      this.setState({invalid: true, password: e.target.value});
    }
  }

  handlerResult(result) {
    const {onClick, justRead, contentType} = this.props;
    const {password, value} = this.state;
    if (!result) {
      onClick(result);
    } else {
      let errors = false;
      if (password === '') {
        this.setState({passwordValid: false});
        errors = true;
      }
      if (contentType === 'file') {
        if (!justRead) {
          errors = true;
          this.setState({fileValid: false});
        }
      } else if (contentType === 'key') {
        if (value === '') {
          errors = true;
          this.setState({invalid: false});
        }
      }
      if (!errors) {
        const privateKey = value.substr(0, 2) !== '0x' ? `0x${value}` : value;
        onClick(result, {password, value: privateKey});
      }
    }
  }

  handlerFileReaded(fileContent) {
    let {onFileReaded, file} = this.props;
    onFileReaded(fileContent);
    const wallet = JSON.parse(fileContent);
    if (wallet && wallet.crypto) {
      file = wallet;
      this.setState({file});
    }
  }

  handlerRemoveFile() {
    let {onRemoveFile} = this.props;
    onRemoveFile();
    this.setState({file: null});
  }

  render() {
    const {
      value,
      password,
      valid,
      privateKeyValidation,
      passwordValid,
      fileValid,
      file
    } = this.state;
    const {contentType, errorFileReading, wallet, buttonTitle} = this.props;
    return (
      <div>
        <RowCenter>
          {contentType === 'key' ? (
            <UInput
              value={value}
              onChange={(e) => this.handlerInputText(e)}
              label={trans('Prompt.value.PrivateKeyPlaceHolder')}
              type="text"
              name="input"
              error={(!valid || !privateKeyValidation) ?
                trans('Prompt.value.PrivateKeyWrong') :
                null}
              centerContent
            />) : ''
          }
          {contentType === 'file' ? (!file ? (
              <UploadBtn
                className={(errorFileReading || !fileValid) ? 'withError' : ''}
              >
                <Uploader
                  wallet={wallet ? true : false}
                  onFileRead={(fileContent) => this.handlerFileReaded(fileContent)}
                />
                <div className="button-title">{trans('wallet.byFile')}</div>
              </UploadBtn>
            ) : (
              <FileField>
                <FileId>
                  {file.address.substring(0, 9)}...
                  {file.address.substring(file.address.length - 9, file.address.length)}
                </FileId>
                <FileRemoveBtn onClick={() => this.handlerRemoveFile()}/>
              </FileField>
            )
          ) : ''
          }
        </RowCenter>
        <RowCenter>
          <UInput
            value={password}
            onChange={(e) => this.handlerInputPassword(e)}
            label={contentType === 'file' ? trans('Prompt.value.Password') : trans('Prompt.value.createPassword')}
            type="password"
            name="password"
            error={!passwordValid ?
              trans('Prompt.value.passwordValidation') :
              null}
            centerContent
          />
        </RowCenter>
        <Row>
          <PopAction>
            <MainButton
              onClick={() => this.handlerResult(true)}
              title={buttonTitle}
            />
          </PopAction>
        </Row>
      </div>
    );
  }
}

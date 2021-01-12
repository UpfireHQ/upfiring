import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import trans from '../../../trans';
import fonts from '../../../style/font-styles';

const UpWrapper = styled.div`
  background: #111215;
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 0.5em 0 1em;
  padding: 1em 0; 
`;

const Field = styled.div`

`;

const UploadTitle = styled.h3`
  color:${colors.fontPrimary};
  text-transform:uppercase;
  font-weight:bold; 
  font-size:${fonts.bigSize};
  text-align:center;
`;

const UploadPlus = styled(UploadTitle)`
  font-size:2em;
  margin:0.5em 0;
`;

const UploadComment = styled.h4`
  font-size:${fonts.standardSize};
  color:${colors.fontPrimary};
`;

export default class UploadsPage extends Component {
  constructor(props) {
    super(props);
  }

  handlerAddFiles() {
    dialog.showOpenDialog(
      {
        properties: ['openFile', 'multiSelections']
      },
      (filePaths) => this.handlerAddSelectedFiles(filePaths)
    );
  }

  render() {
    return (
      <UpWrapper>
        <Field>
          <UploadPlus>+</UploadPlus>
          <UploadComment>{trans('Upload.UploadComment')}</UploadComment>
        </Field>
      </UpWrapper>
    );
  }
}

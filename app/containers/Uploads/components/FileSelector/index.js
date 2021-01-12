import {
  AddButton,
  AddMoreFiles,
  FileCover,
  FilesList,
  FilesListHead,
  FilesListRow,
  FilesTable,
  FullColumn,
  FullContainer,
  RemoveButton
} from '../UploadsPage/style';
import trans from '../../../../translations';
import React from 'react';

export default (props) => {
  const {
    selectedFiles,
    onAddFiles,
    onRemoveFiles,
    validationError,
    fileSize = ''
  } = props;

  const isSelectedFiles = selectedFiles && selectedFiles.length;

  const files = (isSelectedFiles) && selectedFiles.map((file, i) => {
    return (
      <FilesListRow key={i}>
        <div>{(file && file.path) || file}</div>
        <RemoveButton onClick={() => onRemoveFiles(i)}/>
      </FilesListRow>
    );
  });

  return (
    <FullContainer>
      {(isSelectedFiles)
        ? (
          <FilesList>
            <FilesListHead>
              <div>{trans('Upload.SelectedFiles')}</div>
              <div>{fileSize}</div>
            </FilesListHead>
            <FilesTable>
              {files}
            </FilesTable>
            <FullColumn>
              <AddMoreFiles onClick={onAddFiles}>
                <span/>
                {trans('Upload.AddMoreFiles')}
              </AddMoreFiles>
            </FullColumn>
          </FilesList>
        )
        : (
          <FullColumn>
            <FileCover>
              <AddButton
                onClick={onAddFiles}
                className={(validationError && !isSelectedFiles) ? 'with-error' : ''}
              >
                <span/>
                {(validationError && !isSelectedFiles)
                  ? trans('popups.upload.addFilesPlease')
                  : trans('popups.upload.addFiles')}
              </AddButton>
            </FileCover>
          </FullColumn>
        )
      }
    </FullContainer>
  );
};

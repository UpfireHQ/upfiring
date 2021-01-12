/**
 * Created by maximnord on 10/5/17.
 */
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';
import trans from '../../translations';
import colors from '../../style/colors';

const Button = styled.div`  
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 25px;
  display: inline-block;
  white-space: inherit;
  margin-top: 1em;
  text-align: left;
  color:${colors.fontSecondary};
  text-decoration:underline;
  &:hover{
    color: ${colors.fontPrimary};
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    width:100%;
    height:30px;
    z-index: 1;
    opacity: 0;
    -ms-filter: 'alpha(opacity=0)';
    font-size: 200px;
    direction: ltr;
    cursor: pointer;
  }
  > p {
    margin:0.5em;
  }
`;

const FileError = styled.p`
  color: ${colors.brandPrimary};
  margin:0.5em 0;
  text-align:center;
`;

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ error: nextProps.error });
  }

  handleClick(e) {
    if (e.target && e.target.firstChild) {
      e.target.firstChild.click();
    }
  }

  handleClickInput(e) {
    e.stopPropagation();
  }

  render() {
    let { multiple, wallet, onChange, flat, ...props } = this.props;
    const error = this.state.error ? (
      <FileError>{trans('wallet.upload_error')}</FileError>) : null;
    return (
      <div>
        <Button onClick={this.handleClick}>
          <input
            type="file"
            onChange={onChange}
            multiple={multiple}
            value=""
            onClick={this.handleClickInput}
          />
          <p>{this.props.children}</p>
        </Button>
        {error}
      </div>
    );
  }
}

export default UploadButton;

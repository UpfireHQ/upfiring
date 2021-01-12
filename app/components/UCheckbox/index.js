import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import colors from '../../style/colors';

const styles = {
  root: {
    color: colors.titleWhite,
    '&:checked': {
      color: colors.titleWhite
    }
  },
  checked: {}
};

const checkboxIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    style={
      {borderRadius: '4px'}
    }
  >
    <g fill="none" fillRule="evenodd">
      <path fill="transparent" d="M-87-132H937v640H-87z"/>
      <rect width="18" height="18" fill="#A0A4C9" opacity=".199" rx="4"/>
    </g>
  </svg>
);

const checkboxCheckedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    style={
      {borderRadius: '4px'}
    }
  >
    <g fill="none" fillRule="evenodd">
      <path fill="#000" d="M-87-226H937v640H-87z"/>
      <g>
        <rect width="18" height="18" fill="#FFF" rx="4"/>
        <path
          stroke="#0B0B0E"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 6l-6.188 6L5 9.273"
        />
      </g>
    </g>
  </svg>
);

class CheckboxLabels extends React.PureComponent {

  handleChange = event => {
    let {onChange, index} = this.props;
    onChange(event, index);
  };

  render() {
    const {classes, checked} = this.props;

    return (
      <Checkbox
        checked={Boolean(checked)}
        classes={classes || styles}
        icon={checkboxIcon}
        checkedIcon={checkboxCheckedIcon}
        onChange={this.handleChange}
      />
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxLabels);

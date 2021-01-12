import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import colors from '../../style/colors';

const styles = theme => ({
  colorBar: {},
  colorChecked: {},
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: colors.titleWhite,
      '& + $iOSBar': {
        backgroundColor: colors.switchActive
      }
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  iOSChecked: {
    transform: 'translateX(20px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'solid 2px',
      borderColor: colors.switchActive
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 46,
    height: 24,
    marginTop: -12,
    marginLeft: -21,
    border: 'solid 2px',
    borderColor: colors.switchBorder,
    backgroundColor: 'transparent',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  iOSIcon: {
    width: 20,
    height: 20,
    backgroundColor: colors.greyIcon
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
    backgroundColor: colors.titleWhite
  }
});

class CustomizedSwitches extends React.Component {
  render() {
    const {classes, checked, onChange} = this.props;

    return (
      <Switch
        classes={{
          switchBase: classes.iOSSwitchBase,
          bar: classes.iOSBar,
          icon: classes.iOSIcon,
          iconChecked: classes.iOSIconChecked,
          checked: classes.iOSChecked
        }}
        disableRipple
        checked={checked}
        onChange={onChange}
      />
    );
  }
}

CustomizedSwitches.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedSwitches);

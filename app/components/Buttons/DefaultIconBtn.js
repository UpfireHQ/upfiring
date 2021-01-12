import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import colors from '../../style/colors';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  button: {
    marginLeft: '12px',
    width: '38px',
    height: '38px',
    minWidth: '38px',
    fontSize: '16px',
    backgroundColor: colors.defaultBtnBackground,
    color: colors.defaultBtn,
    '&:disabled': {
      backgroundColor: colors.defaultBtnBackgroundDisabled,
      color: colors.defaultBtnDisabled
    },
    '&:hover': {
      backgroundColor: colors.defaultBtnBackgroundHover,
      color: colors.defaultBtnHover
    }
  },
  icon: {}
});

const IconLabelButton = (props) => {
  const {classes, disabled, iconClass, onClick, name} = props;

  let handlerClick = (e) => onClick(e, name);

  return (
    <Button
      variant="contained"
      disabled={disabled}
      className={classes.button}
      onClick={handlerClick}
    >
      <span className={iconClass}/>
    </Button>
  );
};

IconLabelButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelButton);

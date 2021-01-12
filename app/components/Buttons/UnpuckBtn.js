import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import colors from '../../style/colors';
import { TS_STATUS_UNPACK } from '../../constants/torrent';

const styles = () => ({
  button: {
    height: 28,
    width: 67,
    minHeight: 28,
    minWidth: 67,
    padding: '0',
    backgroundColor: colors.inputBackgroundFocus,
    color: colors.defaultBtn,
    '&:disabled': {
      backgroundColor: colors.defaultBtnBackgroundDisabled,
      color: colors.defaultBtnDisabled
    },
    '&:hover': {
      backgroundColor: colors.defaultBtnBackgroundHover,
      color: colors.defaultBtnHover
    }
  }
});

const UnpuckButton = (props) => {
  const { classes, disabled, title } = props;

  const handlerClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { onClick } = props;
    onClick(TS_STATUS_UNPACK);
  };

  return (
    <Button
      variant="contained"
      disabled={disabled}
      className={classes.button}
      onClick={handlerClick}
    >
      {title}
    </Button>
  );
}

UnpuckButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UnpuckButton);

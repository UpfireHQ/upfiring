import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const styles = () => ({
  button: {
    color: colors.thirdBtn,
    backgroundColor: 'transparent',
    textTransform: 'inherit',
    fontFamily: fonts.familyMain,
    fontSize: fonts.moreStadartSize,
    boxShadow: 'none',
    minWidth: '10em',
    border: `1px solid ${colors.thirdBtnBorder}`,
    '&:hover': {
      backgroundColor: colors.mainActiveBlue,
      color: colors.titleWhite,
      border: `1px solid ${colors.mainActiveBlue}`
    },
    height: '3.4em',
    borderRadius: '1.7em',
    padding: '0 2.3em 0 2.3em'
  }
});

const ThirdButton = (props) => {
  const {classes, onClick, title, disabled = false} = props;
  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

ThirdButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThirdButton);

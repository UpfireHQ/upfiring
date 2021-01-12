import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';
import trans from '../../../../translations';

const styles = () => ({
  button: {
    color: colors.titleWhite,
    backgroundColor: colors.stubUploadBtn,
    textTransform: 'inherit',
    fontFamily: fonts.familyMain,
    fontSize: fonts.standardSize,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: colors.hoverRed
    },
    height: '3.4em',
    borderRadius: '1.7em',
    padding: '0 2.3em'
  },
  icon: {
    color: colors.titleWhite,
    fontSize: '12px',
    marginRight: '.8em'
  }
});

const UploadButton = (props) => {
  const { classes, onClickAddFilesToTorrent } = props;
  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={() => onClickAddFilesToTorrent()}
    >
      <Icon className={`icon-ico-upload ${classes.icon}`} />
      {trans('Upload.files')}
    </Button>
  );
};

UploadButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UploadButton);

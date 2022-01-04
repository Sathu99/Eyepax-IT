import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Notification = (props) => {
  const { vertical, horizontal, openAlert, msg, type, handleAlert } = props;

  const handleCloseAlert = () => {
    handleAlert({ vertical, horizontal, msg, type, openAlert: false });
  };

  Notification.propTypes = {
    vertical: PropTypes.string.isRequired,
    horizontal: PropTypes.string.isRequired,
    openAlert: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    handleAlert: PropTypes.func.isRequired,
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openAlert}
        onClose={handleCloseAlert}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity={type}
        >
          {msg}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Notification;

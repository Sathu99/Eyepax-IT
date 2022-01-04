import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Notification = (props) => {
  const { vertical, horizontal, openAlert, msg, type } = props.alertStates;

  const handleCloseAlert = () => {
    props.handleAlert({ ...props.alertStates, openAlert: false });
  };

  Notification.propTypes = {
    handleAlert: PropTypes.func.isRequired,
    alertStates: PropTypes.object.isRequired,
  };

  return (
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
  );
};

export default Notification;

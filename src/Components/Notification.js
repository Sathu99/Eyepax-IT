import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Notification(props) {
  const { vertical, horizontal, openAlert, msg, type } = props.alertStates;

  const handleCloseAlert = () => {
    props.handleAlert({ ...props.alertStates, openAlert: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openAlert}
        onClose={handleCloseAlert}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <Alert onClose={handleCloseAlert} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default React.memo(Notification);

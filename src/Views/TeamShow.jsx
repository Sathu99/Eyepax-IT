import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Notification from '../Components/Notification';
import StickyHeadTable from '../Components/Table';
import { column, routes } from '../data/List';
import Spinner from '../Components/Spinner';
import Validate from '../utils/validate';

const styles = (theme) => ({
  title: {
    backgroundColor: 'lightgrey',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const StyledDialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.title} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const ValidationTextField = withStyles({
  root: {
    '& input: + fieldset': {
      borderColor: 'grey',
      borderWidth: 2,
    },
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: 15,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  box: {
    height: 20,
    display: 'flex',
    padding: 12,
  },
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    margin: 24,
  },
}));

const TeamShow = () => {
  const classes = useStyles();
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [person, setPerson] = useState([]);
  const [fields, setFiels] = useState({});
  const [validationResult, setValidationResult] = useState({});
  const [alertStates, setAlertStates] = useState({
    openAlert: false,
    vertical: 'top',
    horizontal: 'center',
    type: 'info',
    msg: 'info',
  });
  const [data, setData] = useState([]);
  const columns = useMemo(() => column, []);

  useEffect(() => {
    axios({
      url: 'http://127.0.0.1:8000/api/team/getall',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setAlertStates({
            openAlert: true,
            msg: 'Data was Successfully fetched',
            vertical: 'top',
            horizontal: 'center',
            type: 'success',
          });
        }
      })
      .catch((err) => {
        setAlertStates({
          openAlert: true,
          msg: 'There is somthig wrong try again later.',
          vertical: 'top',
          horizontal: 'right',
          type: 'error',
        });
        console.log({ err });
      });
  }, []);

  const handleInputChange = (event) => {
    const name = target.id;
    fields[name] = event.target.value;
    setFiels({ ...fields });
  };

  const clearFun = (e) => {
    validationResult[e.target.id] = 'Filled';
    setValidationResult({ ...validationResult });
  };

  const handleOpenView = useCallback(
    (id) => {
      setPerson(data.filter((emp) => emp.id === id));
      setOpenView(true);
    },
    [data]
  );

  const handleCloseView = () => {
    setPerson([]);
    setOpenView(false);
  };

  const handleOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenDelete = useCallback(
    (id) => {
      setPerson(data.filter((emp) => emp.id === id));
      setOpenDelete(true);
    },
    [data]
  );

  const handleCloseDelete = (e) => {
    if (e === 'yes') {
      console.log('delete');
      axios({
        url: `http://127.0.0.1:8000/api/team/delete/${person[0].id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          setPerson([]);
          setData(data.filter((emp) => emp.id !== person[0].id));
          setAlertStates({
            openAlert: true,
            msg: 'Data is Deleted Successfully',
            vertical: 'top',
            horizontal: 'center',
            type: 'success',
          });
        })
        .catch((err) => {
          setAlertStates({
            openAlert: true,
            msg: 'There is an error at Delete this Data',
            vertical: 'top',
            horizontal: 'right',
            type: 'error',
          });
          console.log({ err });
        });
    }
    setOpenDelete(false);
  };

  const handleSubmit = () => {
    setValidationResult({ ...Validate(fields).errors });
    console.log(fields, validationResult);
    if (Validate(fields).count >= 5) {
      axios({
        url: 'http://127.0.0.1:8000/api/team/add',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(fields),
      })
        .then((res) => {
          if (res.status === 200) {
            handleCloseAdd();
            setAlertStates({
              openAlert: true,
              msg: 'Sales Representative Data Successfuly Registered.',
              vertical: 'top',
              horizontal: 'center',
              type: 'success',
            });
            setData([...data, res.data]);
            console.log(res.data);
          }
        })
        .catch((err) => {
          const error = { err };
          setAlertStates({
            openAlert: true,
            msg: error.err.response.data.message,
            vertical: 'top',
            horizontal: 'right',
            type: 'error',
          });
          console.log(error);
        });
    } else {
      setAlertStates({
        openAlert: true,
        msg: 'Your entered Data in Not valid. Check it and try again.',
        vertical: 'top',
        horizontal: 'left',
        type: 'warning',
      });
    }
  };

  if (data.length > 0) {
    return (
      <div>
        <StickyHeadTable
          rows={data}
          columns={columns}
          showDetailModal={handleOpenView}
          showAddModal={handleOpenAdd}
          deleteMember={handleOpenDelete}
        />
        {person.length > 0 && (
          <Dialog
            onClose={handleCloseView}
            aria-labelledby="customized-dialog-title"
            open={openView}
            disableBackdropClick="true"
            fullWidth={true}
            maxWidth="sm"
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={handleCloseView}
              style={{ backgroundColor: 'lightgray' }}
            >
              {person[0].name} {'=>'} Details
            </DialogTitle>
            <DialogContent style={{ minWidth: 400 }}>
              <div className={classes.root}>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <h4 className={classes.paper}>Full Name</h4>
                    <h4 className={classes.paper}>Email Address</h4>
                    <h4 className={classes.paper}>Telephone</h4>
                    <h4 className={classes.paper}>Joined date</h4>
                    <h4 className={classes.paper}>Current Routes</h4>
                    <h4 className={classes.paper}>Comments</h4>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <h4 className={classes.paper}>{person[0].name}</h4>
                    <h4 className={classes.paper}>{person[0].email}</h4>
                    <h4 className={classes.paper}>{person[0].telephone}</h4>
                    <h4 className={classes.paper}>
                      {new Date(person[0].joinedDate).getFullYear() +
                        '-' +
                        (new Date(person[0].joinedDate).getMonth() > 8
                          ? new Date(person[0].joinedDate).getMonth() + 1
                          : '0' +
                            (new Date(person[0].joinedDate).getMonth() + 1)) +
                        '-' +
                        (new Date(person[0].joinedDate).getDate() > 9
                          ? new Date(person[0].joinedDate).getDate()
                          : '0' + new Date(person[0].joinedDate).getDate())}
                    </h4>
                    <h4 className={classes.paper}>{person[0].route}</h4>
                    <h4 className={classes.paper}>{person[0].comment}</h4>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseView()} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <Dialog
          onClose={handleCloseAdd}
          aria-labelledby="customized-dialog-title"
          open={openAdd}
          disableBackdropClick="true"
        >
          <StyledDialogTitle
            id="customized-dialog-title"
            onClose={handleCloseAdd}
          >
            Add New Member
          </StyledDialogTitle>
          <DialogContent dividers>
            <div className={classes.root}>
              <form noValidate autoComplete="off">
                <div className={classes.field}>
                  <ValidationTextField
                    error={
                      validationResult['name'] !== undefined &&
                      validationResult.name !== 'Filled'
                        ? true
                        : false
                    }
                    type="text"
                    id="name"
                    label="Full Name"
                    helperText={validationResult.name}
                    variant="outlined"
                    style={{ width: 225 }}
                    onChange={handleInputChange}
                    onInput={clearFun}
                  />
                </div>
                <div className={classes.field}>
                  <ValidationTextField
                    error={
                      validationResult['email'] !== undefined &&
                      validationResult.email !== 'Filled'
                        ? true
                        : false
                    }
                    type="email"
                    id="email"
                    label="Email Address"
                    helperText={validationResult.email}
                    style={{ width: 225 }}
                    variant="outlined"
                    onChange={handleInputChange}
                    onInput={clearFun}
                  />
                </div>
                <div className={classes.field}>
                  <ValidationTextField
                    error={
                      validationResult['telephone'] !== undefined &&
                      validationResult.telephone !== 'Filled'
                        ? true
                        : false
                    }
                    type="text"
                    id="telephone"
                    label="Telephone No"
                    style={{ width: 225 }}
                    helperText={validationResult.telephone}
                    variant="outlined"
                    onChange={handleInputChange}
                    onInput={clearFun}
                  />
                </div>
                <div className={classes.field}>
                  <ValidationTextField
                    error={
                      validationResult['joinedDate'] !== undefined &&
                      validationResult.joinedDate !== 'Filled'
                        ? true
                        : false
                    }
                    id="joinedDate"
                    label="Joined Date"
                    type="date"
                    onChange={handleInputChange}
                    style={{ width: 225 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={validationResult.joinedDate}
                    onInput={clearFun}
                  />
                </div>
                <div className={classes.field}>
                  <ValidationTextField
                    id="route"
                    select
                    error={
                      validationResult['route'] !== undefined &&
                      validationResult.route !== 'Filled'
                        ? true
                        : false
                    }
                    helperText={validationResult.route}
                    label="Current Route"
                    onChange={handleInputChange}
                    defaultValue={'0'}
                    style={{ width: 225 }}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                    onInput={clearFun}
                  >
                    {' '}
                    {routes.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disable}
                      >
                        {option.label}
                      </option>
                    ))}
                  </ValidationTextField>
                </div>
                <div className={classes.field}>
                  <ValidationTextField
                    id="comment"
                    error={
                      validationResult['comment'] !== undefined &&
                      validationResult.comment !== 'Filled'
                        ? true
                        : false
                    }
                    helperText={validationResult.comment}
                    label="Comments"
                    multiline
                    maxRows={4}
                    minRows={2}
                    onChange={handleInputChange}
                    variant="outlined"
                    style={{ width: 225 }}
                    onInput={clearFun}
                  />
                </div>
              </form>
              <div m={1} className={`${classes.centerBox} ${classes.box}`}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {person.length > 0 && (
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disableBackdropClick="true"
          >
            <DialogTitle id="alert-dialog-title">
              {'Delete Member from Team'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you Sure want to Delete&nbsp; "{person[0].name}"?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                id="no"
                onClick={() => handleCloseDelete('no')}
                color="primary"
              >
                Disagree
              </Button>
              <Button
                id="yes"
                onClick={() => handleCloseDelete('yes')}
                color="primary"
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Notification alertStates={alertStates} handleAlert={setAlertStates} />
      </div>
    );
  }
  return <Spinner type="Bars" color="green" />;
};
export default React.memo(TeamShow);

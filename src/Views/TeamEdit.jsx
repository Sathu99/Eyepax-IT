import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Forward } from '@material-ui/icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Notification from '../Components/Notification';
import Validate from '../utils/validate';
import { routes } from '../data/Lists';
import Spinner from '../Components/Spinner';

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 'auto',
    marginTop: 50,
    border: '1px solid black',
    minWidth: 300,
    maxWidth: 800,
  },
  topnav: {
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
    paddingLeft: 25,
  },
  box: {
    position: 'relative',
    padding: 50,
    margin: 30,
  },
  topright: {
    position: 'absolute',
    top: 2,
    right: 8,
  },
  bottomright: {
    position: 'absolute',
    bottom: 2,
    right: 8,
  },
  root: {
    flexGrow: 1,
  },
  inputs: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.black,
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

const TeamEdit = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [fields, setFiels] = React.useState({ comment: '' });
  const [validationResult, setValidationResult] = React.useState({});
  const [alertStates, setAlertStates] = React.useState({
    openAlert: false,
    vertical: 'top',
    horizontal: 'center',
    type: 'info',
    msg: 'info',
  });

  const handleChange = (event) => {
    const name = event.target.id;
    fields[name] = event.target.value;
    setFiels({ ...fields });
  };

  useEffect(() => {
    axios({
      url: `http://127.0.0.1:8000/api/team/view/${parseInt(id)}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // if (res.status === 200) {
        setFiels(res.data);
        setAlertStates({
          openAlert: true,
          msg: 'Your Details was Successfully fetched',
          vertical: 'top',
          horizontal: 'center',
          type: 'success',
        });
        // }
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
  }, [id]);

  const clearFun = (e) => {
    validationResult[e.target.id] = 'Filled';
    setValidationResult({ ...validationResult });
  };

  const handleSubmit = () => {
    setValidationResult({ ...Validate(fields).errors });
    if (Validate(fields).count >= 5) {
      axios({
        url: `http://127.0.0.1:8000/api/team/update/${parseInt(id)}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(fields),
      })
        .then(() => {
          setAlertStates({
            openAlert: true,
            msg: 'Data was Successfully Updated',
            vertical: 'top',
            horizontal: 'center',
            type: 'success',
          });
          history.push('/team');
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
  if (Object.keys(fields).length > 1) {
    const date = new Date(fields.joinedDate);
    return (
      <React.Fragment>
        <div className={classes.body}>
          <div className={classes.topnav}>
            <h2>Edit Sales Representative</h2>
          </div>
          <div className={classes.box}>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <form className={classes.form} noValidate autoComplete="off">
                    <div className={classes.inputs}>
                      <TextField
                        disabled
                        error={false}
                        type="number"
                        id="id"
                        label="ID"
                        defaultValue={fields.id}
                        variant="outlined"
                        onInput={clearFun}
                      />
                    </div>
                    <div className={classes.inputs}>
                      <TextField
                        error={
                          validationResult['name'] !== undefined &&
                          validationResult.name !== 'Filled'
                            ? true
                            : false
                        }
                        type="text"
                        id="name"
                        label="Full Name"
                        defaultValue={fields.name}
                        helperText={validationResult.name}
                        variant="outlined"
                        onChange={handleChange}
                        onInput={clearFun}
                      />
                    </div>
                    <div className={classes.inputs}>
                      <TextField
                        error={
                          validationResult['email'] !== undefined &&
                          validationResult.email !== 'Filled'
                            ? true
                            : false
                        }
                        type="text"
                        id="email"
                        label="Email Address"
                        defaultValue={fields.email}
                        helperText={validationResult.email}
                        variant="outlined"
                        onChange={handleChange}
                        onInput={clearFun}
                      />
                    </div>
                    <div className={classes.inputs}>
                      <TextField
                        error={
                          validationResult['telephone'] !== undefined &&
                          validationResult.telephone !== 'Filled'
                            ? true
                            : false
                        }
                        type="text"
                        id="telephone"
                        label="Telephone No"
                        defaultValue={fields.telephone}
                        helperText={validationResult.telephone}
                        variant="outlined"
                        onChange={handleChange}
                        onInput={clearFun}
                      />
                    </div>
                    <div className={classes.inputs}>
                      <TextField
                        error={
                          validationResult['joinedDate'] !== undefined &&
                          validationResult.joinedDate !== 'Filled'
                            ? true
                            : false
                        }
                        id="joinedDate"
                        label="Joined Date"
                        type="date"
                        defaultValue={
                          date.getFullYear() +
                          '-' +
                          (date.getMonth() > 8
                            ? date.getMonth() + 1
                            : '0' + (date.getMonth() + 1)) +
                          '-' +
                          (date.getDate() > 9
                            ? date.getDate()
                            : '0' + date.getDate())
                        }
                        onChange={handleChange}
                        style={{ width: 300 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={validationResult.joinedDate}
                        onInput={clearFun}
                      />
                    </div>
                    <div className={classes.inputs}>
                      <TextField
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
                        defaultValue={fields.route}
                        onChange={handleChange}
                        style={{ width: 300 }}
                        SelectProps={{
                          native: true,
                        }}
                        variant="outlined"
                        onInput={clearFun}
                      >
                        {routes.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disable}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </div>
                    <div className={classes.inputs}>
                      <TextField
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
                        defaultValue={fields.comment}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ width: 300 }}
                        onInput={clearFun}
                      />
                    </div>
                  </form>
                </Grid>
              </Grid>
            </div>
            <div className={classes.topright}>
              <Button
                component={Link}
                to={`/`}
                size="small"
                variant="contained"
                color="default"
                endIcon={<Forward />}
              >
                Back to List
              </Button>
            </div>
            <div className={classes.bottomright}>
              <Button
                variant="contained"
                color="default"
                size="small"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <Notification alertStates={alertStates} handleAlert={setAlertStates} />
      </React.Fragment>
    );
  }
  return <Spinner type="BallTriangle" color="green" />;
};
export default React.memo(TeamEdit);

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Forward } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Validate from "../utils/validate";
import Loader from "react-loader-spinner";
import axios from "axios";
import Notification from "../Components/Notification";

const source = axios.CancelToken.source();

const routes = [
  {
    value: "0",
    label: "Current Route",
    disable: true,
  },
  {
    value: "colombo",
    label: "Colombo",
    disable: false,
  },
  {
    value: "jaffna",
    label: "Jaffna",
    disable: false,
  },
  {
    value: "kandy",
    label: "Kandy",
    disable: false,
  },
  {
    value: "vavniya",
    label: "Vavuniya",
    disable: false,
  },
];

const useStyles1 = makeStyles({
  body: {
    margin: "auto",
    marginTop: 50,
    border: "1px solid black",
    minWidth: 300,
    maxWidth: 800,
  },
  topnav: {
    overflow: "hidden",
    backgroundColor: "lightgrey",
    paddingLeft:25 ,
  },
  box: {
    position: "relative",
    padding: 50,
    margin: 30,
  },
  topright: {
    position: "absolute",
    top: 2,
    right: 8,
  },
  bottomright: {
    position: "absolute",
    bottom: 2,
    right: 8,
  },
});

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inputs: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.black,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

function TeamEdit(props) {
  const classes1 = useStyles1();
  const classes2 = useStyles2();

  const [fields, setFiels] = React.useState({});
  const [validationResult, setValidationResult] = React.useState({});

  const [alertStates, setAlertStates] = React.useState({
    openAlert: false,
    vertical: "top",
    horizontal: "center",
    type: "info",
    msg: "info",
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    fields[name] = value;
    setFiels({ ...fields });
  };

  useEffect(() => {
    axios({
      url: `http://127.0.0.1:8000/api/team/view/${props.match.params.id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cancelToken: source.token,
    })
      .then((res) => {
        if (res.status === 200) {
          setFiels(res.data);
          setAlertStates({
            openAlert: true,
            msg: "Your Details was Successfully fetched",
            vertical: "top",
            horizontal: "center",
            type: "success",
          });
        }
      })
      .catch((err) => {
        setAlertStates({
          openAlert: true,
          msg: "There is somthig wrong try again later.",
          vertical: "top",
          horizontal: "right",
          type: "error",
        });
        console.log({ err });
      });
    return () => {
      source.cancel("Request Canceled");
    };
  }, [props.match.params.id]);

  const clearFun = (e) => {
    validationResult[e.target.id] = "Filled";
    setValidationResult({ ...validationResult });
  };

  const handleSubmit = () => {
    setValidationResult({ ...Validate(fields).errors });
    if (Validate(fields).count >= 5) {
      axios({
        url: `http://127.0.0.1:8000/api/team/update/${props.match.params.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(fields),
        // cancelToken: source.token,
      })
        .then((res) => {
          setAlertStates({
            openAlert: true,
            msg: "Data was Successfully Updated",
            vertical: "top",
            horizontal: "center",
            type: "success",
          });
          props.history.push("/team");
        })
        .catch((err) => {
          setAlertStates({
            openAlert: true,
            msg: "There is somthig wrong try again later.",
            vertical: "top",
            horizontal: "right",
            type: "error",
          });
          console.log({ err });
        });
    } else {
      setAlertStates({
        openAlert: true,
        msg: "Your entered Data in Not valid. Check it and try again.",
        vertical: "top",
        horizontal: "left",
        type: "warning",
      });
    }
  };

  console.log(props);
  if (Object.keys(fields).length > 0) {
    const date = new Date(fields.joinedDate);
    return (
      <>
        <div className={classes1.body}>
          <div className={classes1.topnav}>
            <h2>Edit Sales Representative</h2>
          </div>
          <div className={classes1.box}>
            <div className={classes2.root}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <form className={classes2.form} noValidate autoComplete="off">
                    <div className={classes2.inputs}>
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
                    <div className={classes2.inputs}>
                      <TextField
                        error={
                          validationResult["name"] !== undefined &&
                          validationResult.name !== "Filled"
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
                    <div className={classes2.inputs}>
                      <TextField
                        error={
                          validationResult["email"] !== undefined &&
                          validationResult.email !== "Filled"
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
                    <div className={classes2.inputs}>
                      <TextField
                        error={
                          validationResult["telephone"] !== undefined &&
                          validationResult.telephone !== "Filled"
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
                    <div className={classes2.inputs}>
                      <TextField
                        error={
                          validationResult["joinedDate"] !== undefined &&
                          validationResult.joinedDate !== "Filled"
                            ? true
                            : false
                        }
                        id="joinedDate"
                        label="Joined Date"
                        type="date"
                        defaultValue={
                          date.getFullYear() +
                          "-" +
                          (date.getMonth() > 8
                            ? date.getMonth() + 1
                            : "0" + (date.getMonth() + 1)) +
                          "-" +
                          (date.getDate() > 9
                            ? date.getDate()
                            : "0" + date.getDate())
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
                    <div className={classes2.inputs}>
                      <TextField
                        id="route"
                        select
                        error={
                          validationResult["route"] !== undefined &&
                          validationResult.route !== "Filled"
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
                        ]{" "}
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
                    <div className={classes2.inputs}>
                      <TextField
                        id="comment"
                        error={
                          validationResult["comment"] !== undefined &&
                          validationResult.comment !== "Filled"
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
            <div className={classes1.topright}>
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
            <div className={classes1.bottomright}>
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
      </>
    );
  }

  return (
    <>
      <div
        style={{
          margin: "auto",
          width: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          fontFamily: "cursive",
          fontWeight: "bolder",
          fontSize: "1.5em",
        }}
      >
        <Loader
          type="BallTriangle"
          color="green"
          height={100}
          width={100}
          secondaryColor="blue"
        />
        Loading ...
      </div>
    </>
  );
}

export default React.memo(TeamEdit);

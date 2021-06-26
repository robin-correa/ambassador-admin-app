import { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import auth from "../services/auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setEmailError(false);
    setEmailErrorMessage("");

    setPasswordError(false);
    setPasswordErrorMessage("");

    setLoginError(false);
    setLoginErrorMessage("");

    if (email === "") {
      setEmailError(true);
      setEmailErrorMessage("Email is required.");
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required.");
    }

    try {
      setLoading(true);
      const { data } = await auth.login({
        email: email,
        password: password,
      });

      setEmailError(false);
      setEmailErrorMessage("");
      setPasswordError(false);
      setPasswordErrorMessage("");
      setLoading(false);

      auth.setUser(`${data.user.first_name} ${data.user.last_name}`);
      auth.setAccessToken(data.token);

      history.push("/");
    } catch ({ response }) {
      console.log(response);
      setLoginError(true);
      setLoading(false);
      if (response.data.error) {
        setLoginErrorMessage(response.data.error);
      }

      if (response.data.errors) {
        setLoginErrorMessage(response.data.message);

        if (response.data.errors.email) {
          setEmailError(true);
          setEmailErrorMessage(response.data.errors.email.join(" "));
        }

        if (response.data.errors.password) {
          setPasswordError(true);
          setPasswordErrorMessage(response.data.errors.password.join(" "));
        }
      }
    }
  }

  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    history.push("/");
  }

  return (
    <>
      {loading && <LinearProgress />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            {loginError && <Alert severity="error">{loginErrorMessage}</Alert>}
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              error={emailError}
              helperText={emailErrorMessage}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={passwordError}
              helperText={passwordErrorMessage}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default withRouter(Login);

"use client";

import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Theme,
  Typography,
  makeStyles,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";

// const { root, form, submit } = makeStyles((theme: Theme) => ({
//   root: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form
      //  className={form}
      onSubmit={handleSubmit}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        // className={classes.submit}
      >
        Login
      </Button>
    </form>
  );
};

const RegisterForm = () => {
  // const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle registration logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form
      // className={form}
      onSubmit={handleSubmit}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        // className={submit}
      >
        Register
      </Button>
    </form>
  );
};

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSwitchForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
      // className={root}
      >
        <Typography component="h1" variant="h5">
          {isLoginForm ? "Login" : "Register"}
        </Typography>
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" onClick={handleSwitchForm}>
              {isLoginForm
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </Link>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          // className={classes.submit}
        >
          Login with Google
        </Button>
      </div>
    </Container>
  );
};

export default AuthPage;

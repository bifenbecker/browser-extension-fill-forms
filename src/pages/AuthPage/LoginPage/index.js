import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI
import { Typography, Grid } from "@mui/material";

// Components
import AuthFormComp from "../../../components/AuthFormComp";
// Layouts
import BaseLayout from "../../../components/Layouts/BaseLayout";

// Constants
import { PROFILE_PAGE_NAME } from "../../../utils/constants";

// API
import { loginUser } from "../../../api/auth";

// Styles
import useStyles from "./styles";

const LoginPage = (props) => {
  const { onChangePage, messageToUser } = props;
  const [registerUserEmail, setRegisterUserEmail] = useState();
  const [registerUserPassword, setRegisterUserPassword] = useState();
  const [registerUserError, setRegisterUserError] = useState();
  const classes = useStyles();

  const handleChangeUserEmail = (newEmail) => setRegisterUserEmail(newEmail);
  const handleChangeUserPassword = (newPassword) =>
    setRegisterUserPassword(newPassword);

  const handleSubmitForm = () => {
    loginUser(registerUserEmail, registerUserPassword)
      .then(() => {
        console.log("Login user ", registerUserEmail);
        onChangePage(PROFILE_PAGE_NAME);
      })
      .catch((error) => {
        setRegisterUserError(error.message);
      });
  };

  return (
    <BaseLayout>
      {messageToUser && (
        <Grid item className={classes.message_container}>
          <Typography>{messageToUser}</Typography>
        </Grid>
      )}
      <Grid item className={classes.form_container}>
        <AuthFormComp
          onChangeEmail={handleChangeUserEmail}
          onChangePassword={handleChangeUserPassword}
          buttonText="Login"
          onSubmit={handleSubmitForm}
        />
      </Grid>
      {registerUserError && (
        <Grid item>
          <Typography>{registerUserError}</Typography>
        </Grid>
      )}
    </BaseLayout>
  );
};

LoginPage.propTypes = {
  onChangePage: PropTypes.func,
  messageToUser: PropTypes.string,
};

export default LoginPage;

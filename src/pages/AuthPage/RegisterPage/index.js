import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import AuthFormComp from "../../../components/AuthFormComp";
// Layouts
import BaseLayout from "../../../components/Layouts/BaseLayout";

// Constants
import { FILL_FORM_PAGE_NAME } from "../../../utils/constants";

// API
import { registerNewUser, loginUser } from "../../../api/auth";

const RegisterPage = (props) => {
  const { onChangePage } = props;

  const [registerUserEmail, setRegisterUserEmail] = useState();
  const [registerUserPassword, setRegisterUserPassword] = useState();
  const [registerUserError, setRegisterUserError] = useState();

  const handleChangeUserEmail = (newEmail) => setRegisterUserEmail(newEmail);
  const handleChangeUserPassword = (newPassword) =>
    setRegisterUserPassword(newPassword);

  const handleSubmitForm = () => {
    registerNewUser(registerUserEmail, registerUserPassword)
      .then((data) => {
        console.log("Register new user ", data.email);
        loginUser(registerUserEmail, registerUserPassword).then(() =>
          onChangePage(FILL_FORM_PAGE_NAME)
        );
        // .catch((error) => {
        //   con
        //   throw new Error(error);
        // });
      })
      .catch((error) => {
        console.error(error);
        setRegisterUserError(error.message);
      });
  };

  return (
    <BaseLayout>
      <Grid item flexGrow={1}>
        <AuthFormComp
          onChangeEmail={handleChangeUserEmail}
          onChangePassword={handleChangeUserPassword}
          buttonText="Register"
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

RegisterPage.propTypes = {
  onChangePage: PropTypes.func,
};

export default RegisterPage;

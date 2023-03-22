import React from "react";
import PropTypes from "prop-types";

// MUI
import { TextField, Grid } from "@mui/material";

// Components
import BaseFormButton from "../Buttons/FormButtons/BaseFormButton";

const AuthFormComp = (props) => {
  const { buttonText, onSubmit, onChangeEmail, onChangePassword } = props;
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <Grid item>
        <TextField
          id="text-field-email-address"
          label="Email address"
          variant="outlined"
          onChange={(event) => onChangeEmail(event.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          id="text-field-password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(event) => onChangePassword(event.target.value)}
        />
      </Grid>
      <Grid item>
        <BaseFormButton onClick={onSubmit}>{buttonText}</BaseFormButton>
      </Grid>
    </Grid>
  );
};

AuthFormComp.propTypes = {
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
};

export default AuthFormComp;

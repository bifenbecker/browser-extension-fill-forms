import React from "react";
import PropTypes from "prop-types";

// MUI
import { TextField, Grid } from "@mui/material";

// Components
import BaseFormButton from "../Buttons/FormButtons/BaseFormButton";

// Pages
import { REGISTER_PAGE_NAME } from "../../utils/constants";

const AuthFormComp = (props) => {
  const {
    buttonText,
    onSubmit,
    onChangeEmail,
    onChangePassword,
    onChangePage,
  } = props;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      rowSpacing={3}
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
      <Grid
        container
        item
        xs={12}
        direction="row"
        alignItems="center"
        gap={3}
        justifyContent="center"
      >
        <Grid item>
          <BaseFormButton onClick={onSubmit}>{buttonText}</BaseFormButton>
        </Grid>
        {buttonText !== "Register" && (
          <Grid item>
            <BaseFormButton onClick={() => onChangePage(REGISTER_PAGE_NAME)}>
              Register
            </BaseFormButton>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

AuthFormComp.propTypes = {
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePage: PropTypes.func,
};

export default AuthFormComp;

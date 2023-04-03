import React from "react";
import PropTypes from "prop-types";

// MUI
import { Grid, Typography, Divider } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Layout
import BaseLayout from "../Layouts/BaseLayout";

// Styles
import useStyles from "./styles";

const ErrorMessage = (props) => {
  const {
    error: { message },
  } = props;

  const classes = useStyles();

  const SUPPORT_MESSAGE = "We apologies, reload please or wait some minutes.";
  const SUPPORT_CONTACT_US = "Contact us - admin@admin.com";

  return (
    <BaseLayout
      background="rgba(255, 255, 255, 0.2)"
      styles={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid className={classes.main_container}>
        <Grid item>
          <ErrorOutlineIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h6">{message}</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item className={classes.support_message_container}>
          <Typography variant="body2">{SUPPORT_MESSAGE}</Typography>
        </Grid>
        <Grid item className={classes.contact_us_container}>
          <Typography variant="caption">{SUPPORT_CONTACT_US}</Typography>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;

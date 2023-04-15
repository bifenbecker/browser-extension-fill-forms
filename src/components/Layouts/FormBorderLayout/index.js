import React from "react";
import PropTypes from "prop-types";

// MUI
import { Grid } from "@mui/material";

// Styles
import useStyles from "./styles";

const FormBorderLayout = (props) => {
  const { children, label } = props;
  const classes = useStyles();
  return (
    <Grid container flexDirection="column" alignItems="start">
      {label && (
        <Grid item className={classes.label}>
          {label}
        </Grid>
      )}
      <Grid className={classes.wrapper_border}>{children}</Grid>
    </Grid>
  );
};

FormBorderLayout.propTypes = {
  label: PropTypes.string,
};

export default FormBorderLayout;

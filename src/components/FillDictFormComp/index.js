import React from "react";
import PropTypes from "prop-types";

// MUI
import { TextField, Grid } from "@mui/material";

// Styles
import useStyles from "./styles";

// Components
import BaseFormButton from "../Buttons/FormButtons/BaseFormButton";

const FillDictFormComp = (props) => {
  const { onSubmit } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      className={classes.grid_container_form}
    >
      <Grid item>
        <TextField id="text-field-name" label="Name" variant="outlined" />
      </Grid>
      <Grid item>
        <TextField id="text-field-surname" label="Surname" variant="outlined" />
      </Grid>
      <Grid item>
        <TextField
          id="text-field-telephone"
          label="Telephone"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <BaseFormButton onClick={onSubmit}>Complete!</BaseFormButton>
      </Grid>
    </Grid>
  );
};

FillDictFormComp.propTypes = {
  onSubmit: PropTypes.func,
};

export default FillDictFormComp;

import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI
import { Grid } from "@mui/material";

// Components
import ControlledTextField from "../ControlledTextField";

// schema
import schema from "./validation";

const GeneralSettingsForm = ({ data, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      mobileNumber: data.mobile_number || "",
      emailAddress: data.email_address || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="GeneralSettingsForm">
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="First Name" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Last Name" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Email Address" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Mobile Number" />
        </Grid>
      </Grid>
    </form>
  );
};

GeneralSettingsForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default GeneralSettingsForm;

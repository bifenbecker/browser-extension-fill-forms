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

const AddressSettingsForm = ({ data: address, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      city: address.city || "",
      country: address.country || "",
      street: address.street || "",
      flatNumber: address.flat_number || "",
      houseNumber: address.house_number || "",
      postalCode: address.postal_code || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="AddressSettingsForm">
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Country" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="City" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Street" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Flat number" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="House number" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Postal code" />
        </Grid>
      </Grid>
    </form>
  );
};

AddressSettingsForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default AddressSettingsForm;

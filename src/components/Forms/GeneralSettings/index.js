import React from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Grid, Button, TextField } from "@mui/material";

// Layouts
import FormBorderLayout from "../../Layouts/FormBorderLayout";

// Utils
import { camelize } from "../../../utils/utils";

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(4, "Name must be longer")
      .max(30, "Name must be shorter"),
    lastName: yup
      .string()
      .min(4, "Last name must be longer")
      .max(30, "Last name must be shorter"),
    mobile: yup
      .string()
      .min(4, "Mobile must be longer")
      .max(30, "Mobile must be shorter"),
    email: yup
      .string()
      .email("Enter please Email address")
      .required("Email address is required"),
  })
  .required();

const ControlledTextField = ({ label, control, defaultValue }) => (
  <Controller
    control={control}
    name={camelize(label)}
    // defaultValue={defaultValue}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        label={label}
        error={!!error}
        helperText={error && error.message}
        variant="standard"
        fullWidth
      />
    )}
  />
);

const GeneralSettingsForm = ({ data }) => {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data.first_name,
      lastName: data.last_name,
      mobile: data.mobile_number,
      email: data.email_address,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorderLayout>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={6}>
            <ControlledTextField
              control={control}
              label="First Name"
              defaultValue=""
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              control={control}
              label="Last Name"
              defaultValue=""
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              control={control}
              label="Email"
              defaultValue=""
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              control={control}
              label="Mobile"
              defaultValue=""
            />
          </Grid>
        </Grid>
      </FormBorderLayout>
      <Button type="submit">Submit</Button>
    </form>
  );
};

GeneralSettingsForm.propTypes = {};

export default GeneralSettingsForm;

import React from "react";
import PropTypes from "prop-types";

// MUI
import { TextField } from "@mui/material";

// Hook Form
import { Controller } from "react-hook-form";

// Utils
import { camelize } from "../../../utils/utils";

const ControlledTextField = ({ label, control, defaultValue }) => {
  return (
    <Controller
      control={control}
      name={camelize(label)}
      defaultValue={defaultValue}
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
};

ControlledTextField.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  control: PropTypes.any,
};

ControlledTextField.defaultProps = {
  defaultValue: "",
};

export default ControlledTextField;

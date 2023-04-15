import React from "react";
import PropTypes from "prop-types";

import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import CustomInput from "./CustomInput";

// Utils
import { camelize } from "../../../utils/utils";

const ControlledDatePicker = ({ control, label }) => {
  return (
    <Controller
      control={control}
      name={camelize(label)}
      render={({ field }) => {
        const { value: date } = field;
        return (
          <DatePicker
            {...field}
            value={new Date(date)}
            render={<CustomInput label={label} />}
          />
        );
      }}
    />
  );
};

ControlledDatePicker.propTypes = {
  control: PropTypes.any,
  label: PropTypes.string,
};

export default ControlledDatePicker;

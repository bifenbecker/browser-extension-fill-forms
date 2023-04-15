import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const CustomInput = ({ openCalendar, value, handleValueChange, label }) => {
  return (
    <TextField
      onFocus={openCalendar}
      value={value}
      onChange={handleValueChange}
      variant="standard"
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CalendarTodayIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

CustomInput.propTypes = {
  openCalendar: PropTypes.func,
  value: PropTypes.any,
  handleValueChange: PropTypes.func,
  label: PropTypes.string,
};

export default CustomInput;

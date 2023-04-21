import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI
import { Grid } from "@mui/material";

// Components
import ControlledTextField from "../ControlledTextField";
import ControlledDatePicker from "../ControlledDatePicker";

// schema
import schema from "./validation";

const PaymentsSettingsForm = ({ data: payment, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      cardNumber: payment.card_number || "",
      expireDate: payment.expire_date || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="PaymentsSettingsForm">
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Card number" />
        </Grid>
        <Grid item xs={6}>
          <ControlledDatePicker control={control} label="Expire date" />
        </Grid>
      </Grid>
    </form>
  );
};

PaymentsSettingsForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PaymentsSettingsForm;

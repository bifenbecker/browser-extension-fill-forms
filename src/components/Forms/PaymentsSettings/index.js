import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI
import { Grid } from "@mui/material";

// Components
import ControlledTextField from "../ControlledTextField";
import ControlledDatePicker from "../ControlledDatePicker";
import SaveButton from "../../Buttons/ActionButtons/SaveButton";
// Layouts
import FormBorderLayout from "../../Layouts/FormBorderLayout";

// schema
import schema from "./validation";

// API
import { updateCustomerPayments } from "../../../api/customerSettings";
import { camelToSnakeCase } from "../../../utils/utils";

const PaymentsSettingsForm = ({ payments }) => {
  const [payment, setPayment] = useState(payments[0]);
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      cardNumber: payment.card_number || "",
      expireDate: payment.expire_date || "",
    },
  });

  const onSubmit = async (data) => {
    const processData = (data) => {
      const newData = {};
      Object.keys(data).forEach((key) => {
        const newKeyName = camelToSnakeCase(key.toString());
        newData[newKeyName] = data[key];
      });
      return newData;
    };

    const processedData = processData(data);

    const responseData = await updateCustomerPayments(processedData);
    console.info(responseData);
    setPayment(responseData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorderLayout>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={6}>
            <ControlledTextField control={control} label="Card number" />
          </Grid>
          <Grid item xs={6}>
            <ControlledDatePicker control={control} label="Expire date" />
          </Grid>
        </Grid>
      </FormBorderLayout>
      <SaveButton />
    </form>
  );
};

PaymentsSettingsForm.propTypes = {
  payments: PropTypes.array,
};

export default PaymentsSettingsForm;

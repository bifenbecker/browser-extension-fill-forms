import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI
import { Grid } from "@mui/material";

// Components
import ControlledTextField from "../ControlledTextField";
import SaveButton from "../../Buttons/ActionButtons/SaveButton";
// Layouts
import FormBorderLayout from "../../Layouts/FormBorderLayout";

// schema
import schema from "./validation";

// API
import { updateCustomerAddress } from "../../../api/customerSettings";
import { camelToSnakeCase } from "../../../utils/utils";

const AddressSettingsForm = ({ addresses }) => {
  const [address, setAddress] = useState(addresses[0]);
  console.log(address);
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

    const responseData = await updateCustomerAddress(processedData);
    console.info(responseData);
    setAddress(responseData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorderLayout>
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
      </FormBorderLayout>
      <SaveButton />
    </form>
  );
};

AddressSettingsForm.propTypes = {
  addresses: PropTypes.array,
};

export default AddressSettingsForm;

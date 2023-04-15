import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI
import { Grid } from "@mui/material";

// Layouts
import FormBorderLayout from "../../Layouts/FormBorderLayout";

// Components
import ControlledTextField from "../ControlledTextField";
import SaveButton from "../../Buttons/ActionButtons/SaveButton";

import BaseSettings from "../BaseSettings";

// schema
import schema from "./validation";

// API
import { updateCustomerSettings } from "../../../api/customerSettings";
import { camelToSnakeCase } from "../../../utils/utils";

const GeneralSettingsForm = ({ data, onSubmit }) => {
  // const [settings, setSettings] = useState(data);
  console.log(onSubmit);
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data.first_name,
      lastName: data.last_name,
      mobileNumber: data.mobile_number,
      email: data.email_address,
    },
  });

  // const onSubmit = async (data) => {
  //   const processData = (data) => {
  //     const newData = {};
  //     Object.keys(data).forEach((key) => {
  //       const newKeyName = camelToSnakeCase(key.toString());
  //       newData[newKeyName] = data[key];
  //     });
  //     return newData;
  //   };

  //   const processedData = processData(data);
  //   const responseData = await updateCustomerSettings(processedData);
  //   console.info(responseData);
  //   setSettings(responseData);
  // };

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
          <ControlledTextField control={control} label="Email" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField control={control} label="Mobile number" />
        </Grid>
      </Grid>
    </form>

    // <BaseSettings
    //   handleSubmit={updateCustomerSettings}
    //   formSubmit={handleSubmit}
    //   data={data}
    // >
    //   <Grid container rowSpacing={1} columnSpacing={1}>
    //     <Grid item xs={6}>
    //       <ControlledTextField control={control} label="First Name" />
    //     </Grid>
    //     <Grid item xs={6}>
    //       <ControlledTextField control={control} label="Last Name" />
    //     </Grid>
    //     <Grid item xs={6}>
    //       <ControlledTextField control={control} label="Email" />
    //     </Grid>
    //     <Grid item xs={6}>
    //       <ControlledTextField control={control} label="Mobile number" />
    //     </Grid>
    //   </Grid>
    // </BaseSettings>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <Grid container rowSpacing={2}>
    //     <Grid item xs={12}>
    //       <FormBorderLayout>
    //         <Grid container rowSpacing={1} columnSpacing={1}>
    //           <Grid item xs={6}>
    //             <ControlledTextField control={control} label="First Name" />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <ControlledTextField control={control} label="Last Name" />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <ControlledTextField control={control} label="Email" />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <ControlledTextField control={control} label="Mobile" />
    //           </Grid>
    //         </Grid>
    //       </FormBorderLayout>
    //     </Grid>
    //     <Grid item xs={12} justifySelf="start" alignSelf="self-start">
    //       <SaveButton />
    //     </Grid>
    //   </Grid>
    // </form>
  );
};

GeneralSettingsForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default GeneralSettingsForm;

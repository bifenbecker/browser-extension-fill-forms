import React from "react";
import PropTypes from "prop-types";

// MUI
import { Typography, Grid, Checkbox } from "@mui/material";

// Components
// Layouts
import FormBorderLayout from "../../Layouts/FormBorderLayout";

const CustomerDictSettingsDisplayComp = (props) => {
  const {
    customersDictSettingsData: {
      email_address,
      first_name,
      last_name,
      mobile_number,
      isAgreeSendMessagesOnEmail,
    },
  } = props;

  return (
    <FormBorderLayout>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={11}>
          <Grid container spacing={3}>
            <Grid item>
              <FormBorderLayout label="First name">
                <Typography>{first_name}</Typography>
              </FormBorderLayout>
            </Grid>
            <Grid item>
              <FormBorderLayout label="Last name">
                <Typography>{last_name}</Typography>
              </FormBorderLayout>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={3}>
            <Grid item>
              <FormBorderLayout label="Email address">
                <Typography>{email_address}</Typography>
              </FormBorderLayout>
            </Grid>
            <Grid item>
              <FormBorderLayout label="Mobile">
                <Typography>{mobile_number}</Typography>
              </FormBorderLayout>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item>
              <Checkbox checked={isAgreeSendMessagesOnEmail} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormBorderLayout>
  );
};

CustomerDictSettingsDisplayComp.propTypes = {
  customersDictSettingsData: PropTypes.object,
};

export default CustomerDictSettingsDisplayComp;

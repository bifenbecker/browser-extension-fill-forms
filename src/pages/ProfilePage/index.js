import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// MUI
import { Grid, Stack } from "@mui/material";

// Constants
import { EDIT_CUSTOMER_SETTINGS_NAME } from "../../utils/constants";

// Components
import CustomerDictSettingsDisplayComp from "../../components/CustomerDictSettingsGeneral/CustomerDictSettingsDisplayComp";
// Layouts
import BaseLayout from "../../components/Layouts/BaseLayout";
// Hoc
import WithFetchLoadingHOC from "../../hoc/WithFetchLoadingHoc";
import WithAuthHOC from "../../hoc/WithAuthHOC";
// Buttons
import EditButton from "../../components/Buttons/ActionButtons/EditButton";
import CancelButton from "../../components/Buttons/ActionButtons/CancelButton";

// API
import { getCustomerSettingsOptions } from "../../api/customerSettings";

// Styles
import useStyles from "./styles";

const ProfilePage = (props) => {
  const {
    onChangePage,
    data: { data: customerSettings },
  } = props;
  const classes = useStyles();

  return (
    <BaseLayout>
      <Grid
        container
        flexDirection="column"
        className={classes.customer_settings_page_wrapper}
        spacing={1}
      >
        {customerSettings && (
          <Grid item>
            <CustomerDictSettingsDisplayComp
              customersDictSettingsData={customerSettings}
            />
          </Grid>
        )}
        <Grid item ml={2}>
          <Stack direction="row" spacing={2}>
            <CancelButton onClick={() => onChangePage()} />
            <EditButton
              onClick={() => onChangePage(EDIT_CUSTOMER_SETTINGS_NAME)}
            />
          </Stack>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

BaseLayout.propTypes = {
  onChangePage: PropTypes.func,

  // Props from WithFetchLoadingHOC
  data: PropTypes.object,
};

export default WithAuthHOC(
  WithFetchLoadingHOC(ProfilePage, {
    url: getCustomerSettingsOptions().url,
  })
);

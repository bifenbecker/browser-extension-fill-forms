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
import WithLoadingHOC from "../../hoc/WithLoadingHOC";
import WithAuthHOC from "../../hoc/WithAuthHOC";
// Buttons
import EditButton from "../../components/Buttons/ActionButtons/EditButton";
import CancelButton from "../../components/Buttons/ActionButtons/CancelButton";

// API
import { getCustomerSettings } from "../../api/customerSettings";

// Styles
import useStyles from "./styles";

const ProfilePage = (props) => {
  const { onChangePage, setIsLoading, setErrorMessage } = props;
  const [customersDictSettingsData, setCustomersDictSettingsData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    getCustomerSettings()
      .then((data) => {
        setCustomersDictSettingsData(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
      getCustomerSettings()
        .then((data) => {
          onChangePage(EDIT_CUSTOMER_SETTINGS_NAME, {
            customersDictSettingsData: data,
          });
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isEdit]);

  return (
    <BaseLayout>
      <Grid
        container
        flexDirection="column"
        className={classes.customer_settings_page_wrapper}
        spacing={1}
      >
        {customersDictSettingsData && (
          <Grid item>
            <CustomerDictSettingsDisplayComp
              customersDictSettingsData={customersDictSettingsData}
            />
          </Grid>
        )}
        <Grid item ml={2}>
          <Stack direction="row" spacing={2}>
            <CancelButton onClick={() => onChangePage()} />
            <EditButton onClick={() => setIsEdit(true)} />
          </Stack>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

BaseLayout.propTypes = {
  onChangePage: PropTypes.func,

  // Props from WithLoadingHOC
  setIsLoading: PropTypes.func,
  setErrorMessage: PropTypes.func,
};

export default WithAuthHOC(WithLoadingHOC(ProfilePage));

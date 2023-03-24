import React from "react";
import PropTypes from "prop-types";

// MUI
import { Grid } from "@mui/material";

// Components
// Layouts
import BaseLayout from "../../components/Layouts/BaseLayout";
import CustomerDictSettingsEditComp from "../../components/CustomerDictSettingsGeneral/CustomerDictSettingsEditComp";
// HOCs
import WithAuthHOC from "../../hoc/WithAuthHOC";
import WithFetchLoadingHOC from "../../hoc/WithFetchLoadingHoc";

// Utils
import { getCustomerSettingsOptions } from "../../api/customerSettings";

// Styles
import useStyles from "./styles";

const CustomerDictSettingsEditPage = (props) => {
  const {
    onChangePage,
    data: { data: customersDictSettingsData },
  } = props;
  const classes = useStyles();
  return (
    <BaseLayout>
      <Grid
        container
        className={classes.wrapper}
        flexGrow={1}
        flexDirection="column"
        spacing={1}
      >
        <CustomerDictSettingsEditComp
          onChangePage={onChangePage}
          customersDictSettingsData={customersDictSettingsData}
        />
      </Grid>
    </BaseLayout>
  );
};

CustomerDictSettingsEditPage.propTypes = {
  onChangePage: PropTypes.func,
  customersDictSettingsData: PropTypes.object,
};

export default WithAuthHOC(
  WithFetchLoadingHOC(CustomerDictSettingsEditPage, {
    url: getCustomerSettingsOptions().url,
  })
);

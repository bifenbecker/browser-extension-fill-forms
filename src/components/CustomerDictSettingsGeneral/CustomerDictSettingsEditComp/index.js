import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI
import {
  Grid,
  Checkbox,
  TextField,
  Stack,
  FormControlLabel,
} from "@mui/material";

// Components
// Layouts
import FormBorderLayout from "../../Layouts/FormBorderLayout";
// Buttons
import BackButton from "../../Buttons/ActionButtons/BackButton";
import SaveButton from "../../Buttons/ActionButtons/SaveButton";
// HOC
import WithLoadingHOC from "../../../hoc/WithLoadingHOC";

// Constants
import { PROFILE_PAGE_NAME } from "../../../utils/constants";

// API
import { updateCustomerSettings } from "../../../api/customerSettings";

// Styles
// import useStyles from "./styles";

const CustomerDictSettingsEditComp = (props) => {
  const { customersDictSettingsData, onChangePage, setIsLoading } = props;
  const {
    email_address,
    first_name,
    last_name,
    mobile_number,
    isAgreeSendMessagesOnEmail,
  } = customersDictSettingsData || {};

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [emailAddress, setEmailAddress] = useState(email_address);
  const [mobileNumber, setMobileNumber] = useState(mobile_number);
  const [isAgreeSendMessagesOnEmailState, setIsAgreeSendMessagesOnEmailState] =
    useState(isAgreeSendMessagesOnEmail);

  const isDifferencesInNewData = (newData) => {
    const prevData = {
      first_name,
      last_name,
      email_address,
      mobile_number,
      isAgreeSendMessagesOnEmail,
    };
    return JSON.stringify(newData) !== JSON.stringify(prevData);
  };

  const handleSubmitEditSettings = () => {
    const newData = {
      first_name: firstName,
      last_name: lastName,
      email_address: emailAddress,
      mobile_number: mobileNumber,
      isAgreeSendMessagesOnEmail: isAgreeSendMessagesOnEmailState,
    };
    if (isDifferencesInNewData(newData)) {
      setIsLoading(true);
      updateCustomerSettings(newData)
        .then((data) => console.log(data))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <Grid item>
        <FormBorderLayout label="Edit">
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid container item spacing={3}>
              <Grid item flexGrow={0} width="50%">
                <TextField
                  label="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  defaultValue={first_name}
                  // helperText="Incorrect entry."
                  variant="standard"
                />
              </Grid>
              <Grid item flexGrow={0} width="50%">
                <TextField
                  label="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  defaultValue={last_name}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Grid container item spacing={3}>
              <Grid item flexGrow={0} width="50%">
                <TextField
                  label="Email address"
                  value={emailAddress}
                  onChange={(event) => setEmailAddress(event.target.value)}
                  defaultValue={email_address}
                  variant="standard"
                />
              </Grid>
              <Grid item flexGrow={0} width="50%">
                <TextField
                  label="Mobile"
                  value={mobileNumber}
                  onChange={(event) => setMobileNumber(event.target.value)}
                  defaultValue={mobile_number}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={isAgreeSendMessagesOnEmail}
                    value={isAgreeSendMessagesOnEmailState}
                    onChange={(event) =>
                      setIsAgreeSendMessagesOnEmailState(event.target.checked)
                    }
                  />
                }
                label="Agree send me messages on mail"
              />
            </Grid>
          </Grid>
        </FormBorderLayout>
      </Grid>
      <Grid item ml={2}>
        <Stack direction="row" spacing={2}>
          <BackButton onClick={() => onChangePage(PROFILE_PAGE_NAME)} />
          <SaveButton onClick={handleSubmitEditSettings} />
        </Stack>
      </Grid>
    </>
  );
};

CustomerDictSettingsEditComp.propTypes = {
  customersDictSettingsData: PropTypes.object,
  onChangePage: PropTypes.func,

  // Props from WithLoadingHOC
  setIsLoading: PropTypes.func,
  setErrorMessage: PropTypes.func,
};

CustomerDictSettingsEditComp.defaultProps = {
  customersDictSettingsData: {},
};

export default WithLoadingHOC(CustomerDictSettingsEditComp);

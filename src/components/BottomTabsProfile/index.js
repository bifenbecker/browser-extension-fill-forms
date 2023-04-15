import React, { useState } from "react";
import PropTypes from "prop-types";
import SettingsIcon from "@mui/icons-material/Settings";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import PaymentsIcon from "@mui/icons-material/Payments";

// MUI
import { Tabs, Tab } from "@mui/material";
import styled from "styled-components";

// Constants
import {
  PROFILE_NAVIGATION_SETTINGS,
  PROFILE_NAVIGATION_ADDRESSES,
  PROFILE_NAVIGATION_PAYMENTS,
} from "../../utils/constants";

const TabNav = styled(Tab)`
  && {
    text-transform: none;
    color: #ababab;
  }
`;

const BottomTabsProfile = (props) => {
  const { handleChangeTab, ...other } = props;
  const [value, setValue] = useState(0);
  return (
    <Tabs
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        handleChangeTab(newValue);
      }}
      variant="fullWidth"
      centered
      {...other}
    >
      <TabNav
        label={PROFILE_NAVIGATION_SETTINGS}
        icon={<SettingsIcon fontSize="small" />}
      />
      <TabNav
        label={PROFILE_NAVIGATION_ADDRESSES}
        icon={<HolidayVillageIcon fontSize="small" />}
      />
      <TabNav
        label={PROFILE_NAVIGATION_PAYMENTS}
        icon={<PaymentsIcon fontSize="small" />}
      />
    </Tabs>
  );
};

BottomTabsProfile.propTypes = {
  handleChangeTab: PropTypes.func,
};

export default BottomTabsProfile;

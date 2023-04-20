import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import BottomTabsProfile from "../../components/BottomTabsProfile";
import TabPanel from "../../components/TabPanel";
import TabsControl from "../../components/TabsControl";
// Layouts
import BaseLayout from "../../components/Layouts/BaseLayout";
// Hoc
import WithFetchLoadingHOC from "../../hoc/WithFetchLoadingHoc";
import WithAuthHOC from "../../hoc/WithAuthHOC";
// Tabs
import { GeneralTab, AddressesTab, PaymentsTab } from "../../components/Tabs";

// API
import { getCustomerSettingsOptions } from "../../api/customerSettings";

// Styles
import useStyles from "./styles";

const ProfilePage = (props) => {
  const {
    data: { data: customerSettings },
  } = props;
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (index) => setActiveTab(index);

  return (
    <BaseLayout>
      <TabsControl activeTab={activeTab}>
        <TabPanel>
          <div className={classes.form_wrapper}>
            <GeneralTab data={customerSettings} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className={classes.form_wrapper}>
            <AddressesTab data={customerSettings.addresses} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className={classes.form_wrapper}>
            <PaymentsTab data={customerSettings.payment_cards} />
          </div>
        </TabPanel>
      </TabsControl>
      <BottomTabsProfile
        handleChangeTab={handleChangeTab}
        sx={{ maxHeight: 62 }}
      />
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

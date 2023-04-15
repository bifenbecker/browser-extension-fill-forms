import React from "react";
import PropTypes from "prop-types";

import BaseSettings from "../../Forms/BaseSettings";
import { GeneralSettingsForm } from "../../Forms";

import { updateCustomerSettings } from "../../../api/customerSettings";

const GeneralTab = ({ data }) => {
  return (
    <BaseSettings data={data} handleSubmit={updateCustomerSettings}>
      <GeneralSettingsForm />
    </BaseSettings>
  );
};

GeneralTab.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GeneralTab;

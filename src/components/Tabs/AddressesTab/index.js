import React from "react";
import PropTypes from "prop-types";

import BaseSettings from "../../Forms/BaseSettings";
import { AddressSettingsForm } from "../../Forms";

import { updateCustomerAddress } from "../../../api/customerSettings";

const AddressesTab = ({ data }) => {
  return (
    <BaseSettings data={data} handleSubmit={updateCustomerAddress}>
      <AddressSettingsForm />
    </BaseSettings>
  );
};

AddressesTab.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AddressesTab;

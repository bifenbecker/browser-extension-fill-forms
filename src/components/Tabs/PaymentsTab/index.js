import React from "react";
import PropTypes from "prop-types";

import BaseSettings from "../../Forms/BaseSettings";
import { PaymentsSettingsForm } from "../../Forms";

import { updateCustomerPayments } from "../../../api/customerSettings";

const PaymentsTab = ({ data }) => {
  return (
    <BaseSettings data={data} handleSubmit={updateCustomerPayments}>
      <PaymentsSettingsForm />
    </BaseSettings>
  );
};

PaymentsTab.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PaymentsTab;

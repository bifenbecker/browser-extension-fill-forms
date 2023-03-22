import React from "react";
import PropTypes from "prop-types";

// MUI
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// Components
import BaseIcon from "../BaseIcon";

// Constants
import { REGISTER_ICON_TOOLTIP_REGISTER } from "../../../utils/constants";
// Pages
import { REGISTER_PAGE_NAME } from "../../../utils/constants";

const RegisterIcon = (props) => {
  const { onChangePage } = props;

  const handleChangePage = () => onChangePage(REGISTER_PAGE_NAME);

  return (
    <BaseIcon
      tooltipTitle={REGISTER_ICON_TOOLTIP_REGISTER}
      iconButtonProps={{ onClick: handleChangePage }}
    >
      <PersonAddIcon />
    </BaseIcon>
  );
};

RegisterIcon.propTypes = {
  onChangePage: PropTypes.func,
};

export default RegisterIcon;

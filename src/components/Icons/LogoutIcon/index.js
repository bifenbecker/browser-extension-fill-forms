import React from "react";
import PropTypes from "prop-types";

// MUI
import { default as LogoutIconMUI } from "@mui/icons-material/Logout";

// Constants
import { HOME_PAGE_ICON_TOOLTIP_LOGOUT } from "../../../utils/constants";

// Utils
import { logoutUser } from "../../../utils/utils";

// Components
import BaseIcon from "../BaseIcon";

const LogoutIcon = (props) => {
  const { propsIconButton, propsIcon, onChangePage } = props;

  const handleClick = () => logoutUser().then(() => onChangePage());

  return (
    <BaseIcon
      tooltipTitle={HOME_PAGE_ICON_TOOLTIP_LOGOUT}
      iconButtonProps={{
        ...propsIconButton,
        onClick: handleClick,
      }}
    >
      <LogoutIconMUI {...propsIcon} />
    </BaseIcon>
  );
};

LogoutIcon.propTypes = {
  onChangePage: PropTypes.func,
  propsIconButton: PropTypes.object,
  propsIcon: PropTypes.object,
};

LogoutIcon.defaultProps = {
  propsIconButton: {},
  propsIcon: {},
};

export default LogoutIcon;

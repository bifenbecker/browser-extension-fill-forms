import React from "react";
import PropTypes from "prop-types";

// MUI
import { default as LoginIconMUI } from "@mui/icons-material/Login";

// Constants
import { HOME_PAGE_ICON_TOOLTIP_LOGOUT } from "../../../utils/constants";

// Utils
import { logoutUser } from "../../../utils/utils";

// Components
import BaseIcon from "../BaseIcon";

const LoginIcon = (props) => {
  const { propsIconButton, propsIcon, onChangePage } = props;

  const handleClick = () => {};

  return (
    <BaseIcon
      tooltipTitle={HOME_PAGE_ICON_TOOLTIP_LOGOUT}
      iconButtonProps={{
        ...propsIconButton,
        onClick: handleClick,
      }}
    >
      <LoginIconMUI {...propsIcon} />
    </BaseIcon>
  );
};

LoginIcon.propTypes = {
  onChangePage: PropTypes.func,
  propsIconButton: PropTypes.object,
  propsIcon: PropTypes.object,
};

LoginIcon.defaultProps = {
  propsIconButton: {},
  propsIcon: {},
};

export default LoginIcon;

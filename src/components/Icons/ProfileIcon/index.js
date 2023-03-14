import React from "react";
import PropTypes from "prop-types";

// MUI
import PersonIcon from "@mui/icons-material/Person";

// Constants
import {
  PROFILE_ICON_TOOLTIP_LOGIN,
  PROFILE_ICON_TOOLTIP_PROFILE,
} from "../../../utils/constants";
// Pages
import { LOGIN_PAGE_NAME, FILL_FORM_PAGE_NAME } from "../../../utils/constants";

// Components
import BaseIcon from "../BaseIcon";

// Utils
import { isUserAuthenticated } from "../../../utils/utils";

const ProfileIcon = (props) => {
  const { propsIconButton, propsPersonIcon, onChangePage } = props;

  const handleChangePage = () =>
    isUserAuthenticated()
      ? onChangePage(FILL_FORM_PAGE_NAME)
      : onChangePage(LOGIN_PAGE_NAME);

  return (
    <BaseIcon
      tooltipTitle={
        isUserAuthenticated()
          ? PROFILE_ICON_TOOLTIP_PROFILE
          : PROFILE_ICON_TOOLTIP_LOGIN
      }
      iconButtonProps={{
        ...propsIconButton,
        onClick: handleChangePage,
      }}
    >
      <PersonIcon {...propsPersonIcon} />
    </BaseIcon>
  );
};

ProfileIcon.propTypes = {
  onChangePage: PropTypes.func,
  propsIconButton: PropTypes.object,
  propsPersonIcon: PropTypes.object,
};

export default ProfileIcon;

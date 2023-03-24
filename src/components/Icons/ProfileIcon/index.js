import React from "react";
import PropTypes from "prop-types";

// MUI
import PersonIcon from "@mui/icons-material/Person";

// Constants
import { PROFILE_ICON_TOOLTIP_PROFILE } from "../../../utils/constants";
// Pages
import { PROFILE_PAGE_NAME } from "../../../utils/constants";

// Components
import BaseIcon from "../BaseIcon";

const ProfileIcon = (props) => {
  const { propsIconButton, propsPersonIcon, onChangePage } = props;

  const handleChangePage = () => onChangePage(PROFILE_PAGE_NAME);

  return (
    <BaseIcon
      tooltipTitle={PROFILE_ICON_TOOLTIP_PROFILE}
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

import React from "react";
import PropTypes from "prop-types";

// MUI
import { IconButton, Tooltip } from "@mui/material";

const BaseIcon = (props) => {
  const { tooltipTitle, children, iconButtonProps } = props;
  return (
    <Tooltip title={tooltipTitle} placement="bottom-start" arrow>
      <IconButton {...iconButtonProps} color="primary">
        {children}
      </IconButton>
    </Tooltip>
  );
};

BaseIcon.propTypes = {
  tooltipTitle: PropTypes.string,
  iconButtonProps: PropTypes.object,
};

export default BaseIcon;

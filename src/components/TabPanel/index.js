import React from "react";
import PropTypes from "prop-types";

// MUI
import { Box } from "@mui/material";

const TabPanel = (props) => {
  const { children, value, index, key, ...other } = props;
  return (
    value === index && (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        key={key}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {children}
      </Box>
    )
  );
};

TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.number,
  index: PropTypes.number,
};

export default TabPanel;

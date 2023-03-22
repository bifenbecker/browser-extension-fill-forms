import React from "react";
import PropTypes from "prop-types";

// MUI
import { Box } from "@mui/material";

// Styles
import useStyles from "./styles";

const BaseLayout = (props) => {
  const { children, background, styles } = props;
  const classes = useStyles();
  return (
    <Box
      sx={{
        background,
        ...styles,
      }}
      className={classes.wrapper}
    >
      {children}
    </Box>
  );
};

BaseLayout.propTypes = {
  background: PropTypes.string,
  styles: PropTypes.object,
};

BaseLayout.defaultProps = {
  background: "rgba(255, 255, 255, 1)",
  styles: {},
};

export default BaseLayout;

import React from "react";

// MUI
import { Box } from "@mui/material";

// Styles
import useStyles from "./styles";

const BaseLayout = (props) => {
  const { children } = props;
  const classes = useStyles();
  return <Box className={classes.wrapper}>{children}</Box>;
};

export default BaseLayout;

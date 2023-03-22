import React from "react";

// MUI
import { Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Styles
import useStyles from "./styles";

const BackButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.btn_color}
      variant="contained"
      startIcon={<ChevronLeftIcon />}
      {...props}
    >
      Back
    </Button>
  );
};

export default BackButton;

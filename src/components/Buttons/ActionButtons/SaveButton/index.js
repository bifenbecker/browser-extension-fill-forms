import React from "react";

// MUI
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const SaveButton = (props) => {
  return (
    <Button
      variant="contained"
      color="success"
      endIcon={<CheckIcon />}
      {...props}
    >
      Save
    </Button>
  );
};

export default SaveButton;

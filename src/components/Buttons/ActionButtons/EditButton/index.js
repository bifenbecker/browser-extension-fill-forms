import React from "react";

// MUI
import { Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const EditButton = (props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      endIcon={<ModeEditIcon />}
      {...props}
    >
      Edit
    </Button>
  );
};

export default EditButton;

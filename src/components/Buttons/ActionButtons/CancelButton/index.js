import React from "react";

// MUI
import { Button } from "@mui/material";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";

const CancelButton = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<DoDisturbAltOutlinedIcon />}
      {...props}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;

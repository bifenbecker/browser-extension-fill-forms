import React from "react";

// MUI
import { Button } from "@mui/material";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";

const CompleteButton = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<DoDisturbAltOutlinedIcon />}
      {...props}
    >
      Complete
    </Button>
  );
};

export default CompleteButton;

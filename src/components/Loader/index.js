import React from "react";

// MUI
import { CircularProgress } from "@mui/material";

// Layouts
import BaseLayout from "../Layouts/BaseLayout";

const Loader = (props) => {
  return (
    <BaseLayout
      background="rgba(255, 255, 255, 0.2)"
      styles={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress {...props} />
    </BaseLayout>
  );
};

export default Loader;

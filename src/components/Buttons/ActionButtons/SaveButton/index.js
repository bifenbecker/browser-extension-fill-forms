import React from "react";

// MUI
import CheckIcon from "@mui/icons-material/Check";

import BaseFormButton from "../../FormButtons/BaseFormButton";

const SaveButton = (props) => {
  return (
    <BaseFormButton
      type="submit"
      variant="outlined"
      color="success"
      endIcon={<CheckIcon />}
      {...props}
    >
      Save
    </BaseFormButton>
  );
};

export default SaveButton;

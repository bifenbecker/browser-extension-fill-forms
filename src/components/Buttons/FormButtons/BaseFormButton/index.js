// MUI
import { Button } from "@mui/material";
import styled from "styled-components";

const BaseFormButton = styled(Button)`
  && {
    border-radius: 7px;
    border-width: 2px;
    padding: 3px 15px;
    :hover {
      border-width: 2px;
    }
  }
`;

export default BaseFormButton;

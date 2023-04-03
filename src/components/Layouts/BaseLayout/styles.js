// MUI
import { makeStyles } from "@mui/styles";

import { HEIGHT_MAIN_POPUP } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
  wrapper: {
    height: "100%",
    minHeight: HEIGHT_MAIN_POPUP,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default useStyles;

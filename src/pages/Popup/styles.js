import { makeStyles } from "@mui/styles";

// Constants
import { WIDTH_MAIN_POPUP, HEIGHT_MAIN_POPUP } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  main_popup_paper: {
    minWidth: WIDTH_MAIN_POPUP,
    minHeight: HEIGHT_MAIN_POPUP,
  },
}));

export default useStyles;

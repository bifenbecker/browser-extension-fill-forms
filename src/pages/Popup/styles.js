import { makeStyles } from "@mui/styles";

// Constants
import { WIDTH_MAIN_POPUP, HEIGHT_MAIN_POPUP } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  main_popup_paper: {
    width: WIDTH_MAIN_POPUP,
    height: HEIGHT_MAIN_POPUP,
  },
}));

export default useStyles;

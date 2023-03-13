import { makeStyles } from "@mui/styles";

// Constants
import { WIDTH_MAIN_POPUP, HEIGHT_MAIN_POPUP } from "../../../utils/constants";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    modal_wrapper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      boxShadow: 24,
      width: WIDTH_MAIN_POPUP * 0.6,
      height: HEIGHT_MAIN_POPUP * 0.5,
    },
  };
});

export default useStyles;

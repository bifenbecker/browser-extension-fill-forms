import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  home_page_wrapper: {
    flexGrow: 1,
  },
  home_page_profile_icon_wrapper: {
    float: "right",
    margin: 10,
  },
  home_page_title_wrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
